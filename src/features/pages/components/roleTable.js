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

import EnhancedTableHead from '../../../tools/myTable.js'
import MyButton from "../../../tools/myButton.js";
import {RoleFetcher} from "../../../api/roleFetcher";
import AdminRoleModal from "./adminRoleModal";
import Spinner from "../../../assets/icon/spinner.gif";
import "../../app/app.css";
import checked from '../../../assets/icon/checked-2.png';
import unchecked from '../../../assets/icon/unchecked.png';


const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2)
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
  const [roleData, setRoleData] = useState([]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("roleName");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [Remark, setRemark] = useState("");
  const [active, setActive] = useState(0);
  const [roleName, setRoleName] = useState("");
  const [roleId, setRoleId]= useState("");
  const [createdBy, setCreatedBy] = useState(null);
  const [createdDate, setCreatedDate] = useState(null);
  const [userId, setUserId] = useState(null);
  const [open, setOpen] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [cookies]=useCookies(["token"])    
  const token=cookies.token

  const [index, setIndex] = useState(-1);
 
  console.log({ rowsPerPage })
  const _handleEdit = (role) => {
    console.log("role--", role)
    const index = roleData.findIndex( e => e.roleId===role.roleId )  
    console.log(index)
    setIndex(index);
    if (index===-1) {
      setOpen(false);
    } else {
      const role_data = roleData[index];
      console.log("RoleDATA=>>>",role_data);
      setRoleName(role_data.roleName);
      setRemark(role_data.remark);
      setActive(role_data.active);
      setRoleId(role.roleId);
      setUserId(role_data.userId)
      setOpen(true);

      //16 Columns
    }
  };
  console.log("Role Data=>", roleData);
  const createData = (
    sino,
    roleName,
      active,
      remark,
      createdDate,
      createdBy,
  ) => {
    return {
      roleName,
      active,
      remark,
      createdDate,
      createdBy
    };
  };
  
  const rows = [
    roleData.map((v, k) =>
      createData(
        v.roleName,
        v.active,
        v.remark,
        v.createdDate,
        v.employeeName
      )
    )
  ];
  const headCells = [
    { id: 'sino', numeric: false, disablePadding: true, label: 'Si No' },
    {
      id: 'roleName',
      numeric: false,
      disablePadding: true,
      label: 'Role Name'
    },
    {
      id: 'active',
      numeric: false,
      disablePadding: true,
      label: 'Active'
    },
    {
      id: 'remark',
      numeric: false,
      disablePadding: false,
      label: 'Remark'
    },
    {
      id: 'createdDate',
      numeric: false,
      disablePadding: false,
      label: 'Created Date'
    },
    {
      id: 'createdBy',
      numeric: false,
      disablePadding: false,
      label: 'Created By'
    },
  ];

  const onCloseModal = () => {
    setOpen(false);
  };
  const RoleFetch = () => {
    RoleFetcher(token,(err, data) => {
      setRoleData(data.payload);
      setLoading(false);
    });
  };
  useEffect(() => {
    RoleFetch();
  }, []);
  const _handleAddNew = () => {
    setIndex(-1);
    setOpen(true);
    setRoleName("");
    setActive(1);
    setRemark("");
    setCreatedBy("");
    setCreatedDate("");
    setUserId(roleData[0].userId);
  };
 
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
  const isSelected = roleName => selected.indexOf(roleName) !== -2;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  console.log('Pages --->'+ rows.length);

  return (
    <div className={classes.root}>
      <div className="py-5" style={{ paddingLeft: 14 }}>
        {open ? (
          <AdminRoleModal
          token={token}
          open={open}
          onCloseModal={onCloseModal}
          roleName={roleName}
          remark={Remark}
          active={active}
          createdBy={createdBy}
          createDate={createdDate}
          roleId={roleId}
          userId={userId}
          />
        ) : null}
        <MyButton
          className="my-2"
          text={"+ Add New Role"}
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
              stableSort(roleData, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.roleName);
                  const labelId = `enhanced-table-${index}`;

                  return (
                    <TableRow
                      hover

                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.roleName}
                      selected={isItemSelected}
                    >
                      <TableCell align="center">{index+1}</TableCell>
            <TableCell align="center" id={labelId}>{row.roleName}</TableCell>
            <TableCell align="center"  style={{ fontSize: 18 }}>
               {row.active === 1 ? (
                 <img src={checked}  alt="checkbox"></img>
               ) : (
                 <img src={unchecked}  alt="checkbox"  />
                 )}
            </TableCell>
            <TableCell align="center">{row.remark}</TableCell>
            <TableCell align="center">{moment(row.createdDate).format("MM/DD/YYYY hh:mm A")}</TableCell>
            <TableCell align="center">{row.employeeName}</TableCell>
            <TableCell align="center">
              <button
              type={"button"}
              onClick={() => _handleEdit(row)}
              style={{
                borderRadius: "8px",
                backgroundColor: "#c7821c",
                color: "white",
                width: "80px"
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
              </TableContainer>

            </Paper>

          )}
     {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
      </div>
      
    </div>
 
  );
}


