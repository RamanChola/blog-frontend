import React from "react";
import Header from "./components/Header";
import Posts from "./components/Posts";
import NewsApi from "./components/NewsApi";
import "./homepage.css"
import axios from "axios"

export const HomePage = () => {
  const [posts,setPosts] = React.useState([])

  React.useEffect(()=>{
    const fetchPosts = async ()=>{
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/posts`)
      setPosts(res.data.posts)
    }
    fetchPosts()
  },[])
  return (
    <>
      <Header />
      <div className="home">
        <Posts  posts={posts}/>
        <NewsApi/>
      </div>
    </>
  );
};
export default HomePage;
