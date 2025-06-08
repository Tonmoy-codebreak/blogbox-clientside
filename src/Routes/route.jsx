import {
  createBrowserRouter,
} from "react-router";
import MainLayout from "../Layouts/MainLayout";
import HomePage from "../Pages/HomePage";
import AllBlogs from "../Pages/AllBlogs";
import FeaturedBlogs from "../Pages/FeaturedBlogs";
import AddBlogs from "../Pages/AddBlogs";
import WishList from "../Pages/WishList";
import AuthLayout from "../Layouts/AuthLayout";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import PrivateRoute from "./PrivateRoute";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
        {
             path: "/",
            element: <HomePage></HomePage>
        },
        {
          path:"/allblogs",
          element: <AllBlogs></AllBlogs>
        },
        {
          path:"/featuredblogs",
          element: <FeaturedBlogs></FeaturedBlogs>
        },
        {
          path:"/addblogs",
          element: <PrivateRoute>
                <AddBlogs></AddBlogs>
          </PrivateRoute>
          
          
        },
        {
          path:"/wishlist",
          element: 
            <PrivateRoute>
              <WishList></WishList>
            </PrivateRoute>
         
        },
    ]
  },
  {
    path: "/auth",
    element: <AuthLayout></AuthLayout>,
    children:[
      {
        path: "/auth/login",
        element: <LoginPage></LoginPage>,
      },
      {
        path: "/auth/register",
        element: <RegisterPage></RegisterPage>,
      },
    ]
  }
]);

export default router