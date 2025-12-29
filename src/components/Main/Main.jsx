import React , { useState } from 'react'
import "./Main.css"
import { assets } from '../../assets/assets'
import ChatViewer from '../ChatViewer/ChatViewer'


const Main = ({ onSend, selectedChat, onCloseChat }) => {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const sendPrompt = async () => {
    const prompt = input.trim()
    if (!prompt || loading) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })
      const json = await res.json()
      const reply = json?.reply || 'No response from API.'
      if (onSend) onSend(prompt, reply)
      setInput('')
    } catch (err) {
      console.error(err)
      setError('Could not reach API')
      if (onSend) onSend(prompt, 'Error: could not reach API')
    } finally {
      setLoading(false)
    }
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter') sendPrompt()
  }

  return (
    <div className='main'>
        <div className="nav">
            <p>Gemini</p>
            <img src={assets.user_icon} alt="" />
        </div>


        <div className="main-container">

          {selectedChat ? (
            <ChatViewer chat={selectedChat} onClose={onCloseChat} />
          ) : (
            <div className="greet">
              <p><span>Hello, Ankit.</span></p>
              <p>How can I help you today?</p>
            </div>
          )}


          <div className="cards">

            <div className="card">
              <p>Suggest me some tourist place around Chandigarh</p>
              <img src={assets.compass_icon} alt="" />
            </div>
            <div className="card">
              <p>Briefly summarize this concept: Tokenization</p>
              <img src={assets.bulb_icon} alt="" />
            </div>
            <div className="card">
              <p>Brainstom team bonding activities for our work retreat</p>
              <img src={assets.message_icon} alt="" />
            </div>
            <div className="card">
              <p>Improve the readability of the following code</p>
              <img src={assets.code_icon} alt="" />
            </div>

          </div>



          <div className="main-bottom">

            <form className="search-box" onSubmit={(e)=>{e.preventDefault(); sendPrompt();}}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Enter a prompt here"
                disabled={loading}
                aria-label="Prompt input"
              />

              <div>
                <img src={assets.gallery_icon} alt="" />
                <img src={assets.mic_icon} alt="" />
                <button
                  type="submit"
                  className="send-button"
                  title="Send prompt"
                  disabled={loading}
                  style={{ background: 'transparent', border: 'none', padding: 0 }}
                >
                  <img
                    src={assets.send_icon}
                    alt="send"
                    style={{ cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1 }}
                  />
                </button>
              </div>
            </form>
            {error ? <div className="send-error">{error}</div> : null}

            <p className="bottom-info">
              Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
            </p>
          </div>
        </div>
    </div>
  )
}

export default Main