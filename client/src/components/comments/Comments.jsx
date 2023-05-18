import "/src/assets/css/components/comments/comments.scss";
import { AuthContext } from "src/context/authContext";
import { useContext } from "react";

const Comments = () => {

  const {currentUser} = useContext(AuthContext);
  
  //TEMPORARY
  const comments = [
    {
      id: 1,
      name: "John Doe",
      userId: 1,
      profilePic:
        "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
      desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas assumenda repudiandae molestias repellendus nam dolor magnam ratione recusandae consequuntur? Aliquam temporibus ad ut dolorum magni maxime nostrum a dignissimos earum.",
    },
    {
      id: 2,
      name: "John Doe",
      userId: 2,
      profilePic:
        "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
      desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas assumenda repudiandae molestias repellendus nam dolor magnam ratione recusandae consequuntur? Aliquam temporibus ad ut dolorum magni maxime nostrum a dignissimos earum.",
    },
  ];
  return (
    <div className="comments">
        <div className="write">
          <img src={currentUser.profilePic} alt="" />
          <input type="text" placeholder="write a comment" />
          <button>Comment</button>
        </div>
      {
        comments.map((comment) =>(

        <div className="comment">
          <img src={comment.profilePic} alt="" />
          <div className="info">
            <span>{comment.name}</span>
            <p>{comment.desc}</p>
          </div>
          <span className="date">1 hour ago</span>
        </div>

        ))
      }

    </div>
  )
}

export default Comments;