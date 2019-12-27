import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// import TableContainer from '@material-ui/core/TableContainer';
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import moment from "moment";

import Sidebar from "../../app/sidebar.js";
import MyButton from "../../../tools/myButton.js";
import { EmployeeFetcher } from "../../../api/employeeFetcher";
import EmployeeModal from "./employeeModal";
import Spinner from "../../../assets/icon/spinner.gif";
import "../../app/app.css";

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
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}
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
    label: 'active'
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

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={order}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
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

export default function EnhancedTable(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("employeeName");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [employeeData, setEmployeeData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
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

  const [index, setIndex] = useState(-1);
  const DefaultProfile = require("../../../assets/icon/profile/defaultProfile3.jpg");


  const _handleEdit = (e, index) => {
    setIndex(index);
    if (index === undefined) {
      setOpen(true);
    } else {
      const employee_Data = employeeData[index];
      setEmployeeName(employee_Data.employeeName);
      setEmployeeImage(employee_Data.employeeImage);
      setActive(employee_Data.active);
      setFatherName(employee_Data.fatherName);
      setDateOfBirth(employee_Data.dateOfBirth);
      setNrcNo(employee_Data.nrcNo);
      setJoinDate(employee_Data.joinDate);
      setDepartmentId(employee_Data.departmentId);
      setDesignationId(employee_Data.designationId);
      setEducation(employee_Data.education);
      setGender(employee_Data.gender);
      setMaritalStatus(employee_Data.maritalStatus);
      setAddress(employee_Data.address);
      setCreatedBy(employee_Data.createdBy);
      setCreatedDate(employee_Data.createdDate);
      setEmployeeId(employee_Data.employeeId);
      setUserId(employee_Data.userId);
      setOpen(true);

      //16 Columns
    }
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

  const onCloseModal = () => {
    setOpen(false);
  };
  const EmployeeFetch = () => {
    EmployeeFetcher((err, data) => {
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
    setDepartmentId(employeeData[0].departmentId);
    setDesignationId(employeeData[0].designationId);
    setEducation("");
    setGender(employeeData[0].gender);
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

  // const handleSelectAllClick = event => {
  //   if (event.target.checked) {
  //     const newSelecteds = rows.map(n => n.name);
  //     setSelected(newSelecteds);
  //     return;
  //   }
  //   setSelected([]);
  // };

  const handleClick = (event, employeeName) => {
    const selectedIndex = selected.indexOf(employeeName);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, employeeName);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // const handleChangeDense = event => {
  //   setDense(event.target.checked);
  // };

  const isSelected = employeeName => selected.indexOf(employeeName) !== -2;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Sidebar />
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
            {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                // onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              {employeeData.map((v, k) => (
                <TableBody key={k}>
                  {stableSort(rows, getSorting(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      console.log({row})
                      const isItemSelected = isSelected(row.employeeName);
                      const labelId = `enhanced-table-${index}`;

                      return (
                        <TableRow
                          hover
                          onClick={event =>
                            handleClick(event, row.employeeName)
                          }
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.employeeName}
                          // key={row.employeeName}
                          selected={isItemSelected}
                        >
                          <TableCell align="left">{k + 1}</TableCell>
                          <TableCell align="left">
                            <div
                              style={{
                                width: 50,
                                height: 60,
                                overflow: "hidden"
                              }}
                            >
                              <img
                                className="img-fluid"
                                src={
                                  v.employeeImage
                                    ? `http://192.168.100.43:3001/uploads/${v.employeeImage}`
                                    : DefaultProfile
                                }
                                id={v.id}
                                alt="styles"
                              />
                            </div>
                          </TableCell>
                          <TableCell align="left" style={{ fontSize: 18 }}>
                              {v.active === 1 ? (
                                <i className="fa fa-check-square" />
                              ) : (
                                <i className="fa fa-square" />
                              )}
                  </TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            {v.employeeName}
                          </TableCell>
                          <TableCell align="left">{v.fatherName}</TableCell>
                          <TableCell align="left">
                            {moment(v.dateOfBirth).format("MM/DD/YYYY")}
                          </TableCell>
                          <TableCell align="left">{v.nrcNo}</TableCell>
                          <TableCell align="left">
                            {moment(v.joinDate).format("MM/DD/YYYY")}
                          </TableCell>
                          <TableCell align="left">{v.department}</TableCell>
                          <TableCell align="left">{v.designation}</TableCell>
                          <TableCell align="left">{v.education}</TableCell>
                          <TableCell align="left">{v.gender}</TableCell>
                          <TableCell align="left">{v.maritalStatus}</TableCell>
                          <TableCell align="left">{v.address}</TableCell>
                          <TableCell align="left">{v.createdBy}</TableCell>
                          <TableCell align="left">
                            {moment(v.createdDate).format("MM/DD/YYYY hh:mm A")}
                          </TableCell>
                          <TableCell align="left">
                            <button
                              type={"button"}
                              onClick={() => _handleEdit(v, k)}
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
                    <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                      <TableCell colSpan={16} />
                    </TableRow>
                  )}
                </TableBody>
              ))}
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>
        )}
      </div>
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </div>
  );
}

