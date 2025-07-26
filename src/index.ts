import app from "./server";
import "dotenv/config"
import { PORT } from "./shared/utils/envVariables";

const portNumber: number = typeof PORT === 'string' ? parseInt(PORT, 10) : PORT;
try {
    app.listen(portNumber, '0.0.0.0', ()=>{
        console.log(`Your server is started successfully on port : ${PORT}`);
    });
} catch (error) {
    if(error instanceof Error){
        console.log(error.message);
        throw error;
    }else{
        console.log(`Something went wrong while initializing the server !!`);
        throw new Error(`Something went wrong while initializing the server !!`)
    }
}
