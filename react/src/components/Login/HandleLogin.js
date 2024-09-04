import TryFetch from "../FetchComponent/FetchComponent.js";
import { saveUserData, loadUserData, clearUserData } from "../CookieUtils/SecureLocalStorageExtends.js";

const HandleLogin = ({ assertLogin, navigate, toWhere, onLoginSuccess }) => {
  const isLogin = loadUserData("isLogin");
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
      // TODO: consider using more valid ways for expiration
      // basically, expires_in is valid session time in seconds
      // with considering 10 seconds for network delay, we set expires_in - 10
      const expires_in = data.expires_in - 10;
      saveUserData("isLogin", true, expires_in);
      saveUserData("name", data.name);
      onLoginSuccess?.();
      navigate?.(toWhere);
    } else {
      clearUserData();
      loginFail("로그인이 만료되었습니다. 다시 로그인해주세요.");
    }
  }, (error) => {loginFail()});
};

export default HandleLogin;
