import "reflect-metadata";
import express from 'express';

// import taskRoute from './routes/handler';
import { router as taskRoutes } from './routes/databaseroutes';
import { AppDataStorage } from "./db/config";


const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api',taskRoutes);

AppDataStorage.initialize()
    .then(() => {
        console.log("Database connected successfully");
    
    app.listen(PORT,()=>{
        console.log(`the server is running on the port ${PORT}`);
    })
    })
    .catch((error) => {
        console.log("Error connecting to database:", error);
    });
// app.get('/',(req ,res)=>{
//     res.send('the Task Manager api is running');
// });

app.listen( PORT , ()=> {
    console.log(`the server is running on the port ${PORT}`);
});