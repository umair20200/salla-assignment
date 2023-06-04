import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import { Shop } from "../components/shop";
import { ShopContextProvider} from '../context/shop-context'
import { MongoClient } from "mongodb";
import { useState } from "react";

function App(props) {
  return (
    <ShopContextProvider>
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-start justify-start">
      
     <Navbar></Navbar>
      <Shop products={props.products}></Shop>
     <Footer></Footer>
     
    </div>
    </ShopContextProvider>
  );
}

export async function getStaticProps() {
  // feth data from an API

  const client = await MongoClient.connect(
    `mongodb+srv://admin:11223344@cluster0.yh5wlq2.mongodb.net/?retryWrites=true&w=majority`
  );

  const db = client.db();

  const productCollection = db.collection("products");

  const products = await productCollection.find().toArray();

  client.close();
  

  return {
    props: {
      products: products.map((product) => ({
        productName: product.productName,
        orignalPrice: product.orignalPrice,
        Saleprice: product.Saleprice,
        description: product.description,
        id: product._id.toString(),
        productImage:product.productImage
      })),
    },
    revalidate: 1,
  };
}

export default App;