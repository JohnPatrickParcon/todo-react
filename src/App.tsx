import { FormEvent, useState } from "react"

type TodoItemType = {
  id: string,
  todoItem: string
}

function App() {
  const [todoList, setTodoList] = useState<TodoItemType[]>([])
  const [todo, setTodo] = useState<string>()

  function submitHandler(e: FormEvent) {
    e.preventDefault()

    if(!todo){
      return null
    }
    setTodoList([...todoList, {id: Date.now().toString(), todoItem: todo}])
    setTodo('')
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
            value={todo}
            onChange={e => {setTodo(e.target.value)}}></input>
          <button type="submit" className=" justify-center bg-purple-500 p-2 rounded-r-xl">Add Todo</button>
        </form>

        <ul>
          {todoList.map(item => <li key={item.id}>{item.todoItem}</li>)}
        </ul>
      </div>
    </>
  )
}

export default App
