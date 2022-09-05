import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { URL } from './ListItems'
import './ListDetail.css'

function ListDetail() {
    const [detail,setDetail] = useState([])
    const {state} = useLocation()
    const  {id, name,symbol} = state
    useEffect(()=> {
       fetch(`${URL}/${id}`).then(res => res.json()).then(d => {
        setDetail(d?.lasttendays ?? [])
       })
    },[id])
  return (
    <div className="listdetail__container">
        <nav className="nav__header">
            <Link to="/home" className="listdetail_back">&#171; Back</Link>
            <ul>
                <li>{name}</li>
                <li>{symbol}</li>
            </ul>
        </nav>
        <div className="company__card__container">
            <table className="table__content">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Open</th>
                        <th>High</th>
                        <th>Low</th>
                        <th>Close</th>
                        <th>Volume</th>
                    </tr>
                </thead>
                <tbody>
                    {detail.map((d,id)=> {
                        return  (<tr key={`${d.date}-${id}`}>
                        <td>{d.date}</td>
                        <td>{d.open}</td>
                        <td>{d.high}</td>
                        <td>{d.low}</td>
                        <td>{d.close}</td>
                        <td>{d.volume}</td>
                        </tr>)
                    })}
                </tbody>
            </table>
           <div className="company__card">
            <h3>Company Profile : {name}</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing 
                elit, sed do eiusmod tempor incididunt ut labore et dolore magna 
                aliqua. A iaculis at erat pellentesque adipiscing commodo elit at imperdiet. 
                Ante metus dictum at tempor. Sed vulputate mi sit amet mauris commodo quis imperdiet. 
                Dictum varius duis at consectetur lorem donec massa. 
                Neque vitae tempus quam pellentesque. 
                Aliquam eleifend mi in nulla posuere. Ultricies mi eget mauris pharetra et ultrices.
                Convallis aenean et tortor at risus viverra adipiscing. Praesent elementum facilisis leo vel fringilla est ullamcorper. Malesuada fames ac turpis egestas. Lorem mollis aliquam ut porttitor leo a diam sollicitudin tempor. Turpis egestas maecenas pharetra convallis posuere morbi. Tincidunt arcu non sodales neque sodales. Gravida rutrum quisque non tellus orci ac auctor augue mauris.</p>
           </div>
        </div>
    </div>
  )
}

export default ListDetail