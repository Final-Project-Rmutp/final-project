// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Room from "./pages/room/Room";
import { AuthProvider } from './auth/AuthContext';
// import Sidebar from './shared/components/sidebar/Sidebar';
import './input.css';
// import Home from './shared/components/sidebar/Home';
// import Team from './shared/components/sidebar/Team';
// import StudentList from './pages/admin/student-list/StudentList';
import AdminProfileSidebar from './shared/components/navbar/Navbar';
import Sidebar from './shared/components/sidebar/Sidebar';
import Register from './components/Login/Register';
// import StudentList from './pages/admin/student-list/StudentList';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/teacher" element={<Room />} />
          <Route path="/student" element={<Room />} />
          <Route path="/admin" element={<AdminProfileSidebar />} />
          {/* <Route path="/" element={<StudentList />} /> */}
        </Routes>
      </AuthProvider>
    </Router>
    // <Router>
    //     <Sidebar />
    //       <Routes>
    //         <Route path='/' element={<Home />} />
    //         <Route path='/team' element={<Team />} />
    //         <Route path="/student-list" element={<StudentList />} />
    //         </Routes>
    //   </Router> 
  );
}

export default App;
