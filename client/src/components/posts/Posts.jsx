import Post from "./Post";
import "/src/assets/css/components/posts/posts.scss";
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from "/services/axios";

const Posts = () => {

  //Via makeRequest to access posts from server
  const { isLoading, error, data } = useQuery(["posts"], () => 
    makeRequest.get("/posts").then((res) => {
      return res.data;
    })
  );

  console.log(data)

    // TEMPORARY
    // const posts = [
    //   {
    //     id: 1,
    //     name: "John Doe",
    //     userId: 1,
    //     profilePic:
    //       "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    //     desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas assumenda repudiandae molestias repellendus nam dolor magnam ratione recusandae consequuntur? Aliquam temporibus ad ut dolorum magni maxime nostrum a dignissimos earum.",
    //     img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    //   },
    //   {
    //     id: 2,
    //     name: "John Doe",
    //     userId: 2,
    //     profilePic:
    //       "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    //     desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas assumenda repudiandae molestias repellendus nam dolor magnam ratione recusandae consequuntur? Aliquam temporibus ad ut dolorum magni maxime nostrum a dignissimos earum.",
    //   },
    // ];

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