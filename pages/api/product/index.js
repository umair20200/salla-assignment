import { MongoClient } from "mongodb";

async function handler(req, res) {
  // POST /api/new-todo
  const client = await MongoClient.connect(
    env("MONGO_DB_URL") 
    
  );
  if (req.method === "POST") {
    const data = req.body;
    const db = client.db();
    const products = await db.collection("products");
    const result = await products.insertOne(data);
    client.close();
    res.status(201).json({ message: "product inserted" });
    return;
  }
  if (req.method === "GET") {
    const db = client.db();
    const productList = await db.collection("products");
    const result = await productList.find();
    client.close();
    res.status(200).json({ msg: "Product List", response: result });
    return;
  }
}

export default handler;
