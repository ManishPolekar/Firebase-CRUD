import React, { useEffect, useState } from 'react';
import './App.css';
import { database } from './firebase';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';

function App() {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [val, setVal] = useState([]);
  const [show, setShow] = useState(false);
  const [id, setId] = useState('');

  //Creating and naming the database 
  const productsCollection = collection(database, "products")

 //GET/READ DATA PRODUCT
  useEffect(() => {
    const getData = async () => {
      const dbVal = await getDocs(productsCollection);
      setVal(dbVal.docs.map(doc => ({...doc.data(), id: doc.id})));
    };
    getData();
  }, []); // empty dependency array to run the effect only once
  

  //Creating/Adding a collection to products
  const handleCreate = async (e) => {
    e.preventDefault();
    const docRef= await addDoc(productsCollection, {Name: productName, Price: productPrice });
    // Update local state with the newly added product
    setVal([...val, {Name: productName, Price: productPrice, id: docRef.id }]);
    setProductName('');
    setProductPrice('');
    setShow(false);
  };

  //Edit a product
  const handleEdit = async(id,Name, Price) => {
    setProductName(Name)
    setProductPrice(Price)
    setId(id)
    setShow(true)
  }
  // Update a product
const handleUpdate = async () => {
  const updateData = doc(database, "products", id);
  await updateDoc(updateData, { Name: productName, Price: productPrice });

  // Update local state with the updated product
  const updatedVal = val.map(item => {
    if (item.id === id) {
      return { ...item, Name: productName, Price: productPrice };
    }
    return item;
  });
  setVal(updatedVal);

  // Reset form values and hide the form
  setProductName('');
  setProductPrice('');
  setShow(false);
}

   // Delete a product
   const handleDelete = async (id) => {
    await deleteDoc(doc(database, 'products', id)); // Use deleteDoc function to delete document
    // Update local state by filtering out the deleted product
    setVal(val.filter(product => product.id !== id));
  };


  return (
    <div className='Product'>
      <h1>Product Test</h1>
      <form >
        <fieldset>
          <label>
            <p>Product Name</p>
            <input onChange={(e) => setProductName(e.target.value)} type='text' name='Product Name' value={productName}/>
            <p>Product Price</p>
            <input onChange={(e) => setProductPrice(e.target.value)} type='number' name='Product Price' value={productPrice}/>
            <br/>
            {!show ? <button onClick={handleCreate}>Create</button>:
            <button onClick={handleUpdate}>Update</button>}
          </label>
        </fieldset>
      </form>
      {
        val.map(values => 
          <div key={values.id}> {/* Adding a unique key for each rendered item */}
             <h2>{values.Name}</h2> {/* Using 'Name' instead of 'productName' */}
             <h2>{values.Price}</h2> {/* Using 'Price' instead of 'productPrice' */}
             <br/>
             <button onClick={() => handleEdit(values.id,values.Name,values.Price)}>Edit</button>
             <button onClick={() => handleDelete(values.id)}>Delete</button> 
          </div>
        )  
      }
    </div>
  )
}

export default App
