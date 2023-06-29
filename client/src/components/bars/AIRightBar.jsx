import "/src/assets/css/components/bars/airightbar.scss";


const AIRightBar = () => {
  return (
    <div className="rightBar">
      <div className="chatContainer">
        <div className="item">
            <div className="chatBox">
              <div className="chatLog">
                <div className="chatMessage">
                  <div className="profilePic">
                  <img src="/src/assets/images/noavatar.jpg"/>
                  </div>
                  <div className="message">
                    Hello world
                  </div>
                </div>
                <div className="chatMessageAI">
                  <div className="profilePic">
                    <img src="/src/assets/images/chatgptpurple.jpg"/>
                  </div>
                  <div className="message">
                    Hello world
                  </div>
                </div>
              </div>
            </div>
          <form>
            <textarea name="prompt" rows="2" placeholder="Ask Codex...">
            </textarea>
            <button type="submit">
              <img src="/src/assets/images/send.svg"/>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AIRightBar;