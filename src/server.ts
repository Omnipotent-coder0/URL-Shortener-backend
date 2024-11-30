import express, { Application, NextFunction, Request, Response } from 'express';
import { AuthModule } from './AuthModule';
import mongoose from 'mongoose';
import { urlAndMethodLogger } from './shared/logger/urlAndMethodLogger';
import { PageNotFoundError } from './shared/utils/apiError';
import cookieParser from 'cookie-parser';
import { BASE_URL, DATABASE_URL } from './shared/utils/envVariables';
import { UserModule } from './UserModule';
import { checkAuth } from './shared/middlewares/auth.middleware';
class App {
    public app: Application;
    private BASE_URL: string;
    private MONGO_URL: string;
    constructor() {
        const doSetup = async () => {
            this.BASE_URL = BASE_URL;
            this.MONGO_URL = DATABASE_URL;
            this.app = express();
            await this.initializeDatabaseConnection();
            this.initializeMiddlewares();
            this.initializeRoutes();
            this.setErrorHandling();
        }
        doSetup();
    }
    private initializeMiddlewares = () => {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
        this.app.use(urlAndMethodLogger);
    }


    private initializeRoutes = () => {
        this.app.get(`${this.BASE_URL}/hello-world`, (req: Request, res: Response) => {
            res.send("hello world");
        });
        this.app.use(`${this.BASE_URL}/auth`, new AuthModule().router);
        this.app.use(`${this.BASE_URL}/user`, checkAuth , new UserModule().router);
    }

    private setErrorHandling = () => {
        this.app.use((req: Request, res: Response) => {
            const error = new PageNotFoundError("Page not found");
            res.status(error.statusCode).send({
                message: error.message,
                statusCode: error.statusCode,
            });
        });
    };


    private initializeDatabaseConnection = async () => {
        try {
            await mongoose.connect(this.MONGO_URL).then(() => {
                console.log(`Congratulations your application is successfully connected to the database !!`);
            })
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                throw error;
            } else {
                console.log(`Something went wrong while connecting to the Database !!`);
                throw new Error(`Something went wrong while connecting to the Database !!`)
            }
        }
    }

}

export default new App().app;