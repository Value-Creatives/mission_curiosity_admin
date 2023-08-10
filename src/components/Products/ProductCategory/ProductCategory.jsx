import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import ActionIcon from "../../Utility/ActionIcon";
import SearchBox from "../../Utility/SearchBox";
import AddProductCategory from "./AddProductCategory";

import { useDispatch, useSelector } from "react-redux";
import { PRODUCT_CATEGORYDelete, PRODUCT_CATEGORYGet, SetPRODUCT_CATEGORYObj, SET_PRODUCT_CATEGORY_OBJ } from "../../../redux/actions/ProductCategory/ProductCategory.actions";
import { DashboardBox, DashboardTable } from "../../Utility/DashboardBox";
function ProductCategory() {
  // ==============================================================================================================
  const dispatch = useDispatch();
  const [ModalType, setModalType] = useState("");
  const [ModalName, setModalName] = useState("");
  const [ModalBox, setModalBox] = useState(false);
  const productCategoryArr = useSelector((state) => state.productCategory.productCategories);

  const [displayproductCategoryArr, setDisplayproductCategoryArr] = useState([]);
  const [mainArr, setMainArr] = useState([]);


  const [query, setQuery] = useState("");

  const handleCategoryEdit = (row) => {
    dispatch(SetPRODUCT_CATEGORYObj(row));
  };

  const handleCategoryDelete = (row) => {
    dispatch(PRODUCT_CATEGORYDelete(row._id));
  };

  useEffect(() => {
    if (productCategoryArr && productCategoryArr.length > 0) {
      setDisplayproductCategoryArr([...productCategoryArr])
      setMainArr([...productCategoryArr])
    }
  }, [productCategoryArr])
  useEffect(() => {

    dispatch(PRODUCT_CATEGORYGet());
  }, [])



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
      name: "Action",
      minWidth: "210px",
      maxWidth: "211px",
      cell: (row) => <ActionIcon Uniquekey={row._id} remove edit deletePath="/Product/ProductCategory" onDeleteClick={(e) => { e.preventDefault(); handleCategoryDelete(row) }} isRedirected={true} onEditClick={(e) => { e.preventDefault(); handleCategoryEdit(row) }} editPath="/Product/ProductCategory" />,
    },
  ];




  const handleSearch = (queryValue) => {
    setQuery(queryValue)
    let tempArr = mainArr
    tempArr = tempArr.filter(el => `${el?.name}`.toLowerCase().includes(`${queryValue}`.toLowerCase()))
    setDisplayproductCategoryArr([...tempArr])
  }
  // ==============================================================================================================

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12 col-md-4">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="blue-1 m-0">Add Product Category</h5>
                {/* <CustomButton isLink iconName="fa-solid fa-plus" btnName="BULK CATEGORY UPLOAD" path="/Product/Bulk-Category-Upload" roundedPill small /> */}
              </div>
              <DashboardBox>
                <AddProductCategory />
              </DashboardBox>
            </div>
            <div className="col-12 col-md-8">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h5 className="blue-1 m-0"> Product Category List</h5>
                <div className="d-flex gap-3 align-items-center">
                  {/* <CustomButton isLink iconName="fa-solid fa-download" btnName="CATEGORY CSV" path="/Product/Bulk-Category-Upload" small roundedPill downloadAble /> */}
                  <SearchBox setQuery={handleSearch} query={query} extraClass="bg-white" />
                </div>
              </div>
              <DashboardTable>
                <DataTable columns={category_columns} data={displayproductCategoryArr && displayproductCategoryArr.length > 0 ? displayproductCategoryArr : []} pagination />
              </DashboardTable>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProductCategory;
