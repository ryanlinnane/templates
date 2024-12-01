import express from "express";
import cors from "cors";
import path from 'path';
import { Stripe } from 'stripe';
import type { Request } from 'express';
import dotenv from 'dotenv';

dotenv.config();
console.log(process.env.STRIPE_API_KEY!)
const stripe = new Stripe(process.env.STRIPE_API_KEY!);
const app = express();
app.use(cors());

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
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: '{{PRICE_ID}}',
        quantity: 1,
      },
    ],
    payment_method_types: ['card'],
    mode: 'payment',
    success_url: `${req.get('host')}/success?session_id={CHECKOUT_SESSION_ID}",`,
    cancel_url: `${req.get('host')}/cancel`,
    metadata: {
      user_email: 'ryan@gmail.com',
    }
  });
  res.redirect(303, session.url!);
});

app.get('/success', async (req: Request<{}, any, any, { session_id: string }>, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  const customer = await stripe.customers.retrieve(session.customer?.toString()!) as Stripe.Customer;
  const userEmail = customer.metadata.user_email;
  console.log(userEmail);

  res.send(`<html><body><h1>Thanks for your order, ${customer.name}!</h1></body></html>`);
});

// Fallback to index.html for SPA routes (if applicable)
app.use('/app/', express.static(path.join(__dirname, 'public/dist')));
app.get('/app/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/dist/index.html'));
});

app.listen(3000, () => {
  console.log(`Server is running on port ${3000}`);
});