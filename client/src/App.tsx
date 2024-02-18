// App.tsx
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import './input.scss';
import AdminProfileSidebar from './shared/components/navbar/Navbar';
import AuthenticatedRoute from './auth/AuthenticatedRoute';
import UnAuthenticatedRoute from './auth/UnAuthenticatedRoute';
import { Toaster } from 'sonner';

// import CssBaseline from '@mui/material/CssBaseline';

////user
const UserProfileSidebar = lazy(() => import('./shared/components/navbar-user/UserNavbar'));
const Reservation = lazy(() => import('./pages/user/room/Reservation'));
const UserReportList = lazy(() => import('./pages/user/report/UserReport'));
const ReservationStatus = lazy(() => import('./pages/user/status/Status'));
const Classroom = lazy(() => import('./pages/user/classroom/Classroom'));

////admin
const StudentList = lazy(() => import('./pages/admin/student-list/StudentList'));
const ReservedList = lazy(() => import('./pages/admin/reserved-list/ReservedList'));
const RoomList = lazy(() => import('./pages/admin/room-list/RoomList'));
const ReportList = lazy(() => import('./pages/admin/report-list/ReportList'));
const AdminDashBoard = lazy(() => import('./pages/admin/dashboard/Dashboard'));
const SubjectList = lazy(() => import('./pages/admin/subject/SubjectList'));
const ClassRoomAdmin = lazy(() => import('./pages/admin/class-room/ClassroomAdmin'));
const Login = lazy(() => import('./components/Login/Login'));
import Preloader from './components/Login/Preloader';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <UnAuthenticatedRoute>
                <Suspense fallback={<Preloader/>}>
                  <Login />
                </Suspense>
              </UnAuthenticatedRoute>
            }
          />

          <Route
            path="/user"
            element={
              <AuthenticatedRoute>
                <Suspense fallback={<Preloader/>}>
                  <UserProfileSidebar />
                </Suspense>
              </AuthenticatedRoute>
            }
          >
            <Route path="room-user" element={<Reservation />} />
            <Route path="report-user" element={<UserReportList />} />
            <Route path="status-user" element={<ReservationStatus />} />
            <Route path="classroom-user" element={<Classroom />} />
          </Route>
          <Route
            path="admin"
            element={
              <AuthenticatedRoute>
                <Suspense fallback={<Preloader/>}>
                  <AdminProfileSidebar />
                </Suspense>
              </AuthenticatedRoute>
            }
          >
            <Route path="student-list" element={<StudentList />} />
            <Route path="reserved-list" element={<ReservedList />} />
            <Route path="room-list" element={<RoomList />} />
            <Route path="classroom-list" element={<ClassRoomAdmin />} />
            <Route path="report-list" element={<ReportList />} />
            <Route path="dashboard" element={<AdminDashBoard />} />
            <Route path="subject-list" element={<SubjectList />} />
          </Route>
        </Routes>
      </AuthProvider>
      <Toaster richColors expand={true} />
    </Router>
  );
};

export default App;
