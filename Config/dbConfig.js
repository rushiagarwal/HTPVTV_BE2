require('dotenv').config();

exports.config = {
  PORT: process.env.PORT,
  dbURI: process.env.dbURI,
  dbUserName: process.env.dbUserName,
  dbUserPassword: process.env.dbUserPassword,
  dbCatalogName: process.env.dbCatalogName,
  // emailInvitationUri: process.env.emailInvitationUri
};

// exports.config = {
//   PORT: 3306,
//   dbURI: 'gamedata.cdrluvmrqhlh.us-east-2.rds.amazonaws.com',
//   dbUserName: 'admin', /* MySQL User */
//   dbUserPassword: 'sMOuGumaZuRENtic', /* MySQL Password */
//   dbCatalogName: 'HTPV', /* MySQL Database */
//   emailInvitationUri: ''
// };

