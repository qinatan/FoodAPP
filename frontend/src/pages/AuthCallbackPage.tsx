import { useCreateMyUser } from "@/api/MyUserApi";
import {  useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage = () => {
  
  const navigate = useNavigate(); 
  const {user} = useAuth0(); //destruting property user from useAuth0()
  const {createUser} = useCreateMyUser();
  const hasCreatedUser = useRef(false)

  //parameters of useEffect
  //1. effect function -> contains the code for the side effect you want to perform
  //2. dependency array: if any of the dependencies change between renders, the effect function will be re-executed
  useEffect(() => {
    if (user?.sub && user?.email && !hasCreatedUser.current) {
      createUser({ auth0Id: user.sub, email: user.email });
      hasCreatedUser.current = true;
    }
    navigate("/");
  }, [createUser, navigate, user]);
  return <>Loading</>
};

export default AuthCallbackPage;