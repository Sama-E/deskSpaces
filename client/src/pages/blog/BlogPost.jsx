import "/src/assets/css/pages/blog/blogPost.scss";
import BlogMenu from "./BlogMenu";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "src/context/authContext";
import moment from "moment";
import axios from "axios";



const BlogPost = () => {
  const [blogPost, setBlogPost] = useState({})

  const location = useLocation()
  const navigate = useNavigate();

  //Get blogPost from pathname
  const blogPostId = location.pathname.split("/")[2];

  //Current User
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8802/api/blogposts/${blogPostId}`);
        setBlogPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [blogPostId]);

  const handleDelete = async () => {
    
    try {
      await axios.delete(`http://localhost:8802/api/blogposts/${blogPostId}`);
      navigate("/blog")
    } catch (err){
      console.log(err);
    }
  }


  return (
    <div className="blogPost">
      <div className="content">
        <img src={blogPost?.img} />
          <div className="user">
            {/* <img src="https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" /> */}

            <img src={blogPost.profilePic || "/images/noavatar.jpg"}
            alt=""
            />

            <div className="info">
              
              <p>Posted {moment(blogPost.updated_at).fromNow()}</p>
              <p className="userName">{blogPost.firstName} {blogPost.lastName}</p>
            </div>
            {
            currentUser.id === blogPost.userId  && (
            <div className="edit">
              <Link to = "{`write?edit=2`}">
                <ModeEditOutlineOutlinedIcon />
              </Link>
              <Link to = "">
                <DeleteOutlineOutlinedIcon onClick={handleDelete} />
              </Link>
            </div>
            )}
          </div>
          <h1> {blogPost.title} </h1>
          <p className="category"><b>Category:</b> <i>{blogPost.cat}</i></p> 
          <p>
          {blogPost.body}
          </p>
          <p className="tag"><b>Tags: </b><button>{blogPost.tag}</button></p>
        </div>
    <BlogMenu cat={blogPost.cat} />
    </div>
  )
}

export default BlogPost;