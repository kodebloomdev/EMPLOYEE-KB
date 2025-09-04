// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./auth/Signin";
import DirectorDashboard from "./pages/DirectorDashboard";
import ProjectManagerDashboard from "./pages/ProjectManagerDashboard";
import HrDashboard from "./pages/HrDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PrivateRoute from "./utils/PrivateRoute";
import Layout from "./components/Layout"; // new wrapper
import Footer from "./components/Footer";
import EmployeeAdd from "./pages/director/EmployeeADD";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Signin />} />

        {/* Protected Routes with Layout */}
        <Route
          path="/director"
          element={
            <PrivateRoute role="Director">
              <Layout>
                <DirectorDashboard />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route path="/director/create-employee" element={
          <PrivateRoute role="Director">
            <Layout>
              <EmployeeADD />
            </Layout>
          </PrivateRoute>
        } />
        <Route
          path="/projectmanager"
          element={
            <PrivateRoute role="ProjectManager">
              <Layout>
                <ProjectManagerDashboard />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/hr"
          element={
            <PrivateRoute role="HR">
              <Layout>
                <HrDashboard />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/employee"
          element={
            <PrivateRoute role="Employee">
              <Layout>
                <EmployeeDashboard />
              </Layout>
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
