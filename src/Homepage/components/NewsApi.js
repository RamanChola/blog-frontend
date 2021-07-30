import React, { useEffect, useReducer } from "react";
import axios from "axios";
import NewsCard from "./NewsSideBar";
function reducer(posts, action) {
  switch (action.type) {
    case "SET_TITLE":
      return { ...posts, title: action.value };
    case "SET_DESCRIPTION":
      return { ...posts, description: action.value };
    case "SET_IMG":
      return { ...posts, img: action.value };
    case "SET_DATE":
      return { ...posts, date: action.value };
    default:
      throw new Error();
  }
}

function NewsApi() {
  const [posts, setPosts] = useReducer(reducer, {
    title: [],
    description: [],
    img: [],
    date: [],
  });
  useEffect(() => {
    let unmounted = false;
    async function searchNews() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/news/`)
        if (!unmounted) {
          const Data = await response.data;
          setPosts({
            type: "SET_TITLE",
            value: Data.map((it) => it.title),
          });
          setPosts({
            type: "SET_DESCRIPTION",
            value: Data.map((it) => it.description),
          });
          setPosts({
            type: "SET_IMG",
            value: Data.map((it) => it.image.url),
          });
          setPosts({
            type: "SET_DATE",
            value: Data.map((it) => it.datePublished.substring(0, 10)),
          });
        }
      } catch (err) {
        if (!unmounted) {
          console.error(err);
        }
      }
    }
    searchNews();
    return () => {
      unmounted = true;
    };
  }, []);
  return <NewsCard posts={posts} />;
}
export default NewsApi;
