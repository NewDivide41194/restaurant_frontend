import React, {useState, useEffect} from 'react'
import Modal from 'react-responsive-modal'
import moment from 'moment'
import MyInput from '../../../tools/myInput'
import MyButton from '../../../tools/myButton'
import DatePicker from 'react-datepicker';
import 'date-fns';
import Grid from '@material-ui/core/Grid'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider,KeyboardDatePicker } from '@material-ui/pickers'
import { InsertEmployeeFetcher } from '../../../api/insertEmployeeFetcher'
import { UpdateEmployeeFetcher } from '../../../api/updateEmployeeFetcher'

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
        userId,
        employeeImage} = props;

    const [EmployeeName, setEmployeeName] = useState(employeeName);
    const [FatherName, setFatherName] = useState(fatherName);
    const [EmployeeImage, setEmployeeImage] = useState(employeeImage);
    const [DateOfBirth, setDateOfBirth] = useState(dateOfBirth);
    const [NrcNo, setNrcNo] = useState(nrcNo);
    const [JoinDate, setJoinDate] = useState(joinDate);
    const [Education, setEducation] = useState(education);
    const [Gender, setGender] = useState(gender);
    const [MaritalStatus, setMaritalStatus] = useState(maritalStatus);
    const [Address, setAddress] = useState(address);
    const [EmployeeId, setEmployeeId] = useState(employeeId);
    const CreatedDate=moment().format("YYYY-MM-DD HH:mm")
    const [CreatedBy, setCreatedBy] = useState(createdBy);
    const [UserId,setUserId]=useState(userId)
    const [Active, setActive] = useState(active === 1 ? true : false);
    const [DesignationId,setDesignation]=useState(designationId)
    const [DepartmentId,setDepartment]=useState(departmentId)

    const [file, setFile] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const regex = /^(?=.{1,50}$)(?![.])(?!.*[_.]{2})[a-zA-Z0-9._ ]+(?<![_.])$/;

    const _handleAdd = e => {
        e.preventDefault()
    const isValid = regex.test(document.getElementById("employeeName").value);

    if (EmployeeName.trim() === "") {
      alert("Please Fill Employee Name");      
    } else if (!isValid) {
      alert("Employee Name Contains Special Characters!");
      return
  }else {
    InsertEmployeeFetcher(
      { EmployeeImage, EmployeeName, FatherName, DateOfBirth, NrcNo, JoinDate, DepartmentId, DesignationId, Education, Gender, MaritalStatus, Address, UserId, CreatedDate, Active },
      (err, data) => {
        if (data.payload === null) {
          alert("Employee Name Already Exist!");
        } else {
          window.location.reload();
        }
      }
    );
  };}

