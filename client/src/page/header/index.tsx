import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HeaderLayout } from "./layout";
import { paths } from "../../schema/paths";

export type UserInfoType =
  paths["/user_data/{code}"]["get"]["responses"]["200"]["content"]["application/json"];

export const Header = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get("code");

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLogin, setIsLogin] = useState<boolean | null>(null);

  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);

  const [value, setValue] = useState<string>("dashboard");

  const navigate = useNavigate();

  const handleTabChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
    navigate(newValue);
  };

  useEffect(() => {
    (async () => {
      if (!code) return;
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_POINT}/user_data/`,
          {
            params: {
              code,
            },
          }
        );
        setUserInfo(response.data);
        setIsLogin(true);
      } catch (error) {
        setIsLogin(false);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [code]);

  useEffect(() => {
    if (!isLoading && !isLogin) {
      navigate("/login");
    }
  }, [isLogin, isLoading]);

  return (
    <HeaderLayout
      value={value}
      handleTabChange={handleTabChange}
      userInfo={userInfo}
    />
  );
};
