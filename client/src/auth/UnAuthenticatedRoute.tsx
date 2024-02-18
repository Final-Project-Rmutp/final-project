import { ReactNode, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const UnAuthenticatedRoute = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const userRole = localStorage.getItem('account_role');
      if (userRole === 'admin') {
        if (location.pathname.startsWith('/admin')) {
          // If already on an admin route, stay there
          return;
        }
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } else if (location.pathname === '/') {
      const loggedInToken = localStorage.getItem('token');
      if (loggedInToken) {
        const loggedInUserRole = localStorage.getItem('account_role');
        if (loggedInUserRole === 'admin') {
          navigate("/admin");
        } else {
          navigate("/user");
        }
      }
    }
  }, [navigate, location]);

  return <div>{!localStorage.getItem('token') ? children : null}</div>;
};

export default UnAuthenticatedRoute;
