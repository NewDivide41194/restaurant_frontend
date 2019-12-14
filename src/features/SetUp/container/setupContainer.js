import React from 'react'

import SetUpCards from '../components/setupCards.js'
import Sidebar from '../../app/sidebar.js'
import Navbar  from '../../app/navbar'
const SetupContainer =()=>{
    return(
        <div className='min-vh-100 py-5'  style={{ backgroundImage: 'linear-gradient(to top right,#4F504F, #2a174f)'}}>
            
                <Sidebar />
                <Navbar/>
            <div className='text-center pb-5' style={{paddingLeft:60}} >
                <SetUpCards />
            </div>
        </div>
    )
}
export default SetupContainer