// App.tsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./components/Login/Login";
import { AuthProvider } from "./auth/AuthContext";
import "./input.scss";
import * as React from 'react';
import AdminProfileSidebar from "./shared/components/navbar/Navbar";
import AuthenticatedRoute from "./auth/AuthenticatedRoute";
import UnAuthenticatedRoute from "./auth/UnAuthenticatedRoute";
import { Toaster} from 'sonner'

// import CssBaseline from '@mui/material/CssBaseline';
import Classroom from "./pages/user/classroom/Classroom";

////user 
import UserProfileSidebar from "./shared/components/navbar-user/UserNavbar";
import Room from "./pages/user/room/Reservation";


////admin
import StudentList from "./pages/admin/student-list/StudentList";
import ReservedList from "./pages/admin/reserved-list/ReservedList";
import RoomList from "./pages/admin/room-list/RoomList";
import ReportList from "./pages/admin/report-list/ReportList";
import AdminDashBoard from "./pages/admin/dashboard/Dashboard";



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
                    <UserProfileSidebar />
                  </AuthenticatedRoute>
                }
              >
                <Route path="room-user" element={<Room />} />
              </Route>
              <Route
                path="admin"
                element={
                  <AuthenticatedRoute>
                    <AdminProfileSidebar></AdminProfileSidebar>
                  </AuthenticatedRoute>
                }
              >
                <Route path="student-list" element={<StudentList />} />
                <Route path="reserved-list" element={<ReservedList />} />
                <Route path="room-list" element={<RoomList />} />
                <Route path="classroom-list" element={<Classroom />} />
                <Route path="report-list" element={<ReportList />} />
                <Route path="dashboard" element={<AdminDashBoard />} />
              </Route>
            </Routes>
          </AuthProvider>
          <Toaster  richColors expand={true} />
        </Router>

  );
};

export default App;
