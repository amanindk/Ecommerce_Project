import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Spinners({path = "register"}) {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 &&
      navigate(`/${path}`, {
        state: location.pathname,
      });
    return () => clearInterval(interval);
  }, [count, navigate,location,path]);
  return (
    <>
      <div
        className="d-flex flex-column justify-content-center"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <h1 className="Text-center">Loading....{count} second</h1>
        <div className="spinner-border text-primary " role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
}

export default Spinners;
