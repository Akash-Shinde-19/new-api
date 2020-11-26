"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageMutation = exports.ImageQuery = void 0;

var _image = require("../models/image");

var ImageQuery = {
  imageOne: _image.ImageTC.getResolver('findOne'),
  imageMany: _image.ImageTC.getResolver('findMany'),
  imageCount: _image.ImageTC.getResolver('count'),
  imageConnection: _image.ImageTC.getResolver('connection')
};
exports.ImageQuery = ImageQuery;
var ImageMutation = {
  saveImage: _image.ImageTC.getResolver('saveImage')
};
exports.ImageMutation = ImageMutation;