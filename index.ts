import express, {Application} from 'express';
import acronymRoutes from './src/routes/acronym.routes';
import { initializeConnectionDatabase, syncAndPopulate } from './src/database';

class App {
    private app: Application;
    private port: string;
    private apiPaths = {
        acronym: '/acronym'
    }

    constructor() {
        this.app = express();
        this.port = '3000';

        // Initialize database connection and populate json file.
        this.connectDb();

        // //Middlewares
        this.middlewares();

        // Define routes
        this.routes();

        // configuration to redirect web app
        // this.app.get('*.*', express.static("public", {maxAge: '1y'}));
        // this.app.all('*', function (req, res) {
        //     res.sendFile('/index.html', {root: "public"});
        // });
    }

    async connectDb(){
        try {
            await initializeConnectionDatabase();
            await syncAndPopulate();
        } catch (error) {
            console.log('Error: ', error);
        }
    }

    middlewares() {
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

const app = new App();
app.listen();