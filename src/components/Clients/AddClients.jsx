import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import CustomButton from "../Utility/Button";
import { generalModelStatuses } from "../Utility/constants";
import { DashboardBox } from "../Utility/DashboardBox";
import FileUpload from "../Utility/FileUpload";
import { useDispatch, useSelector } from "react-redux";
import {
  CLIENTAdd,
  CLIENTUpdate,
  SetCLIENTObj,
} from "../../redux/actions/Client/Client.actions";
// import QuillEditor from "../utils/QuillEditor";
import { toastError } from "../Utility/ToastUtils";
import { generateFilePath } from "../Utility/utils";

function AddClients() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  // const [url, setUrl] = useState("");
  const [imageStr, setImageStr] = useState("");
  const [isUpdateBanner, setIsUpdateBanner] = useState(false);
  const [selectedBannerId, setselectedBannerId] = useState("");
  const [prevImage, setPrevImage] = useState("");
  const [status, setStatus] = useState(false);
  const clientObj = useSelector((state) => state.client.clientObj);

  const handleFileSet = (value) => {
    // console.log(value);
    setImageStr(value);
  };

  useEffect(() => {
    if (clientObj) {
      setselectedBannerId(clientObj._id);
      setName(clientObj.name);
      setDescription(clientObj.description ? clientObj.description : "");
      // setUrl(bannerObj.url);
      setImageStr(clientObj.image);
      // setselectedBannerId(bannerObj._id);
      setPrevImage(clientObj.image);
      setStatus(clientObj.status);
      console.log(clientObj);
      // setSelectedStatus({ value: brandObj.statusInfo, label: brandObj.statusInfo });
      setIsUpdateBanner(true);
    }
    return () => {
      dispatch(SetCLIENTObj(null));
    };
  }, [clientObj]);

  const handleSubmit = () => {
    if (name == "") {
      toastError("Name is mandatory");
      return;
    }
  
    if (imageStr == "") {
      toastError("Image is mandatory");
      return;
    }
    let obj = {
      name,
      description,
      status,
      image: imageStr ? imageStr : prevImage,
    };
    console.log(selectedBannerId, "selectedBannerId");
    if (isUpdateBanner) {
      dispatch(CLIENTUpdate(obj, selectedBannerId));
    } else {
      dispatch(CLIENTAdd(obj));
    }
  };
  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <h5 className="blue-1 mb-4">
            {isUpdateBanner ? "Update" : "Add New "} Client
          </h5>
          <form action="#" className="form">
            <div className="row gy-4 gy-xxl-0">
              {/* <div className="col-12 col-xxl-8 mb-0">
                <DashboardBox>
                  <div className="row">
                    <h5 className="blue-1 mb-4">Banner Information</h5>
                    <div className="col-12">
                      <label>
                        Name <span className="red">*</span>
                      </label>
                      <input
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        type="text"
                        className="form-control"
                      />
                    </div>
                    <div className="col-12">
                      <label>Description</label>
                      <QuillEditor
                        value={description}
                        handleChange={(event) => setDescription(event)}
                        theme="snow"
                      />
                      <textarea className="form-control"  value={description}
                        onChange={(event) => setDescription(event.target.value)}></textarea>
                    </div>
                    <div className="col-12">
                      <label>WEBSITE LINK</label>
                      <input
                        value={url}
                        onChange={(event) => setUrl(event.target.value)}
                        type="text"
                        className="form-control"
                      />
                    </div>
                  </div>
                </DashboardBox>
              </div> */}

              <div className="col-12 col-xxl-4 mb-0">
                <DashboardBox>
                  <div className="row">
                    <h5 className="blue-1 mb-4">Client Info</h5>
                    <div className="col-12">
                      <label>
                        Name <span className="red">*</span>
                      </label>
                      <input
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        type="text"
                        className="form-control"
                      />
                    </div>
                    <div className="col-12">
                      <label>Banner (150x150)PX</label>
                      <br />
                      <br />
                      <img
                        src={
                          `${imageStr}`.includes("base64")
                            ? imageStr
                            : generateFilePath(imageStr)
                        }
                        style={{ height: 80 }}
                      />
                      <br />
                      <br />

                      <FileUpload onFileChange={handleFileSet} />
                    </div>
                    <div className="col-12">
                      <label>Status</label>
                      <div className="form-check form-check-inline d-flex align-items-center">
                        <input
                          checked={status}
                          onChange={() => setStatus(!status)}
                          className="form-check-input"
                          type="checkbox"
                          name="category-status"
                          value="option1"
                          id="active-banner"
                        />
                        <label
                          className="form-check-label fs-14"
                          htmlFor="active-banner"
                        >
                          Active
                        </label>
                      </div>
                    </div>
                    <div className="col-12 mt-2">
                      <CustomButton
                        btntype="button"
                        ClickEvent={handleSubmit}
                        isBtn
                        iconName="fa-solid fa-check"
                        btnName="Save"
                      />
                    </div>
                  </div>
                </DashboardBox>
              </div>



            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

export default AddClients;
