import { neon } from '@neondatabase/serverless';

export const getSql = () => {
  let url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error('DATABASE_URL is missing');
  }
  
  // تنظيف الرابط من أي بارامترات قد تسبب مشاكل في Vercel
  if (url.includes('?')) {
    url = url.split('?')[0] + '?sslmode=require';
  } else {
    url += '?sslmode=require';
  }
  
  return neon(url);
};
