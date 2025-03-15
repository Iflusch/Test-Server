console.log("🚀 Memulai server.js...");

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json()); // Gunakan body-parser untuk parsing JSON

app.use((req, res, next) => {
    console.log(`📡 Request masuk: ${req.method} ${req.url}`);
    next();
});

// Endpoint untuk memastikan server berjalan
app.get('/', (req, res) => {
    res.send('Server berjalan dengan baik! 🚀');
});

// Endpoint POST untuk menerima notifikasi Midtrans
app.post('/midtrans-notification', (req, res) => {
    console.log('Received Midtrans notification:', req.body);

    const { transaction_status, order_id } = req.body;

    if (transaction_status === 'capture' || transaction_status === 'settlement') {
        console.log(`✅ Pembayaran berhasil untuk Order ID: ${order_id}`);
    } else if (transaction_status === 'pending') {
        console.log(`⚠️ Pembayaran pending untuk Order ID: ${order_id}`);
    } else {
        console.log(`❌ Pembayaran gagal/expired untuk Order ID: ${order_id}`);
    }

    res.sendStatus(200); // Kirim respon OK ke Midtrans
});

// Jalankan server di port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${PORT}`);
});
