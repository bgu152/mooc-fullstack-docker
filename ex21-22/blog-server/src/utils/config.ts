import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;
const DB_NAME =
    process.env.NODE_ENV === 'test'
        ? process.env.TEST_DB_NAME
        : process.env.DB_NAME;
const SECRET = process.env.SECRET;

console.log('DB_NAME: ', DB_NAME);

const MONGO_URL = process.env.MONGO_URL || undefined;

export { MONGO_URL, PORT, DB_NAME, SECRET};
