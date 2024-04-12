
const HandleLogin = (onAuthSuccess, from, navigate) => {
  console.log(from);
  
  const verifyLogin = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_IP}/verify_login`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
        if (response.status === 200) {
            onAuthSuccess();
        } else {
            alert('로그인이 필요합니다.');
            navigate("/login", { state: { from: from } });
        }
    } catch (error) {
        console.error("Error:", error);
        navigate("/login", { state: { from: from } });
    }
  }
  verifyLogin();
};

export default HandleLogin;