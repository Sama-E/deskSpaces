import Post from "./Post";
import "/src/assets/css/components/posts/posts.scss";
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from "/services/axios";

const Posts = ({userId}) => {

  //Via makeRequest to access posts from server
  const { isLoading, error, data } = useQuery(["posts"], () => 
    makeRequest.get("/posts?userId=" + userId).then((res) => {
      return res.data;
    })
  );

  return (
    <div className="posts">
      {error 
        ? "Something is wrong..." 
        : isLoading
        ? " ... loading " 
        : data.map(post => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
};

export default Posts;