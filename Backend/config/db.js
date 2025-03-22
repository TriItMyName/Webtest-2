const sql = require('mssql/msnodesqlv8');

// Cấu hình kết nối SQL Server
const dbConfig = {
  connectionString: 'DSN=MySQLServerDSN', // Sử dụng DSN vừa tạo
  driver: 'msnodesqlv8',
};

// Hàm kết nối đến SQL Server
async function connectToDatabase() {
  try {
    const pool = await sql.connect(dbConfig);
    console.log('Kết nối đến SQL Server thành công!');
    return pool;
  } catch (err) {
    console.error('Lỗi khi kết nối đến SQL Server:', err);
    throw err;
  }
}

module.exports = {
  sql,
  connectToDatabase,
};