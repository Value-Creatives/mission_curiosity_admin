import { Modal, Switch } from "@mui/material";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { images } from "../Images/Images";
import ActionIcon from "../Utility/ActionIcon";
import CustomButton from "../Utility/Button";
import { downloadCSV } from "../Utility/CSV";
import { DashboardTable } from "../Utility/DashboardBox";
import SearchBox from "../Utility/SearchBox";
import tabClick from "../Utility/TabClick";
import { useDispatch, useSelector } from "react-redux";
import { updateSpecificUser, usersGet } from "../../redux/actions/Users/users.actions";
import { updateUserCategory, updateUserKycStatus, updateUserStatus } from "../../services/users.service";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import CustomerDetail from "./CustomerDetail";
import { EditModal } from "../Utility/Modal";
import { rolesObj } from "../../utils/roles";
import { CustomerCategoryGet, SetCustomerCategoryObj } from "../../redux/actions/CustomerCategory/CustomerCategory.actions";
import { useNavigate } from "react-router-dom";
import { toastError } from "../../utils/toastUtils";
import { StatusChange } from "../../services/users.service";
import { toastSuccess } from "../Utility/ToastUtils";
import Select from "react-select";

function Customer() {
  const dispatch = useDispatch();
  const [ModalType, setModalType] = useState("");
  const [ModalName, setModalName] = useState("");
  const [ModalBox, setModalBox] = useState(false);
  const [usersArr, setUsersArr] = useState([]);
  const [customersArr, setCustomersArr] = useState([]);
  const [retailersArr, setRetailersArr] = useState([]);
  const [wholesalersArr, setWholesalersArr] = useState([]);
  const [subAdminArr, setSubAdminArr] = useState([]);
  const userArr = useSelector((state) => state.users.users);
  const [selectedData, setSelectedData] = useState(null);
  const [query, setQuery] = useState("");
  const [displayUserArr, setDisplayUserArr] = useState([]);
  const [mainArr, setMainArr] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [customerCategoryObj, setCustomerCategoryObj] = useState({});
  const [customerCategoryId, setCustomerCategoryId] = useState("");
  const [customerCatArr, setCustomerCatArr] = useState([]);
  const customerCategoryArr = useSelector((state) => state.customerCategory.customerCategory);
  const handleGetOnInit = () => {
    dispatch(CustomerCategoryGet())
  }


  useEffect(() => {
    setCustomerCatArr(customerCategoryArr)
  }, [customerCategoryArr])

  const navigate = useNavigate()


  useEffect(() => {
    if (userArr) {
      setDisplayUserArr([...userArr])
      setMainArr([...userArr])
    }
  }, [userArr])

  const handleEdit = (e, row) => {
    e.preventDefault();
    dispatch(SetCustomerCategoryObj(row));
    navigate("/Customer-Create")
  };


  const handleChangeApproval = async (id, isApproved) => {
    try {
      let { data: res } = await StatusChange(id, { isApproved: !isApproved })
      if (res) {
        if (!isApproved == true) {
          setModalBox(true)
        }
        toastSuccess(res.message)
        handleGetAllUsers()
      }
    }
    catch (err) {
      toastError(err)
    }
  }


  const handleModalSet = (e, row) => {
    e.preventDefault();
    setModalBox(true);
    setModalType("customer-detail");
    setModalName("Customer Information");
    setSelectedData(row);
  };

  const users_columns = [
    {
      name: "ID",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "5%",
    },
    {
      name: "AVATAR",
      cell: (row) => <img src={images?.customer} alt={row?.name} />,
      width: "10%",
    },
    {
      name: "NAME",
      selector: (row) => `${row?.name}`,
      width: "10%",
    },
    {
      name: "EMAIL",
      selector: (row) => row?.email,
      width: "15%",
    },
    {
      name: "PHONE",
      selector: (row) => row?.phone,
      width: "10%",
    },
    {
      name: "ROLE",
      selector: (row) => row?.role,
      width: "10%",
    },
    {
      name: "Is Approved",
      selector: (row) => <Switch checked={row?.isApproved} onChange={() => { handleChangeApproval(row?._id, row?.isApproved); setSelectedUser(row) }} />,
      width: "10%",
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <CustomButton btntype="button" ClickEvent={(e) => handleModalSet(e, row)} isBtn iconName="fa-solid fa-check" btnName="View" />
          <div style={{ marginLeft: 15 }}>
            <CustomButton btntype="button" ClickEvent={(e) => handleEdit(e, row)} isBtn iconName="fa-solid fa-pen" btnName="Edit" />
          </div>
          {selectedData && <EditModal ModalBox={ModalBox} data={selectedData} setModalBox={setModalBox} name={ModalName} ModalType={ModalType} width="max-content" />}
        </>
      ),
      width: "15%",
    },
  ];

  const [tabList, settabList] = useState([
    {
      tabName: "All",
      active: true,
    },
    // {
    //   tabName: "Customers",
    //   active: false,
    // },
    // {
    //   tabName: "Retailers",
    //   active: false,
    // },
    // {
    //   tabName: "Wholesalers",
    //   active: false,
    // },
    // {
    //   tabName: "Sub-Admins",
    //   active: false,
    // },
  ]);

  const handleGetAllUsers = () => {
    dispatch(usersGet());
  };
  useEffect(() => {
    if (userArr && userArr.length) {
      setUsersArr(userArr);
      // setDisplayUsersArr(userArr);
      setCustomersArr(usersArr.filter((el) => el.role == rolesObj.CUSTOMER));
      setRetailersArr(usersArr.filter((el) => el.role == rolesObj.RETAILER));
      setWholesalersArr(usersArr.filter((el) => el.role == rolesObj.WHOLESALER));
      setSubAdminArr(usersArr.filter((el) => el.role == rolesObj.SUBADMIN));
    }
  }, [userArr]);

  useEffect(() => {
    handleGetAllUsers();
    handleGetOnInit()
  }, []);

  const handleGetselectedTable = () => {
    if (tabList.filter((el) => el.active)[0].tabName == "All") {
      return <DataTable columns={users_columns} data={displayUserArr} pagination />;
    } else if (tabList.filter((el) => el.active)[0].tabName == "Customers") {
      return <DataTable columns={users_columns} data={customersArr} pagination />;
    }
    else if (tabList.filter((el) => el.active)[0].tabName == "Retailers") {
      return <DataTable columns={users_columns} data={retailersArr} pagination />;
    }
    else if (tabList.filter((el) => el.active)[0].tabName == "Wholesalers") {
      return <DataTable columns={users_columns} data={wholesalersArr} pagination />;
    }
    else {
      return <DataTable columns={users_columns} data={subAdminArr} pagination />;
    }
  };






  const handleSearch = (queryValue) => {
    setQuery(queryValue)
    let tempArr = mainArr
    tempArr = tempArr.filter(el => `${el?.name}`.toLowerCase().includes(`${queryValue}`.toLowerCase()) ||
      `${el?.phone}`.toLowerCase().includes(`${queryValue}`.toLowerCase())
      || `${el?.email}`.toLowerCase().includes(`${queryValue}`.toLowerCase())
    )
    setDisplayUserArr([...tempArr])
  }




  const handleUpdateUserCategory = async () => {
    try {

      let obj = {
        customerCategoryId: customerCategoryId
      }
      let { data: res } = await updateUserCategory(selectedUser._id, obj)
      if (res.message) {
        toastSuccess(res.message);
        setModalBox(false)
      }
      // dispatch(updateSpecificUser(obj, selectedUser._id))
    }
    catch (err) {
      toastError(err)
    }
  }



  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <ul className="nav nav-pills dashboard-pills justify-content-end" id="pills-tab" role="tablist">
              {tabList.map((item, i) => {
                return (
                  <li key={i}>
                    <CustomButton
                      navPills
                      btnName={item.tabName}
                      pillActive={item.active ? true : false}
                      path={item.path}
                      extraClass={item.extraClass}
                      ClickEvent={() => {
                        tabClick(i, tabList, settabList);
                      }}
                    />
                  </li>
                );
              })}
            </ul>
            <CustomButton isLink iconName="fa-solid fa-plus" btnName="Create Customer" path="/Customer-Create" />
          </div>
          <DashboardTable>
            <div className="d-flex align-items-center justify-content-between mb-5">
              <h5 className="blue-1 m-0">All Customers</h5>
              <div className="d-flex align-items-center gap-3">
                <SearchBox query={query} setQuery={handleSearch} extraClass="bg-white" />
                {/* <CustomButton isLink iconName="fa-solid fa-download" btnName="Customer CSV" path="/" small roundedPill downloadAble ClickEvent={() => downloadCSV(usersArr)} /> */}
              </div>
            </div>

            {handleGetselectedTable()}
          </DashboardTable>
        </div>
      </section>

      <Modal open={ModalBox} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box className="modal-box">
          <div className="modal-container">
            <div className="modal-header text-white">
              Update User Type
            </div>
            <div className="modal-body" style={{ width: "50vw" }}>
              <div className="container">
                <div className="row">
                  <div className="col-12 col-md-12 mb-3">
                    <label>
                      Customer Category
                      <span className="red">*</span>
                    </label>
                  </div>
                  <div className="col-12 col-md-11 mb-3">
                    <Select onChange={(e) => { setCustomerCategoryObj(e); setCustomerCategoryId(e.value) }} defaultValue={customerCategoryId} value={customerCategoryObj} options={customerCatArr && customerCatArr.length > 0 ? customerCatArr.map(el => ({ label: el.name, value: el._id, ...el })) : []} />
                  </div>
                  <div className="col-12 col-md-11 mb-3">
                    <CustomButton ClickEvent={() => handleUpdateUserCategory()} btntype="button" isBtn iconName="fa-solid fa-check" btnName="Save" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </main>
  );
}

export default Customer;
