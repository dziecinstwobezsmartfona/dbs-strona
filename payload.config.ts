import { buildConfig } from "payload";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { uploadthingStorage } from "@payloadcms/storage-uploadthing";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";

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
    uploadthingStorage({
      collections: {
        media: true,
      },
      options: {
        token: process.env.UPLOADTHING_TOKEN,
      },
      clientUploads: true,
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
