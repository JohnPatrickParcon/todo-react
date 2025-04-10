import { FormEvent, useState } from "react"

type TodoItemType = {
  id: string,
  todoItem: string
}

function App() {
  const [todoList, setTodoList] = useState<TodoItemType[]>([])

  function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    
    const formData = new FormData(e.currentTarget)
    const todo = formData.get('todo') as string | null
    
    if (!todo) {
      return null
    }

    setTodoList([...todoList, {id: Date.now().toString(), todoItem: todo}])
    e.currentTarget.reset()
  }

  function removeTodo(id: string){
    const filteredTodo = todoList.filter(item => id !== item.id)

    setTodoList(filteredTodo)
  }

  function RenderTodo(){
    return(
      <ul className="grid w-1/2 bg-purple-600 rounded-2xl mt-2 p-1 overflow-y-auto">
        {
          todoList.map(item => {
            return(
              <li className='w-full wrap-anywhere p-1 flex place-content-between' key={item.id}>
              {item.todoItem}
              <button className="bg-red-400 rounded-2xl p-1 hover:bg-red-500" onClick={() => {removeTodo(item.id)}}>Delete</button>
              </li>
            )
          })
        }
      </ul>
    )
  }
  return (
    <>
      <div className="flex flex-col items-center p-4 bg-purple-300 w-full h-dvh">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            className="bg-purple-400 p-2 rounded-l-xl"
            placeholder="What to do?"
            required
            name="todo"></input>
          <button type="submit" className=" justify-center bg-purple-500 p-2 rounded-r-xl">Add Todo</button>
        </form>

        <RenderTodo/>
      </div>
    </>
  )
}

export default App
