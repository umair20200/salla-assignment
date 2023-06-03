import { MongoClient } from "mongodb";
const { ObjectId } = require("mongodb");
var mongoose = require('mongoose');

async function handler(req, res) {
  const client = await MongoClient.connect(
    process.env.NEXT_PUBLIC_MONGO_DB_URL
  );
  const db = client.db();
  if (req.method === "DELETE") {
    
    const cartItemId =  req.query.cartId;
    const cart = await db.collection("Cart");
    const result = await cart.deleteOne({ "id": cartItemId });
    client.close();
    res.status(200).json({ msg: "deleted Successfully", response: result });
  }
 
}

export default handler;
