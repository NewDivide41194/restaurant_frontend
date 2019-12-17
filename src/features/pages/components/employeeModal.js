import React, {useState} from 'react'
import Modal from 'react-responsive-modal'
import moment from 'moment'
import MyInput from '../../../tools/myInput'
import MyButton from '../../../tools/myButton'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const EmployeeModal = props =>{
    const { open, onCloseModal,
        employeeName,
        active,
        employeeId,
        fatherName,
        dateOfBirth,
        nrcNo,
        joinDate,
        departmentId,
        designationId,
    education,
    gender,
    maritalStatus,
    address,
    createdBy,
    createdDate,employeeImage} = props;

    const [EmployeeName, setEmployeeName] = useState(employeeName);
    const [FatherName, setFatherName] = useState(fatherName);
    const [Image, setImage] = useState(employeeImage);
    const [DateOfBirth, setDateOfBirth] = useState(dateOfBirth);
    const [NrcNo, setNrcNo] = useState(nrcNo);
    const [JoinDate, setJoinDate] = useState(joinDate);
    const [Education, setEducation] = useState(education);
    const [Gender, setGender] = useState(gender);
    const [MaritalStatus, setMaritalStatus] = useState(maritalStatus);
    const [Address, setAddress] = useState(address);
    const [EmployeeId, setEmployeeId] = useState(employeeId);
    const [CreatedDate, setCreatedDate] = useState(createdDate);
    const [Active, setActive] = useState(active);

    const [file, setFile] = useState('');
    const [imagePreview, setImagePreview] = useState('');

    const _handleAdd = e => {

    }
    const _handleUpdate = e => {

    }
    

    const hangleImageChange = e => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            setFile(file)
            setImagePreview(reader.result);
        }
        reader.readAsDataURL(file);
    }
    
    let $imagePreview = null;
    if(imagePreview){
        $imagePreview = (<img src={imagePreview} className="img-fluid" style={{width:"100px", height:"100px"}}/>);
    }

    

    console.log(file);

    return(
        <Modal open={open} onClose={onCloseModal} center >
            <form className="pt-2 col-lg-12 col-md-12 col-xs-4">
                <h4 className="text-center pt-2 pb-4">Add New Employee</h4>
                
                <div className="pb-3">
                    {/* <input
                     type="file"
                     value={Image} 
                     id="in-btn" 
                     onChange={hangleImageChange}/>
                    <span className="new">Upload Image</span> */}
                </div>
                <div className="pb-2">
                    {$imagePreview}
                </div>
                <div>
                    <label>Employee Name</label>
                </div>
                <div className="pb-2">
                    <MyInput
                        className="w-100"
                        type="text"
                        value={EmployeeName}
                        style={{ border: "1px solid gray" }}
                        maxLength={50}
                        onChange={(e)=>setEmployeeName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Father Name</label>
                </div>
                <div className="pb-3">
                    <MyInput
                        className="w-100"
                        type="text"
                        value={FatherName}
                        style={{ border: "1px solid gray" }}
                        maxLength={200}
                        onChange={(e)=>setFatherName(e.target.value)}

                    />
                </div>
                <div className="pb-2">
                    <label>Date Of Birth</label>
                    <DatePicker
                        selected={DateOfBirth}
                        onChange={(e)=>setDateOfBirth(moment(e.target.value).format("MM/DD/YYYY"))}
                        value={moment(DateOfBirth).format("MM/DD/YYYY")}

                     />
                </div>
                <div>
                    <label>NRC No.</label>
                </div>
                <div className="pb-3">
                    <MyInput
                        className="w-100"
                        type="text"
                        value={NrcNo}
                        style={{ border: "1px solid gray" }}
                        maxLength={200}
                        onChange={(e)=>setNrcNo(e.target.value)}

                    />
                </div>
                <div className="pb-3">
                    <label>Join Date</label>
                    <DatePicker
                        selected={JoinDate}
                        value={moment(JoinDate).format("MM/DD/YYYY")}
                        onChange={(e)=>setJoinDate(e.target.value)}

                     />
                </div>

                <div className="row pb-3">
                    <div className="col-md-6 col-lg-6 col-sm-6"> <label>Department</label></div>
                    <div className="col-md-6 col-lg-6 col-sm-6">
                        <select>
                            <option>Department 1</option>
                            <option>Department 2</option>
                        </select>
                    </div>
                </div>

                <div className="row pb-3">
                    <div className="col-md-6 col-lg-6 col-sm-6"> <label>Designation</label></div>
                    <div className="col-md-6 col-lg-6 col-sm-6">
                        <select>
                            <option>Designation 1</option>
                            <option>Designation 2</option>
                        </select>
                    </div>
                </div>
               
                <div>
                    <label>Education</label>
                </div>
                <div className="pb-3">
                    <MyInput
                        className="w-100"
                        type="text"
                        value={Education}
                        style={{ border: "1px solid gray" }}
                        maxLength={200}
                        onChange={(e)=>setEducation(e.target.value)}

                    />
                </div>
                <div className="row pb-2">
                    <div className="col-md-6 col-lg-6"> <label>Gender</label></div>
                    <div className="col-md-6 col-lg-6">
                        <select>
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                    </div>
                  
                </div>
                <div>
                    <label>Marital Status</label>
                </div>
                <div className="pb-2">
                    <MyInput
                        className="w-100"
                        type="text"
                        value={MaritalStatus}
                        style={{ border: "1px solid gray" }}
                        maxLength={200}
                        onChange={(e)=>setMaritalStatus(e.target.value)}
 
                    />
                </div>
                <div>
                    <label>Address</label>
                </div>
                <div className="pb-4">
                    <MyInput
                        className="w-100"
                        type="text"
                        value={Address}
                        style={{ border: "1px solid gray" }}
                        maxLength={200}
                        onChange={(e)=>setAddress(e.target.value)}

                       
                    />
                </div>
                <div className="pb-1">
                    <MyButton
                        style={{
                        backgroundImage:
                            "linear-gradient(to left, rgba(16,20,66,1) 0%, rgba(0,79,156,1) 100%)",
                        color: "white"
                        }}
                        className="w-100"
                        text={"ADD"}
                        type={"submit"}
                        onClick={_handleAdd}
                    />
                </div>
            </form>
        </Modal>
    )
}
export default EmployeeModal