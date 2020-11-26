/* @flow */
import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';
import { composeWithMongoose } from '../schema/schemaComposer';
import { schemaComposer, toInputObjectType } from 'graphql-compose';
import { BasePriceSchema } from './basePrice';
import { PriceDetailSchema } from './priceDetail';
import { AccountTC } from './account';
import { FileSchema, processUpload, FileTC } from './file';
import { GraphQLUpload } from 'apollo-upload-server';
import { createWriteStream, mkdir } from 'fs';
import { SalesAccessSchema } from './salesAccess';
import { TaxSchema } from './tax';
import { FeeSchema } from './fee';
import { uploadToS3 } from '../utils/S3Service';
import { VenueTC } from './venue';

export const ProuctSchema: Schema<any> = new Schema(
  {
    accountId: {
      type: String,
      required: true,
    },
    venueId: {
      type: String,
      required: true,
    },
    categoryId: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: false,
    },
    isActive: {
      type: Boolean,
      required: false,
    },
    startDate: {
      type: Date,
      required: false,
    },
    endDate: {
      type: Date,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    activityType: {
      type: [String],
      required: false,
    },
    shortDescription: {
      type: String,
      required: false,
    },
    longDescription: {
      type: String,
      required: false,
    },
    advanceSaleEndDate: {
      type: Date,
      required: false,
    },
    termsAndConditions: {
      type: String,
      required: false,
    },
    step: {
      type: Number,
      required: false,
    },
    expireDays: {
      type: Number,
      required: false,
    },
    advanceSaleDays: {
      type: Number,
      required: false,
    },
    maxVisit: {
      type: Number,
      required: false,
    },
    salesChannels: {
      type: Array,
      required: false,
    },
    basePricing: [BasePriceSchema],

    priceByPeriod: {
      type: Boolean,
      required: false,
    },
    priceByDay: {
      type: Boolean,
      required: false,
    },
    priceByDayPart: {
      type: Boolean,
      required: false,
    },
    directCommission: {
      type: Number,
      required: false,
    },
    partnerCommission: {
      type: Number,
      required: false,
    },
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'account',
    },
    pricingDetails: [PriceDetailSchema],
    file: {
      type: [FileSchema],
    },
    salesAccess: {
      type: SalesAccessSchema,
      required: false,
    },
    taxes: {
      type: [TaxSchema],
      required: false,
    },
    fees: {
      type: [FeeSchema],
      required: false,
    },
    venue: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'venue',
    },
  },
  {
    collection: 'products',
    timestamps: true,
  }
);
export const Product = mongoose.model('Product', ProuctSchema);
export const ProductTC = composeWithMongoose<any>(Product);
export const ProductITC = ProductTC.getITC();

ProductTC.addResolver({
  name: 'saveProduct',
  type: ProductTC,
  args: {
    product: ProductITC,
    file: [GraphQLUpload],
  },
  resolve: async ({ source, args, context, info }) => {
    var productInput = { ...args.product };
    let prod = {};
    if ((productInput._id != null) & (productInput._id != undefined)) {
      const _product = await Product.findOne({ _id: productInput._id });
      await _product.updateOne(productInput);
      prod = _product;
    } else {
      prod = await Product.create(productInput);
    }

    if (args.file != null && args.file != undefined && args.file.length > 0) {
      console.log('file path =' + args.file[0]);
      var id = prod._id;
      var name = prod.name;
      // mkdir(`images/${id}_${name}/`, { recursive: true }, (err) => {
      //   if (err) throw err;
      // });
      prod.file = [];
      for (let index = 0; index < args.file.length; index++) {
        // const upload = await processUpload(
        //   args.file[index],
        //   `./images/${id}_${name}/`
        // );
        const upload = await uploadToS3(args.file[index], id);
        prod.file.push(upload);
      }
      var productWithFile = await Product.updateOne(
        { _id: id },
        { file: prod.file }
      );
    }
    return prod;
  },
});
ProductTC.addResolver({
  name: 'updateProduct',
  type: ProductTC,
  args: {
    product: ProductITC,
    file: [GraphQLUpload],
  },
  resolve: async ({ source, args, context, info }) => {
    var productInput = { ...args.product };
    var prod = await Product.findById(productInput._id);
    if (prod) {
      var res = await prod.updateOne(productInput);
      if (args.file && args.file.length > 0) {
        prod.file = [];
        console.log('file path =' + args.file[0]);
        var id = prod._id;
        var name = prod.name;
        // mkdir(`images/${id}_${name}/`, { recursive: true }, (err) => {
        //   if (err) throw err;
        // });
        for (let index = 0; index < args.file.length; index++) {
          // const upload = await processUpload(
          //   args.file[index],
          //   `./images/${id}_${name}/`
          // );
          const upload = await uploadToS3(args.file[index], id);
          prod.file.push(upload);
        }
        var productWithFile = await Product.updateOne(
          { _id: id },
          { file: prod.file }
        );
      }
    }
    return prod;
  },
});

ProductTC.addResolver({
  name: 'productById',
  type: ProductTC,
  args: { productId: 'String' },
  resolve: async ({ source, args, context, info }) => {
    return await Product.findOne({ _id: args.productId });
  },
});

ProductTC.addRelation('account', {
  resolver: () => AccountTC.getResolver('findOne'),
  prepareArgs: {
    filter: (source) => ({ _id: source.accountId }),
    skip: null,
    sort: null,
  },
  projection: { account: true },
});

ProductTC.addRelation('venue', {
  resolver: () => VenueTC.getResolver('findOne'),
  prepareArgs: {
    filter: (source) => ({ venueId: source.venueId }),
    skip: null,
    sort: null,
  },
  projection: { venue: true },
});
