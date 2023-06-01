const express = require('express');
const cors = require('cors');
//const jwt = require('jsonwebtoken');
const auth0 = require('auth0');
const mysql = require('mysql2');
const app = express();
const bcrypt = require("bcryptjs");
//const ManagementClient = require('auth0').ManagementClient;
const AuthenticationClient = require('auth0').AuthenticationClient;

app.use(cors());
// require('./swagger');
const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');
const stripe = require('stripe')('sk_test_51N6v2gSGhmLI0r4AKJRgHHM3E3My2jzOEbcwHco6ixiVS6PiVz21eck8sEPIb6qMNNjWR9g0rCsMpLX3Ltmao7WL00pFWQ7ODC');

// Initialize Auth0 management API client
const auth0Client = new auth0.AuthenticationClient({
  domain: 'dev-j4r00zlzu5nbx3mk.us.auth0.com',
  clientId: 's0LpBdVDArwX0RNGAfZ8uyMesPP6p3eZ',
  clientSecret: 'IRt_gbR84PL2-AKDngw0P2mlzb2QEo-yjqwng-to_2fEAID383H98KUlp9QRBXsu',
  scope: 'read:users create:users'
});

// MySQL database configuration
const dbConfig = {
  host: 'gamedata.cdrluvmrqhlh.us-east-2.rds.amazonaws.com',
  user: 'admin', /* MySQL User */
  password: 'sMOuGumaZuRENtic', /* MySQL Password */
  database: 'HTPV' /* MySQL Database */,
  port: 3306
};

app.use(express.json())

// const checkJwt =  auth({
//   issuer: 'https://dev-j4r00zlzu5nbx3mk.us.auth0.com',
//   audience: 'https://localhost:3010',
//   secret: 'HTBV',
//   tokenSigningAlg: 'HS256',
// })

app.get('/api/public', function (req, res) {
  const connection = mysql.createConnection(dbConfig);
  connection.query('SELECT * FROM Users', (err, rows) => {
    if (err) {
      console.error('Error executing MySQL query:', err.stack);
      return;
    }

    console.log('Data received from MySQL database:');
    //console.log(rows);
    res.json(rows);
  });

  connection.end();
});

app.get('/api/private', function (req, res) {
  checkJwt(req, res)
});

app.get('/api/health', function (req, res) {
  console.log('health checked');
  return res.json({ 'working': true });
});

// IF present the retrieve else add then retrieve user.
app.post('/api/signup', async (req, res) => {
  const { firstname, lastname, email, password, address, picture, locale, updated_at, email_verified, sub } = req.body;
  try {
    const connection = mysql.createConnection(dbConfig);
    connection.query('SELECT * FROM `Users` WHERE `email` = ?', email, async function (err, results) {
      if (results.length > 0) {
        res.send(results[0])
      }
      else {
        const result = await connection.execute('INSERT INTO Users (FirstName, LastName,Email,Password,Address,CreatedDateTime,ModifiedDateTime,Picture,Locale,UpdatedAt,EmailVerified,Sub) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)', [firstname, lastname, email, password, address, new Date(), new Date(), picture, locale, updated_at, email_verified, sub]);
        connection.query('SELECT * FROM `Users` WHERE `email` = ?', email, async function (err, results) {
          if (results.length > 0) {
            res.send(results[0]);
          }
        });
      }
      await connection.end();
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to create user');
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const { firstname, lastname, email, password, address } = req.body;
    const user = await auth0.authorization({
      firstname,
      lastname,
      email,
      password,
      address,
      connection: 'Username-Password-Authentication'
    });
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating user');
  }
});

// Login API endpoint
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  // Check user credentials in the MySQL database
  try {
    const connection = mysql.createConnection(dbConfig);
    // with placeholder
    connection.query(
      'SELECT * FROM `Users` WHERE `email` = ?',
      username,
      async function (err, results) {
        if (results.length > 0) {
          const pass = await bcrypt.compare(password, results[0].Password);
          if (pass) {
            const user = results[0];
            //return res.send(user);
            // Generate JWT token
            const token = jwt.sign({ sub: user.id }, 'HTBV', { algorithm: 'HS256' }); // Secret key = HTBV
            res.json({ access_token: token });
          }
          else {
            return res.status(401).send('Invalid credentials');
          }
        }
        else {
          return res.status(401).send('No User found for given credentials.');
        }

      }
    );
    //console.log(rows)
    await connection.end();


  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to authenticate user');
  }
});

