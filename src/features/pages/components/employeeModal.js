import React, {useState, useEffect} from 'react'
import Modal from 'react-responsive-modal'
import moment from 'moment'
import MyInput from '../../../tools/myInput'
import MyButton from '../../../tools/myButton'
import 'date-fns';
import Grid from '@material-ui/core/Grid'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider,KeyboardDatePicker } from '@material-ui/pickers'
import { EmployeeFetcher } from '../../../api/employeeFetcher';
import { InsertEmployeeFetcher } from '../../../api/insertEmployeeFetcher'
import { UpdateEmployeeFetcher } from '../../../api/updateEmployeeFetcher'
import MyDropDown from '../../../tools/myDropDown'

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
        department,
        designation,
        education,
        gender,
        maritalStatus,
        address,
        createdBy,
        index,
        userId,
        employeeData,
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
    const [DesignationId,setDesignationId]=useState(designationId)
    const [DepartmentId,setDepartmentId]=useState(departmentId);
    console.log("Department===>",departmentId);
    
    const [DesignationData, setDesignationData]= useState([]);
    const [DepartmentData, setDepartmentData]= useState([]);


    const [file, setFile] = useState('');
    const [image, setImage] = useState([]);
    const regex = /^(?=.{1,50}$)(?![_.0-9])(?!.*[_.]{2})[a-zA-Z0-9._ ]+(?<![_.])$/;
    // const regexNRC = /^(?=.{2,20}$)(?![.])(?!.*[_.]{2})[a-zA-Z0-9._ ]+(?<![_.])$/;

   
    const MaritalOptions = [
        {value:'Single', label:"Single"},
        {value:'Married', label:"Married"}
    ]

    const GenderOptions = [
        {value:'Male', label:"Male"},
        {value:'Female', label:"Female"}
    ]

    const [selectedGender, setSelectedGender] = useState(index === -1
        ? { value: 'Male', label: "Male" }
        : employeeData[index].gender === 'Male'
            ? GenderOptions[0]
            : GenderOptions[1]
    )

    const EmployeeFetch = () => {
        EmployeeFetcher((err,data)=>{
            setDepartmentData(data.payload[1]);
            setDesignationData(data.payload[2]);
        });
    }
    useEffect(()=>{
        EmployeeFetch()      
        EmployeeId ? setImage(`http://192.168.100.29:3001/uploads/${EmployeeImage}`) : setImage([])
         
            },[]);

    const _handleAdd = e => {
        e.preventDefault()
    const isValid = regex.test(document.getElementById("employeeName").value);
    const isValid1 = regex.test(document.getElementById("fatherName").value);

    if (EmployeeName.trim() === "") {
      alert("Please Fill Employee Name");      
    } else if (!isValid) {
      alert("Employee Name Contains Special Characters or Numbers!");
      return
  }
  else if (!isValid1) {
    alert("Father Name Contains Special Characters or Numbers!");
    return}
  else {
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


    const _handleUpdate = (e) => {
        e.preventDefault()
        setDateOfBirth(moment(dateOfBirth).format("YYYY-MM-DD"));
        setJoinDate(moment(joinDate).format("YYYY-MM-DD"));
        const isValid = regex.test(document.getElementById("employeeName").value);
    
        if (EmployeeName.trim() === "") {
          alert("Please Fill Employee Name");      
        } else if (!isValid) {
          alert("Employee Name Contains Special Characters!");
          return
        }else 
        {
            // setEmployeeImage(employeeImage);
            UpdateEmployeeFetcher(
            {EmployeeId,EmployeeImage, EmployeeName, FatherName, DateOfBirth, NrcNo, JoinDate, DepartmentId, DesignationId,UserId, Education, Gender, MaritalStatus, Address, CreatedBy, CreatedDate, Active},
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
  console.log("EmployeeImage=>>>>",EmployeeImage);
  

      const _UploadIMG = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];
        
        if (file) {
            reader.onloadend = () => {
                setImage(reader.result);
                setEmployeeImage(file);
                console.log(reader.result);

            }
            console.log(file.name);
            
            reader.readAsDataURL(file)
        }
    }
 
    console.log("Gender=>>>",Gender);
    console.log('USER ID'+UserId);

    return(
        <Modal open={open} onClose={onCloseModal} center >
        <form encType="multipart/form-data" autoComplete="off">
            <h4 className="text-center pt-2 pb-4">{employeeId?'Edit Employee':'Add New Employee'}</h4>
            <div className='pb-3 text-center'>
            <div className="pb-3 pt-1 text-center">
            <img style={{ height: '100px',width:'100px' }} src={image} alt={`${EmployeeImage}`}></img>
            </div>
            <input style={{width:"100px"}} type="file" name="photo" id="in-btn" onChange={(e) => _UploadIMG(e)} accept="image/*" />
                <span className="new py-2 px-4" style={{}}>Upload Image</span>
            {/* <input type="file" name="photo" id="upload-photo" onChange={(e) => _UploadIMG(e)} accept="image/*" /> */}
            </div>

            <div className="row">
                <div className="col-lg-6 col-md-6">
                    <label>Employee Name</label>
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
           
                <div className="col-lg-6 col-md-6">
                    <label>Father Name</label>
                    <MyInput
                    id={"fatherName"}
                        className="w-100"
                        type="text"
                        value={FatherName}
                        style={{ border: "1px solid gray" }}
                        maxLength={200}
                        onChange={(e)=>setFatherName(e.target.value)}

                    />
                    </div>
            </div>
            <div className="row">
                <div className="col-lg-6 col-md-6">
                <label>Date of Birth</label>
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
                <div className="col-lg-6 col-md-6">
                    <label>NRC No.</label>
               
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

            <div className="pb-2 row">
                <div className="col-lg-6 col-md-6">
                    <label>Join Date</label>
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

                <div className="col-md-6 col-lg-6"> 
                <label>Department</label><br/>
                <select value={DepartmentId} onChange={(e)=>setDepartmentId(e.target.value)} >
                        {/* <option value="1">Health</option>
                        <option value="2">Account</option> */}
                    {DepartmentData.map((v,k) => (
                         <option value={v.departmentId}>
                             {v.department}
                         </option>
                    ))}
                    </select>
                </div>
                </div>

            <div className="row pb-3">
                <div className="col-md-6 col-lg-6 col-sm-6"> 
                <label>Designation</label><br/>
                <select value={DesignationId} onChange={(e)=>setDesignationId(e.target.value)}>
                    {DesignationData.map((v,k)=>(
                        <option value={v.designationId}>
                            {v.designation}
                        </option>
                    ))}
                       
                    </select>
                </div>
                <div className="col-lg-6 col-md-6">
                    <label>Education</label>
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
                <div className="col-md-6 col-lg-6">
                     <label>Gender</label><br/>
                     <MyDropDown
                    //  type="text"
                    //  value={Gender}
                    //  maxLength={50}
                    //  defaultValue={employeeId?Gender: GenderOptions[0]}
                    //  onChange={(e)=>setGender(e.target.value)}
                    //  options={GenderOptions}
                    value={selectedGender}
                            onChange={selectedOption => setSelectedGender(selectedOption)}
                            options={GenderOptions}
                     />
                {/* <select value={Gender} onChange={_handleGender}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select> */}
                </div>
              
                <div className="col-lg-6 col-md-6">
                    <label>Marital Status</label>
                    <MyDropDown
                        className="w-100"
                        type="text"
                        value={MaritalStatus}
                        maxLength={50}
                        defaultValue={employeeId?MaritalStatus: MaritalOptions[0]}
                        options={MaritalOptions}
                        onChange={(e)=>setMaritalStatus(e.target.value)}
                    />
            </div>
            </div>

            <div className="row">
                <div className="col-lg-6 col-md-6">
                    <label>Address</label>              
                    <MyInput
                        className="w-100"
                        type="text"
                        value={Address}
                        style={{ border: "1px solid gray" }}
                        maxLength={200}
                        onChange={(e)=>setAddress(e.target.value)}                    
                    />
                </div>
            <div className="col-lg-6 col-md-6 pt-3">
          <input
            type="checkbox"
            id="activecheck"
            value={Active}
            checked={Active === true ? true : false}
            onChange={e => setActive(!Active)}
          />
          <label>Active</label>
        </div>
        </div>
 
            <div className="pt-3 pb-3">
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