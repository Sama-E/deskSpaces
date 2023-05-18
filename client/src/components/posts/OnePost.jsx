import "/src/assets/css/components/posts/onePost.scss";
import Comments from "../comments/Comments";

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { Link } from "react-router-dom";
import { useState } from "react";

const OnePost = ({onePost}) => {
  const [commentOpen, setCommentOpen] = useState(false)

  //Temporary
  const liked = true;


  return (
    <div className="one_post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={onePost.profilePic} alt="" />
            <div className="details">
              <Link to={`/profile/${onePost.userId}`} style={{textDecoration:"none", color:"inherit"}}>
                <span className="name">{onePost.name}</span>
              </Link>
                <span className="date"> 1 min ago</span>
            </div>
          </div>
          <MoreHorizIcon />
        </div>
        <div className="content">
          <p>{onePost.desc}</p>
          <img src={onePost.img} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
            12 likes
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
        { commentOpen && <Comments /> }
      </div>
    </div>
  )
}

export default OnePost;