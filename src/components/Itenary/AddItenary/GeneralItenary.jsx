import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ITENARYGet, ITENARYAdd, SetITENARYObj, ITENARYUpdate, ITENARYDelete } from "../../../redux/actions/Itenary/Itenary.actions";
import CustomButton from "../../Utility/Button";
import { DashboardBox } from "../../Utility/DashboardBox";
import FileUpload from "../../Utility/FileUpload";
import { toastError } from "../../Utility/ToastUtils";
import { generateFilePath } from "../../Utility/utils";
import _ from "lodash"

function GeneralItenary() {

  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [descrption, setDescrption] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [days, setDays] = useState(0);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [image, setImage] = useState([]);
  const [descriptionArr, setDescriptionArr] = useState([{ name: "" }]);

  const [eventArr, setEventArr] = useState([]);

  const products = useSelector((state) => state.itenary.itenarys);
  const productObj = useSelector((state) => state.itenary.itenaryObj);
  console.log(productObj, "product object product object");
  console.log(products, "products");

  useEffect(() => {
    dispatch(ITENARYGet());
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

    let obj = {
      title,
      descrption,
      eventDate,
      days,
      mainImage,
      descriptionArr,
      eventArr
    };

    console.log(eventArr, "objjjjjjjjjjjjjjjjj")

    if (productObj) {
      dispatch(ITENARYUpdate(obj, productObj._id));
      dispatch(SetITENARYObj());
    }
    else {
      dispatch(ITENARYAdd(obj));
    }
  };

  useEffect(() => {
    if (productObj) {
      setTitle(productObj?.title);
      setDescrption(productObj?.descrption);
      setEventDate(productObj?.eventDate);
      setDays(productObj?.days);
      setMainImage(productObj?.mainImage);
      setImage(productObj?.image);
      setEventArr(productObj?.eventArr);
    }
  }, [productObj])

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


  const handleDeleteEvent = (index) => {
    let temp = [...eventArr];
    temp.splice(index, 1)

    console.log(temp, "tempdmdps", index)
    setEventArr([...temp])

  }

  const handleDeleteSubEvent = (eventIndex, subEventIndex) => {

    let tempArr = eventArr;
    let temmpArr = tempArr[eventIndex].dayEventArr;
    temmpArr.splice(subEventIndex, 1);
    // temmpArr = temmpArr.filter((el, index) => index != subEventIndex);
    tempArr = tempArr.map((event, eI) => eI == eventIndex ? { ...event, dayEventArr: [...temmpArr] } : { ...event })

    console.log(temmpArr, "sd", tempArr)
    setDescriptionArr([...tempArr]);

  }


  const handleEventInput = (index, name, value) => {
    let tempArr = eventArr;
    console.log("input", index, name, value)
    tempArr[index][name] = value;
    console.log('this is here ', index, "999", name, value)
    setDescriptionArr([...tempArr]);

  }

  useEffect(() => {
    if (days > 0) {
      let tempArr = [];
      for (let index = 0; index < parseInt(days); index++) {
        let tempEventObj = {
          date: new Date(),
          title: "",
          descrption: "",
          dayEventArr: [{
            time: "",
            title: "",
            descrption: "",
            Image: "",
          }]
        }
        tempArr.push(tempEventObj)

      }
      setEventArr(tempArr)

    }

  }, [days])


  const handleSubEventTimeInput = (evenIndex, subEventIndex, name, value) => {


    let temparrtemparr = [...eventArr];
    temparrtemparr[evenIndex].dayEventArr[subEventIndex][name] = value;
    console.log("subevent", evenIndex, name, value, subEventIndex)

    setEventArr([...temparrtemparr]);

    temparrtemparr = temparrtemparr.map((event, hI) => hI == evenIndex ? { ...event, dayEventArr: event.dayEventArr.map((romR, rI) => rI == subEventIndex ? { ...romR, time: value } : { ...romR }) } : { ...event })
  }


  const handleSubEventTitleInput = (evenIndex, subEventIndex, name, value) => {
    console.log(eventArr, 'dd', evenIndex, subEventIndex)

    let temparrtemparr = [...eventArr];
    temparrtemparr[evenIndex].dayEventArr[subEventIndex][name] = value;
    console.log("subevent", evenIndex, name, value, subEventIndex)
    console.log(temparrtemparr, '----')
    setEventArr([...temparrtemparr]);
    console.log(';;;;', eventArr)
    temparrtemparr = temparrtemparr.map((event, hI) => hI == evenIndex ? { ...event, dayEventArr: event.dayEventArr.map((romR, rI) => rI == subEventIndex ? { ...romR, title: value } : { ...romR }) } : { ...event })
  }


  const handleSubEventDescriptionInput = (evenIndex, subEventIndex, name, value) => {


    let temparrtemparr = [...eventArr];
    temparrtemparr[evenIndex].dayEventArr[subEventIndex][name] = value;
    console.log("subevent", evenIndex, name, value, subEventIndex)

    setEventArr([...temparrtemparr]);

    temparrtemparr = temparrtemparr.map((event, hI) => hI == evenIndex ? { ...event, dayEventArr: event.dayEventArr.map((romR, rI) => rI == subEventIndex ? { ...romR, description: value } : { ...romR }) } : { ...event })
  }


  const handleSubEventImageInput = (evenIndex, subEventIndex, name, value) => {


    let temparrtemparr = [...eventArr];
    temparrtemparr[evenIndex].dayEventArr[subEventIndex][name] = value;
    console.log("subevent", evenIndex, name, value, subEventIndex)

    setEventArr([...temparrtemparr]);

    temparrtemparr = temparrtemparr.map((event, hI) => hI == evenIndex ? { ...event, dayEventArr: event.dayEventArr.map((romR, rI) => rI == subEventIndex ? { ...romR, image: value } : { ...romR }) } : { ...event })
  }

  const handleproductImageAltEntry = (value, index) => {
    console.log(value, index)
    let tempArr = descriptionArr;
    tempArr[index].name = value

    setDescriptionArr([...tempArr]);
  };

  const handleAddEvent = () => {

    let tempEvent = eventArr;
    let tempEventObj = {
      date: new Date(),
      title: "",
      descrption: "",
      dayEventArr: [{
        time: "",
        title: "",
        descrption: "",
        Image: "",
      }]
    }

    tempEvent.push(tempEventObj);

    setEventArr(_.cloneDeep(tempEvent))
  }


  const handleAddSubEvent = (index) => {

    let tempaArr = _.cloneDeep(eventArr);
    const tempdayObj = {
      time: "",
      title: "",
      descrption: "",
      Image: "",
    }
    console.log(index, tempaArr[index], index, "indexindexindexindexindexindexindex")
    console.log(tempaArr, ',', index)
    if (tempaArr[index].dayEventArr) {
      tempaArr[index].dayEventArr.push(tempdayObj);
    }
    else {
      tempaArr[index].dayEventArr = [tempdayObj]
    }



    console.log(tempaArr, "tempArr")


    setEventArr(_.cloneDeep(tempaArr));

  }


  return (
    <form className="form">
      <div className="row">
        <div className="col-12 col-md-12">
          <DashboardBox>
            <div className="border-bottom pb-3 mb-4 row">
              <h5 className="blue-1 mb-4">Itenary Information</h5>
              {/* <div className="col-12 col-md-6 mb-3">
                <label>
                  Title <span className="red">*</span>
                </label>
                <input value={title} onChange={(event) => setTitle(event.target.value)} type="text" className="form-control" />
              </div>
              <div className="col-12 col-md-12 mb-3">
                <label> Description <span className="red">*</span></label>
                <textarea className='form-control' value={descrption}  onChange={(event) => setDescrption(event.target.value)}></textarea>
              </div> */}

              {/* <div className="col-12 col-md-6 mb-3">
                <label>Event Date <span className="red">*</span></label>
                <input value={eventDate} onChange={(event) => setEventDate(event.target.value)} type="date"  className="form-control" />
              </div> */}

              <div className="col-12 col-md-6 mb-3">
                <label>Days <span className="red">*</span></label>
                <input value={days} onChange={(event) => setDays(event.target.value)} type="text" className="form-control" />
              </div>

              {/* <div className="col-12 mb-3">
                <label>MAIN IMAGE (300X300)PX</label>
                <br /><br />
                <img src={`${mainImage}`.includes("base64") ? mainImage : generateFilePath(mainImage)} style={{ height: 80 }} />
                <br /><br />
                <FileUpload onFileChange={(val) => setMainImage(val)} />
              </div> */}

              <div className="col-12 col-md-12 mb-3">
                <h5 className="blue-1 mb-4">Event Information
                  {/* &nbsp;&nbsp;&nbsp;&nbsp;<label><button type="button" onClick={()=>handleAddEvent()}  className='btn btn-info'>Add</button></label> */}

                </h5>

                {
                  eventArr && eventArr?.length > 0 && eventArr.map((evnt, index) =>
                  (
                    <div key={index} className="border rounded pb-3 mb-4 row">&nbsp;&nbsp;&nbsp;&nbsp;
                      <div className="col-12">

                        <div className="row d-flex justify-content-between">
                          <div className="col-3">
                            <h5 className="blue-1 mb-4">Day {index + 1}
                            </h5>
                          </div>
                          <div className="col-5 me-3">
                            <div className="row d-flex justify-content-evenly">
                              <button style={{height:50}} className='col-5 btn btn-danger' onClick={() => handleDeleteEvent(index)} type='button'>Delete Day {index +1}</button>
                              <button style={{height:50, color:"white"}} type="button" onClick={() => handleAddSubEvent(index)} className='col-5 btn btn-info'>Add another Event</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-md-6 mb-3">
                        <label>
                          Date <span className="red"></span>
                        </label>
                        <input value={evnt.date} onChange={(event) => handleEventInput(index, 'date', event.target.value)} type="date" className="form-control" />
                      </div>
                      {/* <div className="col-12 col-md-6 mb-3">
                              <label> Title <span className="red">*</span></label>
                              <input value={evnt.title} onChange={(event) => handleEventInput(index,'title',event.target.value)} type="text" className="form-control" />
                            </div>
                            
                            <div className="col-12 col-md-12 mb-3">
                              <label>Description <span className="red"></span></label>
                              <textarea value={evnt.descrption} onChange={(event) => handleEventInput(index,'descrption',event.target.value)} className="form-control"></textarea>
                            </div> */}
                      {
                        evnt.dayEventArr && evnt.dayEventArr?.length > 0 && evnt.dayEventArr.map((dayEvent, dayIndex) =>
                        (
                          <div key={dayIndex} className="col-12 mt-4">

                          <div className="pb-3 mb-4 border mx-4 rounded row">
                            <div className="col-12 d-flex justify-content-between pt-3">
                            <h5 className="blue-1 mb-4">Event {dayIndex + 1}</h5>
                            <button className='btn btn-danger' onClick={() => handleDeleteSubEvent(index, dayIndex)} type='button'>Delete Event {dayIndex +1}</button>
                            </div>

                            <div className="col-12 col-md-6 mb-3">
                              <label> Time <span className="red"></span></label>
                              <input value={dayEvent.time} onChange={(event) => handleSubEventTimeInput(index, dayIndex, 'time', event.target.value)} type="time" className="form-control" />
                            </div>

                            <div className="col-12 col-md-6 mb-3">
                              <label> Title <span className="red"></span></label>
                              <input value={dayEvent.title} onChange={(event) => handleSubEventTitleInput(index, dayIndex, 'title', event.target.value)} type="text" className="form-control" />
                            </div>

                            <div className="col-12 col-md-6 mb-3">
                              <label>Description <span className="red"></span></label>
                              <textarea value={dayEvent.descrption} onChange={(event) => handleSubEventDescriptionInput(index, dayIndex, 'descrption', event.target.value)} className="form-control"></textarea>

                            </div>

                            <div className="col-12 mb-3">
                              <label> IMAGE (300X300)PX  </label>
                              <br /><br />
                              <img src={`${dayEvent.image}`.includes("base64") ? dayEvent.image : generateFilePath(dayEvent.image)} style={{ height: 80 }} />
                              <br /><br />
                              <FileUpload onFileChange={(val) => handleSubEventImageInput(index, dayIndex, 'image', val)} />
                            </div>
                            </div>
                          </div>
                        )
                        )
                      }
                    </div>
                  )
                  )
                }

              </div>

            </div>


            <div className="row">
              <div className="col-12">
                <CustomButton btntype="button" ClickEvent={handleSubmit} isBtn iconName="fa-solid fa-check" btnName="Save" />
              </div>
            </div>
          </DashboardBox>
        </div>

      </div >
    </form >
  );
}

export default GeneralItenary;
