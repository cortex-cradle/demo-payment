export default async function handler(req, res) {
  const { order_id } = req.query;

  const response = await fetch(`https://sandbox.cashfree.com/pg/orders/${order_id}`, {
    method: "GET",
    headers: {
      "x-client-id": process.env.CF_APP_ID,
      "x-client-secret": process.env.CF_SECRET_KEY,
      "x-api-version": "2022-09-01"
    }
  });

  const data = await response.json();

  if (data.order_status === "PAID") {
    return res.status(200).json({ status: "SUCCESS" });
  } else {
    return res.status(200).json({ status: "FAILED" });
  }
}
