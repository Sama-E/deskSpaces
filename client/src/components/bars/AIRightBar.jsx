import { useState } from "react";
import "/src/assets/css/components/bars/airightbar.scss";


const AIRightBar = () => {

  const [input, setInput] = useState("");
  const [chatLog,setChatLog] = useState([{
    user:"gpt",
    message: "How can I help?"
    },
    {
      user:"me",
      message: "Hi"
      }
  ]);

  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   setChatLog([...chatLog, { user: "me", message: `${input}`}]);
  //   setInput("");

  //   const response = await fetch("http://localhost:8801/", {
  //     method: "POST",
  //     headers:{
  //     "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       message: chatLog.map((message) => message.message).join("")
  //     })
  //   });

  //   const data = await response.json();
  //   console.log(data)
  // }

  //Ania Example

  async function handleSubmit(e) {
    e.preventDefault();
    setChatLog([...chatLog, { user: "me", message: `${input}`}]);
    setInput("");
  // const getMessages = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        // message: "hello how are you?"
        message: chatLog.map((message) => message.message).join("")
      })
    }
    try {
      const response = await fetch('http://localhost:8801/', options)
      const data = await response.json()
      setChatLog([...chatLog, {user: "gpt", message: `${data.message}`}])
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="rightBar">
      <div className="chatContainer">
        <div className="item">
            <div className="chatBox">
              <div className="chatLog">
                {chatLog.map((message, index) => (
                  <ChatMessage key={index} message={message} />
                ))}
                {/* <img src="/src/assets/images/chatgptpurple.jpg"/> */}
              </div>
            </div>
          <form onSubmit={handleSubmit}>
            <input 
              name="prompt" 
              rows="2" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Codex..." 
            />
            {/* <button type="submit" onClick={getMessages}> */}
            <button type="submit">
              <img src="/src/assets/images/send.svg"/>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

const ChatMessage = ({ message }) => {
  return (
    <div className="chatMessage">
      <div className="profilePic">
        <div className={`profilePic ${message.user === "gpt" && "chaptgpt"}`}>
          <img src="/src/assets/images/noavatar.jpg"/>
        </div>
        <div className="message">
          {message.message}
        </div>
      </div>
  </div>
  )
}

export default AIRightBar;