import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css'; // <-- This is the new line you are adding

const initialFormState = {
  name: '',
  district: '',
  history: '',
  lat: '',
  lng: '',
  tags: '',
  panoImage_url: ''
};

function AdminPanel() {
  const [monasteries, setMonasteries] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [editingId, setEditingId] = useState(null);

  const fetchMonasteries = () => {
    axios.get('http://localhost:5000/monasteries')
      .then(response => setMonasteries(response.data))
      .catch(error => console.error("Error fetching monasteries:", error));
  };

  useEffect(() => {
    fetchMonasteries();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this monastery? This action cannot be undone.')) {
      axios.delete(`http://localhost:5000/monasteries/${id}`)
        .then(() => {
          alert('Monastery deleted successfully!');
          fetchMonasteries();
        })
        .catch(err => alert('Error: Failed to delete monastery.'));
    }
  };

  const handleEdit = (monastery) => {
    setEditingId(monastery._id);
    setFormData({
      name: monastery.name,
      district: monastery.district,
      history: monastery.history,
      lat: monastery.coordinates.lat,
      lng: monastery.coordinates.lng,
      tags: monastery.tags.join(', '),
      panoImage_url: monastery.panoImage_url || ''
    });
    window.scrollTo(0, 0);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData(initialFormState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const monasteryData = {
      name: formData.name,
      district: formData.district,
      history: formData.history,
      coordinates: { lat: parseFloat(formData.lat), lng: parseFloat(formData.lng) },
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      panoImage_url: formData.panoImage_url,
    };

    const request = editingId
      ? axios.put(`http://localhost:5000/monasteries/${editingId}`, monasteryData)
      : axios.post('http://localhost:5000/monasteries/add', monasteryData);

    request.then(() => {
      alert(`Monastery ${editingId ? 'updated' : 'added'} successfully!`);
      fetchMonasteries();
      cancelEdit();
    })
      .catch(err => alert(`Error: Failed to ${editingId ? 'update' : 'add'} monastery.`));
  };

  return (
    <div className="admin-panel-container container">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage the sacred monasteries of Sikkim.</p>
      </div>

      <div className="admin-card form-card">
        <h2>{editingId ? 'Edit Monastery' : 'Add New Monastery'}</h2>
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-grid">
            <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" required />
            <input name="district" value={formData.district} onChange={handleInputChange} placeholder="District" required />
            <input name="lat" type="number" step="any" value={formData.lat} onChange={handleInputChange} placeholder="Latitude" required />
            <input name="lng" type="number" step="any" value={formData.lng} onChange={handleInputChange} placeholder="Longitude" required />
          </div>
          <textarea name="history" value={formData.history} onChange={handleInputChange} placeholder="History" required />
          <input name="tags" value={formData.tags} onChange={handleInputChange} placeholder="Tags (comma-separated)" />
          <input name="panoImage_url" value={formData.panoImage_url} onChange={handleInputChange} placeholder="360 Image URL (optional)" />

          <div className="form-actions">
            <button type="submit" className="cta-button primary">
              {editingId ? 'Update Monastery' : 'Add Monastery'}
            </button>
            {editingId && (
              <button type="button" className="cta-button secondary" onClick={cancelEdit}>
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="admin-card table-card">
        <h2>Existing Monasteries</h2>
        <div className="table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>District</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {monasteries.map(monastery => (
                <tr key={monastery._id}>
                  <td>{monastery.name}</td>
                  <td>{monastery.district}</td>
                  <td className="action-cell">
                    <button className="edit-button" onClick={() => handleEdit(monastery)}>Edit</button>
                    <button className="delete-button" onClick={() => handleDelete(monastery._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;