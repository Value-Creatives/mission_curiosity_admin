import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import AddCategory from "./AddCategory";
import ActionIcon from "../../Utility/ActionIcon";
import CustomButton from "../../Utility/Button";
import { downloadCSV } from "../../Utility/CSV";
import SearchBox from "../../Utility/SearchBox";

import { AddModal } from "../../Utility/Modal";
import { useSelector, useDispatch } from "react-redux";
import { DashboardBox, DashboardTable } from "../../Utility/DashboardBox";
import { CATEGORYDelete, CATEGORYGet, SetCATEGORYObj } from "../../../redux/actions/Category/Category.actions";
function Category() {
  // ==============================================================================================================
  const dispatch = useDispatch();
  const [ModalType, setModalType] = useState("");
  const [ModalName, setModalName] = useState("");
  const [ModalBox, setModalBox] = useState(false);
  const categoryArr = useSelector((state) => state.category.categories);
  const [query, setQuery] = useState("");
  const [displayCategoryArr, setDisplayCategoryArr] = useState([]);
  const [mainArr, setMainArr] = useState([]);
  const handleCategoryEdit = (row) => {
    dispatch(SetCATEGORYObj(row));
  };

  const handleCategoryDelete = (row) => {
    dispatch(CATEGORYDelete(row._id));
  };

  useEffect(() => {

    dispatch(CATEGORYGet());
  }, [])
  useEffect(() => {
    if (categoryArr && categoryArr.length) {
      setDisplayCategoryArr([...categoryArr])
      setMainArr([...categoryArr])
    }
  }, [categoryArr])



  const handleSearch = (queryValue) => {
    setQuery(queryValue)
    let tempArr = mainArr
    tempArr = tempArr.filter(el => `${el?.name}`.toLowerCase().includes(`${queryValue}`.toLowerCase())
      || `${el?.parentCategoryName}`.toLowerCase().includes(`${queryValue}`.toLowerCase()))
    setDisplayCategoryArr([...tempArr])
  }





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
      name: "Parent Category",
      selector: (row) => (row.parentCategoryName ? row.parentCategoryName : "NA"),
    },
    {
      name: "Level",
      minWidth: "210px",
      maxWidth: "211px",
      button: true,
      selector: (row) => row.level,
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
      cell: (row) => <ActionIcon Uniquekey={row._id} remove edit deletePath="/Product/Category" onDeleteClick={() => handleCategoryDelete(row)} isRedirected={true} onEditClick={() => handleCategoryEdit(row)} editPath="/Product/Category" />,
    },
  ];

  // ==============================================================================================================

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12 col-md-4">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="blue-1 m-0">Add Category</h5>
                {/* <CustomButton isLink iconName="fa-solid fa-plus" btnName="BULK CATEGORY UPLOAD" path="/Product/Bulk-Category-Upload" roundedPill small /> */}
              </div>
              <DashboardBox>
                <AddCategory />
              </DashboardBox>
            </div>
            <div className="col-12 col-md-8">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h5 className="blue-1 m-0">Category List</h5>
                <div className="d-flex gap-3 align-items-center">
                  {/* <CustomButton isLink iconName="fa-solid fa-download" btnName="CATEGORY CSV" path="/Product/Bulk-Category-Upload" small roundedPill downloadAble /> */}
                  <SearchBox query={query} setQuery={handleSearch} extraClass="bg-white" />
                </div>
              </div>
              <DashboardTable>
                <DataTable columns={category_columns} data={displayCategoryArr && displayCategoryArr.length > 0 ? displayCategoryArr : []} pagination />
              </DashboardTable>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Category;
