import React from 'react'
import Modal from "react-responsive-modal";
import MyInput from "../../../tools/myInput";
import MyButton from "../../../tools/myButton";

const MyModal = props => {

    return (
    <Modal open={open} onClose={onCloseModal} center>
        <div
            style={{
            color: "black"
            }}
        ></div>
        <form className="pt-2 col-lg-12 col-md-12 col-xs-4">
            <h4 className="text-center pt-4 pb-4">
            {RoleId ? "Edit User Role" : "Add New User Role"}
            </h4>

            <div>
            <label>Role Name</label>
            </div>
            <div className="pb-2">
            <MyInput
                className="w-100"
                type="text"
                id={"roleName"}
                value={RoleName}
                pattern={"[a-zA-Z0-9 ]+"}
                style={{ border: "1px solid gray" }}
                onChange={e => setRoleName(e.target.value)}
                maxLength={50}
            />
            <div style={{ color: "red" }}>{roleErr}</div>
            </div>
            <div>
            <label>Remark</label>
            </div>
            <div className="pb-3">
            <MyInput
                className="w-100"
                type="text"
                value={Remark}
                style={{ border: "1px solid gray" }}
                onChange={e => setRemark(e.target.value)}
                maxLength={200}
            />
            </div>
            <div className="pb-3">
            <input
                type="checkbox"
                id="activecheck"
                value={Active}
                checked={Active === true ? true : false}
                onChange={e => setActive(!Active)}
            />
            <label>Active</label>
            </div>
            <div className="pb-1">
            <MyButton
                style={{
                backgroundImage:
                    "linear-gradient(to left, rgba(16,20,66,1) 0%, rgba(0,79,156,1) 100%)",
                color: "white"
                }}
                className="w-100"
                text={RoleId ? "UPDATE" : "ADD"}
                type={"submit"}
                onClick={RoleId ? _handleUpdate : _handleAdd}
            />
            </div>
        </form>
    </Modal>
    )
}

export default MyModal