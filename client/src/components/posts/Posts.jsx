import OnePost from "./OnePost";
import "/src/assets/css/components/posts/posts.scss";

const Posts = () => {

    //TEMPORARY
    const posts = [
      {
        id: 1,
        name: "John Doe",
        userId: 1,
        profilePic:
          "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas assumenda repudiandae molestias repellendus nam dolor magnam ratione recusandae consequuntur? Aliquam temporibus ad ut dolorum magni maxime nostrum a dignissimos earum.",
        img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
      },
      {
        id: 2,
        name: "John Doe",
        userId: 2,
        profilePic:
          "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas assumenda repudiandae molestias repellendus nam dolor magnam ratione recusandae consequuntur? Aliquam temporibus ad ut dolorum magni maxime nostrum a dignissimos earum.",
      },
    ];

  return (
    <div className="posts">
      {posts.map(onePost => (
        <OnePost onePost={onePost} key={onePost.id} />
      ))}
    </div>
  )
}

export default Posts;