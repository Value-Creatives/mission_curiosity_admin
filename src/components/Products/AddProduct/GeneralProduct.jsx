import Switch from '@mui/material/Switch';
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill"; // ES6
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { PRODUCTAdd, PRODUCTGet, PRODUCTUpdate,SetPRODUCTObj } from "../../../redux/actions/Product/Product.actions";
import CustomButton from "../../Utility/Button";
import { DashboardBox } from "../../Utility/DashboardBox";
import FileUpload from "../../Utility/FileUpload";
import { toastError } from "../../Utility/ToastUtils";
import { generateFilePath } from "../../Utility/utils";

function GeneralProduct() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [discountFlag, setDiscountFlag] = useState("");
  const [descriptionArr, setDescriptionArr] = useState([{ name: "" }]);

  const products = useSelector((state) => state.product.products);
  const productObj = useSelector((state) => state.product.productObj);

  console.log(products , "products");

  useEffect(() => {
    dispatch(PRODUCTGet());
    // setGlobalProductsArr(products);
  }, []);

  const handleFileSet = (value, index) => {
    let tempArr = descriptionArr;

    tempArr[index].image = value
    setDescriptionArr([...tempArr]);
  };

  // const handleFileUpload = (value) => {
  //   setMetaImage(value)
  // }

  const handleSubmit = () => {
    if (name == "") {
      toastError("Name is mandatory")
      return
    }

    let obj = {
      name,
      price,
      discountPrice,
      discountFlag,
      descriptionArr,
    };

    if (productObj) {
      dispatch(PRODUCTUpdate(obj, productObj._id));
      dispatch(SetPRODUCTObj());
    }
    else {
      dispatch(PRODUCTAdd(obj));
    }
  };

  useEffect(()=>{
    if(productObj){
      setName(productObj?.name);
      setPrice(productObj?.price);
      setDiscountPrice(productObj?.discountPrice);
      setDiscountFlag(productObj?.discountFlag);
      setDescriptionArr(productObj?.descriptionArr);
    }
  },[productObj])

  const handleImageObjAdd = () => {
    let tempArr = descriptionArr
    tempArr.push({ image: "", name: "" })
    console.log(tempArr, "asdas")
    setDescriptionArr([...tempArr])
  }
  const handleImageObjRemove = () => {
    if (descriptionArr.length > 1) {
      let tempArr = descriptionArr.filter((el, index) => index != descriptionArr.length - 1);
      setDescriptionArr([...tempArr])
    }
  }
 
  const handleproductImageAltEntry = (value, index) => {
    console.log(value, index)
    let tempArr = descriptionArr;
    tempArr[index].name = value
    setDescriptionArr([...tempArr]);
  };
 

  return (
    <form className="form">
      <div className="row">
        <div className="col-12 col-md-8">
          <DashboardBox>
            <div className="border-bottom pb-3 mb-4 row">
              <h5 className="blue-1 mb-4">Price Information</h5>

              <div className="col-12 col-md-6 mb-3">
                <label>
                  Name <span className="red">*</span>
                </label>
                <input value={name} onChange={(event) => setName(event.target.value)} type="text" className="form-control" />
              </div>
              <div className="col-12 col-md-6 mb-3">
                <label> PRICE <span className="red">*</span></label>
                <input value={price} onChange={(event) => setPrice(event.target.value)} type="text" className="form-control" />
              </div>
              
              <div className="col-12 col-md-6 mb-3">
                <label>DISCOUNT PRICE <span className="red">*</span></label>
                <input value={discountPrice} onChange={(event) => setDiscountPrice(event.target.value)} type="text"  className="form-control" />
              </div>

              <div className="col-12 col-md-6 mb-3">
                <label>DISCOUNT FLAG <span className="red"></span></label>
                <input value={discountFlag} onChange={(event) => setDiscountFlag(event.target.value)} type="text"  className="form-control" />
              </div>

            </div>
            <div className="row">              
              <div className="col-12">
                <CustomButton btntype="button" ClickEvent={handleSubmit} isBtn iconName="fa-solid fa-check" btnName="Save" />
              </div>
            </div>
          </DashboardBox>
        </div>
        <div className="col-12 col-md-4">
          <DashboardBox>
            <div className="col-12 mb-3">
              <div className="row d-flex">
                <h5 className="blue-1 mb-3">Price Info</h5>
                <div className="row">
                  <div className="col-2 me-5">
                    <CustomButton btntype="button" ClickEvent={handleImageObjAdd} isBtn noIcon btnName="+" />
                  </div>
                  <div className="col-2">
                    <CustomButton btntype="button" ClickEvent={handleImageObjRemove} isBtn noIcon btnName="-" />
                  </div>
                </div>
              </div>
              {descriptionArr && descriptionArr.length > 0 && descriptionArr.map((el, index) => {
                return (
                  <div key={index} style={{ marginTop: 20, borderBottom: "grey 1px solid", paddingBottom: 15 }} className="row">
                    <div className="col-12">
                      <label>
                        Pricing <span className="red">*</span>
                      </label>
                      <input onChange={(e) => handleproductImageAltEntry(e.target.value, index)} value={el?.name} type="text" className="form-control" />
                    </div>
                  </div>
                )
              })}
            </div>
          </DashboardBox>
        </div>
      </div >
    </form >
  );
}

export default GeneralProduct;
