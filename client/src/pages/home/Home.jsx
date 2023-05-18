import Stories from "/src/components/stories/Stories";
import Posts from "/src/components/posts/Posts";
import "/src/assets/css/pages/home.scss";

const Home = () => {
  return (
    <div className="home">
      <Stories />
      <Posts />
    </div>
  )
}

export default Home;