import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "axios";
import store from "./../store";
const AddUser = ({ dispatch, getalluser, adduser }) => {
  console.log(adduser);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const {
    register,
    formState: { isDirty, isValid, errors },
    handleSubmit,
    watch
  } = useForm({ mode: "all" });
  const onSubmit = (data) => {
    var first = data.fname;
    var last = data.lname;
    var email = data.email;
    var phone = data.phone;
    var location = data.location;
    var hobby = data.hobby;
    axios
      .post("https://60d2e16c858b410017b2e624.mockapi.io/api/v1/users/", {
        first,
        last,
        email,
        phone,
        location,
        hobby
      })
      .then(
        (res) => {
          alert("Add Item success");
          axios
            .get("https://60d2e16c858b410017b2e624.mockapi.io/api/v1/users")
            .then((resp) => {
              dispatch({
                type: "FETCH_ALL",
                payload: resp.data
              });
            });
        },
        (error) => {
          console.log(error);
        }
      );
  };
  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add Items
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <form method="post" onSubmit={handleSubmit(onSubmit)} id="formlogin">
            <div className="form-group">
              <input
                type="text"
                className="form-control w-100"
                placeholder="f name"
                {...register("fname", {
                  required: true
                })}
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
                placeholder="last name"
                className="form-control w-100"
                {...register("lname", {
                  required: true
                })}
              />
              <p style={{ color: "red", fontSize: "13px" }}>
                {" "}
                {errors.lname?.type === "required" && "Pls enter lastname"}
              </p>
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Email"
                className="form-control w-100"
                {...register("email", {
                  required: true,

                  pattern: /\S+@\S+\.\S+/
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
                placeholder="Phone"
                {...register("phone", {
                  required: true,

                  pattern: /((09|03|07|08|05)+([0-9]{8})\b)/g
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
                placeholder="location"
                {...register("location", {
                  required: true
                })}
              />
              <p style={{ color: "red", fontSize: "13px" }}>
                {errors.location?.type === "required" && "Plse Enter location"}
              </p>
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="hobby"
                className="form-control w-100"
                {...register("hobby", {
                  required: true
                })}
              />
              <p style={{ color: "red", fontSize: "13px" }}>
                {errors.hobby?.type === "required" && "Plse Enter hobby"}
              </p>
            </div>
            <button
              disabled={!isDirty || !isValid}
              className="btn btn-success w-100"
            >
              Add
            </button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
const mapStateToProps = (state) => ({
  getalluser: state.getalluser,
  adduser: state.adduser
});
export default connect(mapStateToProps)(AddUser);
