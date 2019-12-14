import React from 'react'
import Dash from '../components/dash.js'
import Sidebar from '../../app/sidebar.js'
import Navbar  from '../../app/navbar'

const DashContainer =()=>{
    return(
    <div className='text-center py-5'>
        <Sidebar/>
        <Navbar/>
        <Dash/>
    </div>
    )
}
export default DashContainer