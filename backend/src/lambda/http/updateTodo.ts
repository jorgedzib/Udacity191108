import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'

import { makeUpdate } from '../../businessLogic/todos'
import { getUserId } from '../utils'

export const handler = middy( async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)
  // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
  console.log('Processing event: ', event)
  
  const newUpdate = await makeUpdate(getUserId(event), todoId, updatedTodo)  

  return {
    statusCode: 201,
  body: JSON.stringify({
    newUpdate
  })
}

})

handler
  //Error Handler?
  .use(
    cors({
      credentials: true
    })
  )

 