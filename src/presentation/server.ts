import express from 'express';
import path from 'path';

interface Options {
  port: number,
  public_path?: string,
}

export class Server {

  private app = express();
  private readonly port: number;
  private readonly publicPath: string;

  constructor(options: Options) {
    const { port, public_path = 'public' } = options;
    this.port = port;
    this.publicPath = public_path;    
  }

  async start() {

    //* Middlewares

    //* Public Folder
    // Incluimos el webserver a mostrar
    this.app.use(express.static(this.publicPath));

    //* Routes
    this.app.get('/api/todos', (req, res) => {

      return res.json([
        { id: 1, test: 'Buy milk', createdAt: new Date() },
        { id: 2, test: 'Buy bread', createdAt: null },
        { id: 3, test: 'Buy butter', createdAt: new Date() },
      ]);

    });

    
    //* SPA
    this.app.get('*', (req, res) => {
      // console.log(req.url);
      // res.send('Hola Mundo');

      // Resolvemos lo de recargar la pagina que no sea la ruta principal
      const indexPath = path.join(__dirname + `../../../${ this.publicPath }/index.html`);
      res.sendFile(indexPath);
      return;
    });

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${ this.port }`);
    });

  }

}