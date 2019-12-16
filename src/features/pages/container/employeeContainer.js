import React, {useState} from 'react'
import Sidebar from '../../app/sidebar.js'
import Navbar from '../../app/navbar.js'
import EmployeeTable from '../components/employeeTable.js'

const EmployeeContainer =()=>{
    const [open, setOpen] = useState(false);
    const onOpenModal = () => {
        setOpen(true);
    
    };
    const onCloseModal = () => {
        setOpen(false);
    }
 
    return(  
        <div  className='min-vh-100 py-5'  style={{ backgroundImage: 'linear-gradient(to top right,#4F504F, #2a174f)'}}>
            <Sidebar />
            <Navbar/>
            <div className='text-center pt-5' style={{paddingLeft:60}}>
                <EmployeeTable
                 onOpenModal={onOpenModal}
                 onCloseModal={onCloseModal} 
                 />
            </div>
        </div>
    )
}
export default EmployeeContainer