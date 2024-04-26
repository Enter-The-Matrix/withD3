import Dashboard from "./pages/Dashboard";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import { useAuthContext } from "./context/AuthContext.jsx";
import { Toaster } from "react-hot-toast";
import ErrorPage from "./pages/ErrorPage.jsx";

function App() {
  const { authUser } = useAuthContext();

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: authUser ? (
        <Navigate to={"/dashboard"} />
      ) : (
        <Navigate to={"/login"} />
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: "/login",
      element: authUser ? <Navigate to={"/"} /> : <Login />,
    },
    {
      path: "/register",
      element: authUser ? <Navigate to={"/"} /> : <Register />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
      children: [
        {
          path: "/dashboard/log",
          element: <Login />,
        },
      ],
    },
  ]);
  console.log("auth:", authUser);

  return (
    <div>
      <Toaster />
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
