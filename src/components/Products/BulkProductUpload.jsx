import React, { useState } from "react";
import { bulkUpdateModelNo, bulkUpload } from "../../services/product.service";
import CustomButton from "../Utility/Button";
import { DashboardBox } from "../Utility/DashboardBox";
import FileUpload2 from "../Utility/FileUpload2";
import { toastError, toastSuccess } from "../Utility/ToastUtils";

function BulkProductUpload() {

  const [bulkUploadFile, setBulkUploadFile] = useState({});
  const [bulkUploadOEMModelNoFile, setBulkUploadOEMModelNoFile] = useState({});


  const handleSubmitFileForOEMProductsUpload = async (e) => {
    try {
      let formData = new FormData()
      formData.append("excel", bulkUploadOEMModelNoFile)
      let { data: res } = await bulkUpdateModelNo(formData)
      if (res) {
        toastSuccess(res.message)
      }
    }
    catch (err) {
      toastError(err)
    }
  }
  const handleSubmitFileForProductsUpload = async (e) => {
    try {
      let formData = new FormData()
      formData.append("excel", bulkUploadFile)

      let { data: res } = await bulkUpload(formData);
      console.log(res, "res")
      if (res) {
        toastSuccess(res.message)
      }
    }
    catch (err) {
      toastError(err)
    }
  }

  return (
    <main>
      <section className="product-category" style={{ minHeight: "75vh" }}>
        <div className="container-fluid p-0">
          <DashboardBox>
            <h5 className="blue-1 mb-4">Bulk Product Upload</h5>
            <div className="row">
              <div className="col-12 col-md-6">
                <form action="" className="form row">
                  <div className="col-12 mb-3">
                    <label>Upload Products Excel</label>
                    <FileUpload2 onFileChange={(e) => setBulkUploadFile(e)} />
                  </div>
                  <div className="col-12">
                    <CustomButton
                      isBtn
                      btntype="button"
                      iconName="fa-solid fa-check"
                      btnName="Save"
                      ClickEvent={() => handleSubmitFileForProductsUpload()}
                    />
                  </div>
                </form>
              </div>
              <div className="col-12 col-md-6">
                <form action="" className="form row">
                  <div className="col-12 mb-3">
                    <label>Upload Products OEM Model no. Excel</label>
                    <FileUpload2 onFileChange={(e) => setBulkUploadOEMModelNoFile(e)} />
                  </div>
                  <div className="col-12">
                    <CustomButton
                      isBtn
                      btntype="button"
                      iconName="fa-solid fa-check"
                      ClickEvent={() => handleSubmitFileForOEMProductsUpload()}
                      btnName="Save"
                    />
                  </div>
                </form>
              </div>
            </div>
          </DashboardBox>
        </div>
      </section>
    </main>
  );
}

export default BulkProductUpload;
