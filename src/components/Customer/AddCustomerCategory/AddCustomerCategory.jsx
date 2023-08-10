import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomerCategoryAdd, CustomerCategoryUpdate } from "../../../redux/actions/CustomerCategory/CustomerCategory.actions";
import { toastError } from "../../../utils/toastUtils";
import CustomButton from "../../Utility/Button";
function AddCustomerCategory() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [percentage, setPercentage] = useState(1);
  const [relatedProductsIsVisible, setRelatedProductsIsVisible] = useState(false);


  const customerCategoryObj = useSelector((state) => state.customerCategory.customerCategoryObj);
  const handleAddCategory = () => {
    if (name == "") {
      toastError("Name cannot be empty");
      return
    }
    if (percentage && percentage < 0) {
      toastError("percentage cannot be less than zero");
      return
    }
    if (percentage > 100) {
      toastError("percentage cannot be greater than 100");
      return
    }
    let obj = {
      name,
      percentage: parseInt(percentage),
      relatedProductsIsVisible,
    };
    console.log(obj, "obj")
    if (customerCategoryObj?._id) {
      console.log(customerCategoryObj._id, "customerCategoryObj._id")
      dispatch(CustomerCategoryUpdate(obj, customerCategoryObj._id));
    } else {
      dispatch(CustomerCategoryAdd(obj));
    }
  };

  useEffect(() => {
    if (customerCategoryObj) {
      console.log(customerCategoryObj, "customerCategoryObj")
      setName(customerCategoryObj?.name);
      setPercentage(customerCategoryObj?.percentage);
      setRelatedProductsIsVisible(customerCategoryObj?.relatedProductsIsVisible ? customerCategoryObj?.relatedProductsIsVisible : false);
    }
  }, [customerCategoryObj]);

  return (
    <div className={""}>
      <form className="form row">
        <div className={"col-12 col-md-12"}>
          <label className="blue-1 fs-12">
            Name <span className="red">*</span>
          </label>
          <input value={name} onChange={(event) => setName(event.target.value)} type="text" className="form-control" />
        </div>
        <div className={"col-12 col-md-12"}>
          <label className="blue-1 fs-12">
            Percentage {percentage} <span className="red">*</span>
          </label>
          <input value={percentage} onChange={(event) => setPercentage(event.target.value)} type="number" className="form-control" />
        </div>
        <div className={"col-12 col-md-12"}>
          <label className="blue-1 fs-12">
            Related Products will be displayed or not <span className="red">*</span>
          </label>
          <br />
          <input style={{ marginRight: 15 }} checked={relatedProductsIsVisible} onChange={() => setRelatedProductsIsVisible(!relatedProductsIsVisible)} type="checkbox" />
          <label className="blue-1 fs-12">
            {relatedProductsIsVisible ? "will be displayed" : "will not be displayed"}
          </label>
        </div>


        {/* <div className="col-12">
          <label className="blue-1 fs-12">
            PARENT CATEGORY<span className="red">*</span>
          </label>
          {categoryArr && categoryArr.length > 0 && (
            <Select onChange={handleChange} options={categoryArr.map((el) => ({ ...el, label: el.name, value: el._id }))} placeholder="Select from options" />
          )}

          {categoryArr && categoryArr.length > 0 && categoryArr.map(el => {
            if (el.subCategoryArr) {
              return (
                <>
                  <Select onChange={handleChange} options={el.subCategoryArr.map((el) => ({ ...el, label: el.name, value: el._id }))} placeholder="Select from options" />

                </>
              )
            }
          }

          )}
        </div> */}
        {/* <div className="col-12">
          <label className="blue-1 fs-12">UPLOAD PHOTO</label>
          <FileUpload onFileChange={handleFileSet} />
          <div className="form-text fs-12">(Ratio: (225 X 225)PX)</div>
        </div> */}
        <div className="col-12">
          <CustomButton btntype="button" ClickEvent={handleAddCategory} iconName="fa-solid fa-check" btnName="Save" isBtn small={customerCategoryObj ? true : false} />
        </div>
      </form >
    </div >
  );
}

export default AddCustomerCategory;
