// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Room from "./pages/room/Room";
import Admin from "./pages/admin/Admin";
import { AuthProvider } from './auth/AuthLogin';
import './input.css';
// import StudentList from './pages/admin/student-list/StudentList';
import UserProfileSidebar from './shared/components/navbar/Navbar';
// import StudentList from './pages/admin/student-list/StudentList';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/teacher" element={<Room />} />
          <Route path="/student" element={<Room />} />
          <Route path="/student-list" element={<UserProfileSidebar />} />
          {/* <Route path="/" element={<StudentList />} /> */}
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
