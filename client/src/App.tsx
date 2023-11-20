// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Room from "./pages/room/Room";
import Admin from "./pages/admin/Admin";
import { AuthProvider } from './auth/AuthLogin';
import './index.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/teacher" element={<Room />} />
          <Route path="/student" element={<Room />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
