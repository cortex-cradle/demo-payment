export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { order_id } = req.query;

  try {
    const response = await fetch(
      `https://sandbox.cashfree.com/pg/orders/${order_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-client-id": process.env.CF_APP_ID,
          "x-client-secret": process.env.CF_SECRET_KEY,
          "x-api-version": "2022-09-01"
        }
      }
    );

    const data = await response.json();

    if (data.order_status === "PAID") {
      return res.status(200).json({ status: "SUCCESS" });
    } else {
      return res.status(200).json({ status: "FAILED" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Verification error", details: err.message });
  }
}
