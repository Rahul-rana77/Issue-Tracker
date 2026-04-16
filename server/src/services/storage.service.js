import ImageKit from "@imagekit/nodejs";
import dotenv from 'dotenv';
dotenv.config();

const client = new ImageKit({
    publicKey: `${process.env.IMAGEKIT_PUBLIC_KEY}`,
    privateKey: `${process.env.IMAGEKIT_PRIVATE_KEY}`,
    urlEndpoint: `${process.env.IMAGEKIT_URL_ENDPOINT}`,
});

const uploadFile = async (buffer, fileName) => {

    const result = await client.files.upload({
        file: buffer.toString('base64'),
        fileName: fileName,
    });
    return result;
}

export { uploadFile };