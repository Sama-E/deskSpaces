import "/src/assets/css/components/comments/comments.scss";
import { AuthContext } from "src/context/authContext";
import { useContext, useState } from "react";
import { makeRequest } from "/services/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";

const Comments = ({postId}) => {

  const [ desc, setDesc] = useState("");
  const {currentUser} = useContext(AuthContext);
    //Via makeRequest to access posts from server
  const { isLoading, error, data } = useQuery(["comments"], () => 
  makeRequest.get("/comments?postId" + postId).then((res) => {
    return res.data;
  })
);

//Fetching client for posts
const queryClient = useQueryClient()
//Mutation updates new posts
const mutation = useMutation(
  (newComment) =>{
    return makeRequest.post("/comments", newComment);
  }, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["comments"])
    },
  }
);

const handleClick = async (e) => {
  e.preventDefault();
  mutation.mutate({desc, postId});
  setDesc("");
};

  return (
    <div className="comments">
        <div className="write">
          <img src={currentUser.profilePic} alt="" />
          <input 
            type="text" 
            placeholder="write a comment"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <button onClick={handleClick}>Comment</button>
        </div>
      {isLoading
        ? " ... loading " 
        : data.map((comment) =>(

        <div className="comment">
          <img src={comment.profilePic} alt="" />
          <div className="info">
            <span>{comment.name}</span>
            <p>{comment.desc}</p>
          </div>
          <span className="date">
            {moment(comment.created_at).fromNow()}
          </span>
        </div>

        ))
      }

    </div>
  )
}

export default Comments;