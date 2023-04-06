const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Enable CORS
app.use(cors());

// Parse JSON requests
app.use(bodyParser.json());

// Define a route for handling checkout requests
debugger;
app.post('/checkout', (req, res) => {
    const { items, total } = req.body;

    // TODO: Save the order to a database and process the payment
  
    const orderId = Math.floor(Math.random() * 1000); // Generate a fake order ID
  
    // Send a response with the order ID
    res.json({
      success: true,
      orderId
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
