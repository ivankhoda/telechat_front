import { useState } from "react";

export const useToken = () => {
  const getToken = () => {
    const tokenString = localStorage.getItem("token");

    if (tokenString) {
      let token = JSON.parse(tokenString);
      return token?.token;
    }
  };
  const getUserId = () => {
    const userId = localStorage.getItem("userid");

    if (userId) {
      let user = JSON.parse(userId);
      return user;
    }
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken: any) => {
    localStorage.setItem("token", JSON.stringify(userToken));
    localStorage.setItem("username", JSON.stringify(userToken.username));
    localStorage.setItem("userid", JSON.stringify(userToken.userId));
    setToken(userToken.data);
  };

  return {
    setToken: saveToken,
    token,
    getToken: getToken,
    getUserId: getUserId,
  };
};
