import React, {useState} from 'react'
import Sidebar from '../../app/sidebar.js'
import EmployeeTable from '../components/employeeTable.js'
import Navbar from '../../app/navbar'

const EmployeeContainer =()=>{
    return(
        
    <div className='text-center py-5'>
        <Sidebar />
        <Navbar/>
        <div>
            <EmployeeTable EmployeeData={Employee}/>
        </div>
    </div>   
    )
}
export default EmployeeContainer

const Employee= [
    {
        id:1,ImgUrl:'images/kurama.jpg',employeeName:'Aung Aung',fatherName:'U Mya', dateOfBirth:'7-9-1998', nrcNo:'9/mahama(N)049871', joinDate:'1-10-2019', departmentId:'1', designationId:'1', education:'Graduat', gender:'Male', martialStatus:'Single', address:'35 Street', createdBY:'1', createdDate:'12-11-2019'
    }
]