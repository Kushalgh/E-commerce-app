import Stripe from 'stripe';
import dotenv from 'dotenv';

import { Response, NextFunction, Request } from 'express';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

export interface CheckoutBodyItem {
  id: string;
  name: string;
  price: number;
  priceId: string;
  quantity: number;
  image: string;
}

export const createCheckoutSession = async (req: Request, res: Response) => {
  const body = req.body;

  try {
    const line_items = body?.products?.map((product: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: product?.name,
          images: [product?.image],
        },
        unit_amount: Math.round(product?.price * 100),
      },
      quantity: product?.quantity,
    }));
    console.log(req.get('origin'), 'Origin');
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: line_items,
      mode: 'payment',
      success_url: `${req.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.get('origin')}/cancel`,
    });

    res.status(200).json({
      success: true,
      data: { id: session?.id },
    });
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
};
