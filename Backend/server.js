const express = require("express");
const path = require("path");
const { connectToDatabase } = require("./config/db"); // Import kết nối từ db.js
const courseRoutes = require("./routes/courseRoutes"); // Import route thêm khóa học

const app = express();
const PORT = 3000;

// Middleware để parse JSON
app.use(express.json());

// Serve static files từ thư mục FrontEnd
app.use(express.static(path.join(__dirname, '../FrontEnd')));

// Sử dụng route thêm khóa học
app.use('/api', courseRoutes);

// Route cho trang admin
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../FrontEnd', 'admin.html'));
});

// Route cho trang chủ
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../FrontEnd', 'index.html'));
});

// Kiểm tra kết nối cơ sở dữ liệu
// app.get('/test-db', async (req, res) => {
//     try {
//         const pool = await connectToDatabase();
//         const result = await pool.request().query('SELECT 1 AS Test');
//         res.status(200).send({ message: 'Kết nối thành công!', result: result.recordset });
//     } catch (err) {
//         res.status(500).send({ message: 'Kết nối thất bại!', error: err.message });
//     }
// });

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
