import Stories from "/src/components/stories/Stories";
import Posts from "/src/components/posts/Posts";
import "/src/assets/css/pages/home.scss";
import Share from "../share/share";

const Home = () => {
  return (
    <div className="home">
      <Stories />
      <Share />
      <Posts />
    </div>
  )
}

export default Home;