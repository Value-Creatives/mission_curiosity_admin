import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import AddCategory from "./AddCustomerCategory";
import ActionIcon from "../../Utility/ActionIcon";
import CustomButton from "../../Utility/Button";
import { downloadCSV } from "../../Utility/CSV";
import SearchBox from "../../Utility/SearchBox";

import { AddModal } from "../../Utility/Modal";
import { useSelector, useDispatch } from "react-redux";
import { DashboardBox, DashboardTable } from "../../Utility/DashboardBox";
import { CATEGORYDelete, CATEGORYGet, SetCATEGORYObj } from "../../../redux/actions/Category/Category.actions";
import { CustomerCategoryDelete, CustomerCategoryGet, SetCustomerCategoryObj } from "../../../redux/actions/CustomerCategory/CustomerCategory.actions";
function ViewCustomerCategory() {
  // ==============================================================================================================
  const dispatch = useDispatch();
  const [ModalType, setModalType] = useState("");
  const [ModalName, setModalName] = useState("");
  const [ModalBox, setModalBox] = useState(false);
  const customerCategoryArr = useSelector((state) => state.customerCategory.customerCategory);
  const customerCategoryObj = useSelector((state) => state.customerCategory.customerCategoryObj);
  const [query, setQuery] = useState("");
  const [editModeActive, setEditModeActive] = useState(false);

  const [displaycustomerCategoryArr, setDisplaycustomerCategoryArr] = useState([]);
  const [maincustomerCategoryArr, setMaincustomerCategoryArr] = useState([]);
  const handleCategoryEdit = (row) => {
    setEditModeActive(true)
    dispatch(SetCustomerCategoryObj(row));
  };

  const handleCategoryDelete = (row) => {
    dispatch(CustomerCategoryDelete(row._id));
  };



  useEffect(() => {
    if (customerCategoryArr) {
      setDisplaycustomerCategoryArr([...customerCategoryArr])
      setMaincustomerCategoryArr([...customerCategoryArr])
    }
  }, [customerCategoryArr])


  useEffect(() => {

    dispatch(CustomerCategoryGet());
  }, [])
  useEffect(() => {
    setEditModeActive(customerCategoryObj ? true : false)
  }, [customerCategoryObj])



  const category_columns = [
    {
      name: "ID",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Discount Percentage",
      selector: (row) => (row.percentage || row.percentage == 0 ? `${row.percentage}%` : "NA"),
    },
    // {
    //   name: "Status",
    //   minWidth: "210px",
    //   maxWidth: "211px",
    //   button: true,
    //   cell: (row) => <CustomButton greenBtn noIcon btnName="Active" path={row.url} />,
    // },
    {
      name: "Action",
      minWidth: "210px",
      maxWidth: "211px",
      cell: (row) => <ActionIcon Uniquekey={row._id} edit remove deletePath="/Customer-Category" onDeleteClick={() => handleCategoryDelete(row)} isRedirected={true} onEditClick={() => handleCategoryEdit(row)} editPath="/Customer-Category" />,
    },
  ];

  // ==============================================================================================================


  const handleSearch = (queryValue) => {
    setQuery(queryValue)
    let tempArr = maincustomerCategoryArr
    tempArr = tempArr.filter(el => `${el.name}`.toLowerCase().includes(`${queryValue}`.toLowerCase()))
    setDisplaycustomerCategoryArr([...tempArr])
  }




  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12 col-md-4">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="blue-1 m-0">{editModeActive ? "Edit" : "Add"} Customer Category</h5>
                {/* <CustomButton isLink iconName="fa-solid fa-plus" btnName="BULK CATEGORY UPLOAD" path="/Product/Bulk-Category-Upload" roundedPill small /> */}
              </div>
              <DashboardBox>
                <AddCategory />
              </DashboardBox>
            </div>
            <div className="col-12 col-md-8">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h5 className="blue-1 m-0">Customer Category List</h5>
                <div className="d-flex gap-3 align-items-center">
                  {/* <CustomButton isLink iconName="fa-solid fa-download" btnName="CATEGORY CSV" path="/Product/Bulk-Category-Upload" small roundedPill downloadAble /> */}
                  <SearchBox query={query} setQuery={handleSearch} extraClass="bg-white" />
                </div>
              </div>
              <DashboardTable>
                <DataTable columns={category_columns} data={displaycustomerCategoryArr && displaycustomerCategoryArr.length > 0 ? displaycustomerCategoryArr : []} pagination />
              </DashboardTable>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ViewCustomerCategory;
