import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LinearProgress from "@material-ui/core/LinearProgress";
import NavBar from "./Navigation/AppBar";
import {Footer} from "./Footer/Footer"
import "./App.css";
import { AuthContext } from "./Auth/auth-context";
import { useAuth } from "./hooks/auth-hook";
const HomePage = React.lazy(() => import("./Homepage/Homepage"));
const MyBlogs = React.lazy(() => import("./MyBlogs/MyBlogs"));
const AddBlog = React.lazy(() => import("./AddBlog/AddBlog"));
const Auth = React.lazy(() => import("./Auth/Auth"));
const Profile = React.lazy(() => import("./User/Profile"));
const PostPageFull = React.lazy(() => import("./PostPageFull/PostPageFull"));
const EditPost = React.lazy(() => import("./PostPageFull/EditPost"));
const NewsPageFull = React.lazy(() => import("./NewsPageFull/NewsPageFull"));
const UserProfile = React.lazy(() => import("./User/UserProfile"));
function App() {
  const { isLoggedIn, token, login, logout, userId } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        userId: userId,
        token: token,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <NavBar />
        <Suspense
          fallback={
            <div>
              <LinearProgress color="secondary" />
            </div>
          }
        >
          <Switch>
            {isLoggedIn && (
              <Route path="/myblogs">
                <MyBlogs />
              </Route>
            )}
            {isLoggedIn && (
              <Route path="/addblog">
                <AddBlog />
              </Route>
            )}
            <Route path="/auth">
              <Auth />
            </Route>
            {isLoggedIn && (
              <Route path="/user/" exact>
                <Profile />
              </Route>
            )}
            {isLoggedIn && (
              <Route path="/place/:pid">
                <EditPost />
              </Route>
            )}
            <Route path="/api/news" exact>
              <NewsPageFull />
            </Route>
            <Route path="/post/:pid">
              <PostPageFull />
            </Route>
            <Route path="/user/:uid">
              <UserProfile />
            </Route>
            <Route path="/" exact>
              <HomePage />
            </Route>
          </Switch>
        </Suspense>
        <Footer/>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
