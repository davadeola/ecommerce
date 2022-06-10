const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    //console.log(req.body);

    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [
          { shipping_rate: "shr_1L8rJaK2uEbOWHHHPsBx1KTh" },
          { shipping_rate: "shr_1L8rKzK2uEbOWHHHcBZITeG2" },
        ],
        line_items: req.body.map((item) => {
          const img = item.defaultProductVariant.images[0].asset._ref;
          const newImage = img
            .replace(
              "image-",
              "https://cdn.sanity.io/images/k9mmnbc8/production/"
            )
            .replace("-webp", ".webp")
            .replace("-png", ".png");

          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.title,
                images: [newImage],
              },
              unit_amount: Math.round(item.defaultProductVariant.price * 100),
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };

          console.log("IMAGE", newImage);
        }),

        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      });
      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
