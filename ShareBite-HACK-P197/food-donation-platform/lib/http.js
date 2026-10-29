import { NextResponse } from 'next/server';
export function jsonError(message,status=400){return NextResponse.json({error:message},{status});}
export function handleError(error){ console.error(error); if(error?.code===11000) return jsonError('An organization with this email already exists.',409); if(error?.name==='ValidationError') return jsonError(error.message,400); if(error?.name==='CastError') return jsonError('Invalid resource ID.',400); return jsonError(process.env.NODE_ENV==='production'?'Request failed. Check server configuration.':(error?.message||'Unexpected server error'),500); }
