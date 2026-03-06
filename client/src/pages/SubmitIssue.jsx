import Navbar from '../components/Navbar.jsx'
import IssueForm from '../components/IssueForm.jsx'
import '../styles/submit.css'
import { Link } from 'react-router-dom'

function SubmitIssue({ onSubmit }) {
  return (
    <div className="page">
      <Navbar variant="user" />
      <main className="container">
        <div className="submit-header">
          <h1 className="submit-title">Submit a New Issue</h1>
          <p className="submit-subtitle">
            Fill out the form below to report a new issue. Provide as much detail as possible.
          </p>
        </div>
        <IssueForm onSubmit={onSubmit} />
      </main>
    </div>
  )
}

export default SubmitIssue
