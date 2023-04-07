import { PORT } from './utils/config';
// import connectDB from './utils/mongoConnection';
import app from './app';

// connectDB();

app.listen(PORT, () => console.log(`Sever running on port ${PORT}`));
