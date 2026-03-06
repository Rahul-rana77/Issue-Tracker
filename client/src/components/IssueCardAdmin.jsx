import { Link } from 'react-router-dom'
import '../styles/issue-card.css'

function IssueCardAdmin({ issue = [] }) {
  const statusClass = {
    Solved: 'status-solved',
    Working: 'status-working',
    'Yet to Work': 'status-pending',
  }

  return (
    <Link to={`/issue/admin/${issue._id}`} className="issue-card">
      <div className="issue-card-image-wrapper">
        <img
          src={issue.image}
          alt={issue.title}
          className="issue-card-image"
        />
        <span className={`issue-status-badge ${statusClass[issue.status] || ''}`}>
          {issue.status}
        </span>
      </div>
      <div className="issue-card-body">
        <h3 className="issue-card-title">{issue.title}</h3>
        <p className="issue-card-description">{issue.description}</p>
        <div className="issue-card-location">
          <svg
            className="location-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>{issue.location}</span>
        </div>
      </div>
    </Link>
  )
}

export default IssueCardAdmin
