// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Room from "./pages/room/Room";
import { AuthProvider } from './auth/AuthContext';
// import Sidebar from './shared/components/sidebar/Sidebar';
import './input.scss';
// import Home from './shared/components/sidebar/Home';
// import Team from './shared/components/sidebar/Team';
// import StudentList from './pages/admin/student-list/StudentList';
import AdminProfileSidebar from './shared/components/navbar/Navbar';
import Sidebar from './shared/components/sidebar/Sidebar';
import AuthenticatedRoute from './auth/authCore';
import UnAuthenticatedRoute from './auth/authFetch';
// import StudentList from './pages/admin/student-list/StudentList';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={
          <UnAuthenticatedRoute>
          <Login />
          </UnAuthenticatedRoute>
            } />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/teacher" element={<Room />} />
          <Route path="/student" element={<Room />} />
            <Route path="/admin" element={ 
              <AuthenticatedRoute>
                <AdminProfileSidebar />
              </AuthenticatedRoute>
            } />
        </Routes>
      </AuthProvider>
    </Router>

  );
}

export default App;
