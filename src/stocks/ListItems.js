import React, { useCallback, useEffect, useState } from 'react'
import ListItem from './ListItem'
import './ListItems.css'
import { toast } from 'react-toastify';


export const URL = `http://localhost:3005/stocks`
function ListItems() {
 const [response,setResponse] = useState([])

 const onDeleteItem = useCallback(async (id)=>{
    if(window.confirm('Do you really want to  delete the Stock Item?')){
      setResponse(response.filter(res => res.id !== id))
      const d = await fetch(`${URL}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(response)
      })
      const result = await d.json()
      console.log('RESULT ', result);
      toast('Delete Sucessfully!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type:"success",
        theme:"colored"
        });
    }
    else {
      console.log('Cancelled!!');
    }
 },[response])
 
 useEffect(()=>{
  const id = setTimeout(()=> {
    fetch(`${URL}?_start=0&_end=10`).then(res => res.json()).then(data => setResponse(data))
  },1000)
  return () => clearTimeout(id)
  },[])
  if(response.length === 0){
   return <h1>Loading....</h1>
  }
  return (
    <div className="list-items">
     <div className="add"><button className="add_btn">+</button></div>
    {response.map((data)=> <ListItem key={data.id} data={data} onDeleteItem={onDeleteItem}/>)}
    </div>
     
  )
}

export default ListItems

