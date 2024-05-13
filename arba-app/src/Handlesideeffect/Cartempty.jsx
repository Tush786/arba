import { Image } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Cartempty() {
    const Navigate=useNavigate()
  return (
    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className='cursor-pointer' onClick={()=>{
      Navigate('/')
    }}>
      <Image src='https://mir-s3-cdn-cf.behance.net/projects/404/c1a552112421559.Y3JvcCwxMzczLDEwNzQsMzMsMA.jpg' />
    </div>
  );
}

export default Cartempty;
