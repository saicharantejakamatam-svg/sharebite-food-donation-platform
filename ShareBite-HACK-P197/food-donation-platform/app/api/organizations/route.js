import {NextResponse} from 'next/server';
import {z} from 'zod';
import {connectDB} from '@/lib/db'; import {Organization} from '@/lib/models'; import {handleError,jsonError} from '@/lib/http';
const schema=z.object({name:z.string().trim().min(2).max(120),type:z.enum(['donor','recipient']),email:z.string().email(),phone:z.string().max(30).optional(),address:z.string().trim().min(3),description:z.string().max(1000).optional(),dietaryNeeds:z.array(z.string()).optional()});
export async function GET(){try{await connectDB();const data=await Organization.find({type:{$ne:'admin'}}).sort({createdAt:-1}).lean();return NextResponse.json({data});}catch(e){return handleError(e)}}
export async function POST(req){try{const parsed=schema.safeParse(await req.json());if(!parsed.success)return jsonError(parsed.error.issues.map(i=>i.message).join('; '));await connectDB();const org=await Organization.create(parsed.data);return NextResponse.json({data:org}, {status:201});}catch(e){return handleError(e)}}
