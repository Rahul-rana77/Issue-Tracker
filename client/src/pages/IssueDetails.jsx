import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import '../styles/issue-details.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import DeleteIssue from '../components/DeleteIssue.jsx'

function IssueDetails() {
  const { id } = useParams()

  const [issue, setIssue] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/issue/${id}`,{
          withCredentials: true
        })
        setIssue(res.data.issue)
      } catch (error) {
        console.error("Error fetching issue:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchIssue()
  }, [id])
  
  if (loading) {
    return (
      <div className="page">
        <Navbar variant="user" />
        <main className="container">
          <p>Loading issue...</p>
        </main>
      </div>
    )
  }

  if (!issue) {
    return (
      <div className="page">
        <Navbar variant="user" />
        <main className="container">
          <div className="not-found">
            <svg
              className="not-found-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <h2>Issue Not Found</h2>
            <p>The issue you are looking for does not exist.</p>
            <Link to="/home" className="back-link">Go back to Dashboard</Link>
          </div>
        </main>
      </div>
    )
  }

  const statusClass = {
    Solved: 'status-solved',
    Working: 'status-working',
    'Yet to Work': 'status-pending',
  }

  const priorityClass = {
    High: 'priority-high',
    Medium: 'priority-medium',
    Low: 'priority-low',
  }

  return (
     <div className="page">
      <Navbar variant="user" />

      <main className="container">

        <div className="top-bar">
          <Link to="/home" className="breadcrumb-link">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Dashboard
          </Link>
          <DeleteIssue  className="delete-issue-button" issueId={issue._id} onDelete={() => window.location.href = '/home'} />
        </div>

        <div className="detail-card">

          <div className="detail-image-wrapper">
            <a href={issue.image} target="_blank" rel="noopener noreferrer">
              <img
                src={issue.image}
                alt={issue.title}
                className="detail-image"
              />
            </a>
          </div>

          <div className="detail-header">
            <div className="detail-header-top">
              <span className="detail-id">Issue #{issue._id}</span>

              <span className={`detail-status ${statusClass[issue.status] || ''}`}>
                {issue.status}
              </span>
            </div>

            <h1 className="detail-title">{issue.title}</h1>
          </div>

          <div className="detail-body">

            <div className="detail-section">
              <h3 className="detail-section-title">Description</h3>
              <p className="detail-description">{issue.description}</p>
            </div>

            <div className="detail-section">
              <h3 className="detail-section-title">Location</h3>

              <div className="detail-location">
                <svg
                  className="detail-location-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>

                <span>{issue.location}</span>
              </div>
            </div>

            <div className="detail-meta">

              <div className="meta-item">
                <span className="meta-label">Category</span>
                <span className="meta-value">{issue.category}</span>
              </div>

              <div className="meta-item">
                <span className="meta-label">Priority</span>

                <span className={`meta-value meta-priority ${priorityClass[issue.priority] || ''}`}>
                  {issue.priority}
                </span>
              </div>

              <div className="meta-item">
                <span className="meta-label">Status</span>

                <span className={`meta-value meta-status ${statusClass[issue.status] || ''}`}>
                  {issue.status}
                </span>
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  )
}

export default IssueDetails
