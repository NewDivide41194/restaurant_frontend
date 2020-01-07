import React, { useEffect } from 'react'
import Dash from '../components/dash.js'
import Sidebar from '../../app/sidebar.js'
import Navbar  from '../../app/navbar'
import {useCookies} from 'react-cookie'

const DashContainer =props=>{
    const [cookies]=useCookies(["token"])   
    const token = cookies.token 
    useEffect(()=>{
       
    })
    return(
    <div className='text-center py-5'>
        <Sidebar/>
        <Navbar/>
        <Dash token={token}/>
    </div>
    )
}
export default DashContainer