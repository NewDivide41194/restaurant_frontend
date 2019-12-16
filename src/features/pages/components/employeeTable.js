import React, {useState} from 'react'
import EmployeeModal from './employeeModal.js'

import MyButton from '../../../tools/myButton.js'

const EmployeeTable = props =>{
    const { onOpenModal , onCloseModal } = props;
    const [ open, setOpen ] = useState(false);

    return(   
        <div className='container'>
            {open ? (
            <EmployeeModal
                open={open}
                onCloseModal={onCloseModal}
             />) : null}

            <MyButton
                text={"+ Add New Employee"}
                onClick={onOpenModal}
            />
        </div>
    )
}
export default EmployeeTable