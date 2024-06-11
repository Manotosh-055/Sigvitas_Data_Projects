const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const cors = require('cors');
const connectDB = require('./config/db');
const userRouter = require('./routes/userRoute');
const dataRouter = require('./routes/dataRoute');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
app.use(cors());
const DATABASE_URL = process.env.MONGO_URI;
connectDB(DATABASE_URL);
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send("<h1>API is running Successfully</h1>");
})

app.use('/api/user',userRouter);
app.use('/api/data',dataRouter);

app.use(notFound);
app.use(errorHandler);


app.listen(5000, console.log(`Server is statrted at PORT ${PORT}`));