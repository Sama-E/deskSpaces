import NavBar from "./components/bars/NavBar";
import LeftBar from "./components/bars/LeftBar";
import RightBar from "./components/bars/RightBar";

import Profile from "./pages/profile/Profile";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";

function App() {

  const currentUser = false;

  const Layout = () => {
    return(
      <div>
        <NavBar />
        <div style={{display:"flex"}}>
          <LeftBar />
          <Outlet />
          <RightBar />

        </div>
      </div>
    )
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
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element:<Home />
        },
        {
          path:"/profile/:id",
          element:<Profile />
        }
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