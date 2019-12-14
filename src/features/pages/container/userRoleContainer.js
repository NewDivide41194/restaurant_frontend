import React from 'react'
import UserRoleModal from '../components/userRoleModal'
import Sidebar from '../../app/sidebar'
import Navbar from '../../app/navbar'
import RoleTable from '../components/roleTable'

const UserRoleContainer = () => {
   
    return(
        <div className='min-vh-100 py-5'  style={{ backgroundImage: 'linear-gradient(to top right,#4F504F, #2a174f)'}}>
            <Sidebar />
            <Navbar/>
            <div className='text-center pt-5' style={{paddingLeft:60}}>
                <RoleTable />
            </div>
        </div>
    )
}

export default UserRoleContainer