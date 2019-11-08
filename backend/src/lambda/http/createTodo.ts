
import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { createTodo } from '../../businessLogic/todos'
import { getUserId } from '../utils';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  // TODO: Implement creating a new TODO item
  
  console.log('Processing event: ', event)
  const newTodo: CreateTodoRequest = JSON.parse(event.body)


  const newItem = await createTodo(getUserId(event), newTodo)
 

return {
  statusCode: 200,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  },
body: JSON.stringify({
  newItem,
  done: false 
})
}

}
