import express, {Application} from 'express';
import acronymRoutes from './src/routes/acronym.routes';
import authRoutes from './src/routes/auth.routes';
import { initializeConnectionDatabase, syncAndPopulate } from './src/database';
import 'dotenv/config';

class App {
    private app: Application;
    private port: string;
    private apiPaths = {
        acronym: '/acronym',
        auth: '/auth',
    }

    constructor() {
        this.app = express();
        this.port = process.env.NODE_PORT || '3000';

        // Initialize database connection and populate json file.
        this.connectDb();

        // Middlewares
        this.middlewares();

        // Define routes
        this.routes();
    }

    async connectDb(){
        try{
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
        this.app.use(this.apiPaths.auth, authRoutes);
        this.app.all('*', (req, res) => {
            res.sendStatus(404);
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on porteishon: ' + this.port);
        });
    }
}

const app = new App();
app.listen();