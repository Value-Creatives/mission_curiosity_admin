import React, { useEffect, useState } from "react";
import CustomButton from "../Utility/Button";
import { DashboardBox } from "../Utility/DashboardBox";
import FileUpload from "../Utility/FileUpload";
import { useDispatch ,useSelector } from "react-redux";
import ReactQuill from "react-quill"; // ES6
import { toast } from "react-hot-toast";
import { generateFilePath } from "../Utility/utils";
import { CONDITIONGet, SetCONDITIONObj, CONDITIONUpdate } from "../../redux/actions/Condition/Condition.actions";


function AddTermCondition() {

  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaImage, setMetaImage] = useState("");

  const conditionArr = useSelector((state) => state.condition.Conditions);
  const conditionObj = useSelector((state) => state.condition.ConditionObj);

  useEffect(()=>{
    dispatch(CONDITIONGet());
    dispatch(SetCONDITIONObj(conditionArr));
  },[]);

  const handleFileUpload = (value) => {
    setMetaImage(value)
  }

  const onHandleSubmit = ()=>{
    if(title == '' || title == undefined){
      toast.error("Title is required");
      return;
    } else if(description == '' || description == undefined){
      toast.error("Description is required");
    }
    let obj = {
      title,
      description,
      metaTitle,
      metaDescription,
      metaImage
    }

    if(conditionObj){
      dispatch(CONDITIONUpdate(obj, conditionObj?._id));
    }
  }

  useEffect(()=>{
    if(conditionObj){
      setTitle(conditionObj?.title);
      setDescription(conditionObj?.description);
      setMetaTitle(conditionObj?.metaTitle);
      setMetaDescription(conditionObj?.metaDescription);
      setMetaImage(conditionObj?.metaImage);
    }
  }, [conditionObj]);

    return (
        <form className="form">
          <div className="row">
          <div className="col-1 col-md-1"></div>
            <div className="container p-2 col-10 col-md-10">
              <DashboardBox>
                <div className="border-bottom pb-3 mb-4 row">
                  <h5 className="blue-1 mb-4">Terms And Conditions </h5>
    
                  <div className="col-12 col-md-12 mb-3">
                    <label> Title <span className="red">*</span></label>
                    <input value={title} onChange={(el)=>{setTitle(el.target.value)}} type="text" className="form-control" />
                  </div>
                </div>
    
                <div className="border-bottom pb-3 mb-4 row">
                  <h5 className="blue-1 mb-4">Description </h5>
                  <div className="col-12 mb-3">
                    <ReactQuill value={description != "" && description ? description : ""} theme="snow" onChange={(e) => setDescription(e)} />
                  </div>
                </div>
                
                <div className="row">
                  <h5 className="blue-1 mb-4">SEO info</h5>
                  <div className="col-12 mb-3">
                    <label>META TITLE</label>
                    <input value={metaTitle} onChange={(el)=>{setMetaTitle(el.target.value)}} type="text" className="form-control" />
                  </div>
                  <div className="col-12 mb-3">
                    <label>META DESCRIPTION</label>
                    <textarea value={metaDescription} onChange={(el)=>{setMetaDescription(el.target.value)}} name="META DESCRIPTION" className="form-control" rows="3"></textarea>
                  </div>
                  <div className="col-12 mb-3">
                    <label>META IMAGE (300X300)PX</label>

                    {
                      metaImage != "" &&
                      <>
                        <br />
                        <br />
                        <img src={`${metaImage}`.includes("base64") ? metaImage : generateFilePath(metaImage)} style={{ height: 80 }} />
                        <br />
                        <br />
                      </>
                    }

                    <FileUpload onFileChange={handleFileUpload} />
                  </div>
                  <div className="col-12">
                    <CustomButton btntype="button" ClickEvent={()=>{onHandleSubmit()}} isBtn iconName="fa-solid fa-check" btnName="Update" />
                  </div>
                </div>
              </DashboardBox>
            </div>
           <div className="col-1 col-md-1"></div>
          </div >
        </form >
      );
  }

  export default AddTermCondition ;