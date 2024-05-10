import React from 'react'
import { IoMdTrash } from 'react-icons/io'
import { getcart, removecart } from '../redux/action';
import { useDispatch } from 'react-redux';

function Deletecart({_id}) {
    console.log(_id)
  const dispatch=useDispatch()
    
  function deleteCart(_id){
    dispatch(removecart(_id)).then(()=>{
      dispatch(getcart());
    })
  }
  return (
    <div onClick={()=>{deleteCart(_id)}}>
       <IoMdTrash/>
    </div>
  )
}

export default Deletecart
