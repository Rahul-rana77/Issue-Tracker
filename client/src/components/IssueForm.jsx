import { useState } from 'react'
import '../styles/issue-form.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

function IssueForm() {
  const [submitted, setSubmitted] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: '',
    location: '',
    image: null
  })

  const handleChange = (e) => {
    const { name, value, files } = e.target

    if (name === "image") {
      setFormData({ ...formData, image: files[0] })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const data = new FormData()
      data.append("title", formData.title)
      data.append("description", formData.description)
      data.append("category", formData.category)
      data.append("priority", formData.priority)
      data.append("location", formData.location)
      data.append("image", formData.image)

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/issue/create-issue`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          withCredentials: true
        }
      )

      console.log(response.data)
      setSubmitted(true)

    } catch (error) {
      console.error("Error submitting issue:", error)
    }
  }


  return (
    <form className="issue-form" onSubmit={handleSubmit}>
      {submitted && (
        <div className="success-message">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <span>Issue submitted successfully!</span>
        </div>
      )}

      {!submitted && (
        <div className="error-message">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>

          <span>Login first to submit an issue!</span>
        </div>
      )}

      <div className="form-group">
        <label htmlFor="title">Issue Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter a brief title for the issue"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe the issue in detail..."
          rows="5"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="image">Upload Image</label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select category</option>
            <option value="Sanitation">Sanitation</option>
            <option value="Water Supply">Water Supply</option>
            <option value="Roads & Infrastructure">Roads & Infrastructure</option>
            <option value="Electricity">Electricity</option>
            <option value="Traffic">Traffic</option>
            <option value="Pollution">Pollution</option>
            <option value="Public Safety">Public Safety</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            required
          >
            <option value="">Select priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location || ''}
          onChange={handleChange}
          placeholder="Enter the location of the issue"
          required
        />
      </div>

      <button type="submit" className="submit-btn">
        Submit Issue
      </button>
      <Link to="/home" className="back-link">Go back to Dashboard</Link>
    </form>
  )
}

export default IssueForm
