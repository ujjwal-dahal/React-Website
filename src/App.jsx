import React, { useState, useEffect, createContext } from "react";
import About from "./Components/Website/About";
import Services from "./Components/Website/Services";
import Contact from "./Components/Website/Contact";
import Home from "./Components/Website/Home";
import Layout from "./Components/Website/Layout";
import Privacy from "./Components/Website/Privacy";
import Terms from "./Components/Website/Terms";
import Error from "./Components/Website/Error";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PostData from "./Components/Axios/PostData";
import CrudApi from "./API/components/CrudApi";
import SignupPage from "./Components/Authentication/SignupPage";
import LoginPage from "./Components/Authentication/LoginPage";
import CountryList from "./Components/TechNews/CountryList";
import Sorting from "./Components/Sorting/Sorting";
import { ToastContainer } from "react-toastify";
import "../node_modules/react-toastify/dist/ReactToastify.css"

export const myContext = createContext();

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [localData, setLocalData] = useState([]);

  let darkModeFromLocal = JSON.parse(localStorage.getItem("darkMode"));

  let [isDark, setIsDark] = useState(darkModeFromLocal);

  let [isAscending, setIsAscending] = useState(false);
  let [isClickedOrder , setIsClickedOrder] = useState(false)

  // Fetch the localStorage data when the component mounts
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("signupData"));
    if (storedData) {
      setLocalData(storedData);
    }
  }, []);

  let myRouter = createBrowserRouter([
    {
      path: "/",
      element: (
        <myContext.Provider value={{ isLogin, setIsLogin, isDark, setIsDark,isAscending, setIsAscending , isClickedOrder , setIsClickedOrder}}>
          <Layout />
        </myContext.Provider>
      ),
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
        {
          path: "services",
          element: <Services />,
        },
        {
          path: "privacy",
          element: <Privacy />,
        },
        {
          path: "terms",
          element: <Terms />,
        },
        {
          path: "country",
          element: <CountryList isDark={isDark} isAscending={isAscending} setIsAscending={setIsAscending}isClickedOrder={isClickedOrder} setIsClickedOrder={setIsClickedOrder}  />,
        },
        {
          path: "/postdata",
          element: <PostData />,
        },
        {
          path: "/crud",
          element: <CrudApi />,
        },
        {
          path: "/signup",
          element: <SignupPage />,
        },
        {
          path: "/login",
          element: (
            <myContext.Provider value={{ setIsLogin, localData }}>
              <LoginPage />
            </myContext.Provider>
          ),
        },
        {
          path: "/logout",
          element: <Home />,
        },
        {
          path: "*",
          element: <Error />,
        },
      ],
    },
  ]);

  return (
    <>
    <ToastContainer />
      <RouterProvider router={myRouter} />
    </>
  );
}

export default App;
