import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "axios";
import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

const EditUser = ({ dispatch, getalluserbyid, handleModal }) => {
  console.log(getalluserbyid.userbyid);
  console.log(handleModal);

  const [forcusfname, setForcusfname] = useState("");
  const [forcuslname, setForcuslname] = useState("");
  const [forcusemail, setForcusemail] = useState("");
  const [forcusphone, setForcusphone] = useState("");
  const [forcushoby, setForcushobby] = useState("");
  const [forcuslocation, setForcuslocation] = useState("");
  let history = useHistory();

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
          // history.push("/");
          dispatch({
            type: "CLOSE_MODAL",
            payload: false,
          });

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
  return (
    <div>
      <form method="post" onSubmit={handleSubmit(onSubmit)} id="formlogin">
        <h3>Edit userID :{getalluserbyid.userbyid.id}</h3>
        <div className="form-group">
          <input
            type="text"
            className="form-control w-100"
            autoFocus
            onChange={(e) => {}}
            onFocus={() => {
              setForcusfname(true);
            }}
            onBlur={() => {
              setForcusfname(false);
            }}
            placeholder="Nhập văn bản cho thẻ này"
            defaultValue={getalluserbyid.userbyid.first}
            {...register("fname", {})}
          />
          <p style={{ color: "red", fontSize: "13px" }}>
            {" "}
            {errors.fname?.type === "required" && "Vui lòng nhập tên tài khoản"}
          </p>
        </div>
        <div className="form-group">
          <input
            type="text"
            onFocus={() => {
              setForcuslname(true);
            }}
            onBlur={() => {
              setForcuslname(false);
            }}
            placeholder="Nhập văn bản cho thẻ này"
            defaultValue={getalluserbyid.userbyid.last}
            className="form-control w-100"
            {...register("lname", {
              required: true,
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
            defaultValue={getalluserbyid.userbyid.email}
            className="form-control w-100"
            {...register("email", {})}
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
            {errors.location?.type === "required" && "Plse Enter location"}
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
    </div>
  );
};
const mapStateToProps = (state) => ({
  getalluser: state.getalluser,
  getalluserbyid: state.getalluserbyid,
  handleModal: state.handleModal,
});
export default connect(mapStateToProps)(EditUser);
