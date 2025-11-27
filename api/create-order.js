export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const order_id = "ORDER_" + Date.now();

  try {
    const response = await fetch("https://sandbox.cashfree.com/pg/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-client-id": process.env.CF_APP_ID,
        "x-client-secret": process.env.CF_SECRET_KEY,
        "x-api-version": "2022-09-01",
      },
      body: JSON.stringify({
        order_id,
        order_amount: 49,
        order_currency: "INR",
        customer_details: {
          customer_id: "CUST123",
          customer_email: "demo@mail.com",
          customer_phone: "9999999999",
        },
        order_meta: {
          return_url: `https://${req.headers.host}/success.html?order_id=${order_id}`,
        },
      }),
    });

    const data = await response.json();
    return res.status(200).json({ payment_link: data.payment_link });
  } catch (err) {
    return res.status(500).json({ error: "Server error", detail: err.message });
  }
}
