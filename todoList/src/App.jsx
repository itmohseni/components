import React, { useRef, useState } from 'react'
let IdTodo = 1
const App = () => {
  const inputRef = useRef()
  const deleteModal = useRef()
  const [TextInput, setTextInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [taskIdDeleted, settaskIdDeleted] = useState();
  let percentage;

  const complate = todos.filter(todo => todo.status === "complate").length
  percentage = todos.length ? Math.round((complate / todos.length) * 100) : 0


  const changeStatusTask = (taskId) => {
    setTodos(prevState =>
      prevState.map(todo =>
        todo.id === taskId ? { ...todo, status: todo.status === "complate" ? "notComplate" : "complate" } : todo
      )
    )
  }

  const addTask = () => {
    if (TextInput) {
      setTodos([
        ...todos,
        {
          id: IdTodo,
          text: TextInput,
          status: "notComplate"
        }
      ])
      IdTodo++
      setTextInput("")
    } else {
      inputRef.current.classList.remove("hidden")

      setTimeout(() => {
        inputRef.current.classList.add("hidden")
      }, 1500);
    }
  }

  const deleteTask = (taskId) => {
    deleteModal.current.classList.remove("hidden")
    settaskIdDeleted(taskId)
  }

  const canseldelete = () => {
    deleteModal.current.classList.add("hidden")
  }

  const confirmdelete = () => {
    setTodos(
      todos.filter(todo => todo.id !== taskIdDeleted)
    )
    deleteModal.current.classList.add("hidden")
  }
  let notComplateTasck = todos.filter(todo => todo.status !== "notComplate").length;
  return (
    <>
      <div className='bg-zinc-700 h-screen flex justify-around items-center'>
        <div className='shadow-2xl shadow-blue-500/20 w-1/4 mr-5 mt-[5%] h-4/5 rounded-xl flex flex-col items-center gap-1.5'>
          <div className='flex items-center gap-3 w-5/6'>
            <div className="bg-blue-600 rounded-full w-28 h-28 text-center content-center text-white text-xl ">
              <p>{percentage}%</p>
            </div>
            {
              notComplateTasck !== todos.length ? <p className='text-white text-lg'>هنوز کار داری که باید انجام بشه</p> : <p className='text-white text-lg'>همه کارا رو اوکی کردی</p>
            }
          </div>
          <div className={`text-zinc-300 w-5/6 mt-10 space-y-2 overflow-y-auto tasklist px-1.5`}>
            {todos.length !== 0 ? todos.map((todo) => {
              return (
                <div className={`task flex w-full justify-between border rounded-lg items-center py-0.5 px-2 border-stone-300/40 group ${todo.status === "complate" ? "brightness-75" : ""}`} key={todo.id}>
                  <div className='flex gap-2 items-center text-xl'>
                    <div>
                      <svg onClick={() => changeStatusTask(todo.id)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className='cursor-pointer' viewBox="0 0 16 16">
                        <path d="M11 2a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3zM5 1a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4V5a4 4 0 0 0-4-4z" />
                      </svg>
                    </div>
                    <p className={` ${todo.status === "complate" ? "line-through text-gray-400" : "text-white"}`}>{todo.text}</p>
                  </div>
                  <div className='flex text-gray-400 gap-1.5 opacity-0 group-hover:opacity-100 transition-all'>
                    <svg onClick={() => { deleteTask(todo.id) }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="cursor-pointer" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                    </svg>
                  </div>
                </div>
              )
            }) : <p className='text-center'>هنوز هیچ کاری اضافه نکردی</p>}

          </div>
        </div>
        <div className='w-1/6'>
          <div className='flex items-center gap-1.5'>
            <input onKeyDown={(event) => {
              event.code === "Enter" ? addTask() : false
            }} type="text" className='bg-white outline-0 rounded-md px-2 p-1 text-lg text-zinc-700 shadow-lg shadow-blue-500/30 focus:ring-2 focus:ring-blue-500/80 ' value={TextInput} onChange={(event) => {
              setTextInput(event.target.value)
            }} />
            <button onClick={addTask} className='px-2.5 p-1.5 text-white bg-blue-500 rounded-md flex items-center justify-center'>
              <svg width="24" height="24" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
              </svg>
            </button>
          </div>

        </div>
      </div>
      <div ref={inputRef} className='absolute top-2 right-1/2 left-1/2 w-44 text-center bg-red-600 text-white rounded-lg px-2.5 py-1 hidden transition-all'>
        <p>فیلد نباید خالی باشه</p>
      </div>
      <div ref={deleteModal} className='hidden absolute w-screen h-screen bg-black/40 top-0 left-0 content-center'>
        <div className='bg-white mx-auto rounded-lg w-72 px-4 py-2.5'>
          <p className='text-center'>از حذف این کار مطمئنی؟</p>
          <div className='flex gap-2 mt-4'>
            <button onClick={() => {
              canseldelete()
            }} className='w-1/2 rounded-lg text-white text-center content-center bg-red-600 cursor-pointer py-1 hover:bg-red-700 transition-colors'>نه</button>
            <button onClick={() => {
              confirmdelete()
            }} className='w-1/2 rounded-lg text-white text-center content-center bg-blue-600 cursor-pointer py-1 hover:bg-blue-700 transition-colors'>آره</button>
          </div>
        </div>
      </div>
    </>

  )
}
export default App