console.log("Designation is"+designationId);

    const _handleUpdate = (e) => {
        e.preventDefault()
        const isValid = regex.test(document.getElementById("employeeName").value);
    
        if (EmployeeName === "") {
          alert("Please Fill Employee Name");      
        } else if (!isValid) {
          alert("Employee Name Contains Special Characters!");
          return
      }else {
        UpdateEmployeeFetcher(
          {EmployeeId,EmployeeImage, EmployeeName, FatherName, DateOfBirth, NrcNo, JoinDate, DepartmentId, DesignationId, Education, Gender, MaritalStatus, Address, CreatedBy, CreatedDate, Active},
          (err, data) => {
            console.log(data);
    
            if (data.payload === null) {
              alert("Employee Name Already Exist!");
            } else {
              window.location.reload();
            }
          }
        );
      };}
  

      const _UploadIMG = (e) => {
        const file = e.target.files[0];
        var reader = new FileReader();
        reader.onloadend = () => {
            setEmployeeImage(reader.result);
        }
        reader.readAsDataURL(file)
        console.log(file);

    }  
   

    console.log(EmployeeImage);

    return(
        <Modal open={open} onClose={onCloseModal} center >
        <form className="pt-2 col-lg-12 col-md-12 col-xs-4">
            <h4 className="text-center pt-2 pb-4">Add New Employee</h4>
            
            <div className="text-center pb-3">
            <input type='file' onChange={(e) => _UploadIMG(e)} />

            </div>
            <div className="text-center pb-2">
            <img src={process.env.PUBLIC_URL+EmployeeImage} style={{ width: 100, height: 100 }} />            </div>
            <div className="row">
                <div className="col-lg-6">
                    <label>Employee Name</label>
                </div>
                <div className="pb-2 col-lg-6">
                    <MyInput
                    id={"employeeName"}
                        className="w-100"
                        type="text"
                        value={EmployeeName}
                        style={{ border: "1px solid gray" }}
                        maxLength={50}
                        onChange={(e)=>setEmployeeName(e.target.value)}
                    />
                </div>
            </div>
           
            <div className="row">
                <div className="col-lg-6">
                    <label>Father Name</label>
                </div>
                <div className="pb-3 col-lg-6">
                    <MyInput
                        className="w-100"
                        type="text"
                        value={FatherName}
                        style={{ border: "1px solid gray" }}
                        maxLength={200}
                        onChange={(e)=>setFatherName(e.target.value)}

                    />
                </div>
            </div>
            <div className="row pb-2">
                <div className="col-lg-6">
                    <label>Date Of Birth</label>
                </div>
                <div className="col-lg-6">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                format="dd/MM/yyyy"
                                value={DateOfBirth}
                                onChange={(date)=>setDateOfBirth(moment(date).format("YYYY-MM-DD"))}
                                KeyboardButtonProps={{
                                    "aria-label": "change date" 
                                }}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                </div>
            </div>
            <div className="pb-2 row">
                <div className="col-lg-6">
                    <label>NRC No.</label>
                </div>
                <div className="pb-3 col-lg-6">
                    <MyInput
                        className="w-100"
                        type="text"
                        value={NrcNo}
                        style={{ border: "1px solid gray" }}
                        maxLength={200}
                        onChange={(e)=>setNrcNo(e.target.value)}

                    />
                </div>
            </div>
           
            <div className="pb-3 row">
                <div className="col-lg-6">
                    <label>Join Date</label>
                </div>
                <div className="col-lg-6">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                format="dd/MM/yyyy"
                                value={JoinDate}
                                onChange={(date)=>setJoinDate(moment(date).format("YYYY-MM-DD"))}
                                KeyboardButtonProps={{
                                    "aria-label": "change date"
                                }}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                </div>
            </div>

            <div className="row pb-3">
                <div className="col-md-6 col-lg-6 col-sm-6"> <label>Department</label></div>
                <div className="col-md-6 col-lg-6 col-sm-6">
                    <select>
                        <option value={1}>Department 1</option>
                        <option value={2}>Department 2</option>
                    </select>
                </div>
            </div>

            <div className="row pb-3">
                <div className="col-md-6 col-lg-6 col-sm-6"> <label>Designation</label></div>
                <div className="col-md-6 col-lg-6 col-sm-6">
                    <select>
                        <option value={1}>Designation 1</option>
                        <option value={2}>Designation 2</option>
                    </select>
                </div>
            </div>
            <div className="pb-3 row">
                <div className="col-lg-6">
                    <label>Education</label>
                </div>
                <div className="col-lg-6">
                    <MyInput
                        className="w-100"
                        type="text"
                        value={Education}
                        style={{ border: "1px solid gray" }}
                        maxLength={200}
                        onChange={(e)=>setEducation(e.target.value)}
                    />
                </div>
            </div>
           
            <div className="row pb-2">
                <div className="col-md-6 col-lg-6"> <label>Gender</label></div>
                <div className="col-md-6 col-lg-6">
                    <select>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
              
            </div>
            <div className="row pb-2">
                <div className="col-lg-6">
                    <label>Marital Status</label>
                </div>
                <div className="col-lg-6">
                    <MyInput
                        className="w-100"
                        type="text"
                        value={MaritalStatus}
                        style={{ border: "1px solid gray" }}
                        maxLength={200}
                        onChange={(e)=>setMaritalStatus(e.target.value)}

                    />
                </div>
            </div>
            <div className="row pb-4">
                <div className="col-lg-6">
                    <label>Address</label>
                </div>
                <div className="col-lg-6">
                    <MyInput
                        className="w-100"
                        type="text"
                        value={Address}
                        style={{ border: "1px solid gray" }}
                        maxLength={200}
                        onChange={(e)=>setAddress(e.target.value)}

                    
                    />
                </div>
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
                        text={EmployeeId?"UPDATE":"ADD"}
                        type={"submit"}
                        onClick={EmployeeId?_handleUpdate:_handleAdd}
                    />
            </div>
        </form>
    </Modal>
)
}
export default EmployeeModal