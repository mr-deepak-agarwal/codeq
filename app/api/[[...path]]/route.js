import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'

const MONGO_URL = process.env.MONGO_URL
let cachedClient = null

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient
  }
  
  const client = await MongoClient.connect(MONGO_URL)
  cachedClient = client
  return client
}

// Contact form submission
export async function POST(request) {
  try {
    const { pathname } = new URL(request.url)
    
    if (pathname === '/api/contact') {
      const body = await request.json()
      const { name, email, message } = body
      
      if (!name || !email || !message) {
        return NextResponse.json(
          { error: 'All fields are required' },
          { status: 400 }
        )
      }
      
      const client = await connectToDatabase()
      const db = client.db('codeq_portfolio')
      const collection = db.collection('contacts')
      
      const contactEntry = {
        id: uuidv4(),
        name,
        email,
        message,
        createdAt: new Date().toISOString()
      }
      
      await collection.insertOne(contactEntry)
      
      return NextResponse.json(
        { message: 'Contact form submitted successfully', id: contactEntry.id },
        { status: 200 }
      )
    }
    
    return NextResponse.json(
      { error: 'Not found' },
      { status: 404 }
    )
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}

// Get all contacts (admin functionality)
export async function GET(request) {
  try {
    const { pathname } = new URL(request.url)
    
    if (pathname === '/api/contacts') {
      const client = await connectToDatabase()
      const db = client.db('codeq_portfolio')
      const collection = db.collection('contacts')
      
      const contacts = await collection.find({}).sort({ createdAt: -1 }).toArray()
      
      return NextResponse.json(
        { contacts },
        { status: 200 }
      )
    }
    
    if (pathname === '/api/health') {
      return NextResponse.json(
        { status: 'ok', timestamp: new Date().toISOString() },
        { status: 200 }
      )
    }
    
    return NextResponse.json(
      { error: 'Not found' },
      { status: 404 }
    )
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}