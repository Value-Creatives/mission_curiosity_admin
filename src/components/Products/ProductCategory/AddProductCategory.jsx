import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PRODUCT_CATEGORYAdd, PRODUCT_CATEGORYUpdate, PRODUCT_CATEGORY_ADD } from "../../../redux/actions/ProductCategory/ProductCategory.actions";
import CustomButton from "../../Utility/Button";
import FileUpload from "../../Utility/FileUpload";
function AddProductCategory({ makeChange }) {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");


  const categoryObj = useSelector((state) => state.productCategory.productCategoryObj);
  const handleAddCategory = () => {
    let obj = {
      name,
      image,
    };
    if (categoryObj?._id) {
      dispatch(PRODUCT_CATEGORYUpdate(categoryObj._id, obj));
    } else {
      dispatch(PRODUCT_CATEGORYAdd(obj));
    }
  };

  useEffect(() => {
    if (categoryObj) {
      setName(categoryObj?.name);
    }
  }, [categoryObj]);





  const handleFileSet = (e) => {
    setImage(e)
  }






  return (
    <div className={makeChange ? "makeChange" : ""}>
      <form className="form row">
        <div className={makeChange ? "col-12 col-md-6" : "col-12"}>
          <label className="blue-1 fs-12">
            Name <span className="red">*</span>
          </label>
          <input value={name} onChange={(event) => setName(event.target.value)} type="text" className="form-control" />
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
        <div className="col-12">
          <label className="blue-1 fs-12">UPLOAD PHOTO</label>
          <FileUpload onFileChange={handleFileSet} />
          <div className="form-text fs-12">(Ratio: (225 X 225)PX)</div>
        </div>
        <div className="col-12">
          <CustomButton btntype="button" ClickEvent={handleAddCategory} iconName="fa-solid fa-check" btnName="Save" isBtn small={makeChange ? true : false} />
        </div>
      </form>
    </div>
  );
}

export default AddProductCategory;
