import "/src/assets/css/pages/blog/blogPost.scss";

const BlogPost = () => {
  return (
    <div className="blogPost">
      <div className="content">
        <img src="https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
          <div className="user">
            <img src="https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
            <div className="info">
              <p>John</p>
              <p>Posted 2 days ago</p>
            </div>
          </div>
        </div>
        <div className="menu">
          M
        </div>
    </div>
  )
}

export default BlogPost;