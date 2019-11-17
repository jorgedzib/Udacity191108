import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda'

import * as AWS  from 'aws-sdk'

import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { getUserId } from '../utils'




const s3 = new AWS.S3({
  signatureVersion: 'v4'
})

const bucketName = process.env.TODOS_S3_BUCKET
const urlExpiration = process.env.SIGNED_URL_EXPIRATION


const todosTable = process.env.TODOS_TABLE

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId

  const generateUploadUrl = await createAttachUrl(getUserId(event), todoId)
  
  return {
    statusCode: 201,
  body: JSON.stringify({
    uploadUrl: generateUploadUrl
  })

}
})

function createAttachUrl(userId:string, todoId: string) {
  const todoAttach = getById(userId, todoId)
const presignedUrl = getUploadUrl(todoId)
  if (!todoAttach) {
   return getDownloadUrl(todoId)
  }

  return presignedUrl
} 

function getUploadUrl(todoId: string) {   
  s3.getSignedUrl('putObject', {
    Bucket: bucketName,       
    Key: todoId,
    Expires: urlExpiration,
      });
  
  }
 function getDownloadUrl(todoId: string) {
    return `https://${this.bucketName}.s3.amazonaws.com/${todoId}`
  }
  
 function getById(userId: string, todoId: string) {
    const result = this.dynamoDBClient
    .query({
      TableName: todosTable,
      Key: {
        userId,
        todoId
      }
      })
    .promise()
    return result.Items
  }
  


  handler
  //Error Handler?
  .use(
    cors({
      credentials: true
    })
  )
