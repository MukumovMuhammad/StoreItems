const http = require('http');
const fs = require('fs');

const server = http.createServer(function(req, res) {
  if (req.url === '/') {
    // Serve the HTML file
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
      res.end();
    });
      
      
  } else if (req.url === '/style.css') {
    // Serve the CSS file
    fs.readFile('style.css', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/css'});
      res.write(data);
      res.end();
    });
  } else if (req.url === '/sql.js') {
    // Serve the JavaScript file
    fs.readFile('sql.js', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
  } else if (req.url === '/data.json') {
      fs.readFile('data.json', function (err, data) {
          if (err) {
              res.writeHead(500, { 'Content-Type': 'text/plain' });
              res.end('Internal server error');
          } else {
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(data);
          }
      });
  }else if (req.method === 'POST' && req.url === '/addGood') {
    let body = '';

    req.on('data', function(chunk) {
      body += chunk;
    });

    req.on('end', function() {
        let newData = JSON.parse(body);

      fs.readFile('data.json', function(err, data) {
        if (err) {
          res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('Internal server error');
        } else {
          let jsonData = JSON.parse(data);
          jsonData.Goods.push(newData);
          fs.writeFile('data.json', JSON.stringify(jsonData), function(err) {
            if (err) {
              res.writeHead(500, {'Content-Type': 'text/plain'});
              res.end('Internal server error');
            } else {
              res.writeHead(200, {'Content-Type': 'application/json'});
              res.end(JSON.stringify({ message: 'New data added successfully' }));
            }
          });
        }
      });
    });
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Page not found');
  }
});




server.listen(3000);