import express from 'express';
import path from 'path';

export class Server {

  private app = express();

  async start() {

    //* Middlewares

    //* Public Folder
    // Incluimos el webserver a mostrar
    this.app.use(express.static('public'));
    
    this.app.get('*', (req, res) => {
      // console.log(req.url);
      // res.send('Hola Mundo');

      // Resolvemos lo de recargar la pagina que no sea la ruta principal
      const indexPath = path.join(__dirname + '../../../public/index.html');
      res.sendFile(indexPath);
      return;
    });

    this.app.listen(3000, () => {
      console.log(`Server running on port ${ 3000 }`);
    });

  }

}