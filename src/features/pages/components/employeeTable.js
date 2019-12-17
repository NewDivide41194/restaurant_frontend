import React from 'react'
import Sidebar from '../../app/sidebar.js'
import MyButton from '../../../tools/myButton.js'

const EmployeeTable =props=>{
    const { EmployeeData, ImgUrl,fatherName,dateOfBirth,nrcNo,joinDate,departmentId,designationId,education,gender,martialStatus,Address,createdDate,employeeName}=props;
    return(
<div>
    <Sidebar />
    <div className='container py -5'>
        <MyButton
            className="my-2"
            text={"+ Add New Employee"}
            // onClick={_handleAddNew}
            type={"submit"}
            style={{ borderRadius: 5, fontSize: 18 }}
      />
      <div className='table-responsive'>
        <table className="table table-dark text-light text-left">
                <thead>
                <tr>
                    <th style={{maxwidth:'70px'}}>Employee Image</th>
                    <th>Employee Name</th>
                    <th>Father Name</th>
                    <th>DateOfBirth</th>
                    <th>NRC No</th>
                    <th>Join Date</th>
                    <th>DepartmentId</th>
                    <th>DesignationId</th>
                    <th>Education</th>
                    <th>Gender</th>
                    <th>MartialStatus</th>
                    <th>Address</th>
                    <th>CREATE BY</th>
                    <th>CreatedDate</th>
                </tr>
                </thead>
                <tbody>
              {EmployeeData.map((v, k) => (
                <tr key={k}>
                    <td>{k + 1}</td>
                    <td> <img className='img-fluid'
                            src={process.env.PUBLIC_URL + `${v.ImgUrl}`}
                            id={v.id}
                            alt="styles"
                          /></td>
                    <td>{v.employeeName}</td>
                    <td>{v.fatherName}</td>
                    <td>{v.dateOfBirth}</td>
                    <td>{v.nrcNo}</td>
                    <td>{v.joinDate}</td>
                    <td>{v.departmentId}</td>
                    <td>{v.designationId}</td>
                    <td>{v.education}</td>
                    <td>{v.gender}</td>
                    <td>{v.martialStatus}</td>
                    <td>{v.address}</td>
                    <td>{v.createdDate}</td>
                    <td>{v.employeeName}</td>
                    <td>
                    <button
                      type={"button"}
                    //   onClick={() => onOpenModal(v, k)}
                      style={{
                        borderRadius: "8px",
                        backgroundColor: "#c7821c",
                        color: "white",
                        width: "80px"
                      }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
                </tbody>
        </table>
      
      </div>
     
        </div>
        </div>
    )
}
export default EmployeeTable