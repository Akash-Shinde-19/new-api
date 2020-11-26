/* @flow */
import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';
import { composeWithMongoose } from '../schema/schemaComposer';
import shortid from "shortid";
import { createWriteStream, mkdir } from "fs";
import { GraphQLUpload } from 'apollo-upload-server';
import { schemaComposer } from 'graphql-compose';

export const FileSchema: Schema<any> = new Schema({
  filename: {
      type: String,
      required: true,
    },
    mimetype:
{
    type:String,
    required:true
},
path: {
    type:String,
    required:true
}},

  {
    timestamps: true,
  }
);
// const File = model('File', FileSchema);
// export const FileTC = composeWithMongoose<any>(File);
// export const FileITC=FileTC.getITC();
// FileTC.addResolver({
//     name: 'uploadFile',
//     type: FileTC,
//     args: { file: GraphQLUpload },
//     resolve: async ({ source, args, context, info }) => {
//       console.log(args.file);
    
//         mkdir("images", { recursive: true }, err => {
//           if (err) throw err;
//         });
  
//         const upload = await processUpload(args.file);
//         await File.create(upload);
//         return upload;
   
//   }
// });
export const FileTC=schemaComposer.createObjectTC({
  name: 'FileTC',
  fields: {
    filename: 'String',
    mimetype: 'String',
    path: 'String',
  }
});
  const storeUpload = async ({ stream, filename, mimetype },dir) => {
    const id = shortid.generate();
    const path = dir+`${id}-${filename}`;
  console.log(dir);
  console.log(path);
    return new Promise((resolve, reject) =>
      stream
        .pipe(createWriteStream(path))
        .on("finish", () => resolve({ id, path, filename, mimetype }))
        .on("error", reject)
    );
  };
  
  export const processUpload = async (upload,path) => {
      console.log(path);
      
    const { createReadStream, filename, mimetype } = await upload;
    const stream = createReadStream();
    const file = await storeUpload({ stream, filename, mimetype },path);
    return file;
  };