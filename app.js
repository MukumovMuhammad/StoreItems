const http = require('http');
const express = require('express');
const app = express();
const fs = require('fs');
const { Console } = require('console');
const PORT = 8800;



// const server = http.createServer(function (req, res) {
//   // Serve the HTML file
//   if (req.url === '/') {
//     fs.readFile('index.html', function (err, data) {
//       if (err) console.log(err);
//       res.writeHead(200, { 'Content-Type': 'text/html' });
//       console.log("HTML edit!!");
//       res.write(data);
//       res.end();
//     });
//   } else if (req.url === '/style.css') {
//     // Serve the CSS file
//     fs.readFile('style.css', function (err, data) {
//       res.writeHead(200, { 'Content-Type': 'text/css' });
//       res.write(data);
//       res.end();
//     });
//   } else if (req.url === '/script.js') {
//     // Serve the JavaScript file
//     fs.readFile('script.js', function (err, data) {
//       res.writeHead(200, { 'Content-Type': 'text/javascript' });
//       res.write(data);
//       res.end();
//     });
//   } else if (req.url === '/data.json') {
//     fs.readFile('data.json', function (err, data) {
//       if (err) {
//         res.writeHead(500, { 'Content-Type': 'text/plain' });
//         res.end('Internal server error');
//       } else {
//         res.writeHead(200, { 'Content-Type': 'application/json' });
//         res.end(data);
//       }
//     });
//   } else if (req.method === 'POST' && req.url === '/addGood') {
//     let body = '';

//     req.on('data', function (chunk) {
//       body += chunk;
//     });

//     req.on('end', function () {
//       let newData = JSON.parse(body);

//       fs.readFile('data.json', function (err, data) {
//         if (err) {
//           res.writeHead(500, { 'Content-Type': 'text/plain' });
//           res.end('Internal server error');
//         } else {
//           let jsonData = JSON.parse(data);
//           jsonData.push(newData);
//           fs.writeFile('data.json', JSON.stringify(jsonData), function (err) {
//             if (err) {
//               res.writeHead(500, { 'Content-Type': 'text/plain' });
//               res.end('Internal server error');
//             } else {
//               res.writeHead(200, { 'Content-Type': 'application/json' });
//               res.end(JSON.stringify({ message: 'New data added successfully' }));
//             }
//           });
//         }
//       });
//     });
//   } else if (req.method === 'POST' && req.url === '/delete') {

// let body = '';

// // Collect the data sent in the request body
// req.on('data', (chunk) => {
//   body += chunk.toString();
// });

// // When all data is received, parse it and do something with it
// req.on('end', () => {
//   const delete_id = JSON.parse(JSON.parse(body).d_id);
//   console.log('Received data:', delete_id);

//   // Do something with the data

//   // Read the JSON file into an object
//   const data = JSON.parse(fs.readFileSync('data.json'));
//   // Filter out the data you want to delete
//   let deletedData = [];
//   if (data) {

//     data.forEach((element, id) => {
//       id === delete_id ? console.log("Don't Delete, ", id) : deletedData.push(element);
//     });

//   }



//   // Write the filtered data back to the file
//   fs.writeFileSync('data.json', JSON.stringify(deletedData, null, 2), (err) => {
//     if (err) throw err;
//   });

//   console.log('Data deleted successfully!');

//   // Send a response back to the client
//   res.setHeader('Content-Type', 'application/json');
//   res.end(JSON.stringify({ message: 'Successifuly deleted!' }))
// });

//   } else {
//     res.writeHead(404, { 'Content-Type': 'text/plain' });
//     res.end('Page not found');
//   }
// });


////////////////////// HTML



app.get('/', (req, res) => {
  fs.readFile('./index.html', function (err, data) {
    if (err) console.log(err);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    console.log("HTML edit!!");
    res.write(data);
    res.end();
  });
})
/////////////////////// CSS
app.get('/style.css', (req, res) => {
  // Serve the CSS file
  fs.readFile('style.css', function (err, data) {
    res.writeHead(200, { 'Content-Type': 'text/css' });
    res.write(data);
    res.end();
  });
});

//////////////// SCRIPT
app.get('/script.js', (req, res) => {
  // Serve the JavaScript file
  fs.readFile('script.js', function (err, data) {
    res.writeHead(200, { 'Content-Type': 'text/javascript' });
    res.write(data);
    res.end();
  });
});


//////////////// data.JSON
app.get('/data.json', (req, res) => {
  fs.readFile('data.json', function (err, data) {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal server error');
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
    }
  });
});


/////////////// ADDPRODUCT
app.post('/addGood', (req, res) => {
  let body = '';

  req.on('data', function (chunk) {
    body += chunk;
  });

  console.log('body', body);

  req.on('end', function () {
    let newData = JSON.parse(body);
    console.log('New DATA', newData);

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

});
//////////////////// Delete
app.post('/delete', (req, res) => {
  console.log('delete~');
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

})




app.listen(PORT, () => {
  console.log(`Server running at http://hostname:${PORT}/`);
});