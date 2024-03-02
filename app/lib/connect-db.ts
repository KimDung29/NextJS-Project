import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config(); 

//  // Access MONGO_URI from environment variables
const uri = process.env.MONGO_URI as string;

const client = new MongoClient(uri);

export const connectdb = async () => {
    await client.connect();
    const database = client.db('nextjs-db');
    return database;
};

export const closeConnectdb = async () => {
    await client.close();
};

export const connectUserTable = async () => {
    const database = await connectdb();
    const collection = database.collection('users');
    return collection;
}