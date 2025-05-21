import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import HomePage from "./component/HomePage";
import LoginPage from "./component/LoginPage";
import SignupPage from "./component/SignupPage";
import ProfilePage from "./component/ProfilePage";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/signUp", element: <SignupPage /> },
  { path: "/profilePage", element: <ProfilePage /> },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
