import "/src/assets/css/components/posts/onePost.scss";
import Comments from "../comments/Comments";

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from "/services/axios";
import moment from "moment";
import { AuthContext } from "src/context/authContext";

const Post = ({post}) => {
  const [commentOpen, setCommentOpen] = useState(false)

  const { currentUser } = useContext(AuthContext);

  //Likes
  //Issue: TypeError for data when using data.length
  //Solution: Add a check first to confirm data then process data.length
  //(data && data.length)
  const { isLoading, error, data } = useQuery(["likes", post.id], () => 
    makeRequest.get("/likes?postId=" + post.id).then((res) => {
      return res.data;
    })
  );

  console.log(data);



  return (
    <div className="one_post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post.profilePic} alt="" />
            <div className="details">
              <Link to={`/profile/${post.userId}`} style={{textDecoration:"none", color:"inherit"}}>
                <span className="name">{post.name}</span>
              </Link>
                <span className="date"> {moment(post.created_at).fromNow()}</span>
            </div>
          </div>
          <MoreHorizIcon />
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={"./upload/" + post.img} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {data && data.includes(currentUser.id) ? (
              <FavoriteOutlinedIcon style={{color:'red'}} />
              ) : (
              <FavoriteBorderOutlinedIcon /> 
            )}
            { data && data.length } likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            12 Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        { commentOpen && <Comments postId={post.id} /> }
      </div>
    </div>
  )
};

export default Post;