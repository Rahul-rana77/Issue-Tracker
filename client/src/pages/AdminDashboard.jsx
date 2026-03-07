import Navbar from '../components/Navbar.jsx'
import '../styles/admin.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import IssueListAdmin from '../components/IssueListAdmin.jsx'

function AdminDashboard() {
  const [issues, setIssues] = useState([])
  const { id } = useParams()

  const fetchIssues = async () => {
    try {

      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/issue`, {
        withCredentials: true
      })

      setIssues(res.data.issues)

    } catch (error) {
      console.error("Error fetching issues:", error)
    }
  }

  useEffect(() => {
    fetchIssues()
  }, [])

  const onUpdateStatus = async (status) => {
    try {

      const formData = new FormData()
      formData.append("status", status)

      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/issue/update-status/${id}`,
        formData
      )

      console.log(res.data)

      // update UI after status change
      setIssues((prev) =>
        prev.map((issue) =>
          issue.id === id ? { ...issue, status } : issue
        )
      )

    } catch (error) {
      console.error("Error updating status:", error)
    }
  }

  const solvedCount = issues.filter((i) => i.status === 'Solved').length
  const workingCount = issues.filter((i) => i.status === 'Working').length
  const pendingCount = issues.filter((i) => i.status === 'Yet to Work').length

  return (
    <div className="page">
      <Navbar variant="admin" />
      <main className="container">
        <div className="admin-header">
          <h1 className="admin-title">Admin Dashboard</h1>
          <p className="admin-subtitle">Manage and update issue statuses</p>
        </div>

        <div className="admin-stats">
          <div className="admin-stat">
            <span className="admin-stat-number">{issues.length}</span>
            <span className="admin-stat-label">Total</span>
          </div>
          <div className="admin-stat admin-stat-solved">
            <span className="admin-stat-number">{solvedCount}</span>
            <span className="admin-stat-label">Solved</span>
          </div>
          <div className="admin-stat admin-stat-working">
            <span className="admin-stat-number">{workingCount}</span>
            <span className="admin-stat-label">Working</span>
          </div>
          <div className="admin-stat admin-stat-pending">
            <span className="admin-stat-number">{pendingCount}</span>
            <span className="admin-stat-label">Pending</span>
          </div>
        </div>
        <IssueListAdmin issues={issues} onUpdateStatus={onUpdateStatus} />
      </main>
    </div>
  )
}

export default AdminDashboard
