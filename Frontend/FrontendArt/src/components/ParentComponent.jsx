// ParentComponent.jsx

import React from 'react';
import ArtworkForm from './ArtworkForm'; // Adjust the path as per your file structure

function ParentComponent() {
    // Define the function to handle the upload
    const handleUpload = (data) => {
        console.log('Uploaded artwork:', data);
        // You can perform additional actions here, such as updating state or displaying a message
    };

    return (
        <div>
            <h1>Upload Artwork Form</h1>
            {/* Pass the handleUpload function as the onUpload prop */}
            <ArtworkForm onUpload={handleUpload} />
        </div>
    );
}

export default ParentComponent;
