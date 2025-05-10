import express from 'express'
import taskRoute from './routes/handler'

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api',taskRoute);

app.get('/',(req ,res)=>{
    res.send('the Task Manager api is running');
});

app.listen( PORT , ()=> {
    console.log(`the server is running on the port ${PORT}`);
});