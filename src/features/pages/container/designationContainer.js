import React from 'react'
import Sidebar from '../../app/sidebar.js'
import Navbar from '../../app/navbar.js'
import DesignationTable from '../../pages/components/designationTable.js'

const Designationcontainer =()=>{
    return(
        <div className='min-vh-100 py-5'  style={{ backgroundImage: 'linear-gradient(to top right,#4F504F, #2a174f)'}}>
            <Sidebar />
            <Navbar/>
            <div className='text-center pt-5' style={{paddingLeft:60}}>
                <DesignationTable />
            </div>
        </div>
    )
}
export default Designationcontainer