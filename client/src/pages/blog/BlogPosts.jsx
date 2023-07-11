import "/src/assets/css/pages/blog/blogPosts.scss";
import { Link, useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";

import { useQuery } from '@tanstack/react-query';
import { makeRequestBlog } from "/services/axios";


const BlogPosts = () => {
  // Category Search
  const cat = useLocation().search;
  
  //Get All Blog posts
  //Via makeRequest to access posts from server
  const { isLoading, error, data } = useQuery(["blogposts"], () => 
    makeRequestBlog.get("/blogposts").then(res => {
      return res.data;
    })
  );

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
          <Link className="link" to="/blog/new">
            <button>New Blog Post</button>
          </Link>
        </div>

        {error ? "Something went wrong!"
        :(isLoading 
        ? "Loading"
        : data.map((blogPost) => (
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
        )))}

      </div>
    </div>
  )
}

export default BlogPosts;