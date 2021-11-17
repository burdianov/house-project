import { v2 as cloudinary } from 'cloudinary';

interface ImageSignature {
  signature: string;
  timestamp: number;
}

export const createSignature = async (): Promise<ImageSignature> => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = await cloudinary.utils.api_sign_request(
    { timestamp },
    process.env.CLOUDINARY_SECRET ?? ''
  );
  return { timestamp, signature };
};
