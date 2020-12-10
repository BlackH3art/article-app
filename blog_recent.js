const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  if(req.url === '/') {
    fs.readFile('./titles.json', (err, data) => {
      if(err) {
        console.error(err);
        res.end('server error');
      } else {
        let titles = JSON.parse(data.toString());

        fs.readFile('./template.html', (err, data) => {
          if(err) {
            console.error(err);
            res.end('server error with template');
          } else {

            let template = data.toString();
            let html = template.replace('%', titles.join('<li></li>'))

            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(html);
          }
        })
      }
    })
  }
}).listen(8000, '127.0.0.1')