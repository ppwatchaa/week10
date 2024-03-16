import React , { useState, useEffect, useRef } from "react";
import axios from "axios";
export default function Product(){
    let id = useRef(null)
    let name = useRef(null)
    let price = useRef(null)
    let img = useRef(null)

    const [product,setProduct]=useState([])
    useEffect(()=>{
        console.log("request to api")
        axios.get("http://127.0.0.1:3000/products")
        .then(response=>setProduct(response.data))
        .catch(error => {
            console.error('Error fetching data:', error);
        })
    },[product])

    let productList;
    if (Array.isArray(product)) {
        productList = product.map(p => (
            <li key={p._id}>
                ID :{p._id}
                <span> {p.name}</span>
                <img src={p.img}/> 
                {p.price}
                <button onClick={() => handleClickDelete(p._id)}>Delete</button>
            </li>
        ));
    } else {
        productList = []; 
    }

    const handleClickDelete = (id) => {
        axios.delete("http://127.0.0.1:3000/product/"+id)
            .then((response) => {
                setProduct(response.data)
            });
    };

    const handleClickADD = () => {
        const data={
            _id : parseInt(id.current.value),
            name : name.current.value,
            price : price.current.value,
            img : img.current.value,
        }
        axios.post("http://127.0.0.1:3000/product", data)
        .then((response) => {
            setProduct(response.data);
        });
    };

    const handleClickUpdate = () => {
        const data={
            _id : parseInt(id.current.value),
            name : name.current.value,
            price : price.current.value,
            img : img.current.value,
        }
        axios.put("http://127.0.0.1:3000/product/"+id.current.value, data)
        .then((response) => {
            setProduct(response.data);
        });
    };

    return (
        <div style={{display : "flex",justifyContent : "center", alignContent : "center"}}>
            
            <div>
                <div style={{display : "grid",justifyItems : "center", alignContent : "center", width : 500, height : 500, paddingTop : 100}}>
                    <form style={{paddingBottom : 10}} >
                        <p style={{display: "flex", justifyContent : "center", alignContent : "center" }}>Enter ID</p>
                        <input ref={id} style={{display: "flex", justifyContent : "center", alignContent : "center" ,width : 250, height : 30, borderRadius : 50}} type="text"/>
                    </form>
                    <form style={{paddingBottom : 10}} >
                        <p style={{display: "flex", justifyContent : "center", alignContent : "center" }}>Enter Name</p>
                        <input ref={name} style={{display: "flex", justifyContent : "center", alignContent : "center" ,width : 250, height : 30, borderRadius : 50}} type="text"/>
                    </form>
                    <form style={{paddingBottom : 10}} >
                        <p style={{display: "flex", justifyContent : "center", alignContent : "center" }}>Enter Price</p>
                        <input ref={price} style={{display: "flex", justifyContent : "center", alignContent : "center" ,width : 250, height : 30, borderRadius : 50}} type="text"/>
                    </form>
                    <form style={{paddingBottom : 10}} >
                        <p style={{display: "flex", justifyContent : "center", alignContent : "center" }}>Enter img (URL)</p>
                        <input ref={img} style={{display: "flex", justifyContent : "center", alignContent : "center" ,width : 250, height : 30, borderRadius : 50}} type="text"/>
                    </form>
                    
                    <button onClick={handleClickADD} style={{width : 300, height : 100, fontSize : 30, borderRadius : 50}}>ADD</button>
                    <button onClick={handleClickUpdate} style={{width : 300, height : 100, fontSize : 30, borderRadius : 50}}>Update</button>
                </div>
                    
            </div>
            <ul>
                {productList}
            </ul>
        </div>)
}