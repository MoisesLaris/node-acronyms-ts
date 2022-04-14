import express, {Application} from 'express';
import acronymRoutes from './src/routes/acronym.routes';

class App {
    private app: Application;
    private port: string;
    private apiPaths = {
        acronym: '/acronym'
    }

    constructor() {
        this.app = express();
        this.port = '3000';

        // //Conexión a la base de datos
        // this.connectDb();

        // //Concexión con Fczirebase
        // this.firebaseConection();

        // //Middlewares
        // this.middlewares();


        // //Definir las rutas
        // this.routes();
        // configuration to redirect web app
        // this.app.get('*.*', express.static("public", {maxAge: '1y'}));
        // this.app.all('*', function (req, res) {
        //     res.sendFile('/index.html', {root: "public"});
        // });
    }

    // async connectDb(){
    //     await mongoConnection();
    // }

    middlewares() {
        // CORS
        // this.app.use(cors());

        // this.app.use(compression());
        //Lectura del body
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.apiPaths.acronym, acronymRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port: ' + this.port);
        });
    }
}