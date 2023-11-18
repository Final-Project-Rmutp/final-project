// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Room from "./pages/room/Room";
import { AuthProvider } from './auth/AuthContext';
import './index.css';
function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/room" element={<Room />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
