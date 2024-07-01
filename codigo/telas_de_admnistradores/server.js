const express = require('express');
const app = express();

// Mock data (replace with your actual data retrieval logic)
const mockData = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' }
];

app.get('/data', (req, res) => {
    // Endpoint for fetching data
    res.json(mockData);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
