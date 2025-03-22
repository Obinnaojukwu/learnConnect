const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const audioRoutes = require('./routes/audioRoutes');
const adminRoutes = require('./routes/adminRoutes');
const facultyRoutes = require('./routes/facultyRoutes');
const courseRoutes = require('./routes/courseRoutes');
const levelRoutes = require('./routes/levelRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');
const webhookRoutes = require('./routes/webhookRoutes');
const messageRoutes = require('./routes/messageRoutes'); // Import message routes
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const db = require('./config/database');

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Enable CORS
app.use(cors());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Register API routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/audios', audioRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/faculties', facultyRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/levels', levelRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/purchase', purchaseRoutes);
app.use('/api/payment', webhookRoutes);
app.use('/api/messages', messageRoutes); // Add message routes

// Handle WebSocket connections
wss.on('connection', (ws) => {
    console.log('New client connected');
    
    ws.on('message', (message) => {
        const parsedMessage = JSON.parse(message);
        const { senderId, receiverId, content } = parsedMessage;

        // Save message to the database
        const sql = `INSERT INTO messages (senderId, receiverId, message) VALUES (?, ?, ?)`;
        const params = [senderId, receiverId, content];
        db.run(sql, params, function(err) {
            if (err) {
                console.error('Error saving message:', err.message);
            } else {
                console.log('Message saved to database');
            }
        });

        // Broadcast message to the receiver
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(parsedMessage));
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));