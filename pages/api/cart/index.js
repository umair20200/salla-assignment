import { MongoClient } from "mongodb";

async function handler(req, res) {
  // POST /api/new-todo
 const client = await MongoClient.connect(
    process.env.NEXT_PUBLIC_MONGO_DB_URL
  );
  if (req.method === "POST") {
    const data = req.body;
    const db = client.db();
    const cart = await db.collection("Cart");
    const result = await cart.insertOne(data);
    client.close();
    res.status(201).json({ message: "Product Inserted" });
    return;
  }
  if (req.method === "GET") {
    const db = client.db();
    const cart = await db.collection("Cart");
   
    const result = await cart.find().toArray();;
    console.log(result)
    client.close();
    res.status(200).json({ msg: "Cart Item List", response: result });
    return;
  }
}

export default handler;
