import mongoose from 'mongoose';


const dbConnection = async (db) => {
    try {
        mongoose.set('strictQuery', false);
        mongoose.connect(process.env.MONGODB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Connected to Mongo');
    } catch (error) {
        throw new Error('Error connecting to MongoDB: ' + error.message)
    }
}


export default dbConnection