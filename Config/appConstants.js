const SERVER = {
  APP_NAME: "IQarena App",
  JWT_SECRET_KEY: "MaEHqzXzdWrCS6TS",
  JWT_ISSUER_NAME: "NIVEDHA_APP",
  JWT_AUDIANCE_NAME: "NIVEHDA_TEAM",
  JWT_EXPIRY_TIME: "1m",
  JWT_REFRESH_TOKEN_EXPIRY_TIME: "7d",
  JWT_REFRESH_TOKEN_KEY: "EHaMyzNzd6rCSpTS",
  THUMB_WIDTH: 50,
  THUMB_HEIGHT: 50,
  otpEmail: {
    subject: "OTP Verification",
    body: `<p>Hi</p><p>Here's the IQArena OTP - <b>{otp}</b> </p>`,
  }, emailVerification: {
    subject: "Nivedha Email Verification",
    body: `<p>Hi</p><p>Here's the Nivedha Email Verification Link <a href="{link}">Click here</a></p>`,
  }, emailVerificationSuccess: {
    subject: "Nivedha Email Verification Successfully",
    body: `<p>Hi {fullName} </p><p>Thank you for verifing mail.</p><p> Welcom To Nivedha Club </p>`,
  },
  contactUsEmail: {
    subject: "Contact Us",
    body: `<p>Hi</p><p>Thank you for reaching out to us.</p>`,
  },
  hrEmail: {
    subject: "HR",
    body: `<p>Hi</p><p>Thank you for reaching out to us.</p>`,
  },
  inviteEmail: {
    subject: "You have been Invited",
    body: `<p>Hi</p><p>Here's link to complete the registration <a href="{userId}">Complete Signup</a></p>`,
  },
  subscriptionEmail: {
    subject: "Welcome onboard with IQArena",
    body: `<p>Hello, </p> <p>Thank you for joinnig Email Subscription</p>`,
  },
  otpSms:
    "OTP is {otp} Use it to verify your mobile number on IQarena. qR+fqW5I2Nm",
  // payOutSuccessful: `Dear {name},
  // Your transaction of *₹{amount}* has been successfully transferred to your bank account.
  // Thanks for being part of IQarena Family. For any support feel free to contact support@iqarena.in`,
  payOutSuccessful: `Dear {name},
  Your transaction of *₹{amount}* has been successfully initiated to your bank account. You will receive in next 48 hours.
  Thanks for being part of IQarena Family. For any support feel free to contact support@iqarena.in`,
  refferalPercentage: 10,
  examQuestionPadding: 1,
  winningTAXPercentage: 31.2,
  taxableAmount: 10000,
  minimumPayoutAmount: 400,
  uniquePaperSet: 5
};

const DATABASE = {
  TRANSECTION_STATUS: {
    PENDING: "PENDING",
    DECLINED: "DECLINED",
    SUCCESS: "SUCCESS",
  },
  PLATFORMS: ["android", "ios", "web"],
  PROFILE_PIC_PREFIX: {
    ORIGINAL: "images/Pic_",
    THUMB: "thumbs/Thumb_",
  },
  DEVICE_TYPES: {
    IOS: "IOS",
    ANDROID: "ANDROID",
  },
  CONTACT_TYPE: {
    LEAD: 1,
    CUSTOMER: 2,
    OTHER: 3,
  },
  USER_TYPE: {
    ADMIN: "ADMIN",
    USER: "USER",
  },
  OTP_TYPE: {
    EMAIL_VERIFICATION: "EMAIL_VERIFICATION",
    FORGOT_PASSWORD: "FORGOT_PASSWORD",
    PHONE_VERIFICATION: "PHONE_VERIFICATION",
  },
  SHARE_ON: {
    FACEBOOK: 0,
    TWITTER: 1,
    TEXT_EMAIL: 2,
    OTHERS: 3,
  },
  STATUS_TYPES: {
    ACTIVE: 1,
    INACTIVE: 2,
    DELETE: 3,
    BLOCKED: 4,
    SUSPENDED: 5
  },
};

