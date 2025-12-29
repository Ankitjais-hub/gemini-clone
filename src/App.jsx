import React, { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import Main from './components/Main/Main'


const App = () => {
  const [chats, setChats] = useState([])
  const [selectedChat, setSelectedChat] = useState(null)

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

  const addChat = (prompt, response, source = 'unknown') => {
    const item = {
      id: Date.now(),
      prompt,
      response,
      source,
      createdAt: new Date().toISOString(),
    }
    setChats(prev => [item, ...prev])
    setSelectedChat(item)
  }

  return (
    <>
      <Sidebar chats={chats} onSelect={setSelectedChat} />
      <Main onSend={addChat} selectedChat={selectedChat} onCloseChat={() => setSelectedChat(null)} />
    </>
  )
}

export default App
