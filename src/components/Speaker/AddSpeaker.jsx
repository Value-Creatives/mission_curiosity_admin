import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import CustomButton from "../Utility/Button";
import { generalModelStatuses } from "../Utility/constants";
import { DashboardBox } from "../Utility/DashboardBox";
import FileUpload from "../Utility/FileUpload";
import { toast } from "react-hot-toast";
import { addSpeaker, getSpeaker, updateSpeaker } from "../../services/speaker.service";
import { useParams, useSearchParams } from 'react-router-dom';


function AddSpeaker({makeChange}) {

  const { id } = useParams();
   const [searchParams, setSearchParams] = useSearchParams() 
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [post, setPost] = useState("");
  const [twitter, setTwitter] = useState("");
  const [facebook, setFacebook] = useState("");
  const [github, setGithub] = useState("");
  const [imageStr, setImageStr] = useState("");
  const [isUpdateBanner, setIsUpdateBanner] = useState(false);
  const [selectedBannerId, setselectedBannerId] = useState("");
  const [prevImage, setPrevImage] = useState("");
  const [status, setStatus] = useState(generalModelStatuses.PENDING);
  const [isEditing, setIsEditing] = useState(false)

  const [singleSpeaker, setSingleSpeaker] = useState([]);
  const [speakerId, setSpeakerId] = useState('');

  const handleFileSet = (value) => {
    setImageStr(value);
  };

  // useEffect(()=>{
  //   getAllSpeaker();
  // },[]);

  const handleSubmit = async() => {
    let obj = {
      name,
      description,
      post,
      twitter,
      facebook,
      github,
      status,
      image: imageStr ? imageStr : prevImage,
    };
    if(speakerId){
      let { data:res } = await updateSpeaker(speakerId, obj);
      if(res){
        let data = res?.data ;
        toast.success("Speaker Updated")
        console.log(data , "updated data or not");
      }
    }else{
      let { data:res } = await addSpeaker(obj);
      if(res){
        let data = res?.data ;
        toast.success("Speaker Added")
        console.log(data , "saved data or not");
      }
    }
  };

  const getAllSpeaker = async(speakerId)=>{
    try{
      if(speakerId){
        let { data:res } = await getSpeaker();
        let data = res.data;
        console.log(id,"askjashjkaHDAJKDHAJKHAJKDADJ")
        if(speakerId){
          let speakerData = data.find((el)=>el._id == speakerId);
          console.log(speakerData,"speakerData")
          setSingleSpeaker(speakerData);
        }
      }
    }catch(error){
        console.log(error)
    }
  }

  useEffect(()=> {
    if(searchParams.get("speakerId")){
      let getid = searchParams.get("speakerId");
      setSpeakerId(getid);
      setIsEditing(true)
    getAllSpeaker(getid);

    }
  }, [searchParams.get("speakerId")])

  useEffect(()=>{
    if(singleSpeaker && singleSpeaker?._id){
      setName(singleSpeaker?.name);

      console.log(singleSpeaker,"singleSpeakersingleSpeaker")
      setDescription(singleSpeaker?.description);
      setPost(singleSpeaker?.post);
      setTwitter(singleSpeaker.twitter);
      setFacebook(singleSpeaker.facebook);
      setGithub(singleSpeaker.github);
      setPrevImage(singleSpeaker.image);
    }
  },[singleSpeaker]);


  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <h5 className="blue-1 mb-4">{isUpdateBanner ? "Update" : "Add New "} Speaker</h5>
          <form action="#" className="form">
            <div className="row">
              <div className="col-12 col-md-8 mb-0">
                <DashboardBox>
                  <div className="row">
                    <h5 className="blue-1 mb-4">Speaker Information</h5>
                    <div className="col-12">
                      <label>
                        Name <span className="red">*</span>
                      </label>
                      <input value={name} onChange={(event) => setName(event.target.value)} type="text" className="form-control" />
                    </div>

                    <div className="col-12">
                      <label>
                        Post <span className="red">*</span>
                      </label>
                      <input value={post} onChange={(event) => setPost(event.target.value)} type="text" className="form-control" />
                    </div>

                    <div className="col-12">
                      <label>
                        Twitter <span className="red">*</span>
                      </label>
                      <input value={twitter} onChange={(event) => setTwitter(event.target.value)} type="text" className="form-control" />
                    </div>

                    <div className="col-12">
                      <label>
                        Facebook <span className="red">*</span>
                      </label>
                      <input value={facebook} onChange={(event) => setFacebook(event.target.value)} type="text" className="form-control" />
                    </div>

                    <div className="col-12">
                      <label>
                        GitHub <span className="red">*</span>
                      </label>
                      <input value={github} onChange={(event) => setGithub(event.target.value)} type="text" className="form-control" />
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
                      <label>Image (150x150)PX</label>
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

                  <div className={makeChange ? "col-12 col-md-4" : "col-12"}>
                    <label className="blue-1 fs-12">Status</label>
                    <div className="d-flex">
                        <div className="form-check form-check-inline d-flex align-items-center">
                            <input className="form-check-input" checked={status == generalModelStatuses.APPROVED} onClick={() => setStatus(generalModelStatuses.APPROVED)} type="radio" />
                            <label className="form-check-label fs-14" htmlFor="category-Radio1">
                                Active
                            </label>
                        </div>
                        <div className="form-check form-check-inline d-flex align-items-center">
                            <input className="form-check-input" type="radio" checked={status == generalModelStatuses.DECLINED} onClick={() => setStatus(generalModelStatuses.DECLINED)} />
                            <label className="form-check-label fs-14" htmlFor="category-Radio2">
                                Inactive
                            </label>
                        </div>
                    </div>
                  </div>

                    <div className="col-12 mt-2">
                      <CustomButton btntype="button" ClickEvent={handleSubmit} isBtn iconName="fa-solid fa-check" btnName="Save" />
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

export default AddSpeaker;
