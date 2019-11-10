import * as uuid  from 'uuid'

import { TodosAccess } from '../dataLayer/todosAccess'
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
//import { getUserId } from '../utils';

const contentAccess = new TodosAccess()


//for Create Todo

export async function createTodo(userId: string, 
  CreateTodoRequest: CreateTodoRequest): Promise<TodoItem> {
    const timestamp = new Date().toISOString()
    const itemId = uuid.v4()
  


  const newTodo: TodoItem = {
    userId: userId,
    todoId: itemId,
    createdAt: timestamp,
    ...CreateTodoRequest,
    done: false,
  }

  await contentAccess.create(newTodo)

  return newTodo
  
  }

//for Get Todo


  
  export async function getTodosPerUser(userId: string): Promise<TodoItem[]> 
  {
    return await contentAccess.getTodos(userId) 

  }




//for Update todo 

export async function makeUpdate(
  todoId: string,
  updateTodoRequest: UpdateTodoRequest): Promise<void>
  {

    return await contentAccess.update(todoId, updateTodoRequest)

    }


//for Delete todo  



export async function makeDelete(todoId: string){

  return await contentAccess.delete(todoId)

  
  }  

