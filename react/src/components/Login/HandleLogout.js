import { saveDataWithExpiration } from "../CookieUtils/SecureLocalStorageExtends";
import TryFetch from "../FetchComponent/FetchComponent";

const HandleLogout = ({ navigate, onLogoutSuccess }) => {
  const logoutFail = (alertString = "로그아웃에 실패했습니다. 다시 시도해주세요.") => {
    alert(alertString);
  };

  TryFetch("logout", "POST", {}, () => {
    saveDataWithExpiration("isLogin", false);
    onLogoutSuccess?.();
    alert("로그아웃 되었습니다.");
    navigate?.("/");
    return;
  }, (error) => {
    console.error("Logout failed with error", error);
    logoutFail();
  });
};

export default HandleLogout;