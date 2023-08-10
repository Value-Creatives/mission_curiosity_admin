import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import CustomButton from "../Utility/Button";
import { generalModelStatuses } from "../Utility/constants";
import { DashboardBox } from "../Utility/DashboardBox";
import FileUpload from "../Utility/FileUpload";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getVenue , updateVenue } from "../../services/venue.service";


function Venue() {
//   const dispatch = useDispatch();

  useEffect(()=>{
    getData();
  },[]);

  const [title, setTitle] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [imageStr, setImageStr] = useState("");
  const [prevImage, setPrevImage] = useState("");
  const [venue, setVenue] = useState("");

  const handleFileSet = (value) => {
    setImageStr(value);
  };

  let getData = async()=>{
    try{
        let { data:res } = await getVenue();
        if(res){
            let data = res?.data ;
            setVenue(data);
            console.log(res?.data , "response");
        }
    }catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    if(venue){
        setTitle(venue?.title);
        setPhone(venue?.phone);
        setDescription(venue?.description);
        setImageStr(venue?.image);
    }
   }, [venue]);

  const handleSubmit = async(id) => {
    let obj = {
        title,
        phone,
        description,
        image: imageStr ? imageStr : prevImage,
    };
    let { data:res } = await updateVenue(obj, id);
    if(res){
      toast.success("Venue updated")
        console.log(res , "update response");
    }
  };
  
  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <h5 className="blue-1 mb-4"> Update Venue</h5>
          <form action="#" className="form">
            <div className="row">
              <div className="col-12 col-md-8 mb-0">
                <DashboardBox>
                  <div className="row">
                    <h5 className="blue-1 mb-4">Venue Information</h5>
                    <div className="col-12">
                      <label>Title</label>
                      <input type="text" className="form-control" value={title} onChange={(event)=>{setTitle(event.target.value)}} />
                    </div>
                    <div className="col-12">
                      <label>Phone</label>
                      <input type="text" className="form-control" value={phone} onChange={(event)=>{setPhone(event.target.value)}} />
                    </div>
                    <div className="col-12">
                      <label>Description</label>
                      <ReactQuill value={description} onChange={(event) => setDescription(event)} theme="snow" />
                    </div>
                  </div>
                </DashboardBox>
              </div>
              <div className="col-12 col-md-4 mb-0">
                <DashboardBox>
                  <div className="row">
                    <h5 className="blue-1 mb-4">Status Info</h5>
                    <div className="col-12">
                      <label>Venue (150x150)PX</label>
                      <FileUpload onFileChange={handleFileSet} />
                    </div>
                    {/* <div className="col-12">
                      <label>Status</label>
                      <div className="form-check form-check-inline d-flex align-items-center">
                        <input checked={status == generalModelStatuses.APPROVED} className="form-check-input" type="checkbox" name="category-status" value="option1" id="active-banner" />
                        <label className="form-check-label fs-14" htmlFor="active-banner">
                          Active
                        </label>
                      </div>
                    </div> */}
                    <div className="col-12 mt-2">
                      <CustomButton btntype="button" ClickEvent={()=>{handleSubmit(venue?._id)}} isBtn iconName="fa-solid fa-check" btnName="Save" />
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

export default Venue;
