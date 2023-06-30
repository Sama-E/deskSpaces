import { useState, useEffect } from "react";
import "/src/assets/css/components/bars/airightbar.scss";


const AIRightBar = () => {

  const [value, setValue] = useState("");
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
      })
    }
    try {
      const response = await fetch('http://localhost:8801/', options)
      const data = await response.json()
      console.log(data)
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

  //Current Chats
  const currentChat = previousChats.filter(previousChat => previousChat.title === currentTitle)

  //Previous Chats
  const uniqueTitles = Array.from (new Set(previousChats.map(previousChat => previousChat.title)))


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
    </div>
  )
}

export default AIRightBar;