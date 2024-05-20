import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Pagination } from 'react-bootstrap';
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
        fetchArtworks();
    }, []);

    const fetchArtworks = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/artworks/');
            if (!response.ok) {
                throw new Error('Failed to fetch artworks');
            }
            const data = await response.json();
            setArtworks(data);
            setFilteredArtworks(data);
            const uniqueArtists = [...new Set(data.map(artwork => artwork.artist))];
            setArtists(uniqueArtists);
        } catch (error) {
            console.error('Error fetching artworks:', error);
        }
    };

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
                <Col md={3} lg={2} className="sidebar">
                    <h4>Filter by Artist</h4>
                    <Form.Control as="select" value={selectedArtist} onChange={handleFilterChange}>
                        <option value="">All Artists</option>
                        {artists.map(artist => (
                            <option key={artist} value={artist}>{artist}</option>
                        ))}
                    </Form.Control>
                </Col>
                <Col md={9} lg={10}>
                    <div className="welcome-banner text-center my-4">
                        <h2>Welcome to the World of Art</h2>
                        <p>Discover and buy amazing artwork from talented artists</p>
                    </div>
                    <Row>
                        {currentArtworks.map(artwork => (
                            <Col key={artwork.id} sm={12} md={6} lg={4} className="mb-4">
                                <Card className="artwork-card h-100 shadow-sm">
                                    <Card.Img variant="top" src={artwork.picture} alt={artwork.title} className="artwork-img" />
                                    <Card.Body>
                                        <Card.Title>{artwork.title}</Card.Title>
                                        <Card.Text>
                                            <strong>Artist:</strong> {artwork.artist}<br />
                                            <strong>Price:</strong> ${artwork.price}<br />
                                            <strong>Published:</strong> {new Date(artwork.publishing_date).toLocaleDateString()}
                                        </Card.Text>
                                        <Button variant="primary" onClick={() => handleSeeDetails(artwork.id)}>See Details</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <Pagination className="justify-content-center mt-4">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <Pagination.Item
                                key={index + 1}
                                active={index + 1 === currentPage}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </Col>
            </Row>
        </Container>
    );
};

export default ArtworkDisplay;
