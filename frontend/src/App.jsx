// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./auth/Signin";
import DirectorDashboard from "./pages/DirectorDashboard";
import ProjectManagerDashboard from "./pages/ProjectManagerDashboard";
import HrDashboard from "./pages/hr/HrDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PrivateRoute from "./utils/PrivateRoute";
import Layout from "./components/Layout"; // new wrapper
import Footer from "./components/Footer";
import EmployeeAdd from "./pages/director/EmployeeADD";
import AddEmployeeCredentials from "./pages/hr/AddEmployeeCredentials";
import Credentials from "./pages/hr/credentials";
import HrCredentialsAdd from "./pages/director/HrCredentialsAdd";
import AssignCredentials from "./pages/director/AssignCredentials";
import EmployeeDetails from "./pages/hr/employeeDetails";
import PmDetails from "./pages/hr/pmDetails";
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
              <EmployeeAdd/>
            </Layout>
          </PrivateRoute>
        } />
       
       <Route path="/director/HrCredentials" element={
          <PrivateRoute role="Director">
            <Layout>
              <HrCredentialsAdd/>
            </Layout>
          </PrivateRoute>
        } />
        <Route path="/director/assign-credentials/:employeeId" element={
          <PrivateRoute role="Director">
            <Layout>
              <AssignCredentials/>
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
          path="/hr/add-credentials"
          element={
            <PrivateRoute role="HR">
              <Layout>
                <AddEmployeeCredentials />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route 
          path="/hr/employee-records"
          element={
            <PrivateRoute role="HR">
              <Layout>
                <EmployeeDetails />
              </Layout>
            </PrivateRoute>
          }
        />  
          <Route 
          path="/hr/pm-records"
          element={
            <PrivateRoute role="HR">
              <Layout>
                <PmDetails />
              </Layout>
            </PrivateRoute>
          }
        />  
        
                        
        <Route 
          path="/hr/credentials"
          element={
            <PrivateRoute role="HR">
              <Layout>
                <Credentials />
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
