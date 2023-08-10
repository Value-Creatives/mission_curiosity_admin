import React, { useEffect, useState } from "react";
import Select from "react-select";
import CustomButton from "../Utility/Button";
import { generalModelStatuses } from "../Utility/constants";
import FileUpload from "../Utility/FileUpload";
import { useDispatch, useSelector } from "react-redux";
import { SETTESTIMONIALOBJ, TESTIMONIALADD, TESTIMONIALUPDATE } from "../../redux/actions/Testimonial/Testimonial.actions";
function AddTestimonial({makeChange}) {
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [comment, setComment] = useState("");
    const [testimonialId, setTestimonialId] = useState("")
    const [status, setStatus] = useState(generalModelStatuses.APPROVED);


    const testimonialObj = useSelector((state) => state.testimonial.testimonialObj);
    const handleAddCategory = () => {
        let obj = {
            name,
            comment,
            status,
        };
        console.log(obj, "category obj",testimonialId);

        if (testimonialObj?._id) {
            dispatch(TESTIMONIALUPDATE(testimonialId, obj));
            dispatch(SETTESTIMONIALOBJ(null))
        } else {
            dispatch(TESTIMONIALADD(obj));
        }
    };

    useEffect(() => {
        if (testimonialObj) {
            setName(testimonialObj?.name);
            setComment(testimonialObj?.comment);
            setStatus(testimonialObj?.status);
            setTestimonialId(testimonialObj?._id)
        }

        // return () => {
        //     dispatch(SETTESTIMONIALOBJ(null));
        // };
    }, [testimonialObj]);

    // useEffect(() => {
    //     dispatch(CATEGORYGet());
    // }, []);



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
                        Comments <span className="red">*</span>
                    </label>
                    <textarea className="form-control" value={comment} onChange={(event) => setComment(event.target.value)}> </textarea>
                </div>


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
                <div className="col-12">
                    <CustomButton btntype="button" ClickEvent={handleAddCategory} iconName="fa-solid fa-check" btnName="Save" isBtn small={makeChange ? true : false} />
                </div>
            </form>
        </div>
    );
}

export default AddTestimonial;
