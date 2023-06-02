import { MongoClient } from "mongodb";
const { ObjectId } = require("mongodb");
var mongoose = require('mongoose');

async function handler(req, res) {
  const client = await MongoClient.connect(
    process.env.NEXT_PUBLIC_MONGO_DB_URL
  );
  const db = client.db();
  if (req.method === "DELETE") {
    
    const cartItemId =  new ObjectId(req.query.cartId);
    console.log(cartItemId)
    const cart = await db.collection("Cart");
    let obj= await cart.find({"_id":cartItemId})

    obj.toArray().then((data)=>{console.log(data)})
    const result = await cart.deleteOne({ "_id": cartItemId });
    client.close();
    res.status(200).json({ msg: "deleted Successfully", response: result });
  }
 
}

export default handler;
