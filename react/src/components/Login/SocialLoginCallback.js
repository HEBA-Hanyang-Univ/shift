import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SocialLoginCallback = () => {
  const navigate = useNavigate();

  const urlParams = new URLSearchParams(window.location.search);
    
  const code = urlParams.get('code');
  const error = urlParams.get('error');
  const error_description = urlParams.get('error_description');
  const state = urlParams.get('state');

  const data = {};
  if (code) { data.code = code;}
  if (error) { data.error = error; }
  if (error_description) { data.error_description = error_description; }

  const verifyLogin = async () => {
    console.log(data);
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_IP}/kakao_callback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });
      console.log(response);
      if (response.status === 200) {
        navigate(state);
      } else {
        alert('Failed to login. Please try again.');
        navigate("/login",  { state: { from: state } });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  
  useEffect(() => {
    console.log("useEffect called");
    verifyLogin();
  }, []);

  return null; // This component does not render anything
};

export default SocialLoginCallback;