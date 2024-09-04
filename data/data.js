const fs = require('fs').promises; // Sử dụng fs.promises để làm việc với các phương thức bất đồng bộ
const path = require('path');

// Đường dẫn đến file .txt
const filePath = path.join(__dirname, 'data.txt');

// Định nghĩa hàm bất đồng bộ để đọc file
const readFile = async () => {
  try {
    // Đọc nội dung file bất đồng bộ
    const data = await fs.readFile(filePath, 'utf8');
    
    // Tách dữ liệu thành mảng các từ
    const arr = data.trim().split(/\s+/);
    
    return arr;
  } catch (err) {
    console.error('Error reading file:', err);
    throw err; // Ném lỗi để có thể xử lý lỗi ở nơi gọi hàm
  }
};

module.exports = { readFile };
