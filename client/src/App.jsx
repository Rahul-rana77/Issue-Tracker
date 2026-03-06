import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import SubmitIssue from './pages/SubmitIssue.jsx'
import IssueDetails from './pages/IssueDetails.jsx'
import Login from './pages/Login.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import AdminIssueDetails from './pages/AdminIssueDetails.jsx'
import SignUp from './pages/SignUp.jsx'
import SignupAdmin from './pages/SignupAdmin.jsx'
import ErrorPage from './pages/ErrorPage.jsx'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/submit" element={<SubmitIssue />} />
        <Route path="/issue/:id" element={<IssueDetails />} />
        <Route path="/" element={<Login />} />
        <Route path="/user/register" element={<SignUp />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<SignupAdmin />} />
        <Route path="/issue/admin/:id" element={<AdminIssueDetails />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
