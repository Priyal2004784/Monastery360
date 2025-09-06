// The final, complete, and correct AdminPanel.js with all functions
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialFormState = { name: '', district: '', history: '', lat: '', lng: '', tags: '', panoImage_url: '' };

function AdminPanel() {
  const [monasteries, setMonasteries] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [editingId, setEditingId] = useState(null);

  const fetchMonasteries = () => {
    axios.get('http://localhost:5000/monasteries')
      .then(response => setMonasteries(response.data))
      .catch(error => console.error("Error fetching monasteries:", error));
  };

  useEffect(() => { fetchMonasteries(); }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this monastery?')) {
      axios.delete(`http://localhost:5000/monasteries/${id}`)
        .then(() => {
          alert('Monastery deleted successfully!');
          fetchMonasteries();
        })
        .catch(err => alert('Failed to delete monastery.'));
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
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData(initialFormState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const monasteryData = {
      name: formData.name, district: formData.district, history: formData.history,
      coordinates: { lat: parseFloat(formData.lat), lng: parseFloat(formData.lng) },
      tags: formData.tags.split(',').map(tag => tag.trim()),
      panoImage_url: formData.panoImage_url,
    };

    if (editingId) {
      axios.put(`http://localhost:5000/monasteries/${editingId}`, monasteryData)
        .then(() => {
          alert('Monastery updated successfully!');
          fetchMonasteries();
          cancelEdit();
        })
        .catch(err => alert('Failed to update monastery.'));
    } else {
      axios.post('http://localhost:5000/monasteries/add', monasteryData)
        .then(() => {
          alert('Monastery added successfully!');
          fetchMonasteries();
          setFormData(initialFormState);
        })
        .catch(err => alert('Failed to add monastery.'));
    }
  };

  return (
    <div className="admin-panel">
      <div className="form-container">
        <h2>{editingId ? 'Edit Monastery' : 'Add New Monastery'}</h2>
        <form onSubmit={handleSubmit}>
          <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" required />
          <input name="district" value={formData.district} onChange={handleInputChange} placeholder="District" required />
          <textarea name="history" value={formData.history} onChange={handleInputChange} placeholder="History" required />
          <input name="lat" value={formData.lat} onChange={handleInputChange} placeholder="Latitude" required />
          <input name="lng" value={formData.lng} onChange={handleInputChange} placeholder="Longitude" required />
          <input name="tags" value={formData.tags} onChange={handleInputChange} placeholder="Tags (comma-separated)" />
          <input name="panoImage_url" value={formData.panoImage_url} onChange={handleInputChange} placeholder="360 Image URL (optional)" />
          <button type="submit">{editingId ? 'Update Monastery' : 'Add Monastery'}</button>
          {editingId && <button type="button" className="cancel-button" onClick={cancelEdit}>Cancel Edit</button>}
        </form>
      </div>
      <h2>Manage Existing Monasteries</h2>
      <table className="admin-table">
        <thead><tr><th>Name</th><th>Actions</th></tr></thead>
        <tbody>
  {monasteries.map(monastery => (
    <tr key={monastery._id}>
      <td>{monastery.name}</td>
      {/* --- ADD THE CLASSNAME TO THIS TD --- */}
      <td className="action-cell">
        <button className="edit-button" onClick={() => handleEdit(monastery)}>Edit</button>
        <button className="delete-button" onClick={() => handleDelete(monastery._id)}>Delete</button>
      </td>
    </tr>
  ))}
</tbody>
      </table>
    </div>
  );
}

export default AdminPanel;