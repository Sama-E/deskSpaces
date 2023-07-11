import "/src/assets/css/pages/blog/blogPost.scss";
import BlogMenu from "./BlogMenu";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "src/context/authContext";
import moment from "moment";
import axios from "axios";
import { useQuery } from '@tanstack/react-query';
import { makeRequestBlog } from "/services/axios";



const BlogPost = () => {
  const location = useLocation()
  const navigate = useNavigate();

  //Get blogPost from pathname
  const blogPostId = location.pathname.split("/")[2];

  //Current User
  const { currentUser } = useContext(AuthContext);

  // const handleDelete = async () => {
    
  //   try {
  //     await axios.delete(`http://localhost:8802/api/blogposts/${blogPostId}`);
  //     navigate("/blog")
  //   } catch (err){
  //     console.log(err);
  //   }
  // }

  //Get One Blog post
  //Via makeRequest to access posts from server
  const { isLoading, error, data } = useQuery(["blogposts"], () => 
  makeRequestBlog.get(`/blogposts/${blogPostId}`).then(res => {
    return res.data;
  })
);



  return (
    <div className="blogPost">
      <div className="content">
        <img src={data?.img} />
          <div className="user">

            <img src={data.profilePic || "/images/noavatar.jpg"}
            alt=""
            />

            <div className="info">
              
              <p>Posted {moment(data.updated_at).fromNow()}</p>
              <p className="userName">{data.firstName} {data.lastName}</p>
            </div>
            {
            currentUser.id === data.userId  && (
            <div className="edit">
              <Link to = {`/blog/new?edit=2`} state={data}>
                <ModeEditOutlineOutlinedIcon />
              </Link>
              <Link to = "">
                <DeleteOutlineOutlinedIcon />
              </Link>
            </div>
            )}
          </div>
          <h1> {data.title} </h1>
          <p className="category"><b>Category:</b> <i>{data.cat}</i></p> 
          <p>
          {data.body}
          </p>
          <p className="tag"><b>Tags: </b><button>{data.tag}</button></p>
        </div>
      <BlogMenu cat={data.cat} />
    </div>
  )
}

export default BlogPost;