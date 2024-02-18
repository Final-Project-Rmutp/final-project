import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UnAuthenticatedRoute = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      return;
    }

    navigate("/");
  }, [navigate]);

  return  !localStorage.getItem('token') ? children : null;

};

export default UnAuthenticatedRoute;
