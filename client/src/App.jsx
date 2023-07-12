import NavBar from "./components/bars/NavBar";
import LeftBar from "./components/bars/LeftBar";
import RightBar from "./components/bars/RightBar";
import AIRightBar from "./components/bars/AIRightBar";

import Profile from "./pages/profile/Profile";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import BlogPosts from "./pages/blog/BlogPosts";
import BlogPost from "./pages/blog/BlogPost";
import BlogPostNew from "./pages/blog/BlogPostNew";
import BlogCatSearch from "./pages/blog/BlogCatSearch";

import "./style.scss";

import {
createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/authContext";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'


function App() {

  const { currentUser } = useContext(AuthContext);
  
  const { darkMode } = useContext(DarkModeContext);

  const queryClient = new QueryClient();

  const AILayout = () => {
    return(
      <QueryClientProvider client={queryClient}>
        <div className={`theme-${darkMode ? "dark" : "light"}`}>
          <NavBar />
          <div style={{display:"flex"}}>
            {/* <LeftBar /> */}
            {/* <RightBar /> */}
            <div style={{ flex: 6 }}>
              <Outlet />
            </div>
            <AIRightBar />

          </div>
        </div>
      </QueryClientProvider>
    );
  }

  const Layout = () => {
    return(
      <QueryClientProvider client={queryClient}>
        <div className={`theme-${darkMode ? "dark" : "light"}`}>
          <NavBar />
          <div style={{display:"flex"}}>
            <div style={{ flex: 6 }}>
              <Outlet />
            </div>
          </div>
        </div>
      </QueryClientProvider>
    );
  }

  const ProtectedRoute = ({children}) => {
    if (!currentUser) {
      return <Navigate to="/login" />
    }
    return children;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <AILayout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element:<Home />
        },
        {
          path:"/blog/:id",
          element:<BlogPost />
        },
        {
          path:"/blog/new",
          element:<BlogPostNew />
        },
        {
          path:"/blog/category/:cat",
          element:<BlogCatSearch />
        },
      ]
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path:"/blog/",
          element:<BlogPosts />
        },
        {
          path:"/profile/:id",
          element:<Profile />
        },
      ]
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
      <div>
        <RouterProvider router={router} />
      </div>
  )
}

export default App;