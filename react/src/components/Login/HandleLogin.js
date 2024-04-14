import secureLocalStorage from "react-secure-storage";

const HandleLogin = (onAuthSuccess, from, navigate) => {
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
            const resp_data = await response.json();
            for (let key in resp_data) {
                secureLocalStorage.setItem(key, resp_data[key]);
            }
            onAuthSuccess();
        } else {
            secureLocalStorage.clear();
            if (navigate !== undefined) {
              alert('로그인이 필요합니다.');
              navigate("/login", { state: { from: from } });
            } else if (from !== undefined) {
              alert('로그인이 필요합니다.');
              window.location.replace("/login?from=" + from);
            }
        }
    } catch (error) {
        console.error("Error:", error);
        if (navigate !== undefined) navigate("/login", { state: { from: from } });
    }
  }
  verifyLogin();
};

export default HandleLogin;