const STATUS_MSG = {
  ERROR: {
    EMAIL_OR_PHONE_REQUIRED: {
      statusCode: 400,
      customMessage: "Email or Phone number required",
      type: "EMAIL_OR_PHONE_REQUIRED",
    },
    DOB_MISSING: {
      statusCode: 405,
      customMessage: "Date of birth is missing",
      type: "DATE_OF_BIRTH_IS_MISSING",
    },
    PAYOUT_DISABLED: {
      statusCode: 405,
      customMessage: "You are required to do manual verification. After successful verification you will be able to participate again. Please contact us on +91 9913431431",
      type: "PAYOUT_DISABLED",
    },
    DOB_NOT_ELIGIBLE: {
      statusCode: 400,
      customMessage: `Only age group b/w {{minAge}} to {{maxAge}} are allowed to participate in this exam`,
      type: "DATE_OF_BIRTH_IS_NOT_ELIGIBLE",
    },
    TOKEN_EXPIRED: {
      statusCode: 401,
      customMessage: "Your session has expired. Please login again.",
      type: "TOKEN_ALREADY_EXPIRED",
    },
    OTP_EXPIRED: {
      statusCode: 400,
      customMessage: "Your otp has expired.",
      type: "OTP_ALREADY_EXPIRED",
    },
    BLOCKED: {
      statusCode: 405,
      customMessage:
        "This account is blocked by Admin. Please contact support team to activate your account.",
      type: "BLOCKED",
    },
    ALREADY_ENROLLED: {
      statusCode: 405,
      customMessage: "already enrolled in exam",
      type: "ALREADY_ENROLLED",
    },
    NOT_VERIFIED: {
      statusCode: 405,
      customMessage: "Account is not verified",
      type: "NOT_VERIFIED",
    },
    DB_ERROR: {
      statusCode: 400,
      customMessage: "DB Error : ",
      type: "DB_ERROR",
    },
    INVALID_PASSWORD: {
      statusCode: 400,
      customMessage: "Password you have entered does not match.",
      type: "INVALID_PASSWORD",
    },
    INVALID_EMAIL: {
      statusCode: 400,
      customMessage: "Email you have entered does not exist.",
      type: "INVALID_EMAIL",
    },
    EMAIL_ALREADY_VERIFIED_ADDED: {
      statusCode: 400,
      customMessage: "Email with your account is already registered with us.",
      type: "EMAIL_ALREADY_VERIFIED_ADDED",
    },
    EMAIL_ALREADY_EXIST: {
      statusCode: 400,
      customMessage: "Email you have entered is already registered with us.",
      type: "EMAIL_ALREADY_EXIST",
    },
    USERNAME_ALREADY_EXIST: {
      statusCode: 400,
      customMessage: "Username you have entered is already registered with us.",
      type: "USERNAME_ALREADY_EXIST",
    },
    MOBILE_ALREADY_EXIST: {
      statusCode: 400,
      customMessage:
        "Mobile number you have entered is already registered with us.",
      type: "MOBILE_ALREADY_EXIST",
    },
    ACCOUNT_APPROVED: {
      statusCode: 400,
      customMessage:
        "Your payment accepted account is not activated by admin.Please wait for the activation.If not registered, then go to profile and complete the verify payment request.",
      type: "ACCOUNT_APPROVED",
    },
    FULLNAME: {
      statusCode: 400,
      customMessage: "Spaces are not allowed in full name.",
      type: "FULLNAME",
    },
    LINK_EXPIRE: {
      statusCode: 400,
      customMessage:
        "This link is expired, Kindly resubmit your email to get new link.",
      type: "ALREADY_EXIST",
    },
    USERNAME_EXIST: {
      statusCode: 400,
      customMessage: "User name you have entered is already taken.",
      type: "USERNAME_EXIST",
    },
    USER_NOT_FOUND: {
      statusCode: 400,
      customMessage: "User not found.",
      type: "USER_NOT_FOUND",
    },
    USER_EXIST: {
      statusCode: 400,
      customMessage: "This user is already exists.",
      type: "USER_EXIST",
    },
    EMAIL_ALREADY_EXIST: {
      statusCode: 400,
      customMessage: "Email already exist",
      type: "EMAIL_EXIST",
    },
    PHONE_ALREADY_EXIST: {
      statusCode: 400,
      customMessage: "Mobile number already exist",
      type: "PHONE_ALREADY_EXIST",
    },
    IMP_ERROR: {
      statusCode: 500,
      customMessage: "Implementation error",
      type: "IMP_ERROR",
    },
    APP_ERROR: {
      statusCode: 400,
      customMessage: "Application Error",
      type: "APP_ERROR",
    },
    INVALID_ID: {
      statusCode: 400,
      customMessage: "Invalid Id Provided : ",
      type: "INVALID_ID",
    },
    DUPLICATE: {
      statusCode: 400,
      customMessage: "Duplicate Entry",
      type: "DUPLICATE",
    },
    ALREADY_VERIFIED: {
      statusCode: 400,
      customMessage: "Already Verified",
      type: "ALREADY_VERIFIED",
    },
    ALREADY_SUBMITED: {
      statusCode: 400,
      customMessage: "Already Submited",
      type: "ALREADY_SUBMITED",
    },
    USERNAME_INVALID: {
      statusCode: 400,
      customMessage: "Username you have entered does not match.",
      type: "USERNAME_INVALID",
    },
    INVALID_PHONE_EMAIL: {
      statusCode: 400,
      customMessage: "No user exist with provided Phone or email",
      type: "INVALID_PHONE_EMAIL",
    },
    INVALID_OTP: {
      statusCode: 400,
      customMessage: "The OTP you have entered does not match or expired",
      type: "INVALID_OTP",
    },
    MAX_OTP_LIMIT_REACHED: {
      statusCode: 400,
      customMessage: "Max OTP limit reached try again after some time.",
      type: "MAX_OTP_LIMIT_REACHED",
    },
    INVOICE_ERROR: {
      statusCode: 400,
      customMessage: "Invoice not Found.",
      type: "INVOICE_ERROR",
    },
    ALREADY_CANCEL: {
      statusCode: 400,
      customMessage: "This request has been already cancelled by the user.",
      type: "ALREADY_CANCEL",
    },
    INVALID_TOKEN: {
      statusCode: 400,
      customMessage: "The token you have entered does not match.",
      type: "INVALID_TOKEN",
    },
    REFRESH_TOKEN_EXPIRED: {
      statusCode: 400,
      customMessage: "The refresh token is expired.",
      type: "REFRESH_TOKEN_EXPIRED",
    },
    SAME_PASSWORD: {
      statusCode: 400,
      customMessage: "New password can't be same as Old password.",
      type: "SAME_PASSWORD",
    },
    INCORRECT_OLD_PASSWORD: {
      statusCode: 400,
      customMessage: "Old password you have entered does not match.",
      type: "INCORRECT_OLD_PASSWORD",
    },
    NOT_EXIST: {
      statusCode: 400,
      customMessage: "The record does not exist",
      type: "NOT_EXIST",
    },
    NOT_APPROVED: {
      statusCode: 400,
      customMessage: "Your profile is not approved by admin.",
      type: "NOT_APPROVED",
    },
    PRODUCT_ERROR: {
      statusCode: 400,
      customMessage: "Product/Service data not found",
      type: "PRODUCT_ERROR",
    },
    NOT_ALLOWED: {
      statusCode: 400,
      customMessage: "You are not allowed to execute this operatoin",
      type: "NOT_ALLOWED",
    },
    FILE_TYPE_NOT_ALLOWED: {
      statusCode: 400,
      customMessage: "File type not allowed",
      type: "INVALID_REQUEST",
    },
    EXAM_NOT_FOUND: {
      statusCode: 400,
      customMessage: "Exam not found",
      type: "EXAM_NOT_FOUND",
    },
    NOT_FOUND: {
      statusCode: 400,
      customMessage: "Not found",
      type: "NOT_FOUND",
    },
    EXAM_SLOTS_FULL: {
      statusCode: 400,
      customMessage: "Exam Slots are full",
      type: "EXAM_SLOTS_FULL",
    },
    EXAM_SCHEDULED_ALREADY: {
      statusCode: 400,
      customMessage: "Exam Scheduled already",
      type: "EXAM_SCHEDULED_ALREADY",
    },
    NOT_ENROLLED: {
      statusCode: 400,
      customMessage: "not enrolled in exam",
      type: "NOT_ENROLLED",
    },
    NOT_ENOUGH_MONEY: {
      statusCode: 400,
      customMessage: "Not enough Wallet Balance to enroll into exam",
      type: "LOW_WALLET_BALANCE",
    },
    MAXIMUM_LIMIT_EXCEEDED: {
      statusCode: 400,
      customMessage: "You have exceeded maximum\n exams limit of {Month}",
      type: "MAXIMUM_LIMIT_EXCEEDED",
    },
    ALREADY_FOLLOWING: {
      statusCode: 400,
      customMessage: "Already following user",
      type: "ALREADY_FOLLOWING",
    },
    NOT_ALLOWED_SELF_FOLLOWING: {
      statusCode: 400,
      customMessage: "Not allowed to follow yourself",
      type: "NOT_ALLOWED_SELF_FOLLOWING",
    },
    NOT_FOLLOWING: {
      statusCode: 400,
      customMessage: "Already not following user",
      type: "NOT_FOLLOWING",
    },
    USER_NOT_FOLLOWING_YOU: {
      statusCode: 400,
      customMessage: "User Already not following you",
      type: "NOT_FOLLOWING",
    },
    SOMETHING_WENT_WRONG: {
      statusCode: 400,
      customMessage: "Something went wrong. Please try again",
      type: "SOMETHING_WENT_WRONG",
    },
  },
  SUCCESS: {
    CREATED: {
      statusCode: 200,
      customMessage: "Created Successfully",
      type: "CREATED",
    },
    DOB_CHANGE_REQUEST_SUBMITED: {
      statusCode: 200,
      customMessage: "Birthdate change request received, You will get update within 24 hours",
      type: "DOB_CHANGE_REQUEST_SUBMITED",
    },
    SUBSCRIBED_SUCCESSFFULLY: {
      statusCode: 200,
      customMessage: "Subscribed  Successfully",
      type: "SUBSCRIBED_SUCCESSFFULLY",
    },
    SUBSCRIBED_ALREADY: {
      statusCode: 200,
      customMessage: "Already Subscribed",
      type: "SUBSCRIBED_ALREADY",
    },
    ACCOUNT_DELETED: {
      statusCode: 200,
      customMessage:
        "IQarena Team will review the request and process within 48 hours",
      type: "DEFAULT",
    },
    DEFAULT: {
      statusCode: 200,
      customMessage: "Success",
      type: "DEFAULT",
    },
    PHONE_NOT_EXIST: {
      statusCode: 400,
      customMessage: "Mobile number does not exists.",
      type: "PHONE_NOT_EXIST",
    },
    EMAIL_NOT_EXIST: {
      statusCode: 400,
      customMessage: "This Email not exists.",
      type: "USER_NOT_EXIST",
    },
    UPDATED: {
      statusCode: 200,
      customMessage: "Updated Successfully",
      type: "UPDATED",
    },
    LOGOUT: {
      statusCode: 200,
      customMessage: "Logged Out Successfully",
      type: "LOGOUT",
    },
    DELETED: {
      statusCode: 200,
      customMessage: "Deleted Successfully",
      type: "DELETED",
    },
    REGISTER: {
      statusCode: 200,
      customMessage: "Register Successfully",
      type: "REGISTER",
    },
    USER_NOT_EXIST: {
      statusCode: 200,
      customMessage: "This user dose not exists.",
      type: "USER_NOT_EXIST",
    },
    RESPONSE_CREATED: {
      statusCode: 200,
      customMessage: "Your reuqest submitted Successfully",
      type: "RESPONSE_CREATED",
    },
    SEARCH_CLEARED: {
      statusCode: 200,
      customMessage: "Your search results cleared Successfully",
      type: "SEARCH_CLEARED",
    },
  },
};

const swaggerDefaultResponseMessages = {
  200: { description: "Success" },
  400: { description: "Bad Request" },
  401: { description: "Unauthorized" },
  404: { description: "Data Not Found" },
  500: { description: "Internal Server Error" },
};

let APP_CONSTANTS = {
  SERVER: SERVER,
  DATABASE: DATABASE,
  STATUS_MSG: STATUS_MSG,
  swaggerDefaultResponseMessages: swaggerDefaultResponseMessages,
};

module.exports = APP_CONSTANTS;
