import express from 'express';
import cors from 'cors';
import connectDB from './db/index.js';
const index = express();
import 'dotenv';
import {config} from 'dotenv';
import visaRouter from './routes/visastatus.js';
// import personalInformationRouter from './routes/personalInformation.js';
// import userRouter from './routes/user.js';
import documentRouter from './routes/document.js'

config();
connectDB();

index.use(cors());
index.use(express.urlencoded({ extended: false }));
index.use(express.json());

index.use('/visa', visaRouter);
// index.use('/info', personalInformationRouter);
// index.use('/user', userRouter);
index.use('/documents', documentRouter)

index.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});