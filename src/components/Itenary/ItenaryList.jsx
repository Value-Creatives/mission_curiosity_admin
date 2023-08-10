import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Switch, useForkRef } from "@mui/material";
import { images } from "../Images/Images";
import ActionIcon from "../Utility/ActionIcon";
import CustomButton from "../Utility/Button";
import { DashboardTable } from "../Utility/DashboardBox";
import { AddModal } from "../Utility/Modal";
import { useSelector, useDispatch } from "react-redux";
import { ITENARYAdd, ITENARYGet, SetITENARYObj, ITENARYUpdate, ITENARYDelete } from "../../redux/actions/Itenary/Itenary.actions";
import { generateFilePath } from "../Utility/utils";
import FileUpload from "../Utility/FileUpload";
import { toastError, toastSuccess } from "../../utils/toastUtils";
import { bulkUpdateModelNo, bulkUpload } from "../../services/product.service";
import SearchBox from "../Utility/SearchBox";
import Select from "react-select";

function ItenaryList() {
  const dispatch = useDispatch();
  const [filterTypeArr, setFilterTypeArr] = useState([
    {
      label: "Name",
      value: "name",
    },
    {
      label: "Od top",
      value: "od_top",
    },
    {
      label: "Id top",
      value: "id_top",
    },
    {
      label: "Id bottom",
      value: "id_bottom",
    },
    {
      label: "Od bottom",
      value: "od_bottom",
    },
    {
      label: "Cap To Cap Height",
      value: "capToCapHeight",
    },
    {
      label: "No. of Holes",
      value: "noOfOddHole",
    },
    {
      label: "PCD of Hole",
      value: "pcd",
    },
    {
      label: "Male Thread",
      value: "maleThread",
    },
    {
      label: "Female Thread",
      value: "femaleThread",
    },
    {
      label: "Reverse Thread",
      value: "reverseThread",
    },
    {
      label: "Height",
      value: "height",
    },
  ]);

  const [filterType, setFilterType] = useState("name");
  const productArr = useSelector((state) => state.itenary.itenarys);

  const [query, setQuery] = useState("");
  const [displayProuctArr, setDisplayProuctArr] = useState([]);
  const [mainArr, setMainArr] = useState([]);


  const setDefaultValues = (el) => {
    return {
      ...el,
      maleThread: el.maleThread ? el.maleThread : 'NO',
      femaleThread: el.femaleThread ? el.femaleThread : 'NO',
      reverseThread: el.reverseThread ? el.reverseThread : 'NO',
      noOfOddHole: el.noOfOddHole ? el.noOfOddHole : 0,
      pcd: el.pcd ? el.pcd : 0,
      id_top: el.id_top ? el.id_top : 0,
      id_bottom: el.id_bottom ? el.id_bottom : 0,
      od_top: el.od_top ? el.od_top : 0,
      od_bottom: el.od_bottom ? el.od_bottom : 0,
      height: el.height ? el.height : 0,
      capToCapHeight: el.capToCapHeight ? el.capToCapHeight : 0,
    }
  }

  useEffect(() => {
    if (productArr && productArr.length > 0) {
      let tempArr = productArr.map(setDefaultValues)
      setDisplayProuctArr([...tempArr])
      setMainArr([...tempArr])
    }
  }, [productArr])

  useEffect(() => {
    dispatch(ITENARYGet());
  }, []);

  const handleEdit = (row) => {
    dispatch(SetITENARYObj(row));
  };

  const handleDeleteById = (id) => {
    dispatch(ITENARYDelete(id));
    dispatch(ITENARYGet());
  };

  const [ModalType, setModalType] = useState("");
  const [ModalName, setModalName] = useState("");
  const [ModalBox, setModalBox] = useState(false);

  const product_sale_columns = [
    {
      name: "SL",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "5%",
    },
    {
      name: " Days",
      selector: (row) => row.days,
      width: "25%",
    },
    {
      name: " Event",
      selector: (row) => row.eventArr[0].dayEventArr[0].title,
      width: "35%",
    },
    // {
    //   name: "Discount Price ",
    //   grow: 0,
    //   selector: (row) => row.discountPrice ? row.price : 0,
    // },
    
    {
      name: "Action",
      width: "15%",
      cell: (row) => (
        <>
          <ActionIcon
            Uniquekey={row.id}
            remove
            edit
            deletePath="/Itenary/Itenary-List"
            onDeleteClick={() => handleDeleteById(row._id)}
            isRedirected={true}
            onEditClick={() => handleEdit(row)}
            editPath="/Itenary/AddItenary"
          />

          <AddModal ModalBox={ModalBox} setModalBox={setModalBox} name={ModalName} ModalType={ModalType} />
        </>
      ),
    },
  ];

  const handleSearch = (queryValue) => {
    setQuery(queryValue)
    let tempArr = mainArr
    tempArr = tempArr.filter(el => `${el[filterType]}`.toLowerCase().includes(`${queryValue}`.toLowerCase()))
    setDisplayProuctArr([...tempArr])
    console.log(tempArr, mainArr)
  }

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-between mb-4 me-5">
                <h5 className="blue-1">Price List</h5>


                <div className="d-flex gap-3 justify-content-between mb-4 align-items-center">
                  {/* <Select onChange={(value) => { setFilterType(value.value) }} defaultValue={filterType} options={filterTypeArr} /> */}

                  {/* <CustomButton isLink iconName="fa-solid fa-plus" btnName="ADD NEW ITENARY" path="/Itenary/AddItenary" /> */}
                  <SearchBox query={query} setQuery={handleSearch} extraClass="bg-white" />
                </div>
              </div>
              <DashboardTable>
                <DataTable columns={product_sale_columns} data={displayProuctArr && displayProuctArr.length > 0 ? displayProuctArr : []} pagination />
              </DashboardTable>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ItenaryList;
