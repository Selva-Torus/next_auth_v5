import { auth } from '@/auth'
import React from 'react'

const page = async() => {
    const session = await auth();
    console.log(session);
    
  return (
    <>
    <div>page</div>
    <div>{JSON.stringify(session)}</div>
    </>
  )
}

export default page