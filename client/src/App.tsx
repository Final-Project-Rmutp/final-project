// App.tsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Login from "./components/Login/Login";
// import Room from "./pages/room/Room";
import { AuthProvider } from "./auth/AuthContext";
import "./input.scss";

import AdminProfileSidebar from "./shared/components/navbar/Navbar";
import AuthenticatedRoute from "./auth/AuthenticatedRoute";
import UnAuthenticatedRoute from "./auth/UnAuthenticatedRoute";
import { Toaster} from 'sonner'
import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID} from '@mui/material/styles';
import { CssVarsProvider as JoyCssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/material/CssBaseline';
import User from "./pages/student/student";


////admin
import StudentList from "./pages/admin/student-list/StudentList";
import ReservedList from "./pages/admin/reserved-list/ReservedList";

const materialTheme = materialExtendTheme();
const App: React.FC = () => {
  return (
    <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
    <JoyCssVarsProvider>
      <CssBaseline enableColorScheme />
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
                  <Outlet></Outlet>
                </AuthenticatedRoute>
              }
            >
              <Route path="student-list" element={<StudentList />} />
              <Route path="reserved-list" element={<ReservedList />} />
            </Route>
          </Routes>
        </AuthProvider>
        <Toaster  richColors expand={true} />
      </Router>
    </JoyCssVarsProvider>
    </MaterialCssVarsProvider>
  );
};

export default App;
