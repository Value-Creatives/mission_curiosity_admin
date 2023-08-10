import React, { useEffect, useState } from "react";
import { rolesObj } from "../../utils/roles";
import { toastError } from "../../utils/toastUtils";
import CustomButton from "../Utility/Button";
import { DashboardBox } from "../Utility/DashboardBox";
import { useSelector, useDispatch } from "react-redux";
import { updateSpecificUser, userAdd } from "../../redux/actions/Users/users.actions";
import FileUpload from "../Utility/FileUpload";
import Select from "react-select";
import { getCustomerCategory } from "../../services/CustomerCategory.service";
import { CustomerCategoryGet } from "../../redux/actions/CustomerCategory/CustomerCategory.actions";
import moment from "moment"
import { useNavigate } from "react-router-dom";
function AddCustomer() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [dob, setDob] = useState(new Date());
  // const [contactPerson, setContactPerson] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [directorName, setDirectorName] = useState("");
  const [gstNo, setGstNo] = useState(""); /////optional
  const [descriptionOfCompany, setDescriptionOfCompany] = useState(""); ////////
  const [companyAddress, setCompanyAddress] = useState("");

  const [customerCategoryObj, setCustomerCategoryObj] = useState({});
  const [customerCategoryId, setCustomerCategoryId] = useState("");
  const customerCategoryArr = useSelector((state) => state.customerCategory.customerCategory);
  const customerCategoryObject = useSelector((state) => state.customerCategory.customerCategoryObj);


  const handleSubmit = () => {
    try {
      if (name == "") {
        toastError("Name is mandatory");
        return
      }
      else if (email == "") {
        toastError("Email is mandatory");
        return
      }
      else if (phone == "") {
        toastError("Phone is mandatory");
        return
      }
      else if (phone.length < 10) {
        toastError("Phone cannot be less than 10 digits");
        return
      }
      else if (!customerCategoryObject && password != confirmPassword) {
        toastError("Password does not match confirm password");
        return
      }
      else if (address == "") {
        toastError("Country is mandatory");
        return
      }
      else if (state == "") {
        toastError("State is mandatory");
        return
      }
      else if (city == "") {
        toastError("State is mandatory");
        return
      }
      else if (pincode == "") {
        toastError("Pincode is mandatory");
        return
      }
      else if (!customerCategoryObject && companyName == "") {
        toastError("Company Name is mandatory");
        return
      }
      else if (!customerCategoryObject && directorName == "") {
        toastError("Director Name is mandatory");
        return
      }
      // else if (dob == "") {
      //   toastError("DOB is mandatory");
      //   return
      // }

      let obj = {
        email,
        phone,
        name,
        password,
        confirmPassword,
        address,
        state: state,
        city,
        pincode,
        // dob,
        gstNo,
        companyName,
        companyAddress,
        directorName,
        descriptionOfCompany,
        customerCategoryId,
      }
      if (customerCategoryObject) {
        dispatch(updateSpecificUser(obj, customerCategoryObject._id))
      }
      else {
        dispatch(userAdd(obj))
      }
    }
    catch (err) {
      toastError(err);
    }
  }

  const handleGetOnInit = () => {
    dispatch(CustomerCategoryGet())
  }

  useEffect(() => {
    if (customerCategoryObject) {
      setEmail(customerCategoryObject?.email ? customerCategoryObject?.email : "");
      setPhone(customerCategoryObject?.phone ? customerCategoryObject?.phone : "");
      setName(customerCategoryObject?.name ? customerCategoryObject?.name : "");
      setAddress(customerCategoryObject?.address ? customerCategoryObject?.address : "");
      setState(customerCategoryObject?.state ? customerCategoryObject?.state : "");
      setCity(customerCategoryObject?.city ? customerCategoryObject?.city : "");
      setPincode(customerCategoryObject?.pincode ? customerCategoryObject?.pincode : "");
      setCompanyName(customerCategoryObject?.companyName ? customerCategoryObject?.companyName : "");
      setCompanyAddress(customerCategoryObject?.companyAddress ? customerCategoryObject?.companyAddress : "");
      setGstNo(customerCategoryObject?.gstNo ? customerCategoryObject?.gstNo : "");
      setDirectorName(customerCategoryObject?.directorName ? customerCategoryObject?.directorName : "");
      setDescriptionOfCompany(customerCategoryObject?.descriptionOfCompany ? customerCategoryObject?.descriptionOfCompany : "");
      // setDob(customerCategoryObject?.dob ? customerCategoryObject?.dob : "");
      console.log(customerCategoryObject?.customerCategoryObj, "customerCategoryObject?.customerCategoryObj")
      setCustomerCategoryObj(customerCategoryObject?.customerCategoryObj ? customerCategoryObject?.customerCategoryObj : "");
      setCustomerCategoryId(customerCategoryObject?.customerCategoryId ? customerCategoryObject?.customerCategoryId : "");
    }
    handleGetOnInit()
  }, [customerCategoryObject])



  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <h5 className="blue-1 mb-4">Add New Customer</h5>
          <DashboardBox>
            <form className="form row">
              <h5 className="blue-1 mb-4">Basic Info</h5>
              <div className="col-12 col-md-4 mb-3">
                <label>
                  Name (Contact Person) <span className="red">*</span>
                </label>
                <input
                  name="name"
                  className="form-control"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="col-12 col-md-4 mb-3">
                <label>
                  Company Name <span className="red">*</span>
                </label>
                <input
                  name="name"
                  className="form-control"
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
              <div className="col-12 col-md-4 mb-3">
                <label>
                  Company Address <span className="red">*</span>
                </label>
                <textarea
                  name="name"
                  className="form-control"
                  type="text"
                  value={companyAddress}
                  onChange={(e) => setCompanyAddress(e.target.value)}
                />
              </div>
              <div className="col-12 col-md-4 mb-3">
                <label>
                  Director/Proprietor/Partner Name <span className="red">*</span>
                </label>
                <input
                  name="name"
                  className="form-control"
                  type="text"
                  value={directorName}
                  onChange={(e) => setDirectorName(e.target.value)}
                />
              </div>

              <div className="col-12 col-md-4 mb-3">
                <label>
                  Gst No
                </label>
                <input
                  name="name"
                  className="form-control"
                  type="text"
                  value={gstNo}
                  onChange={(e) => setGstNo(e.target.value)}
                />
              </div>
              <div className="col-12 col-md-4 mb-3">
                <label>Phone
                  <span className="red">*</span>
                </label>
                <input
                  name="phone"
                  className="form-control"
                  type="text"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="col-12 col-md-4 mb-3">
                <label>
                  Email Address
                  <span className="red">*</span>
                </label>
                <input name="text" className="form-control" type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="col-12 col-md-4 mb-3">
                <label>
                  Country
                  <span className="red">*</span>
                </label>
                <input name="text" className="form-control" type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="col-12 col-md-4 mb-3">
                <label>
                  State
                  <span className="red">*</span>
                </label>
                <input name="text" className="form-control" type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </div>
              <div className="col-12 col-md-4 mb-3">
                <label>
                  City
                  <span className="red">*</span>
                </label>
                <input name="text" className="form-control" type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="col-12 col-md-4 mb-3">
                <label>
                  Pincode
                  <span className="red">*</span>
                </label>
                <input name="text" className="form-control" type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                />
              </div>
              {/* <div className="col-12 col-md-4 mb-3">
                <label>
                  Date of Birth
                  <span className="red">*</span>
                </label>
                <input name="text" className="form-control" type="date"
                  value={moment(dob).format('YYYY-MM-DD')}
                  onChange={(e) => setDob(e.target.value)}
                />
              </div> */}
              <div className="col-12 col-md-4 mb-3">
                <label>
                  Description Of Company
                </label>
                <input
                  name="name"
                  className="form-control"
                  type="text"
                  placeholder="Please describe your company in brief here"
                  value={descriptionOfCompany}
                  onChange={(e) => setDescriptionOfCompany(e.target.value)}
                />
              </div>

              <div className="col-12 col-md-4 mb-3">
                <label>
                  {" "}
                  PASSWORD (MINIMUM 8 CHARECTER)
                  <span className="red">*</span>
                </label>
                <input name="phone" className="form-control" type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="col-12 col-md-4 mb-3">
                <label>
                  CONFIRM PASSWORD
                  <span className="red">*</span>
                </label>
                <input name="phone" className="form-control" type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>



              <div className="col-12 col-md-4 mb-3">
                <label>
                  Customer Category
                  <span className="red">*</span>
                </label>
                <Select onChange={(e) => { setCustomerCategoryObj(e); setCustomerCategoryId(e.value) }} defaultValue={customerCategoryId} value={customerCategoryObj} options={customerCategoryArr && customerCategoryArr.length > 0 ? customerCategoryArr.map(el => ({ label: el.name, value: el._id, ...el })) : []} />

              </div>
              {/* <div className="col-12 mb-3">
                <label className="blue-1 fs-12">Role</label>
                <div className="d-flex">
                  <div className="form-check form-check-inline d-flex align-items-center">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="category-status"
                      value={rolesObj.SUBADMIN}
                      id="active-customer1"
                      checked={role == rolesObj.SUBADMIN}
                      onChange={(e) => setRole(e.target.value)}
                    />
                    <label
                      className="form-check-label fs-14"
                      htmlFor="active-customer1"
                    >
                      Sub Admin
                    </label>
                  </div>
                  <div className="form-check form-check-inline d-flex align-items-center">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="category-status"
                      value={rolesObj.CUSTOMER}
                      id="active-customer"
                      checked={role == rolesObj.CUSTOMER}
                      onChange={(e) => setRole(e.target.value)}
                    />
                    <label
                      className="form-check-label fs-14"
                      htmlFor="active-customer"
                    >
                      Customer
                    </label>
                  </div>
                  <div className="form-check form-check-inline d-flex align-items-center">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="category-status"
                      value={rolesObj.RETAILER}
                      id="inActive-customer"
                      checked={role == rolesObj.RETAILER}
                      onChange={(e) => setRole(e.target.value)}
                    />
                    <label
                      className="form-check-label fs-14"
                      htmlFor="inActive-customer"
                    >
                      Retailer
                    </label>
                  </div>
                  <div className="form-check form-check-inline d-flex align-items-center">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="category-status"
                      value={rolesObj.WHOLESALER}
                      id="inActive-customer2"
                      checked={role == rolesObj.WHOLESALER}
                      onChange={(e) => setRole(e.target.value)}
                    />
                    <label
                      className="form-check-label fs-14"
                      htmlFor="inActive-customer2"
                    >
                      Wholesaler
                    </label>
                  </div>
                </div>
              </div>



              {
                (role == rolesObj.RETAILER || role == rolesObj.WHOLESALER) &&
                <>
                  <div className="col-12 col-md-4 mb-3">
                    <label>
                      SHOP NAME
                      <span className="red">*</span>
                    </label>
                    <input name="phone" className="form-control" type="text"
                      value={shopName}
                      onChange={(e) => setShopName(e.target.value)}
                    />
                  </div>
                  <div className="col-12 col-md-4 mb-3">
                    <label>
                      PAN NUMBER
                      <span className="red">*</span>
                    </label>
                    <input name="pannumber" className="form-control" type="text"
                      value={panNo}
                      onChange={(e) => setPanNo(e.target.value)}
                    />
                  </div>
                  <div className="col-12 col-md-4 mb-3">
                    <label>
                      AADHAR NUMBER
                      <span className="red">*</span>
                    </label>
                    <input name="aadharnumber" className="form-control" type="number" maxLength={12}
                      value={aadharNo}
                      onChange={(e) => setAadharNo(e.target.value)}
                    />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label>Visiting Card (165x165)PX</label>
                    <FileUpload onFileChange={handleVisitingCardFileSet} />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label>Shop Image (165x165)PX</label>
                    <FileUpload onFileChange={handleShopImageFileSet} />
                  </div>
                </>
              } */}

              <div className="col-12 mt-2 text-center">
                <CustomButton
                  isBtn
                  iconName="fa-solid fa-check"
                  btnName="Create"
                  btntype="button"
                  ClickEvent={handleSubmit}
                />
              </div>
            </form>
          </DashboardBox>
        </div>
      </section>
    </main>
  );
}

export default AddCustomer;
