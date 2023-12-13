// App.tsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./components/Login/Login";
// import Room from "./pages/room/Room";
import { AuthProvider } from "./auth/AuthContext";
import "./input.scss";
import * as React from 'react';
import AdminProfileSidebar from "./shared/components/navbar/Navbar";
import AuthenticatedRoute from "./auth/AuthenticatedRoute";
import UnAuthenticatedRoute from "./auth/UnAuthenticatedRoute";
import { Toaster} from 'sonner'

// import CssBaseline from '@mui/material/CssBaseline';
import User from "./pages/student/student";

import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
////admin
import StudentList from "./pages/admin/student-list/StudentList";
import ReservedList from "./pages/admin/reserved-list/ReservedList";
import RoomList from "./pages/admin/room-list/RoomList";


const App: React.FC = () => {

  return (
    <CssVarsProvider>
    <CssBaseline />
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
                        <User />
                      </AuthenticatedRoute>
                    }
                  />
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
                    </Route>
                </Routes>
              </AuthProvider>
          <Toaster  richColors expand={true} />
        </Router>
    </CssVarsProvider>
  );
};

export default App;
