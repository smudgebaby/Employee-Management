import express from 'express';
import cors from 'cors';
import connectDB from './db/index.js';
const index = express();
import 'dotenv';
import {config} from 'dotenv';
import visaRouter from './routes/visastatus.js';

import documentRouter from './routes/document.js'
import personalInformationRouter from './routes/personalInformation.js';
import userRouter from './routes/user.js';
import s3Router from './middleware/s3.js';

config();
connectDB();

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};

index.use(cors(corsOptions));
index.use(express.urlencoded({ extended: false }));
index.use(express.json());

index.use('/visa', visaRouter);
index.use('/documents', documentRouter)
index.use('/info', personalInformationRouter);
index.use('/user', userRouter);
index.use('/file', s3Router);

index.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});