"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageITC = exports.ImageTC = exports.Image = exports.ImageSchema = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _schemaComposer = require("../schema/schemaComposer");

var _graphqlCompose = require("graphql-compose");

var _file = require("./file");

var _apolloUploadServer = require("apollo-upload-server");

var _fs = require("fs");

var _S3Service = require("../utils/S3Service");

var ImageSchema = new _mongoose.Schema({
  file: {
    type: [_file.FileSchema]
  }
}, {
  collection: 'images',
  timestamps: true
});
exports.ImageSchema = ImageSchema;

var Image = _mongoose["default"].model('Image', ImageSchema);

exports.Image = Image;
var ImageTC = (0, _schemaComposer.composeWithMongoose)(Image);
exports.ImageTC = ImageTC;
var ImageITC = ImageTC.getITC();
exports.ImageITC = ImageITC;
ImageTC.addResolver({
  name: 'saveImage',
  type: ImageTC,
  args: {
    file: [_apolloUploadServer.GraphQLUpload]
  },
  resolve: function () {
    var _resolve = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
      var source, args, context, info, img, index, upload, image;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              source = _ref.source, args = _ref.args, context = _ref.context, info = _ref.info;
              img = {
                file: []
              };

              if (!(args.file != null && args.file != undefined && args.file.length > 0)) {
                _context.next = 16;
                break;
              }

              console.log('file path =' + args.file[0]);
              index = 0;

            case 5:
              if (!(index < args.file.length)) {
                _context.next = 13;
                break;
              }

              _context.next = 8;
              return (0, _S3Service.uploadToS3)(args.file[index], '2846176235');

            case 8:
              upload = _context.sent;
              img.file.push(upload);

            case 10:
              index++;
              _context.next = 5;
              break;

            case 13:
              _context.next = 15;
              return Image.create(img);

            case 15:
              image = _context.sent;

            case 16:
              return _context.abrupt("return", image);

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function resolve(_x) {
      return _resolve.apply(this, arguments);
    }

    return resolve;
  }()
});