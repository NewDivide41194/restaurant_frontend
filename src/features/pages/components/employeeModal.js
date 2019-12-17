import React from 'react'
import Modal from 'react-responsive-modal'
import MyInput from '../../../tools/myInput'

const EmployeeModal = props =>{
    const { open, onCloseModal } = props;
console.log(open);

    return(
        <Modal open={open} onClose={onCloseModal} center>
            <form className="pt-2 col-lg-12 col-md-12 col-xs-4">
                <h4>Add New Employee</h4>
                <div>
                    <label>Employee Name</label>
                </div>
                <div className="pb-2">

                <MyInput
                    className="w-100"
                    type="text"
                    style={{ border: "1px solid gray" }}
                    // id={""}
                    // value={RoleName}
                    // pattern={"[a-zA-Z0-9 ]+"}
                    // style={{ border: "1px solid gray" }}
                    // onChange={e => setRoleName(e.target.value)}
                    maxLength={50}
                />
                </div>
                <div>
                    <label>Father Name</label>
                </div>
                <div className="pb-3">
                <MyInput
                    className="w-100"
                    type="text"
                    style={{ border: "1px solid gray" }}
                    // value={Remark}
                    // onChange={e => setRemark(e.target.value)}
                    maxLength={200}
                />
                </div>
            </form>
        </Modal>
    )
}
export default EmployeeModal