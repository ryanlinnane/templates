import express from "express";
import cors from "cors";
import path from 'path';
import { Stripe } from 'stripe';
import type { Request } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_API_KEY!);

const app = express();
app.use(cors());

const workstationAccessToken = process.env.WORKSTATION_ACCESS_TOKEN || '';

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.get('/', (req, res) => {
  res.render('index', { title: 'Home Page', message: 'Welcome to the Main Page!' });
});

app.get("/api", (req, res) => {
  res.send("🐱");
});

app.get('/login', (req, res) => {
  res.render('login', { title: 'Login', message: 'Welcome to the Main Page!' });
});

app.post('/login', (req, res) => {
  // If it succeeds, either send them to /checkout or /app
  res.redirect('/checkout');
});

app.get('/checkout', (req, res) => {
  res.render('checkout');
});

app.post('/checkout', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Define the product and price details here
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Stubborn Attachments',
          },
          unit_amount: 2000, // Amount in cents (e.g., $20.00)
        },
        quantity: 1,
      },
    ],
    payment_method_types: ['card'],
    mode: 'payment',
    success_url: `${req.protocol}://${process.env.WORKSTATION || req.get('host')}/success?_workstationAccessToken=${process.env.WORKSTATION_ACCESS_TOKEN || ''}&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.protocol}://${process.env.WORKSTATION || req.get('host')}/cancel?_workstationAccessToken=${process.env.WORKSTATION_ACCESS_TOKEN || ''}`,
    metadata: {
      // TODO(ryan) pass this from a logged in user.
      user_email: 'ryan@gmail.com',
    },
    customer_creation: 'always',
  });
  res.redirect(303, session.url!);
});

app.get('/success', async (req: Request<{}, any, any, { session_id: string }>, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id, { expand: ['payment_intent'] });
  const customer = await stripe.customers.retrieve(session.customer?.toString()!) as Stripe.Customer;

  // TODO create the user here.
  const paymentIntent = session.payment_intent as Stripe.PaymentIntent;
  console.log(paymentIntent)
  if (paymentIntent.status === 'succeeded') {
    // Create or update DB.
    res.redirect('/app/');
    return;
  }
  res.render('pending', {
    status: session.status,
    orderId: customer.id,
    name: customer.name,
    orderEmail: customer.email,
    userEmail: session.metadata?.user_email,
  });
});

app.get('/payment-status', async (req: any, res: any) => {
  const sessionId = req.query.session_id;

  if (!sessionId) {
    return res.status(400).json({ error: 'Session ID is required' });
  }

  try {
    // Retrieve the Checkout Session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Return the payment status
    res.json({ payment_status: session.payment_status });
  } catch (error) {
    console.error('Error retrieving session:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Fallback to index.html for SPA routes (if applicable)
app.use('/app/', express.static(path.join(__dirname, 'public/dist')));
app.get('/app/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/dist/index.html'));
});

app.listen(3000, () => {
  console.log(`Server is running on port ${3000}`);
});