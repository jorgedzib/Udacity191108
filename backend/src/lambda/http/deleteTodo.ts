import 'source-map-support/register'

import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { makeDelete } from '../../businessLogic/todos'

export const handler= middy (async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId

  // TODO: Remove a TODO item by id
  
  
  const newDelete = await makeDelete(todoId)

    // create a response
    return {
      statusCode: 201,
    body: JSON.stringify({
      newDelete
    })
  }
  //return undefined
})

handler
  //Error Handler?
  .use(
    cors({
      credentials: true
    })
  )
