// App.tsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Login from "./components/Login/Login";
import Room from "./pages/room/Room";
import { AuthProvider } from "./auth/AuthContext";
// import Sidebar from './shared/components/sidebar/Sidebar';
import "./input.scss";

import StudentList from "./pages/admin/student-list/StudentList";
import AdminProfileSidebar from "./shared/components/navbar/Navbar";
import AuthenticatedRoute from "./auth/AuthenticatedRoute";
import UnAuthenticatedRoute from "./auth/UnAuthenticatedRoute";
import { Toaster} from 'sonner'

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <UnAuthenticatedRoute>
                <Login />
              </UnAuthenticatedRoute>
            }
          />

          <Route
            path="/user"
            element={
              <AuthenticatedRoute>
                <Room />
              </AuthenticatedRoute>
            }
          />

          <Route
            path="admin"
            element={
              <AuthenticatedRoute>
                <AdminProfileSidebar></AdminProfileSidebar>
                <Outlet></Outlet>
              </AuthenticatedRoute>
            }
          >
            <Route path="student-list" element={<StudentList />} />
          </Route>
        </Routes>
      </AuthProvider>
      <Toaster  richColors expand={true} />
    </Router>
    
  );
};

export default App;
