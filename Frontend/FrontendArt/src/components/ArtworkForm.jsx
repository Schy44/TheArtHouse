import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ArtworkForm.css'; // Import your CSS file for styling

function ArtworkForm({ onUpload }) {
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [price, setPrice] = useState('');
    const [publishingDate, setPublishingDate] = useState('');
    const [picture, setPicture] = useState(null);
    const [artworks, setArtworks] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');
    const [editingArtworkId, setEditingArtworkId] = useState(null);

    useEffect(() => {
        fetchArtworks();
    }, []);

    const fetchArtworks = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/artworks/');
            setArtworks(response.data);
        } catch (error) {
            setError('Error fetching artworks');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('artist', artist);
        formData.append('price', price);
        formData.append('publishing_date', publishingDate);
        formData.append('picture', picture);

        try {
            let response;
            if (editingArtworkId) {
                response = await axios.put(`http://127.0.0.1:8000/api/artworks/${editingArtworkId}/`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            } else {
                response = await axios.post('http://127.0.0.1:8000/api/artworks/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            }
            if (typeof onUpload === 'function') {
                onUpload(response.data);
            } else {
                console.error('onUpload is not a function');
            }
            setSuccessMessage(editingArtworkId ? 'Artwork updated successfully!' : 'Artwork uploaded successfully!');
            resetForm();
            fetchArtworks();
        } catch (error) {
            console.error('There was an error uploading/editing the artwork!', error);
            setError('Error uploading/editing artwork');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/artworks/${id}/`);
            setSuccessMessage('Artwork deleted successfully!');
            fetchArtworks();
        } catch (error) {
            console.error('Error deleting artwork:', error);
            setError('Error deleting artwork');
        }
    };

    const handleEdit = (artwork) => {
        setTitle(artwork.title);
        setArtist(artwork.artist);
        setPrice(artwork.price);
        setPublishingDate(artwork.publishing_date);
        setEditingArtworkId(artwork.id);
    };

    const resetForm = () => {
        setTitle('');
        setArtist('');
        setPrice('');
        setPublishingDate('');
        setPicture(null);
        setEditingArtworkId(null);
    };

    return (
        <div className="artwork-form-container">
            <h2>{editingArtworkId ? 'Edit Artwork' : 'Upload Artwork'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Artist:</label>
                    <input type="text" value={artist} onChange={(e) => setArtist(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Price:</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Publishing Date:</label>
                    <input type="date" value={publishingDate} onChange={(e) => setPublishingDate(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Picture:</label>
                    <input type="file" onChange={(e) => setPicture(e.target.files[0])} required />
                </div>
                <button type="submit" className="submit-button">{editingArtworkId ? 'Update' : 'Upload'}</button>
                {editingArtworkId && <button type="button" className="cancel-button" onClick={resetForm}>Cancel</button>}
            </form>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {error && <p className="error-message">{error}</p>}
            <h2>Artwork List</h2>
            <table className="artwork-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Artist</th>
                        <th>Price</th>
                        <th>Publishing Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {artworks.map(artwork => (
                        <tr key={artwork.id}>
                            <td>{artwork.title}</td>
                            <td>{artwork.artist}</td>
                            <td>${artwork.price}</td>
                            <td>{new Date(artwork.publishing_date).toLocaleDateString()}</td>
                            <td>
                                <button onClick={() => handleEdit(artwork)} className="edit-button">Edit</button>
                                <button onClick={() => handleDelete(artwork.id)} className="delete-button">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ArtworkForm;
