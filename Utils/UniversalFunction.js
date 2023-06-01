const Boom = require("@hapi/boom");
const CONFIG = require("../Config");
const Joi = require("joi");
const randomString = require("randomstring");
const bcrypt = require("bcrypt");
const fs = require("fs");
const Model = require("../Models");
const jwt = require('jsonwebtoken');
// const UploadMultipart = require("../Lib/UploadMultipart");


async function comparePassword(data, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(data, hash, function (err, res) {
      if (err) reject(err);
      else resolve(res);
    });
  });
}

const sendError = function (data) {
  try {
    if (
      typeof data === "object" &&
      data.hasOwnProperty("statusCode") &&
      data.hasOwnProperty("customMessage")
    ) {
      const errorToSend = new Boom.Boom(data.customMessage, { statusCode: data.statusCode });
      errorToSend.output.payload.responseType = data.type;
      return errorToSend;
    } else {
      let errorToSend = "";
      if (typeof data === "object") {
        if (data.name === "MongoError") {
          errorToSend +=
            CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR.DB_ERROR.customMessage;
          if (data.code === 11000) {
            let duplicateValue =
              data.errmsg &&
              data.errmsg.substr(data.errmsg.lastIndexOf('{ : "') + 5);
            duplicateValue = duplicateValue.replace("}", "");
            errorToSend +=
              CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR.DUPLICATE.customMessage +
              " : " +
              duplicateValue;
            //console.log("==================errorToSend==================",data.message)
            if (data.message.indexOf("email_1") > -1) {
              errorToSend =
                CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR.DUPLICATE_EMAIL
                  .customMessage;
            }
          }
        } else if (data.name === "ApplicationError") {
          errorToSend +=
            CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR.APP_ERROR.customMessage +
            " : ";
        } else if (data.name === "ValidationError") {
          errorToSend +=
            CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR.APP_ERROR.customMessage +
            data.message;
        } else if (data.name === "CastError") {
          errorToSend +=
            CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR.DB_ERROR.customMessage +
            CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR.INVALID_ID.customMessage +
            data.value;
        }
      } else {
        errorToSend = data;
      }
      let customErrorMessage = errorToSend;
      if (typeof customErrorMessage === "string") {
        if (errorToSend.indexOf("[") > -1) {
          customErrorMessage = errorToSend.substr(errorToSend.indexOf("["));
        }
        customErrorMessage =
          customErrorMessage && customErrorMessage.replace(/"/g, "");
        customErrorMessage =
          customErrorMessage && customErrorMessage.replace("[", "");
        customErrorMessage =
          customErrorMessage && customErrorMessage.replace("]", "");
      }
      return new Boom.Boom(data, { statusCode: data.statusCode ? 400 : 400 });
    }
  } catch (e) {
  }
};

const authorizationHeaderObj = Joi.object({
  authorization: Joi.string().required(),
}).unknown();

const generateRandomString = function () {
  return randomString.generate(5);
};

const sendSuccess = function (successMsg, data) {
  successMsg =
    successMsg || CONFIG.APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT.customMessage;
  if (
    typeof successMsg === "object" &&
    successMsg.hasOwnProperty("statusCode") &&
    successMsg.hasOwnProperty("customMessage")
  ) {
    return {
      statusCode: successMsg.statusCode,
      message: successMsg.customMessage,
      data: data || null,
    };
  } else {
    return {
      statusCode: 200,
      message: successMsg,
      data: data || null,
    };
  }
};

const userGenericDetailResponse = function(data, isWithToken = false) {

  let { id, user_sid, fullName, userName, countryCode, phoneNumber, email, accessToken, gender, dateOfBirth, profilePicURL, isEmailVerified, isPhoneVerified, isBlocked, refreshToken, addressLine1, addressLine2, bio, city, state, userroles } = data;

  if(profilePicURL)
  {
    profilePicURL = CONFIG.awsS3Config.s3BucketCredentials.s3URL + profilePicURL;
  }
  if(isWithToken)
  {
    return { id, user_sid, fullName, userName, countryCode, phoneNumber, email, accessToken, gender, dateOfBirth, profilePicURL, isEmailVerified, isPhoneVerified, refreshToken, isBlocked, addressLine1, addressLine2, bio, city, state, userroles} ;

  }else{
    return { id, user_sid, fullName, userName, countryCode, phoneNumber, email, gender, dateOfBirth, profilePicURL, isEmailVerified, isPhoneVerified, isBlocked, addressLine1, addressLine2, bio, city, state, userroles} ;

  }
}

const failActionFunction = function (request, h, error) {
  console.log(
    ".............fail action.................",
    error.output.payload.message
  );
  let customErrorMessage = "";
  if (error.output.payload.message.indexOf("[") > -1) {
    customErrorMessage = error.output.payload.message.substr(
      error.output.payload.message.indexOf("[")
    );
  } else {
    customErrorMessage = error.output.payload.message;
  }
  customErrorMessage = customErrorMessage.replace(/"/g, "");
  customErrorMessage = customErrorMessage.replace("[", "");
  customErrorMessage = customErrorMessage.replace("]", "");
  error.output.payload.message = customErrorMessage;
  delete error.output.payload.validation;
  return error;
};

async function getGlobalConfigVar() {
  try {
    let result = await Model.GlobalConfig.findOne();
    if (!result) {
      result = {
        OTPProvider: "textLocal",
        maxOTPPerHour: 5,
        maxOTPExpiryMin: 10
      };
      await Model.GlobalConfig.create({config: result});
    }else{
      result = result.toJSON().config;
    }
    return result;
  } catch (err) {
    return Promise.reject(CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
  }
}

async function uploadImage(image, type) {
  if (Array.isArray(image)) {
    return new Promise((resolve, reject) => {
      let imageData = [],
        len = image.length,
        count = 0;
      image.map(obj => {
        // UploadMultipart.uploadFilesOnS3(obj, type, (err, result) => {
        //   count++;
        //   imageData.push(result);
        //   if (count === len) resolve(imageData);
        // });
      });
    });
  } else {
    return new Promise((resolve, reject) => {
      // UploadMultipart.uploadFilesOnS3(image, type, (err, result) => {
      //   if (err) reject(err);
      //   else resolve(result);
      // });
    });
  }
}

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? (+page - 1) * limit : 0;
  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: results } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { currentPage, totalPages, totalItems, results };
};

const getPaginationCommonValidation = () => {
  return Joi.object({
    page: Joi.number().optional().greater(0),
    search: Joi.string().optional().allow(""),
    size: Joi.number().optional().greater(0)
  })
}

module.exports = {
  failActionFunction,
  sendSuccess,
  sendError,
  comparePassword,
  generateRandomString,
  getGlobalConfigVar,
  userGenericDetailResponse,
  uploadImage,
  getPagination,
  getPagingData,
  getPaginationCommonValidation
};
