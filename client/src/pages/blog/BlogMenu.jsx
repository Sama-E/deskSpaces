import "/src/assets/css/pages/blog/blogMenu.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const BlogMenu = ({cat}) => {
  const [blogPosts, setBlogPosts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8802/api/blogposts?cat=${cat}`);
        setBlogPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);


  return (
    <div className="menu">
      <h1> Other post you might like</h1>
      {blogPosts.map(blogPost => (
        <div className="blogPost" key={blogPost.id}>
          <img src={blogPost.img} alt="" />
          <h2>{blogPost.title}</h2>
          <Link className="link" to={`/blog/${blogPost.id}`}>
            <button>Read More</button>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default BlogMenu;