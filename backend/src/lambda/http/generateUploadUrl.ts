import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda'

import * as AWS  from 'aws-sdk'

import * as middy from 'middy'
import { cors } from 'middy/middlewares'

const s3 = new AWS.S3({
  signatureVersion: 'v4'
})

const bucketName = process.env.TODOS_S3_BUCKET
const urlExpiration = process.env.SIGNED_URL_EXPIRATION

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId

  const generateUploadUrl = await getUploadUrl(todoId)
  
  return {
    statusCode: 201,
  body: JSON.stringify({
    uploadUrl: generateUploadUrl
  })

}
})



function getUploadUrl(todoId: string) { 
  
  s3.getSignedUrl('putObject', {
    Bucket: bucketName,       
    Key: todoId,
    Expires: urlExpiration,
      });
  
  }

  handler
  //Error Handler?
  .use(
    cors({
      credentials: true
    })
  )
