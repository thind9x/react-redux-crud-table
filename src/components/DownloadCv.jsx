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
import { CSVLink } from "react-csv";

const DownloadCv = () => {
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
    console.log(data.confirmpassword);
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
          console.log(res);
          alert("Add Item Successfull");
        },
        (error) => {
          console.log(error);
        }
      );
  };
  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Download
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent></DialogContent>
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
  getalluser: state.getalluser
});
export default connect(mapStateToProps)(DownloadCv);
