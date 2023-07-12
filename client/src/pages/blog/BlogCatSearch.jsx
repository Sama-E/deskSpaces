import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { makeRequestBlog } from '/services/axios';


const BlogCatSearch = ({cat}) => {

  //Get All Blog posts
  //Via makeRequest to access posts from server
  const { isLoading, error, data } = useQuery({
    queryKey: ['blogposts'], 
    queryFn: () => 
      makeRequestBlog.get(`/blogposts?cat=${cat}`)
      .then(res => {
        return res.data;
      }),
  });
  console.log(cat)
  console.log(data)


  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }
  
  
    return (
      <div className="blog">
      <div className="blogPosts">
        <div className="categories">
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
              <img src={`../upload/${blogPost.img}`} alt="" />
            </div>
            <div className="content">
              <Link className="link" to={`/blog/${blogPost.id}`}>
                <h1>{blogPost.title}</h1>
                  <p className="category"><b>Category:</b> <i>{blogPost.cat}</i></p> 

                  <p>
                    {getText(blogPost.body)}
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
  
export default BlogCatSearch;