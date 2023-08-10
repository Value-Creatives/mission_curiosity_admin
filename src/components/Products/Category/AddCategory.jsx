import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { CATEGORYAdd, CATEGORYGet, CATEGORYUpdate } from "../../../redux/actions/Category/Category.actions";
import { getCategory } from "../../../services/category.service";
import CustomButton from "../../Utility/Button";
import { generalModelStatuses } from "../../Utility/constants";
import FileUpload from "../../Utility/FileUpload";
import { toastError } from "../../Utility/ToastUtils";
import SelectNestedCategory from "./SelectNestedCategory";
function AddCategory({ makeChange }) {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [selectedParentCategoryId, setSelectedParentCategoryId] = useState("");
  const [addSubCategory, setaddSubCategory] = useState(false);
  const [selectedCateoryObj, setSelectedCateoryObj] = useState("");
  const [prevCategoryObj, setPrevCategoryObj] = useState(null);

  const [parentCategoryId, setParentCategoryId] = useState('')
  const [parentCategoryArr, setParentCategoryArr] = useState([])
  const [image, setImage] = useState("");
  const [selectedParentCategoryArr, setSelectedParentCategoryArr] = useState("");


  const [prevCategoryId, setPrevCategoryId] = useState(null);
  const [categoryArr, setCategoryArr] = useState([]);
  // const categoryArr = useSelector((state) => state.category.categories);
  const categoryObj = useSelector((state) => state.category.categoryObj);
  const handleAddCategory = () => {
    let obj = {
      name,
      slug,
      image,
      // parentCategoryId: "630350417467d3a66b9260ef",
      parentCategoryId: parentCategoryId,
    };
    if (categoryObj?._id) {
      dispatch(CATEGORYUpdate(prevCategoryId, obj));
    } else {
      dispatch(CATEGORYAdd(obj));
    }
  };

  useEffect(() => {
    if (categoryObj) {
      setName(categoryObj?.name);
      setSlug(categoryObj?.slug);
      if (categoryObj?.parentCategoryId) {
        setSelectedParentCategoryId(categoryObj?.parentCategoryId);
        setParentCategoryId(categoryObj.parentCategoryId)
        setSelectedParentCategoryArr(categoryObj.parentCategoryArr)
        setPrevCategoryObj({ label: categoryArr?.find((el) => el._id == categoryObj?.parentCategoryId)?.name, value: categoryObj.parentCategoryId });
        setaddSubCategory(true);
      }
      else {
        setaddSubCategory(false);
      }
      setPrevCategoryId(categoryObj?._id);
    }
  }, [categoryObj]);



  const handleCheckSubCategory = (arr, response) => {
    if (arr.length > 0) {
      let arr2 = arr.map(el => {
        if ((`${el._id}` == response.data[0].parentCategoryId)) {
          el.subCategoryArr = response.data;
        }
        // console.log()
        if (el.subCategoryArr.length > 0) {
          handleCheckSubCategory(el.subCategoryArr, response)
        }
        else {
          return el
        }
      });
      return arr2
    }
    else {
      return arr
    }
  }

  const handleGetCategory = async (query) => {
    try {
      let { data: response } = await getCategory(query);
      if (response.data) {
        // console.log(response.data, "response.data");
        let tempArr = []
        if (categoryArr.length > 0) {
          tempArr = handleCheckSubCategory(categoryArr, response.data)
          // console.log(handleCheckSubCategory(categoryArr, response.data), "test")
        }
        else {
          tempArr = response.data
        }
        setCategoryArr([...tempArr]);
      }
    } catch (err) {
      toastError(err)
    }
  }


  const handleFileSet = (e) => {
    setImage(e)
  }


  useEffect(() => {
    handleGetCategory('level=1');
  }, []);



  const handleChange = (value) => {
    console.log(value);
    setSelectedParentCategoryId(value._id);
    setSelectedCateoryObj(value)
    handleGetCategory(`level=${value.level + 1}&&parentCategoryId=${value._id}`);
  };


  return (
    <div className={makeChange ? "makeChange" : ""}>
      <form className="form row">
        <div className={makeChange ? "col-12 col-md-6" : "col-12"}>
          <label className="blue-1 fs-12">
            Name <span className="red">*</span>
          </label>
          <input value={name} onChange={(event) => setName(event.target.value)} type="text" className="form-control" />
        </div>
        <div className={makeChange ? "col-12 col-md-6" : "col-12"}>
          <label className="blue-1 fs-12">
            SLUG <span className="red">*</span>
          </label>
          <input value={slug} onChange={(event) => setSlug(event.target.value)} type="text" className="form-control" />
        </div>

        <div className={makeChange ? "col-12 col-md-4 d-flex align-items-end" : "col-12"}>
          <div className="form-check form-check-inline d-flex align-items-center pointer">
            <input
              className="form-check-input"
              type="checkbox"
              name="category-status"
              value="option1"
              id="add-as-sub-category"
              checked={addSubCategory}
              onChange={(e) => {
                if (e.target.checked) {
                  setaddSubCategory(true);
                } else {
                  setaddSubCategory(false);
                }
              }}
            />
            <label className="form-check-label fs-14 pointer" htmlFor="add-as-sub-category">
              Add as Sub Category
            </label>
          </div>
        </div>
        {addSubCategory && (
          <SelectNestedCategory preselectedCategoryId={selectedParentCategoryArr} currentCategoryId={categoryObj?._id} onChange={(val) => setParentCategoryId(val)} />
        )}
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

export default AddCategory;
