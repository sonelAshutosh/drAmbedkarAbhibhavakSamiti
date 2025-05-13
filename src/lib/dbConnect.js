import mongoose from 'mongoose'

const connection = {}

async function dbConnect() {
  if (connection.isConnected) {
    console.log('Already connected to the database')
    return
  }

  try {
    const db = await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.b5kfc.mongodb.net/drAmbedkarAbhibhavakSamiti?retryWrites=true&w=majority&appName=Cluster0` ||
        '',
      {}
    )

    connection.isConnected = db.connections[0].readyState

    console.log('Database connected successfully')
  } catch (error) {
    console.error('Database connection failed:', error)

    process.exit(1)
  }
}

export default dbConnect
