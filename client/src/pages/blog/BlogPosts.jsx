import "/src/assets/css/pages/blog/blogPosts.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from '@tanstack/react-query';
import { makeRequestBlog } from "/services/axios";
import { useState } from "react";

const BlogPosts = () => {

  const Categories = [
    {
      id: 1,
      name: "technology",
      title:"Technology",
    },
    {
      id: 2,
      name: "news",
      title:"News",
    },
    {
      id: 3,
      name: "business",
      title:"Business",
    },
    {
      id: 4,
      name: "food",
      title:"Food",
    },
    {
      id: 5,
      name: "science",
      title:"Science",
    },
  ]
  
  //Get All Blog posts
  //Via makeRequest to access posts from server
  const { isLoading, error, data } = useQuery({
    queryKey: ['blogposts'], 
    queryFn: () => 
      makeRequestBlog.get("/blogposts")
      .then(res => {
        return res.data;
      }),
  });


  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  return (
    <div className="blog">
      <div className="blogPosts">
        <div className="categories">
        {Categories.map(category => (
            <div className="cat">
              <Link className="link" to={`/blog/category/${category.name}`}>
                <button
                  key={category.id} 
                  value={category.title}
                >
                  {category.title}
                </button>
              </Link>
            </div>
          ))}
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
              <img src={"/upload/" + blogPost.img} alt="" />
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

export default BlogPosts;