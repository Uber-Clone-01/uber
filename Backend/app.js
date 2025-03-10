const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');
const mapsRoutes = require('./routes/maps.routes');
const rideRoutes = require('./routes/ride.routes');
const geminiRoutes = require('./routes/gemini.routes');
const ratingRoutes = require('./routes/rating.routes');
const path = require('path');
connectToDb();

const _dirname = path.resolve();
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


app.use('/users',userRoutes);
app.use('/captains',captainRoutes);
app.use('/maps',mapsRoutes);
app.use('/rides',rideRoutes);
app.use('/bot',geminiRoutes);
app.use('/ratings', ratingRoutes);
app.use(express.static(path.join(_dirname, 'frontend/dist')));
app.get('*', (_, res) => {
    res.sendFile(path.resolve(_dirname, "frontend","dist","index.html"));
  })
module.exports =app;