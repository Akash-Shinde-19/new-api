"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processUpload = exports.FileTC = exports.FileSchema = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _schemaComposer = require("../schema/schemaComposer");

var _shortid = _interopRequireDefault(require("shortid"));

var _fs = require("fs");

var _apolloUploadServer = require("apollo-upload-server");

var _graphqlCompose = require("graphql-compose");

var FileSchema = new _mongoose.Schema({
  filename: {
    type: String,
    required: true
  },
  mimetype: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  }
}, {
  timestamps: true
}); // const File = model('File', FileSchema);
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

exports.FileSchema = FileSchema;

var FileTC = _graphqlCompose.schemaComposer.createObjectTC({
  name: 'FileTC',
  fields: {
    filename: 'String',
    mimetype: 'String',
    path: 'String'
  }
});

exports.FileTC = FileTC;

var storeUpload = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref, dir) {
    var stream, filename, mimetype, id, path;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            stream = _ref.stream, filename = _ref.filename, mimetype = _ref.mimetype;
            id = _shortid["default"].generate();
            path = dir + "".concat(id, "-").concat(filename);
            console.log(dir);
            console.log(path);
            return _context.abrupt("return", new Promise(function (resolve, reject) {
              return stream.pipe((0, _fs.createWriteStream)(path)).on("finish", function () {
                return resolve({
                  id: id,
                  path: path,
                  filename: filename,
                  mimetype: mimetype
                });
              }).on("error", reject);
            }));

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function storeUpload(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var processUpload = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(upload, path) {
    var _yield$upload, createReadStream, filename, mimetype, stream, file;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log(path);
            _context2.next = 3;
            return upload;

          case 3:
            _yield$upload = _context2.sent;
            createReadStream = _yield$upload.createReadStream;
            filename = _yield$upload.filename;
            mimetype = _yield$upload.mimetype;
            stream = createReadStream();
            _context2.next = 10;
            return storeUpload({
              stream: stream,
              filename: filename,
              mimetype: mimetype
            }, path);

          case 10:
            file = _context2.sent;
            return _context2.abrupt("return", file);

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function processUpload(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();

exports.processUpload = processUpload;