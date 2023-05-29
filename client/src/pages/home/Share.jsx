import "/src/assets/css/components/posts/share.scss";
import Image from "/src/assets/images/img.png";
import Map from "../../assets/images/map.png";
import Friend from "../../assets/images/friend.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "/services/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Share = () => {

  //Image files
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");

  //Upload Image files
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file)
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err)
    }
  }


  const {currentUser} = useContext(AuthContext)

  //Fetching client for posts
  const queryClient = useQueryClient()
  //Mutation updates new posts
  const mutation = useMutation(
    (newPost) =>{
      return makeRequest.post("/posts", newPost);
    }, {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"])
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl ="";
    if (file) imgUrl = await upload();
    mutation.mutate({desc, img: imgUrl});
    setDesc("");
    setFile(null);
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <img
              src={currentUser.profilePic}
              alt=""
              />
            <input 
              type="text" 
              placeholder={`What's on your mind ${currentUser.name}?`} 
              onChange={(e)=>setDesc(e.target.value)}
              value={desc}
              />
          </div>
          <div className="right">
            {file && <img className="file" alt="" src={URL.createObjectURL(file)} />}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input 
              type="file" 
              id="file" 
              style={{display:"none"}}  
              onChange={(e)=>setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;