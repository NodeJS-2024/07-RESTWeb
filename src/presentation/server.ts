import express, { Router } from 'express';
import compression from 'compression';
import path from 'path';

interface Options {
  port: number,
  routes: Router,
  public_path?: string,
}

export class Server {

  public readonly app = express();
  private serverListener?: any;
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port, routes, public_path = 'public' } = options;
    this.port = port;
    this.publicPath = public_path;
    this.routes = routes;
  }

  async start() {

    //* Middlewares
    this.app.use(express.json()); // raw
    this.app.use(express.urlencoded({ extended: true })); // permite el x-www-form-urlencoded
    this.app.use(compression()); // mejora la respuesta

    //* Public Folder
    // Incluimos el webserver a mostrar
    this.app.use(express.static(this.publicPath));

    //* Routes
    this.app.use(this.routes);    
    
    //* SPA
    this.app.get('*', (req, res) => {
      // console.log(req.url);
      // res.send('Hola Mundo');

      // Resolvemos lo de recargar la pagina que no sea la ruta principal
      const indexPath = path.join(__dirname + `../../../${ this.publicPath }/index.html`);
      res.sendFile(indexPath);
      return;
    });

    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running on port ${ this.port }`);
    });

  }
  
  public close() {
    this.serverListener?.close();
  }
  
}