import { buildConfig } from "payload";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";
import { s3Storage } from '@payloadcms/storage-s3';

import { S3ClientConfig } from '@aws-sdk/client-s3';

import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users } from "./collections/users/config";
import { Media } from "./collections/Media";
import { Articles } from "./collections/Articles";
import { Schools } from "./collections/Schools";
import { Activities } from "./collections/Activities";


const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const s3Config: S3ClientConfig = {
  endpoint: process.env.AWS_ENDPOINT_URL,
  region: process.env.AWS_DEFAULT_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
};

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      graphics: {
        Logo: '/components/Logo#Logo',
        Icon: '/components/Logo#Icon',
      }
    }
  },
  collections: [Users, Media, Articles, Schools, Activities],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || "",
  }),
  sharp,
  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.AWS_S3_BUCKET_NAME || '',
      config: s3Config,
    }),
  ],
  email: nodemailerAdapter({
    defaultFromAddress: 'noreply@dziecinstwobezsmartfona.pl',
    defaultFromName: 'Dzieciństwo Bez Smartfona',
    transportOptions: {
      host: 'smtp-relay.brevo.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.BREVO_SMTP_USER,
        pass: process.env.BREVO_SMTP_KEY,
      },
    }
  }),
});
