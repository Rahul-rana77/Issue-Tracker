import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar.jsx'
import SearchBar from '../components/SearchBar.jsx'
import IssueList from '../components/IssueList.jsx'
import '../styles/home.css'
import axios from 'axios'

function Home() {
  const [search, setSearch] = useState('')
  const [allissues, setallIssues] = useState([])

  const fetchIssues = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/issue/`,{
        withCredentials: true
      })
      setallIssues(res.data.issues)
    } catch (error) {
      console.error("Error fetching issues:", error)
    }
  }

  useEffect(() => {
    fetchIssues()
  }, [])

   const filteredIssues = allissues.filter((issue) => {
    const query = search.toLowerCase()
    return (
      issue._id.toString().includes(query) ||
      issue.title.toLowerCase().includes(query) ||
      issue.description.toLowerCase().includes(query)
    )
  })

  const solvedCount = allissues.filter((i) => i.status === 'Solved').length
  const workingCount = allissues.filter((i) => i.status === 'Working').length
  const pendingCount = allissues.filter((i) => i.status === 'Yet to Work').length


  return (
    <div className="page">
      <Navbar variant="user" />
      <main className="container">
        <div className="home-header">
          <div>
            <h1 className="home-title">Issue Dashboard</h1>
            <p className="home-subtitle">Track and manage all reported issues</p>
          </div>
        </div>

        <div className="stats-row">
          <div className="stat-card stat-total">
            <span className="stat-number">{allissues.length}</span>
            <span className="stat-label">Total Issues</span>
          </div>
          <div className="stat-card stat-solved">
            <span className="stat-number">{solvedCount}</span>
            <span className="stat-label">Solved</span>
          </div>
          <div className="stat-card stat-working">
            <span className="stat-number">{workingCount}</span>
            <span className="stat-label">In Progress</span>
          </div>
          <div className="stat-card stat-pending">
            <span className="stat-number">{pendingCount}</span>
            <span className="stat-label">Pending</span>
          </div>
        </div>

        <SearchBar value={search} onChange={setSearch} />

        {search && (
          <p className="search-result-count">
            Showing {filteredIssues.length} of {allissues.length} issues
          </p>
        )}

        <IssueList issues={filteredIssues} />
      </main>
    </div>
  )
}

export default Home
