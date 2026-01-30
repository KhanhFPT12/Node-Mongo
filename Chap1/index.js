const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
  console.log('Request for ' + req.url + ' by method ' + req.method);

  // Chỉ cho phép GET
  if (req.method === 'GET') {

    let fileUrl;

    // Nếu truy cập "/" thì trả index.html
    if (req.url === '/') {
      fileUrl = '/index.html';
    } else {
      fileUrl = req.url;
    }

    // Tạo đường dẫn đầy đủ tới file trong thư mục public
    const filePath = path.resolve('./public' + fileUrl);

    // Lấy đuôi file
    const fileExt = path.extname(filePath);

    // Chỉ cho phép file HTML
    if (fileExt === '.html') {

      // Kiểm tra file có tồn tại không
      fs.exists(filePath, (exists) => {
        if (!exists) {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/html');
          res.end('<html><body><h1>Error 404: File not found</h1></body></html>');
          return;
        }

        // File tồn tại → trả về cho trình duyệt
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');

        fs.createReadStream(filePath).pipe(res);
      });

    } else {
      // Không phải file HTML
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html');
      res.end('<html><body><h1>Error 404: Not a HTML file</h1></body></html>');
    }

  } else {
    // Không phải GET
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>Error 404: Method not supported</h1></body></html>');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
