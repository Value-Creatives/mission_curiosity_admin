import React, { useState } from "react";
import { images } from "../Images/Images";
import CustomButton from "../Utility/Button";
import { DashboardBox, DashboardTable } from "../Utility/DashboardBox";
import SearchBox from "../Utility/SearchBox";
import tabClick from "../Utility/TabClick";
import ActionIcon from "../Utility/ActionIcon";
import DataTable from "react-data-table-component";
import { downloadCSV } from "../Utility/CSV";
import { generateFilePath } from "../Utility/utils";

function CustomerDetail({ customerData }) {
  // ==============================================================================================
  console.log(customerData, "CUSTOMER");
  const [tabList, settabList] = useState([
    {
      tabName: "ORDERS",
      active: true,
    },
    {
      tabName: "WALLET HISTORIES",
      active: false,
    },
    {
      tabName: "ADDRESSES",
      active: false,
    },
  ]);
  const table_columns = [
    {
      name: "SL",
      selector: (row) => row.Seq,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.date,
    },
    {
      name: "Order ID",
      selector: (row) => row.order_id,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Total Product QTY",
      selector: (row) => row.product_quantity,
    },
    {
      name: "Total Amount",
      selector: (row) => row.amount,
    },
    {
      name: "Order Status",
      button: true,
      width: "10%",
      cell: () => <CustomButton redBtn btnName="Pending" />,
    },
    {
      name: "Is Paid",
      button: true,
      width: "10%",
      cell: () => <CustomButton redBtn btnName="Pending" />,
    },
    {
      name: "Action",
      cell: (row) => <ActionIcon approve detail detailpath="/Order/Sale-Detail" Uniquekey={row.id} />,
    },
  ];

  const table_data = [
    {
      id: "1",
      Seq: "1",
      date: "	17th Jun, 2022",
      order_id: "27220617041151	",
      email: "devesh.batra@ebslon.com",
      product_quantity: "6",
      amount: "4,232.00",
    },
    {
      id: "2",
      Seq: "2",
      date: "	17th Jun, 2022",
      order_id: "27220617041151	",
      email: "devesh.batra@ebslon.com",
      product_quantity: "6",
      amount: "4,232.00",
    },
    {
      id: "3",
      Seq: "3",
      date: "	17th Jun, 2022",
      order_id: "27220617041151	",
      email: "devesh.batra@ebslon.com",
      product_quantity: "6",
      amount: "4,232.00",
    },
  ];
  const wallet_columns = [
    {
      name: "SL",
      selector: (row) => row.Seq,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.date,
    },
    {
      name: "User",
      selector: (row) => row.user,
    },
    {
      name: "TXN ID",
      selector: (row) => row.txn,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
    },
    {
      name: "Type",
      selector: (row) => row.type,
    },
    {
      name: "Payment Method",
      selector: (row) => row.method,
    },
    {
      name: "Action",
      cell: (row) => <ActionIcon approve decline Uniquekey={row.id} />,
    },
  ];

  const wallet_data = [
    {
      id: "1",
      Seq: "1",
      date: "	17th Jun, 2022",
      txn: "27220617041151	",
      user: "XYZ",
      method: "COD",
      type: "CGST",
      amount: "4,232.00",
    },
    {
      id: "2",
      Seq: "2",
      date: "	17th Jun, 2022",
      txn: "27220617041151	",
      user: "XYZ",
      method: "COD",
      type: "CGST",
      amount: "4,232.00",
    },
    {
      id: "3",
      Seq: "3",
      date: "	17th Jun, 2022",
      txn: "27220617041151	",
      user: "XYZ",
      method: "COD",
      type: "CGST",
      amount: "4,232.00",
    },
  ];

  const address_columns = [
    {
      name: "Full Name",
      sortable: true,
      selector: (row) => row.name,
    },
    {
      name: "Address",
      selector: (row) => row.address,
    },
    {
      name: "Region",
      minWidth: "200px",
      maxWidth: "210px",
      selector: (row) => row.region,
    },
    {
      name: "Email",
      minWidth: "200px",
      maxWidth: "210px",
      selector: (row) => row.email,
    },
    {
      name: "Phone Number",
      minWidth: "200px",
      maxWidth: "210px",
      selector: (row) => row.contact,
    },
    {
      name: "Action",
      minWidth: "200px",
      maxWidth: "210px",
      button: true,
      cell: (row) => <CustomButton greenBtn noIcon btnName="EDIT" />,
    },
  ];

  const address_data = [
    {
      id: "1",
      name: "XYZ",
      address: "112/6 XYZ",
      region: "Delhi, India",
      email: "XYZ@gmail.com",
      contact: "5665455423",
    },
  ];

  // ==============================================================================================

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <DashboardBox className="mb-5">
            <h5 className="blue-1 mb-4">Customer Profile</h5>
            <div className="row">
              <div className="col-12 col-md-5">
                <div className="customer-profile">
                  <img src={images.customer} alt="" />
                  <h6 className="blue-1 text-capitalize my-3">{customerData.firstName}</h6>
                  <ul className="blue-1 fs-14">
                    <li style={{ display: "flex", justifyContent: "space-between" }}>
                      <span className="fw-600" style={{ flex: 1 }}>
                        Contact person Name
                      </span>
                      <span style={{ display: "flex", flex: 1, justifyContent: "center" }}>:</span>
                      <span style={{ display: "flex", flex: 1, justifyContent: "flex-end" }}>
                        {customerData.name}
                      </span>
                    </li>
                    <li style={{ display: "flex", justifyContent: "space-between" }}>
                      <span className="fw-600" style={{ flex: 1 }}>
                        Company Name
                      </span>
                      <span style={{ display: "flex", flex: 1, justifyContent: "center" }}>:</span>
                      <span style={{ display: "flex", flex: 1, justifyContent: "flex-end" }}>
                        {customerData.companyName}
                      </span>
                    </li>
                    <li style={{ display: "flex", justifyContent: "space-between" }}>
                      <span className="fw-600" style={{ flex: 1 }}>
                        Company Address
                      </span>
                      <span style={{ display: "flex", flex: 1, justifyContent: "center" }}>:</span>
                      <span style={{ display: "flex", flex: 1, justifyContent: "flex-end" }}>
                        {customerData.companyAddress}
                      </span>
                    </li>
                    <li style={{ display: "flex", justifyContent: "space-between" }}>
                      <span className="fw-600" style={{ flex: 1 }}>
                        Director/Proprietor/Partner Name
                      </span>
                      <span style={{ display: "flex", flex: 1, justifyContent: "center" }}>:</span>
                      <span style={{ display: "flex", flex: 1, justifyContent: "flex-end" }}>
                        {customerData.directorName}
                      </span>
                    </li>
                    <li style={{ display: "flex", justifyContent: "space-between" }}>
                      <span className="fw-600" style={{ flex: 1 }}>
                        Gst No.
                      </span>
                      <span style={{ display: "flex", flex: 1, justifyContent: "center" }}>:</span>
                      <span style={{ display: "flex", flex: 1, justifyContent: "flex-end" }}>
                        {customerData?.gstNo}
                      </span>
                    </li>
                    <li style={{ display: "flex", justifyContent: "space-between" }}>
                      <span className="fw-600" style={{ flex: 1 }}>
                        Description Of Company
                      </span>
                      <span style={{ display: "flex", flex: 1, justifyContent: "center" }}>:</span>
                      <span style={{ display: "flex", flex: 1, justifyContent: "flex-end" }}>
                        {customerData.descriptionOfCompany}
                      </span>
                    </li>
                    <li>
                      <span className="fw-600" style={{ flex: 1 }}>
                        Email
                      </span>
                      <span style={{ display: "flex", flex: 1, justifyContent: "center" }}>:</span>
                      <span style={{ display: "flex", flex: 1, justifyContent: "flex-end", wordBreak: "break-all" }}>

                        {customerData.email}
                      </span>
                    </li>



                  </ul>
                </div>
              </div>
              <div className="col-12 col-md-7 row">
                <div className="col-12 col-md-3">

                </div>
                {/* <div className="col-12 col-md-4 ml-2">
                  <h5 className="blue-1 text-capitalize mb-3">Visiting Card</h5>
                  <img style={{ height: 90, minHeight: 90 }} src={generateFilePath(customerData.visitingCard)} alt={customerData?.firstName} />
                </div>
                <div className="col-12 col-md-4 ml-2 mr-2">
                  <h5 className="blue-1 text-capitalize mb-3">Shop Image</h5>
                  <img style={{ height: 90, minHeight: 90 }} src={generateFilePath(customerData.shopImage)} alt={customerData?.firstName} />

                </div> */}
                <div className="col-12 col-md-11 offset-1 row mt-5 customer-profile">
                  <ul className="blue-1 fs-14">
                    <li>
                      <span className="fw-600" style={{ flex: 1 }}>
                        Phone
                      </span>
                      <span style={{ display: "flex", flex: 1, justifyContent: "center" }}>:</span>
                      <span style={{ display: "flex", flex: 1, justifyContent: "flex-end" }}>
                        {customerData.phone}
                      </span>
                    </li>
                    <li>
                      <span className="fw-600" style={{ flex: 1 }}>
                        Registered Date
                      </span>
                      <span style={{ display: "flex", flex: 1, justifyContent: "center" }}>:</span>
                      <span style={{ display: "flex", flex: 1, justifyContent: "flex-end" }}>
                        {new Date(customerData.createdAt).toDateString()}
                      </span>
                    </li>



                    <li style={{ display: "flex", justifyContent: "space-between" }}>
                      <span className="fw-600" style={{ flex: 1 }}>
                        Country
                      </span>
                      <span style={{ display: "flex", flex: 1, justifyContent: "center" }}>:</span>
                      <span style={{ display: "flex", flex: 1, justifyContent: "flex-end" }}>
                        {customerData.address}
                      </span>
                    </li>
                    <li>
                      <span className="fw-600" style={{ flex: 1 }}>
                        State
                      </span>
                      <span style={{ display: "flex", flex: 1, justifyContent: "center" }}>:</span>
                      <span style={{ display: "flex", flex: 1, justifyContent: "flex-end", wordBreak: "break-all" }}>

                        {customerData.state}
                      </span>
                    </li>
                    <li>
                      <span className="fw-600" style={{ flex: 1 }}>
                        City
                      </span>
                      <span style={{ display: "flex", flex: 1, justifyContent: "center" }}>:</span>
                      <span style={{ display: "flex", flex: 1, justifyContent: "flex-end" }}>
                        {customerData.city}
                      </span>
                    </li>
                    <li>
                      <span className="fw-600" style={{ flex: 1 }}>
                        Pincode
                      </span>
                      <span style={{ display: "flex", flex: 1, justifyContent: "center" }}>:</span>
                      <span style={{ display: "flex", flex: 1, justifyContent: "flex-end" }}>
                        {customerData.pincode}
                      </span>
                    </li>
                    {/* <li style={{ display: "flex", justifyContent: "space-between" }}>
                      <span className="fw-600" style={{ flex: 1 }}>
                        Pan Number
                      </span>
                      <span style={{ display: "flex", flex: 1, justifyContent: "center" }}>:</span>
                      <span style={{ display: "flex", flex: 1, justifyContent: "flex-end" }}>
                        {customerData.panNo}
                      </span>
                    </li>
                    <li style={{ display: "flex", justifyContent: "space-between" }}>
                      <span className="fw-600" style={{ flex: 1 }}>
                        Aadhaar number
                      </span>
                      <span style={{ display: "flex", flex: 1, justifyContent: "center" }}>:</span>
                      <span style={{ display: "flex", flex: 1, justifyContent: "flex-end" }}>
                        {customerData.aadharNo}
                      </span>
                    </li> */}
                    <li>
                      <span className="fw-600" style={{ flex: 1 }}>
                        DOB
                      </span>
                      <span style={{ display: "flex", flex: 1, justifyContent: "center" }}>:</span>
                      <span style={{ display: "flex", flex: 1, justifyContent: "flex-end", wordBreak: "break-all" }}>

                        {new Date(customerData.dob).toDateString()}
                      </span>
                    </li>

                  </ul>
                </div>

              </div>
            </div>
          </DashboardBox>

        </div>
      </section>
    </main>
  );
}

export default CustomerDetail;
