// import paypal from '@paypal/checkout-server-sdk';
// import dotenv from 'dotenv';

// dotenv.config();

// // PayPal environment setup
// const environment = new paypal.core.SandboxEnvironment(
//   process.env.PAYPAL_CLIENT_ID,
//   process.env.PAYPAL_CLIENT_SECRET
// );
// const client = new paypal.core.PayPalHttpClient(environment);

// // Create an order
// export const createOrder = async (req, res) => {
//   const { amount, currency } = req.body;

//   if (!amount || !currency) {
//     return res.status(400).json({ message: 'Amount and currency are required' });
//   }

//   const request = new paypal.orders.OrdersCreateRequest();
//   request.prefer('return=representation');
//   request.requestBody({
//     intent: 'CAPTURE',
//     purchase_units: [
//       {
//         amount: {
//           currency_code: currency,
//           value: amount,
//         },
//       },
//     ],
//   });

//   try {
//     const order = await client.execute(request);
//     res.status(201).json({ orderID: order.result.id });
//   } catch (error) {
//     console.error('Error creating PayPal order:', error);
//     res.status(500).json({ message: 'Failed to create PayPal order', error: error.message });
//   }
// };

// // Capture an order
// export const captureOrder = async (req, res) => {
//   const { orderID } = req.body;

//   if (!orderID) {
//     return res.status(400).json({ message: 'Order ID is required' });
//   }

//   const request = new paypal.orders.OrdersCaptureRequest(orderID);
//   request.requestBody({});

//   try {
//     const capture = await client.execute(request);
//     res.status(200).json({ message: 'Payment captured successfully', capture: capture.result });
//   } catch (error) {
//     console.error('Error capturing PayPal order:', error);
//     res.status(500).json({ message: 'Failed to capture PayPal order', error: error.message });
//   }
// };
