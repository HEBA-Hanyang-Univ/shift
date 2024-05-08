import TryFetch from "../FetchComponent/FetchComponent.js";
import { saveDataWithExpiration, loadDataWithExpiration } from "../CookieUtils/SecureLocalStorageExtends.js";
import secureLocalStorage from "react-secure-storage";

const HandleLogin = ({ assertLogin, navigate, toWhere, onLoginSuccess }) => {
  const isLogin = loadDataWithExpiration("isLogin");
  if (isLogin) {
    onLoginSuccess?.();
    navigate?.(toWhere);
    return;
  }

  const loginFail = (alertString = "로그인이 필요합니다.") => {
    if (assertLogin) {
      alert(alertString);
      if (navigate) {
        navigate("/login", { state: { from: toWhere } });
      } else {
        window.location.href = "/login";
      }
    }
  };

  TryFetch("verify_login", "GET", {}, (data) => {
    if (data.expires_in && data.expires_in > 60) {
      // TODO: consider using more valid times for expiration
      // basically, expires_in is valid session time in seconds
      const expires_in = Math.floor(data.expires_in/60);
      saveDataWithExpiration("isLogin", true, expires_in);
      saveDataWithExpiration("name", data.name, expires_in);
      onLoginSuccess?.();
      navigate?.(toWhere);
    } else {
      secureLocalStorage.clear();
      loginFail("로그인이 만료되었습니다. 다시 로그인해주세요.");
    }
  }, (error) => {loginFail()});
};

export default HandleLogin;
