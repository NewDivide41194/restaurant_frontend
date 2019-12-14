import React from 'react'
import Sidebar from '../../app/sidebar'
import Navbar from '../../app/navbar'
import DepartmentTable from '../components/departmentTable'

const UserDepartmentContainer = () => {
   
    return(
        <div className='min-vh-100 py-5'  style={{ backgroundImage: 'linear-gradient(to top right,#4F504F, #2a174f)'}}>
            <Sidebar />
            <Navbar/>
            <div className='text-center pt-5' style={{paddingLeft:60}}>
                <DepartmentTable />
            </div>
        </div>
    )
}

export default UserDepartmentContainer