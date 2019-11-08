import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'

import { getTodosPerUser } from '../../businessLogic/todos'
import { getUserId } from '../utils';


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
   // TODO: Get all TODO items for a current user

   console.log('Processing event: ', event)
 
   const todos = await getTodosPerUser(getUserId(event))
   
   return {
     statusCode:200,
     headers: {
       'Access-Control-Allow-Origin': '*',
       'Access-Control-Allow-Credentials': true,
     },
     body: JSON.stringify({
       items: todos
     })
   }
   
}

