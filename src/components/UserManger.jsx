import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { DataGrid } from "@material-ui/data-grid";
import Button from "@material-ui/core/Button";
import AddUser from "./AddUser";
import { CSVLink } from "react-csv";
import TextareaAutosize from "react-textarea-autosize";
import MaterialTable from "material-table";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import { Admin, Resource } from "react-admin";
import TablePagination from "@material-ui/core/TablePagination";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useForm } from "react-hook-form";

import {
  List,
  Datagrid,
  TextField,
  DateField,
  BooleanField,
} from "react-admin";

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 130,
    disableClickEventBubbling: true,
  },
  {
    field: "first",
    headerName: "First name",
    width: 130,
    editable: true,
    disableClickEventBubbling: true,
  },
  {
    field: "last",
    headerName: "Last name",
    width: 130,
    editable: true,
    disableClickEventBubbling: true,
  },
  {
    field: "email",
    headerName: "Email",
    width: 160,
    editable: true,
    disableClickEventBubbling: true,
  },
  {
    field: "phone",
    headerName: "Phone",

    sortable: false,
    width: 130,
    editable: true,
    disableClickEventBubbling: true,
  },
  {
    field: "hobby",
    headerName: "Hob by",
    sortable: false,
    width: 130,
    editable: true,
    disableClickEventBubbling: true,
  },
  {
    field: "hobbys",
    headerName: "Action",
    sortable: false,
    disableClickEventBubbling: true,

    width: 160,
    renderCell: () => (
      <span style={{ display: "flex" }}>
        <Button variant="contained" color="primary">
          Edit
        </Button>
        <Button variant="contained" color="secondary">
          Del
        </Button>
      </span>
    ),
  },
];

