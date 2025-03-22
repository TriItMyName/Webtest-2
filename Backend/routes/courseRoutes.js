const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('../config/db'); // Import kết nối từ db.js

// Route để thêm khóa học
router.post('/add-course', async (req, res) => {
    const { courseName, description, instructorID, categoryID, price } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!courseName || !description || !instructorID || !categoryID || !price) {
        return res.status(400).send({ message: 'Thiếu thông tin khóa học!' });
    }

    try {
        const pool = await connectToDatabase(); // Kết nối cơ sở dữ liệu
        const query = `
            INSERT INTO Courses (CourseName, Description, InstructorID, CategoryID, Price)
            VALUES (@courseName, @description, @instructorID, @categoryID, @price)
        `;
        const request = pool.request();
        request.input('courseName', courseName);
        request.input('description', description);
        request.input('instructorID', instructorID);
        request.input('categoryID', categoryID);
        request.input('price', price);

        await request.query(query); // Thực thi câu lệnh SQL
        res.status(201).send({ message: 'Thêm khóa học thành công!' });
    } catch (err) {
        res.status(500).send({ message: 'Lỗi khi thêm khóa học!', error: err.message });
    }
});

module.exports = router;