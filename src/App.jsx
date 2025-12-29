import React, { useState } from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import Main from './components/Main/Main'


const App = () => {
  const [chats, setChats] = useState([])

  const addChat = (prompt, response) => {
    const item = {
      id: Date.now(),
      prompt,
      response,
      createdAt: new Date().toISOString(),
    }
    setChats(prev => [item, ...prev])
  }

  return (
    <>
      <Sidebar chats={chats} />
      <Main onSend={addChat} />
    </>
  )
}

export default App
