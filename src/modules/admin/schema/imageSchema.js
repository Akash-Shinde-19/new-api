import { ImageTC } from '../models/image';


export const ImageQuery = {
    imageOne: ImageTC.getResolver('findOne'),
    imageMany: ImageTC.getResolver('findMany'),
    imageCount: ImageTC.getResolver('count'),
    imageConnection: ImageTC.getResolver('connection')
};

export const ImageMutation = {
    saveImage: ImageTC.getResolver('saveImage')
};