const UserManger = ({ dispatch, getalluser, getalluserbyid }) => {
  console.log(getalluser.users);
  // const [fName, setLatName] = useState("");
  // const [lastName, setLatName] = useState("");
  // const [email, setEmail] = useState("");
  const [open, setOpen] = React.useState(false);
  const [openE, setOpenE] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseE = () => {
    setOpen(false);
  };
  const [editRowsModel, setEditRowsModel] = React.useState({});
  console.log(editRowsModel);

  const [forcus, setForcus] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const hanldeDele = () => {
    axios
      .delete(
        `https://60d2e16c858b410017b2e624.mockapi.io/api/v1/users/${getalluserbyid.userbyid.id}`
      )
      .then(
        (res) => {
          setOpen(false);

          alert("Delete Item success");
          axios
            .get("https://60d2e16c858b410017b2e624.mockapi.io/api/v1/users")
            .then((resp) => {
              dispatch({
                type: "FETCH_ALL",
                payload: resp.data,
              });
            });
        },
        (error) => {
          console.log(error);
        }
      );
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const {
    register,
    formState: { isDirty, isValid, errors },
    handleSubmit,
    watch,
  } = useForm({ mode: "all" });
  const onSubmit = (data) => {
    console.log(data.confirmpassword);
    var first = data.fname;
    var last = data.lname;
    var email = data.email;
    var phone = data.phone;
    var location = data.location;
    var hobby = data.hobby;
    axios
      .put(
        `https://60d2e16c858b410017b2e624.mockapi.io/api/v1/users/${getalluserbyid.userbyid.id}`,
        {
          first,
          last,
          email,
          phone,
          location,
          hobby,
        }
      )
      .then(
        (res) => {
          console.log(res);
          alert("Update Item Successfull");
          setOpenE(false);

          axios
            .get("https://60d2e16c858b410017b2e624.mockapi.io/api/v1/users")
            .then((res) => {
              dispatch({
                type: "FETCH_ALL",
                payload: res.data,
              });
            });
        },
        (error) => {
          console.log(error);
        }
      );
  };
  useEffect(() => {
    let sub = true;
    axios
      .get("https://60d2e16c858b410017b2e624.mockapi.io/api/v1/users")
      .then((res) => {
        if (sub) {
          dispatch({
            type: "FETCH_ALL",
            payload: res.data,
          });
        }
      });
    return () => {
      sub = false;
    };
  }, []);
  return (
    <div style={{ height: 400, width: "100%" }}>
      <TableContainer component={Paper} style={{ height: 400, width: "auto" }}>
        <Table stickyHeader aria-label="simple table">
          <TableHead style={{ fontWeight: "bold" }}>
            <TableRow>
              <TableCell align="right">ID </TableCell>
              <TableCell align="right">First</TableCell>
              <TableCell align="right">Last</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">Location</TableCell>
              <TableCell align="right">Hobby</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getalluser.users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
                <TableRow key={item.id}>
                  <TableCell align="right" component="th" scope="row">
                    {item.id}
                  </TableCell>
                  <TableCell align="right" component="th" scope="row">
                    {item.first}
                  </TableCell>
                  <TableCell align="right" component="th" scope="row">
                    {item.last}
                  </TableCell>
                  <TableCell align="right">{item.email}</TableCell>
                  <TableCell align="right">{item.phone}</TableCell>
                  <TableCell align="right">{item.location}</TableCell>
                  <TableCell align="right">{item.hobby}</TableCell>
                  <TableCell align="right" style={{ paddingLeft: "5px" }}>
                    <Button
                      variant="contained"
                      onClick={() => {
                        setOpenE(true);

                        dispatch({
                          type: "FETCH_USER_BY_ID",
                          payload: item,
                        });
                      }}
                      color="primary"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => {
                        setOpen(true);
                        dispatch({
                          type: "FETCH_USER_BY_ID",
                          payload: item,
                        });
                      }}
                      variant="contained"
                      color="secondary"
                    >
                      Del
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={getalluser.users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete user ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want remove this user from data table ? if you delete it
            can't undo
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={hanldeDele} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openE}
        onClose={handleCloseE}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Edit user : " + getalluserbyid.userbyid.id}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <form
              method="post"
              onSubmit={handleSubmit(onSubmit)}
              id="formlogin"
            >
              <div className="form-group">
                <input
                  type="text"
                  className="form-control w-100"
                  autoFocus
                  onChange={(e) => {}}
                  placeholder="Nhập văn bản cho thẻ này"
                  defaultValue={getalluserbyid.userbyid.first}
                  {...register("fname", {})}
                />
                <p style={{ color: "red", fontSize: "13px" }}>
                  {" "}
                  {errors.fname?.type === "required" &&
                    "Vui lòng nhập tên tài khoản"}
                </p>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Nhập văn bản cho thẻ này"
                  defaultValue={getalluserbyid.userbyid.last}
                  className="form-control w-100"
                  {...register("lname", {})}
                />
                <p style={{ color: "red", fontSize: "13px" }}>
                  {" "}
                  {errors.lname?.type === "required" && "Pls enter lastname"}
                </p>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  defaultValue={getalluserbyid.userbyid.email}
                  className="form-control w-100"
                  {...register("email", {
                    pattern: /\S+@\S+\.\S+/,
                  })}
                />
                <p style={{ color: "red", fontSize: "13px" }}>
                  {errors.email?.type === "required" && "Please enter email"}
                  {errors.email?.type === "pattern" && "Pls enter valid email"}
                </p>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control w-100"
                  defaultValue={getalluserbyid.userbyid.phone}
                  {...register("phone", {
                    pattern: /((09|03|07|08|05)+([0-9]{8})\b)/g,
                  })}
                />
                <p style={{ color: "red", fontSize: "13px" }}>
                  {errors.phone?.type === "required" && "Plse Enter phone"}
                  {errors.phone?.type === "pattern" && "Plse enter valid phone"}
                </p>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control w-100"
                  defaultValue={getalluserbyid.userbyid.location}
                  {...register("location", {})}
                />
                <p style={{ color: "red", fontSize: "13px" }}>
                  {errors.location?.type === "required" &&
                    "Plse Enter location"}
                </p>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  defaultValue={getalluserbyid.userbyid.hobby}
                  className="form-control w-100"
                  {...register("hobby", {})}
                />
                <p style={{ color: "red", fontSize: "13px" }}>
                  {errors.hobby?.type === "required" && "Plse Enter hobby"}
                </p>
              </div>
              <button className="btn btn-success w-100">Update</button>
            </form>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenE(false);
            }}
            color="primary"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <span style={{ display: "flex" }}>
        <CSVLink
          data={getalluser.users}
          style={{ marginRight: "8px", textDecoration: "none" }}
        >
          <Button variant="contained" color="primary">
            Download CSV
          </Button>
        </CSVLink>

        <AddUser />
      </span>
    </div>
  );
};
const mapStateToProps = (state) => ({
  getalluser: state.getalluser,
  getalluserbyid: state.getalluserbyid,
});
export default connect(mapStateToProps)(UserManger);
