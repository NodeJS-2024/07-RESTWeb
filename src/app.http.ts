import http from 'http';
import fs from 'fs';

const server = http.createServer((req, res) => {

  console.log(req.url);

  // res.write('Hola Mundo');
  // res.end();

  // **** Esto es Server Side Rendering
  // res.writeHead(200, { 'Content-Type': 'text/html' });
  // res.write(`<h1>URL ${ req.url }</h1>`);
  // res.end();

  // **** Información en formato Json
  // const data = { name: 'John Doe', age: 30, city: 'New York' };
  // res.writeHead(200, {
  //   'Content-Type': 'application/json'
  // });
  // res.end(JSON.stringify(data));

  if (req.url === '/') {
    const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(htmlFile);

    return;
  } 
  // else {
  //   res.writeHead(404, { 'Content-Type': 'text/html' });
  //   res.end();
  // }

  // Tenemos todas las respuestas de contenido estatico
  if (req.url?.endsWith('.js')) {
    res.writeHead(200, { 'Content-Type': 'application/javascript' });
  } else if ( req.url?.endsWith('.css')) {
    res.writeHead(200, { 'Content-Type': 'text/css' });
  }

  const responseContent = fs.readFileSync(`./public/${ req.url }`, 'utf-8');
  res.end(responseContent);

});

server.listen(8080, () => {
  console.log('Server running on port 8080');
});

