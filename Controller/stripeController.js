const UniversalFunctions = require("../Utils/UniversalFunction");
const Config = require("../Config");
const stripe = require('stripe')('sk_test_51N6v2gSGhmLI0r4AKJRgHHM3E3My2jzOEbcwHco6ixiVS6PiVz21eck8sEPIb6qMNNjWR9g0rCsMpLX3Ltmao7WL00pFWQ7ODC');




async function stripeWebhook(req, res) {
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
           const  clientReferenceId  = webhookEvent.data.object.client_reference_id;
           const cliendid = parseInt(clientReferenceId, 10);
           const connection = mysql.createConnection(dbConfig);
           try{
              connection.execute('INSERT INTO UsersTransactions (UserID,CreatedDateTime,ModifiedDateTime,EventType,PaymentInvoicepdfurl) VALUES (?,?,?,?,?)',
                 [cliendid,new Date(), new Date(),"checkout.session.completed",""]);
              connection.end();
           }
           catch (error){
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
   
}
