import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const AuthenticatedRoute = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();


  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate("/");
    }
  }, [navigate]);

  return  localStorage.getItem('token') ? children : null;
};

export default AuthenticatedRoute;