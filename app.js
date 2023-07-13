const http = require('http');
const fs = require('fs');
const hostname = 'localhost';
const PORT = 3000;

const server = http.createServer(function (req, res) {
  if (req.url === '/') {
    // Serve the HTML file
    fs.readFile('index.html', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      res.end();
    });


  } else if (req.url === '/style.css') {
    // Serve the CSS file
    fs.readFile('style.css', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'text/css' });
      res.write(data);
      res.end();
    });
  } else if (req.url === '/script.js') {
    // Serve the JavaScript file
    fs.readFile('script.js', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'text/javascript' });
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
  } else if (req.method === 'POST' && req.url === '/addGood') {
    let body = '';

    req.on('data', function (chunk) {
      body += chunk;
    });

    req.on('end', function () {
      let newData = JSON.parse(body);

      fs.readFile('data.json', function (err, data) {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal server error');
        } else {
          let jsonData = JSON.parse(data);
          jsonData.push(newData);
          fs.writeFile('data.json', JSON.stringify(jsonData), function (err) {
            if (err) {
              res.writeHead(500, { 'Content-Type': 'text/plain' });
              res.end('Internal server error');
            } else {
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ message: 'New data added successfully' }));
            }
          });
        }
      });
    });
  } else if (req.method === 'POST' && req.url === '/delete') {

    let body = '';

    // Collect the data sent in the request body
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    // When all data is received, parse it and do something with it
    req.on('end', () => {
      const delete_id = JSON.parse(JSON.parse(body).d_id);
      console.log('Received data:', delete_id);

      // Do something with the data

      // Read the JSON file into an object
      const data = JSON.parse(fs.readFileSync('data.json'));
      // Filter out the data you want to delete
      let deletedData = [];
      if (data) {

        data.forEach((element, id) => {
          id === delete_id ? console.log("Don't Delete, ", id) : deletedData.push(element);
        });

      }



      // Write the filtered data back to the file
      fs.writeFileSync('data.json', JSON.stringify(deletedData, null, 2), (err) => {
        if (err) throw err;
      });

      console.log('Data deleted successfully!');

      // Send a response back to the client
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: 'Successifuly deleted!' }))
    });

  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Page not found');
  }
});




server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});