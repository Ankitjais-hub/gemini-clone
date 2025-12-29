import React, { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import Main from './components/Main/Main'


const App = () => {
  const [chats, setChats] = useState([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem('chats')
      if (raw) setChats(JSON.parse(raw))
    } catch (e) {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('chats', JSON.stringify(chats))
    } catch (e) {}
  }, [chats])

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
