import React from 'react';

function Home() {
  const ReactRouterDom = require('react-router-dom');
  const { useNavigate } = ReactRouterDom;
  const navigate = useNavigate();

  const { useState, useEffect } = require('react');
  const [username, setUsername] = useState("");

  const { useCookies } = require('react-cookie');
  const [cookies, removeCookie] = useCookies([]);

  const axios = require('axios');
  const { ToastContainer, toast } = require('react-toastify');

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      try {
        const { data } = await axios.post(
          "http://localhost:3000",
          {},
          { withCredentials: true }
        );
        const { status, user } = data;
        setUsername(user);
        if (status) {
          toast(`Hello ${user}`, {
            position: "top-right",
          });
        } else {
          removeCookie("token");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error verifying cookie", error);
        removeCookie("token");
        navigate("/login");
      }
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  const Logout = () => {
    removeCookie("token");
    navigate("/signup");
  };

  return (
    <>
      <div className="home_page">
        <h4>
          Welcome <span>{username}</span>
        </h4>
        <button onClick={Logout}>LOGOUT</button>
      </div>
      <ToastContainer />
    </>
  );
}

export default Home;
