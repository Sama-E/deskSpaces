import "/src/assets/css/pages/blog/blogPosts.scss";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


// const blogPosts = [
//     {
//       id: 1,
//       title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
//       desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
//       img: "https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     },
//     {
//       id: 2,
//       title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
//       desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
//       img: "https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     },
//     {
//       id: 3,
//       title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
//       desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
//       img: "https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     },
//     {
//       id: 4,
//       title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
//       desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
//       img: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     },
//   ];

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