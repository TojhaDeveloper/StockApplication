import React, { useCallback, useEffect, useState } from 'react'
import ListItem from './ListItem'
import './ListItems.css'
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';



export const URL = `http://localhost:3005/stocks`
function ListItems() {
 const [response,setResponse] = useState([])
 const [show, setShow] = useState(true)
 const [val,setVal] = useState({
  symbol:"",
  company:""
 })


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
      await d.json()
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

        // Apprently no way to readjust ids using json-server hence commented code below
        // Open issue json-server
        // Refer:: https://github.com/typicode/json-server/issues/216


        // // after delete need to fetch the data and reupdate there ids 
        // const dfetched = await fetch(`${URL}`)
        // const getResults = await dfetched.json()
        // console.log(getResults);
        // const updatedData = getResults.map((d,i)=> {
        //   return {...d,id:i+1}
        // })
        // const jsonData = {stocks:updatedData}
        // await fetch(`${URL}`,{
        //   method:"GET",
        //   headers:{
        //     "Content-Type":"application/json"
        //   },
        //   body:JSON.stringify(jsonData)
        // })
    }
    else {
      console.log('Cancelled!!');
    }
 },[response])

 const handleClick = useCallback(()=> {
  setShow(prev=> !prev)
  setVal(prev=> ({...prev,symbol:"",company:""}))
 },[])

 const handleChange = useCallback((e)=> {
  setVal(prev=>({...prev,[e.target.name]:e.target.value}))
 },[])

 const handleSubmit = async ()=>{
  const {symbol,company} = val
  if (!symbol && !company){
       return
  }
  if(response.some(r => r.symbol.toUpperCase() === val.symbol.toUpperCase())){
    toast('Symbol Already Exists!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      type:"error",
      theme:"colored"
      });
      setShow(true)
      return
    }
    let data = {symbol,name:company, "stock_exchange": {
      "name": "New York Stock Exchange",
      "acronym": "NYSE",
      "mic": "XNYS",
      "country": "USA",
      "country_code": "US",
      "city": "New York",
      "website": "www.nyse.com"
  },
  "lasttendays": [
      {
          "open": 129.8,
          "high": 133.04,
          "low": 129.47,
          "close": 132.995,
          "volume": 106686703,
          "date": "09/02/22"
      },
      {
          "open": 129.8,
          "high": 133.04,
          "low": 129.47,
          "close": 132.995,
          "volume": 388500,
          "date": "09/01/22"
      },
      {
          "open": 12.68,
          "high": 12.72,
          "low": 11.82,
          "close": 11.9,
          "volume": 369800,
          "date": "08/31/22"
      },
      {
          "open": 13.13,
          "high": 13.13,
          "low": 12.51,
          "close": 12.7,
          "volume": 213400,
          "date": "08/30/22"
      },
      {
          "open": 12.66,
          "high": 13.07,
          "low": 12.6,
          "close": 12.98,
          "volume": 30500,
          "date": "08/29/22"
      },
      {
          "open": 13.83,
          "high": 13.96,
          "low": 12.68,
          "close": 12.8,
          "volume": 232400,
          "date": "08/28/22"
      },
      {
          "open": 13.56,
          "high": 14.15,
          "low": 13.48,
          "close": 13.82,
          "volume": 150100,
          "date": "08/27/22"
      },
      {
          "open": 13.79,
          "high": 13.96,
          "low": 13.51,
          "close": 13.58,
          "volume": 148300,
          "date": "08/26/22"
      },
      {
          "open": 13.97,
          "high": 14.15,
          "low": 13.87,
          "close": 13.95,
          "volume": 183700,
          "date": "08/25/22"
      },
      {
          "open": 13.75,
          "high": 13.9,
          "low": 13.58,
          "close": 13.76,
          "volume": 294100,
          "date": "08/24/22"
      }
  ]}

  setResponse(response => [...response,{...data,id:response.length+1}])
   try {
     await fetch(`${URL}`,{
       method:"POST",
       headers:{
         "Content-Type":"application/json"
       },
       body:JSON.stringify({...data,id:response.length+1})
     })
     setShow(true)
    toast('Added Sucessfully!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      type:"success",
      theme:"colored"
      })
   }
   catch(e){
    console.error("Error Recevied ",e.message)
   }

   
  }
 
 useEffect(()=>{
  const id = setTimeout(()=> {
    fetch(`${URL}`).then(res => res.json()).then(data => setResponse(data))
  },1000)
  return () => clearTimeout(id)
  },[])

  if(response.length === 0){
   return <Spinner/>
  }
  return (
    <div className="list-items">
    {show ? (<div className="add">
      <button className="add_btn" onClick={handleClick}>+</button>
      </div>):(<div  className="add_symbol_box">
      <div className="add_symbol_box_remove" onClick={handleClick}>x</div>
       <input type="text" name="symbol" value={val.symbol}   autoComplete="off" placeholder="Enter Symbol" onChange={handleChange}/>
       <input type="text" name="company" value={val.company} autoComplete="off" placeholder="Enter Company Name" onChange={handleChange}/>
       <button onClick={handleSubmit}>Submit</button>
      </div>)}
    {response.map((data)=> <ListItem key={data.id} data={data} onDeleteItem={onDeleteItem}/>)}
    </div>
     
  )
}

export default ListItems




