import React from 'react'
import './ChatViewer.css'

const ChatViewer = ({ chat, onClose }) => {
  if (!chat) return null

  return (
    <div className="chat-viewer">
      <div className="chat-header">
        <h3>Conversation {chat.source ? `· ${chat.source}` : ''}</h3>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>

      <div className="chat-body">
        <div className="chat-item">
          <strong>You:</strong>
          <p>{chat.prompt}</p>
        </div>
        <div className="chat-item">
          <strong>Gemini:</strong>
          <p>{chat.response}</p>
        </div>
        <div className="chat-meta">{new Date(chat.createdAt).toLocaleString()}</div>
      </div>
    </div>
  )
}

export default ChatViewer
