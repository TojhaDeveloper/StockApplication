import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import './ListItem.css'


const ListItem = ({data,onDeleteItem})=> {
    const navigate = useNavigate()

    const handleListItem = useCallback((obj)=> {
        const {id, name,symbol} = obj
        navigate(`/details/${id}`,{state:{id,name,symbol}})
    },[navigate])

    const handleListDelete = useCallback((e)=> {
        onDeleteItem(data?.id)
        e.stopPropagation()
    },[data?.id,onDeleteItem])

    return <div className="list-container" onClick={() => handleListItem(data)}>
        <div className="list__symbol">{data.symbol}</div>
        <div className="list__name">{data.name}</div>
        <div className="list__delete" onClick={handleListDelete}>x</div>
    </div>
}



export default ListItem