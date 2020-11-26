"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteFromS3 = exports.downloadFromS3 = exports.uploadToS3 = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var AWS = _interopRequireWildcard(require("aws-sdk"));

var fs = _interopRequireWildcard(require("fs"));

var BUCKET_NAME = "seecity";
var IAM_USER_KEY = "AKIAJXWAMFKQB7ZRIZQQ";
var IAM_USER_SECRET = "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";
var s3bucket = new AWS.S3({
  accessKeyId: IAM_USER_KEY,
  secretAccessKey: IAM_USER_SECRET
});

var processUpload = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(filename, readStream, mimetype) {
    var params;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            params = {
              Bucket: BUCKET_NAME,
              Key: "Images" + "/" + filename,
              Body: readStream,
              ContentType: mimetype,
              ACL: "public-read"
            };
            return _context.abrupt("return", new Promise(function (resolve, reject) {
              s3bucket.upload(params, function (err, data) {
                readStream.destroy();

                if (err) {
                  return reject(err);
                }

                return resolve(data);
              });
            }));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function processUpload(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var uploadToS3 = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(file, id) {
    var _yield$file, filename, createReadStream, mimetype, readStream, data, obj;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return file;

          case 2:
            _yield$file = _context2.sent;
            filename = _yield$file.filename;
            createReadStream = _yield$file.createReadStream;
            mimetype = _yield$file.mimetype;
            filename = id + '_' + filename;
            _context2.next = 9;
            return createReadStream();

          case 9:
            readStream = _context2.sent;
            readStream.on('data', function (chunk) {
              var temp = chunk.toString('base64'); //console.log("here -> ", JSON.stringify(temp));
            }).on('end', function () {//console.log("end");
            });
            _context2.next = 13;
            return processUpload(filename, readStream, mimetype);

          case 13:
            data = _context2.sent;
            console.log("AWS_Upload: ", data);
            obj = {
              path: data.Location,
              filename: filename,
              mimetype: "image/png"
            };
            return _context2.abrupt("return", obj);

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function uploadToS3(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

exports.uploadToS3 = uploadToS3;

var processDownload = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(file) {
    var params;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            params = {
              Bucket: BUCKET_NAME,
              Key: "Images" + "/" + file.filename
            };
            return _context3.abrupt("return", new Promise(function (resolve, reject) {
              s3bucket.getObject(params, function (err, data) {
                if (err) {
                  return reject(err);
                }

                return resolve(data);
              });
            }));

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function processDownload(_x6) {
    return _ref3.apply(this, arguments);
  };
}();

var downloadFromS3 = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(file) {
    var data, buf, base64;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return processDownload(file);

          case 2:
            data = _context4.sent;
            buf = Buffer.from(data);
            base64 = buf.toString('base64');
            return _context4.abrupt("return", "data:image/jpeg;base64," + base64);

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function downloadFromS3(_x7) {
    return _ref4.apply(this, arguments);
  };
}();

exports.downloadFromS3 = downloadFromS3;

var deleteFromS3 = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(file) {
    var params;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            params = {
              Bucket: BUCKET_NAME,
              Key: "Images" + "/" + file.filename
            };
            return _context5.abrupt("return", new Promise(function (resolve, reject) {
              s3bucket.deleteObject(params, function (err, data) {
                if (err) {
                  alert("failed");
                  return reject(err);
                }

                return resolve(data);
              });
            }));

          case 2:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function deleteFromS3(_x8) {
    return _ref5.apply(this, arguments);
  };
}();

exports.deleteFromS3 = deleteFromS3;