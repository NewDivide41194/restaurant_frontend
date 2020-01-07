import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import {useCookies} from 'react-cookie'

import EnhancedTableHead from '../../../tools/myTable.js';
import MyButton from "../../../tools/myButton.js";
import { EmployeeFetcher } from "../../../api/employeeFetcher";
import EmployeeModal from "./employeeModal";
import Spinner from "../../../assets/icon/spinner.gif";
import checked from '../../../assets/icon/checked-2.png';
import unchecked from '../../../assets/icon/unchecked.png';

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
    
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1
    
  }
}));


function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  console.log("orderBy:", orderBy)
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

export default function EnhancedTable(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("employeeName");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [employeeData, setEmployeeData] = useState([]);
  const [Image, setImage] = useState([]);
  const [employeeId, setEmployeeId] = useState(null);
  const [employeeName, setEmployeeName] = useState(null);
  const [employeeImage, setEmployeeImage] = useState(null);
  const [active, setActive] = useState(0);
  const [fatherName, setFatherName] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [nrcNo, setNrcNo] = useState(null);
  const [joinDate, setJoinDate] = useState(null);
  const [departmentId, setDepartmentId] = useState(null);
  const [designationId, setDesignationId] = useState(null);
  const [education, setEducation] = useState(null);
  const [gender, setGender] = useState(null);
  const [maritalStatus, setMaritalStatus] = useState(null);
  const [address, setAddress] = useState(null);
  const [createdBy, setCreatedBy] = useState(null);
  const [createdDate, setCreatedDate] = useState(null);
  const [userId, setUserId] = useState(null);
  const [open, setOpen] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [cookies]=useCookies(["token"])    
  const token=cookies.token

  const [index, setIndex] = useState(-1);
  const DefaultProfile = require("../../../assets/icon/profile/defaultProfile3.jpg");

  console.log({ rowsPerPage })
  const _handleEdit = (employee) => {

    console.log("employee", employee)
    const index = employeeData.findIndex( e => e.employeeId===employee.employeeId )  
    
    setIndex(index);
    if (index===-1) {
      setOpen(false);
    } else {
      setEmployeeName(employee.employeeName);
      setEmployeeImage(employee.employeeImage);
      setActive(employee.active);
      setFatherName(employee.fatherName);
      setDateOfBirth(employee.dateOfBirth);
      setNrcNo(employee.nrcNo);
      setJoinDate(employee.joinDate);
      setDepartmentId(employee.departmentId);
      setDesignationId(employee.designationId);
      setEducation(employee.education);
      setGender(employee.gender);
      setMaritalStatus(employee.maritalStatus);
      setAddress(employee.address);
      setCreatedBy(employee.createdBy);
      setCreatedDate(employee.createdDate);
      setEmployeeId(employee.employeeId);
      setUserId(employee.userId);
      setOpen(true);

      //16 Columns
    }
  };
  const createData = (
    sino,
    employeeImage,
    active,
    employeeName,
    fatherName,
    dateOfBirth,
    nrcNo,
    joinDate,
    department,
    designation,
    education,
    gender,
    maritalStatus,
    address,
    createdBy,
    createdDate
  ) => {
    return {
      employeeImage,
      active,
      employeeName,
      fatherName,
      dateOfBirth,
      nrcNo,
      joinDate,
      department,
      designation,
      education,
      gender,
      maritalStatus,
      address,
      createdBy,
      createdDate
    };
  };

  const rows = [
    employeeData.map((v, k) =>
      createData(
        v.employeeImage,
        v.employeName,
        v.active,
        v.fatherName,
        v.dateOfBirth,
        v.nrcNo,
        v.joinDate,
        v.department,
        v.designation,
        v.education,
        v.gender,
        v.maritalStatus,
        v.address,
        v.createdBy,
        v.createdDate
      )
    )
  ];

  const headCells = [
    { id: 'sino', numeric: false, disablePadding: true, label: 'Si No' },
    {
      id: 'employeeImage',
      numeric: false,
      disablePadding: true,
      label: 'Employee Image'
    },
    {
      id: 'active',
      numeric: false,
      disablePadding: true,
      label: 'Active'
    },
    {
      id: 'employeeName',
      numeric: false,
      disablePadding: true,
      label: 'Employee Name'
    },
    {
      id: 'fatherName ',
      numeric: false,
      disablePadding: false,
      label: 'Father Name'
    },
    {
      id: 'dateOfBirth',
      numeric: false,
      disablePadding: false,
      label: 'Date Of Birth'
    },
    { id: 'nrcNo', numeric: false, disablePadding: false, label: 'NRC No' },
    { id: 'joinDate', numeric: false, disablePadding: false, label: 'Join Date' },
    {
      id: 'department',
      numeric: false,
      disablePadding: false,
      label: 'Department'
    },
    {
      id: 'designation',
      numeric: false,
      disablePadding: false,
      label: 'Designation'
    },
    {
      id: 'education',
      numeric: false,
      disablePadding: false,
      label: 'Education'
    },
    { id: 'gender', numeric: false, disablePadding: false, label: 'Gender' },
    {
      id: 'maritalStatus',
      numeric: false,
      disablePadding: false,
      label: 'Marital Status'
    },
    { id: 'address', numeric: false, disablePadding: false, label: 'Address' },
    {
      id: 'createdBy',
      numeric: false,
      disablePadding: false,
      label: 'Created By'
    },
    {
      id: 'createdDate',
      numeric: false,
      disablePadding: false,
      label: 'Created Date'
    }
  ];
  
  const onCloseModal = () => {
    setOpen(false);
  };
  const EmployeeFetch = () => {
    EmployeeFetcher(token,(err, data)  => {
      setEmployeeData(data.payload[0]);
      setLoading(false);
    });
  };
  useEffect(() => {
    EmployeeFetch();
  }, []);
  const _handleAddNew = () => {
    setIndex(-1);
    setOpen(true);
    setEmployeeName("");
    setEmployeeImage("");
    setActive(1);
    setEmployeeId("");
    setFatherName("");
    setDateOfBirth("");
    setNrcNo("");
    setJoinDate("");
    setDepartmentId("");
    setDesignationId("");
    setEducation("");
    setGender("");
    setMaritalStatus("");
    setAddress("");
    setCreatedBy("");
    setCreatedDate("");
    setUserId(employeeData[0].userId);
  };
  console.log("Employee Data=>", employeeData);

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === "desc";
    setOrder(isDesc ? "asc" : "desc");
    setOrderBy(property);
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  console.log(rowsPerPage)
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const isSelected = employeeName => selected.indexOf(employeeName) !== -2;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <div className="py-5" style={{ paddingLeft: 78 }}>
        {open ? (
          <EmployeeModal
            open={open}
            onCloseModal={onCloseModal}
            employeeName={employeeName}
            active={active}
            employeeId={employeeId}
            fatherName={fatherName}
            dateOfBirth={dateOfBirth}
            nrcNo={nrcNo}
            joinDate={joinDate}
            departmentId={departmentId}
            designationId={designationId}
            education={education}
            gender={gender}
            maritalStatus={maritalStatus}
            address={address}
            createdBy={createdBy}
            createdDate={createdDate}
            index={index}
            employeeData={employeeData}
            employeeImage={employeeImage}
            userId={userId}
            token={token}
          />
        ) : null}
        <MyButton
          className="my-2"
          text={"+ Add New Employee"}
          onClick={_handleAddNew}
          type={"submit"}
          style={{ borderRadius: 5, fontSize: 18, width: "50%" }}
        />
        {Loading ? (
          <div className="mx-auto text-white">
            <img
              src={Spinner}
              style={{ marginTop: "25%", width: 50, height: 50 }}
              alt="spinner"
            />
            <br />
            Loading . . .
          </div>
        ) : (
            <Paper className={classes.paper}>
              <TableContainer>
                {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
                <Table
                  className={classes.table}
                  aria-labelledby="tableTitle"
                  size={dense ? "small" : "medium"}
                  aria-label="enhanced table"
                >
                 <EnhancedTableHead
                    headCells={headCells}
                    classes={classes}
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                  />
               
                <TableBody>
                {
                  stableSort(employeeData, getSorting(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.employeeName);
                      const labelId = `enhanced-table-${index}`;

                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.employeeName}
                          selected={isItemSelected}
                         
                        >
                          <TableCell  align="left"  >{index + 1}</TableCell>
                          <TableCell align="left"   >
                            <div>
                              <img
                                className="img-fluid"
                                src={
                                  row.employeeImage
                                    ? `http://192.168.100.51:3001/uploads/${row.employeeImage}`
                                    : DefaultProfile
                                }
                                id={row.id}
                                alt="styles"
                                style={{
                                  width: 50,
                                  height: 50,
                                  overflow: "hidden"
                                }}
                              />
                            </div>
                          </TableCell>
                          <TableCell align="left"  style={{ fontSize: 18 }}>
                            {row.active === 1 ? (
                              <img src={checked} className='px-3' alt="checkbox"></img>
                            ) : (
                              <img src={unchecked} className='px-3' alt="checkbox"  />
                              )}
                          </TableCell>
                          <TableCell id={labelId}  >
                            {row.employeeName}
                          </TableCell>
                          <TableCell align="left"   >{row.fatherName}</TableCell>
                          <TableCell align="left"  >
                            {moment(row.dateOfBirth).format("MM/DD/YYYY")}
                          </TableCell>
                          <TableCell align="left"  >{row.nrcNo}</TableCell>
                          <TableCell align="left"  >
                            {moment(row.joinDate).format("MM/DD/YYYY")}
                          </TableCell>
                          <TableCell align="left"  >{row.department}</TableCell>
                          <TableCell align="left"  >{row.designation}</TableCell>
                          <TableCell align="left"  >{row.education}</TableCell>
                          <TableCell align="left"  >{row.gender}</TableCell>
                          <TableCell align="left"  >{row.maritalStatus}</TableCell>
                          <TableCell align="left"  >{row.address}</TableCell>
                          <TableCell align="left"  >{row.createdBy}</TableCell>
                          <TableCell align="left"  >
                            {moment(row.createdDate).format("MM/DD/YYYY hh:mm A")}
                          </TableCell>
                          <TableCell align="left"  >
                            <button
                              type={"button"}
                              onClick={() => _handleEdit(row)}
                              style={{
                                borderRadius: "8px",
                                backgroundColor: "#c7821c",
                                color: "white",
                                width: "75px"
                              }}
                            >
                              Edit
                    </button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: (dense ? 23 : 43) * emptyRows }}>
                    <TableCell colSpan={17} />
                  </TableRow>
                )}
              </TableBody>
                  
                </Table>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={employeeData.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </TableContainer>

            </Paper>

          )}

      </div>
    </div>
  );
}

