// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Room from "./pages/room/Room";
import Admin from "./pages/admin/Admin";
import { AuthProvider } from './auth/authLogin';
import './index.css';
import StudentList from './pages/admin/student-list/StudentList';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/teacher" element={<Room />} />
          <Route path="/student" element={<Room />} />
          {/* <Route path="/student-list" element={<StudentList />} /> */}
          <Route path="/" element={<StudentList />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
