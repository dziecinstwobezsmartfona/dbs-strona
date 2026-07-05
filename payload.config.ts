import { buildConfig } from "payload";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { BlocksFeature, defaultEditorFeatures, lexicalEditor } from "@payloadcms/richtext-lexical";
import { brevoAdapter } from "./lib/BrevoAdapter";
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
import { YouTubeBlock } from "./blocks/YouTube";


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
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      BlocksFeature({ blocks: [YouTubeBlock] }),
    ],
  }),
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
  email: brevoAdapter({
    apiKey: process.env.BREVO_API_KEY || '',
    defaultFromAddress: 'noreply@dziecinstwobezsmartfona.pl',
    defaultFromName: 'Dzieciństwo Bez Smartfona',
  }),
});