// Get User By ID
app.get('/api/user/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const connection = mysql.createConnection(dbConfig);
    // with placeholder
    connection.query(
      'SELECT * FROM `Users` WHERE `UserID` = ?',
      [id],
      function (err, results) {//fields as paramter in function
        const user = results[0];
        console.log(user)
        if (!user) {
          return res.status(401).send('User not found');
        }
        res.send(user);
      }
    );
    //console.log(rows)
    await connection.end();
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong');
  }
});




// Define the protected endpoint
app.get('/protected', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];

  try {
    // Verify the JWT token with the secret key
    const decodedToken = jwt.verify(token, 'HTBV');

    res.status(200).json({ message: 'Authenticated user', user: decodedToken });
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

function checkJwt(req, res) {
  const token = req.headers.authorization.split(' ')[1];

  try {
    // Verify the JWT token with the secret key
    const decodedToken = jwt.verify(token, 'HTBV');
    return true;
    //res.status(200).json({ message: 'Authenticated user', user: decodedToken });
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized' });
  }
}

// function encrypt(text) {
//   let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
//   let encrypted = cipher.update(text);
//   encrypted = Buffer.concat([encrypted, cipher.final()]);
//   return {
//     iv: iv.toString('hex'),
//     encryptedData: encrypted.toString('hex')
//   };
// }
// function decrypt(text) {
//   let iv = Buffer.from(text.iv, 'hex');
//   let encryptedText = Buffer.from(text.encryptedData, 'hex');

//   let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);

//   let decrypted = decipher.update(encryptedText);
//   decrypted = Buffer.concat([decrypted, decipher.final()]);

//   return decrypted.toString();
// }
// Start the server

// Define your webhook endpoint
app.post('/api/webhook', async (req, res) => {
  const event = req.body;
  console.log(event);
  try {
    // Verify the event using your Stripe secret key
    const signature = req.headers['stripe-signature'];
    const webhookEvent = stripe.webhooks.constructEvent(req.rawBody, signature, 'whsec_kud5qk9cLaNoMDoaLjWKKO4fJSEerTm1');

    // Handle the Stripe webhook event
    switch (webhookEvent.type) {
      case 'checkout.session.completed':
        // Handle the completed session event
        const clientReferenceId = webhookEvent.data.object.client_reference_id;
        const cliendid = parseInt(clientReferenceId, 10);
        const connection = mysql.createConnection(dbConfig);
        try {
          // connection.query('SELECT * FROM `Users` WHERE `UserID` = ?',cliendid,async function (err, results) {
          //   if(results)
          //   {

          //   }

          // });
          connection.execute('INSERT INTO UsersTransactions (UserID,CreatedDateTime,ModifiedDateTime,EventType,PaymentInvoicepdfurl) VALUES (?,?,?,?,?)',
            [cliendid, new Date(), new Date(), "checkout.session.completed", ""]);
          connection.end();
        }
        catch (error) {
          console.error(error);
        }

        console.log('Checkout session completed:', cliendid);
        break;

      case 'payment_intent.succeeded':
        // Handle the payment succeeded event
        console.log('Payment succeeded:', webhookEvent.data.object);
        break;

      // Add more cases to handle other Stripe webhook events if needed

      default:
        console.log(`Unhandled event type: ${webhookEvent.type}`);
    }

    res.sendStatus(200);
  } catch (error) {
    console.error('Error handling webhook event:', error);
    res.sendStatus(200);
  }
});


app.listen(8000)
console.log('Listening on http://localhost:8000');
