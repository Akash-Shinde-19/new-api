/* @flow */
import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';
import { composeWithMongoose } from '../schema/schemaComposer';
import { schemaComposer, toInputObjectType } from 'graphql-compose';
import { FileSchema, processUpload, FileTC } from './file';
import { GraphQLUpload } from 'apollo-upload-server';
import { createWriteStream, mkdir } from 'fs';
import { uploadToS3 } from '../utils/S3Service';

export const ImageSchema: Schema<any> = new Schema(
    {
        file: {
            type: [FileSchema],
        },
    },
    {
        collection: 'images',
        timestamps: true,
    }
);
export const Image = mongoose.model('Image', ImageSchema);
export const ImageTC = composeWithMongoose<any>(Image);
export const ImageITC = ImageTC.getITC();

ImageTC.addResolver({
    name: 'saveImage',
    type: ImageTC,
    args: {
        file: [GraphQLUpload],
    },
    resolve: async ({ source, args, context, info }) => {
        let img = {
            file: []
        };
        if (args.file != null && args.file != undefined && args.file.length > 0) {
            console.log('file path =' + args.file[0]);

            for (let index = 0; index < args.file.length; index++) {
                const upload = await uploadToS3(args.file[index], '2846176235');
                img.file.push(upload);
            }
            var image = await Image.create(img);
        }
        return image;
    },
});
