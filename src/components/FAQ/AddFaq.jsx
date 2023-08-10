import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import CustomButton from "../Utility/Button";
import { generalModelStatuses } from "../Utility/constants";
import { DashboardBox } from "../Utility/DashboardBox";
import FileUpload from "../Utility/FileUpload";
import { useDispatch, useSelector } from "react-redux";
import {
  FaqAdd,
  SetFaqObj,
  FaqUpdate,
} from "../../redux/actions/Faq/Faq.action";
import { toastError, toastSuccess } from "../Utility/ToastUtils";
import { addFaq } from "../../services/Faq.service";

function AddFaq() {
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [isUpdateFaq, setIsUpdateFaq] = useState(false);
  const [faqId, setFaqId] = useState("");
  const dispatch = useDispatch();

  const faqObj = useSelector((state) => state.faq.faqObj);

  useEffect(() => {
    if (faqObj) {
      setHeading(faqObj.heading);
      setDescription(faqObj.description);
      setFaqId(faqObj._id);
      setIsUpdateFaq(true);
    }
    return () => {
      dispatch(SetFaqObj(null));
    };
  }, [faqObj]);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (heading == "") {
        toastError("Heading is mandatory");
        return;
      } else if (description == "") {
        toastError("Description is mandatory");
        return;
      }
      let obj = {
        heading,
        description,
      };
      if (isUpdateFaq) {
        dispatch(FaqUpdate(obj, faqId));
      } else {
        dispatch(FaqAdd(obj));
      }
    } catch (err) {
      toastError(err);
    }
  };

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <h5 className="blue-1 mb-4">
            {isUpdateFaq ? "Update" : "Add New "} Faq
          </h5>

          <form action="#" className="form">
            <div className="row">
              <div className="col-12 col-md-8 mb-0">
                <DashboardBox>
                  <div className="row">
                    <h5 className="blue-1 mb-4">Faq Information</h5>
                    <div className="col-12">
                      <label>
                        Question <span className="red">*</span>
                      </label>
                      <input
                        value={heading}
                        onChange={(event) => setHeading(event.target.value)}
                        type="text"
                        className="form-control"
                      />
                    </div>
                    <div className="col-12">
                      <label>Answer</label>
                      <textarea
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        type="text"
                        className="form-control"
                      />
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

export default AddFaq;
