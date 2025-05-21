import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import authService from "../Appwrite/auth";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          setUser(userData);
        } else {
          navigate("/login");
          console.log("User is not logged in");
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const logoutHandler = () => {
    authService.logOut().then(() => {
      navigate("/");
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center pt-8 px-4">
      <div className="w-full max-w-md">
        <h2 className="text-xl font-semibold mb-6">Account Settings</h2>

        <div className="bg-white  min-h-[400px] p-6 rounded-md shadow border border-gray-100">
          <div className="flex items-center space-x-4 mb-4">
            <div className="relative w-16 h-16">
              <img
                src="https://i.imgur.com/OYQJQ1f.jpg"
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
              <div className="absolute bottom-0 right-0 bg-purple-600 rounded-full p-1">
                <FaCamera className="text-white text-xs" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold">{user && user.name}</h3>
              <p className="text-gray-600 text-sm">{user && user.email}</p>
            </div>
          </div>

          <p className="text-gray-700 text-sm leading-relaxed mb-6">
            Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam
            Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam
            Erat, Sed Diam
          </p>

          <button
            onClick={logoutHandler}
            type="submit"
            className="w-full bg-violet-800 text-white py-3 px-3 rounded-lg hover:bg-violet-900 "
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
