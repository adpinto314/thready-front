import { Routes, Route, Navigate } from "react-router-dom";
import "./global.css";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { AuthContextComponent } from "./contexts/authContext";
import { Profile } from "./pages/Profile";
import { Settings } from "./pages/Settings";
import { ErrorPage } from "./pages/ErrorPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { CreateThread } from "./pages/CreateThread";
import { ViewThreadsOfUser } from "./pages/ViewThreadsOfUser";
import { ViewSingleThread } from "./pages/ViewSingleThread";

function App() {
  return (
    <>
      <AuthContextComponent>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={<ProtectedRoute component={Profile} />}
          />

          <Route
            path="/create"
            element={<ProtectedRoute component={CreateThread}/>}
          />

          <Route path="/settings" element={<Settings />} />

          <Route path="view/:id" element={<ViewThreadsOfUser/>}></Route>

          <Route path="thread/:id" element={<ViewSingleThread/>}></Route>


          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </AuthContextComponent>
    </>
  );
}

export default App;
