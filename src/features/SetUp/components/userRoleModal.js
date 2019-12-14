import React,  { useState }  from 'react'
import Modal from 'react-responsive-modal'
import MyInput from '../../../tools/myInput'
import MyButton from '../../../tools/myButton'

const UserRoleModal = () => {
    const [open, setOpen] = useState(false);

    const onOpenModal = () => {
        setOpen(true);
    };

    const onCloseModal = () => {
        setOpen(false);
    };


     return(
            <div>
                <button onClick={onOpenModal}>Open Modal</button>
                <Modal classNames="Modal" open={open} onClose={onCloseModal} center>
                    <h4 className="text-center pt-4 pb-4" style={{backgroundImage:'linear-gradient(to left, rgba(16,20,66,1) 0%, rgba(0,79,156,1) 100%)', color:"white"}}>Add New User Role</h4>
                    <form className="pt-2 w-100">
                        <div><label>Role Name</label></div>
                        <div className="pb-2">
                            <MyInput
                                className = "w-100"
                                type="text"
                                placeholder="Role Name"
                                maxlength={"[A-Za-z]"}
                                style={{border:"1px solid blue"}}
                             />
                        </div>
                        <div><label>Remark</label></div>
                        <div className="pb-3">
                            <MyInput
                                className = "w-100"
                                type="text"
                                placeholder="Remark"
                                style={{border:"1px solid blue"}}
                             />
                        </div>
                        <div className="pb-3">
                            <input type="checkbox" id="activecheck" />
                            <label>Active</label>
                        </div>
                        <div className="pb-1"><MyButton style={{backgroundImage:'linear-gradient(to left, rgba(16,20,66,1) 0%, rgba(0,79,156,1) 100%)', color:"white"}} className="w-100" text={"Save"}/></div>
                        <div><MyButton style={{backgroundImage:'linear-gradient(to left, rgba(16,20,66,1) 0%, rgba(0,79,156,1) 100%)', color:"white"}} className="w-100" text={"Cancel"}/></div>
                    </form>
                </Modal>
               
                
            </div>
        );
    
}


export default UserRoleModal