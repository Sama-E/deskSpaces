
import { useState, useEffect } from "react";
import "/src/assets/css/components/bars/airightbar.scss";


const AIRightBar = () => {


  // const [input, setInput] = useState("");
  // const [chatLog,setChatLog] = useState([{
  //   user:"gpt",
  //   message: "How can I help?"
  //   },
  //   {
  //     user:"me",
  //     message: "Hi"
  //     }
  // ]);

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

  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   setChatLog([...chatLog, { user: "me", message: `${input}`}]);
  //   setInput("");

  const [value, setValue] = useState(null);
  const [message, setMessage] = useState(null);
  const [previousChats, setPreviousChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState(null);

  const createNewChat = () => {
    setMessage(null);
    setValue("");
    setCurrentTitle(null);
  }

  const getMessages = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        message: value
        // message: chatLog.map((message) => message.message).join("")
      })
    }
    try {
      const response = await fetch('http://localhost:8801/', options)
      const data = await response.json()
      // setChatLog([...chatLog, {user: "gpt", message: `${data.choices[0].message}`}])
      setMessage(data.choices[0].message)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    console.log(currentTitle, value, message)
    if(!currentTitle && value && message){
      setCurrentTitle(value)
    }
    if(currentTitle && value && message){
      setPreviousChats(prevChats => (
        [...prevChats, 
          { 
            title: currentTitle,
            role: "user",
            content: value
          }, 
          {
            title: currentTitle,
            role: message.role,
            content: message.content
          }
      ]
      ))
    }
  }, [message, currentTitle])

  console.log(previousChats)

  //Current Chats
  const currentChat = previousChats.filter(previousChat => previousChat.title === currentTitle)

  //Previous Chats
  const uniqueTitles = Array.from (new Set(previousChats.map(previousChat => previousChat.title)))

  console.log(uniqueTitles)

  //Select History of previous chat
  const handlePrevChatClick=(uniqueTitle)=> {
    setCurrentTitle(uniqueTitle)
    setMessage(null)
    setValue("")
  }


  return (
    <div className="rightBar">
      {/* Ania */}
      <section className="main">
        <div className="title">
          <h1>ChatGPT</h1>
          <button onClick={createNewChat}>Clear</button>
        </div>
        <ul className="feed">
          {currentChat?.map((chatMessage, index) => 
            <li key={index} className="feedMessage">
              <p className="role"> {chatMessage.role} </p>
              <p> {chatMessage.content} </p>
            </li>
            )}
        </ul>
        <div className="bottom-section">
          <div className="input-container">
            <input value={value} onChange={(e) => setValue(e.target.value)}/>
            <div id="submit" onClick={getMessages}>
              <img src="/src/assets/images/send.svg"/>
            </div>
          </div>
          <p className="info">
            Blah Blah
          </p>
        </div>
      </section>



      {/* Adrian */}
      {/* <div className="chatContainer">
        <div className="item">
            <div className="chatBox">
              <div className="chatLog">
                {chatLog.map((message, index) => (
                  <ChatMessage key={index} message={message} />
                ))}
                {/* <img src="/src/assets/images/chatgptpurple.jpg"/> */}
            {/* </div>
              </div>
          <form onSubmit={handleSubmit}>
            <input 
              name="prompt" 
              rows="2" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Codex..." 
            />*/}
            {/* <button type="submit" onClick={getMessages}> */}
            {/*
            <button type="submit">
              <img src="/src/assets/images/send.svg"/>
            </button>
          </form>
        </div>
      </div> */}
    </div>
  )
}


// const ChatMessage = ({ message }) => {
//   return (
//     <div className="chatMessage">
//       <div className="profilePic">
//         <div className={`profilePic ${message.user === "gpt" && "chaptgpt"}`}>
//           <img src="/src/assets/images/noavatar.jpg"/>
//         </div>
//         <div className="message">
//           {message.message}
//         </div>
//       </div>
//   </div>
//   )
// }


export default AIRightBar;