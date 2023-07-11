import "/src/assets/css/pages/blog/blogPosts.scss";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


const BlogPosts = () => {
  const [blogPosts, setBlogPosts] = useState([])

  const cat = useLocation().search

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8802/api/blogposts${cat}`);
        setBlogPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);


  return (
    <div className="blog">
      <div className="blogPosts">

        <div className="categories">
          <Link className="link" to="/blog?cat=Technology">
            <button>Technology</button>
          </Link>
          <Link className="link" to="/blog?cat=News">
            <button>News</button>
          </Link>
          <Link className="link" to="/blog?cat=Science">
            <button>Science</button>
          </Link>
        </div>

        {blogPosts.map((blogPost) => (
          <div className="blogPost" key={blogPost.id}>
            <div className="img">
              <img src={blogPost.img} alt="" />
            </div>
            <div className="content">
              <Link className="link" to={`/blog/${blogPost.id}`}>
                <h1>{blogPost.title}</h1>
                  <p className="category"><b>Category:</b> <i>{blogPost.cat}</i></p> 
                <p>
                  {blogPost.body}
                </p>
                <p className="tag"><b>Tags: </b><button>{blogPost.tag}</button></p>
                <button>Read More</button>
              </Link>
            </div>
            <hr />
          </div>
        ))}

      </div>
    </div>
  )
}

export default BlogPosts;