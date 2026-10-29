import { NextResponse } from 'next/server';
export async function GET(){return NextResponse.json({ok:true,service:'food-donation-platform-api',databaseConfigured:Boolean(process.env.MONGODB_URI),timestamp:new Date().toISOString()});}
