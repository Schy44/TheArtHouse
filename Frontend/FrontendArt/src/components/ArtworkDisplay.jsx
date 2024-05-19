import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './ArtworkDisplay.css';

const ArtworkDisplay = () => {
    const [artworks, setArtworks] = useState([]);
    const [filteredArtworks, setFilteredArtworks] = useState([]);
    const [artists, setArtists] = useState([]);
    const [selectedArtist, setSelectedArtist] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const artworksPerPage = 6;
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/artworks/')
            .then(response => response.json())
            .then(data => {
                setArtworks(data);
                setFilteredArtworks(data);
                const uniqueArtists = [...new Set(data.map(artwork => artwork.artist))];
                setArtists(uniqueArtists);
            })
            .catch(error => console.error('Error fetching artworks:', error));
    }, []);

    const handleFilterChange = (event) => {
        const artist = event.target.value;
        setSelectedArtist(artist);
        setCurrentPage(1); // Reset to first page when filter changes
        if (artist === '') {
            setFilteredArtworks(artworks);
        } else {
            const filtered = artworks.filter(artwork => artwork.artist === artist);
            setFilteredArtworks(filtered);
        }
    };

    const indexOfLastArtwork = currentPage * artworksPerPage;
    const indexOfFirstArtwork = indexOfLastArtwork - artworksPerPage;
    const currentArtworks = filteredArtworks.slice(indexOfFirstArtwork, indexOfLastArtwork);

    const totalPages = Math.ceil(filteredArtworks.length / artworksPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSeeDetails = (artworkId) => {
        navigate(`/artwork-details/${artworkId}`);
    };

    return (
        <Container fluid className="artwork-container">
            <Row>
                <Col md={2} className="sidebar">
                    <h4>Filter by Artist</h4>
                    <Form.Control as="select" value={selectedArtist} onChange={handleFilterChange}>
                        <option value="">All Artists</option>
                        {artists.map(artist => (
                            <option key={artist} value={artist}>{artist}</option>
                        ))}
                    </Form.Control>
                </Col>
                <Col md={10}>
                    <div className="welcome-banner">
                        <h2>Welcome to the World of Art</h2>
                        <p>Discover and buy amazing artwork from talented artists</p>
                    </div>
                    <Row>
                        {currentArtworks.map(artwork => (
                            <Col key={artwork.id} sm={12} md={6} lg={4} className="artwork-col">
                                <Card className="artwork-card">
                                    <Card.Img variant="top" src={artwork.picture} alt={artwork.title} className="artwork-img" />
                                    <Card.Body>
                                        <Card.Title>{artwork.title}</Card.Title>
                                        <Card.Text>
                                            <strong>Artist:</strong> {artwork.artist}<br />
                                            <strong>Price:</strong> ${artwork.price}<br />
                                            <strong>Published:</strong> {new Date(artwork.publishing_date).toLocaleDateString()}
                                        </Card.Text>
                                        <Button variant="primary" className="buy-button" onClick={() => handleSeeDetails(artwork.id)}>SEE DETAILS</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <div className="pagination-container">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <Button
                                key={index + 1}
                                variant={index + 1 === currentPage ? 'primary' : 'light'}
                                onClick={() => handlePageChange(index + 1)}
                                className="pagination-item"
                            >
                                {index + 1}
                            </Button>
                        ))}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ArtworkDisplay;
