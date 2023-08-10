import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import ActionIcon from "../Utility/ActionIcon";
import CustomButton from "../Utility/Button";
import SearchBox from "../Utility/SearchBox";

import { useDispatch, useSelector } from "react-redux";
// import { SETSTATEOBJ, STATEDELETE as areaDELETE, STATEGET as areaGET } from "../../redux/actions/State/States.actions";
import { DashboardBox, DashboardTable } from "../Utility/DashboardBox";
import { AddModal } from "../Utility/Modal";
// import AddTestimonial from "./AddTestimonial";
// import { SETTESTIMONIALOBJ, TESTIMONIALDELETE, TESTIMONIALGET } from "../../redux/actions/Testimonial/Testimonial.actions";
import { getBooknow, deleteBooknow } from "../../services/booknow.service";
import moment from "moment";

function Booknow() {
    // ==============================================================================================================
    const dispatch = useDispatch();
    const [ModalType, setModalType] = useState("");
    const [ModalName, setModalName] = useState("");
    const [ModalBox, setModalBox] = useState(false);
    const testimonialArr = useSelector((state) => state.testimonial.testimonials);
    const testimonialObj = useSelector((state) => state.testimonial.testimonialObj);
    const [ModalData, setModalData] = useState({});
    const [displayTestimonialArr, setDisplayTestimonialArr] = useState([]);
    const [query, setQuery] = useState("");
    const handleCategoryEdit = (row) => {
        // dispatch(SETTESTIMONIALOBJ(row));
    };

    const [testimonialMainArr, setTestimonialMainArr] = useState([]);

    const handleGet = () => {
        // dispatch(TESTIMONIALGET());
    };

    useEffect(() => {
        handleGet()
        booknowget();
    }, [])


    const onDeleteClick = async (row) => {
        // console.log(row?._id, "row id id")
        // console.log(row, "row id id")
        let confirm = window.confirm("Do you really want to delete this item?")
        if (confirm) {
            let { data: res } = await deleteBooknow(row);
            if (res) {
                booknowget();
                console.log(res?.data, "delete book now");
            }
            // dispatch(TESTIMONIALDELETE(row._id))
        }
    }



    let booknowget = async () => {
        try {
            let { data: res } = await getBooknow();
            if (res) {
                let data = res?.data;
                setDisplayTestimonialArr(data);
                setTestimonialMainArr(data)
                console.log(res?.data, "book book  book book");
            }
        } catch (error) {
            console.log(error);
        }
    }

    // useEffect(() => {
    //     if (testimonialArr?.length) {
    //         console.log(testimonialMainArr,"testimonialMainArrtestimonialMainArrtestimonialMainArr")
    //         setTestimonialMainArr(testimonialArr)
    //         setDisplayTestimonialArr(testimonialArr)
    //     }
    // }, [testimonialArr])

    const category_columns = [
        {
            name: "ID",
            selector: (row, index) => index + 1,
            sortable: true,
        },
        {
            name: "Name",
            selector: (row) => row?.bookName,
        },
        {
            name: "Email",
            selector: (row) => row?.bookEmail,
        },

        // {
        //     name: "Final Price",
        //     maxWidth: "150px",
        //     selector: (row) => {row?.bookPrice%100},
        // },

        {
            name: "Order Status",
            maxWidth: "211px",
            selector: (row) => row?.orderStatus,
        },
        {
            name: "Price",
            maxWidth: "211px",
            selector: (row) => `INR ${row?.bookPrice}`,
        },

        // {
        //     name: "Status",
        //     minWidth: "210px",
        //     maxWidth: "211px",
        //     button: true,
        //     cell: (row) => <CustomButton greenBtn noIcon btnName={`${row.status == "APPROVED" ? "Active" : "InActive"}`} path={"/Location/View-Testimonial"} />,
        // },
        {
            name: "Created On",
            maxWidth: "211px",
            selector: (row) => moment(row?.createdAt).format("YYYY-MM-DD"),
        },
        {
            name: "Action",
            minWidth: "210px",
            maxWidth: "211px",
            // cell : (row) => <button type="button" className="btn btn-sm btn-danger"  onClick={()=>{onDeleteClick(row?._id)}}>Delete</button>,
            cell: (row) => <ActionIcon isRedirected={true} editPath={`/Booknow/ViewBooknow?id=${row?._id}`} onDeleteClick={() => onDeleteClick(row?._id)} deletePath="/Booknow" remove edit Uniquekey={row.id} />,
        },
    ];

    // ==============================================================================================================

    const handleFilterByQuery = (e, requiredParametersArr) => {
        let tempArr = displayTestimonialArr.filter(el => {
            for (const ele of requiredParametersArr) {
                console.log(`${el[ele]}`.toLowerCase().includes(`${e}`.toLowerCase()), "ele,el")
                if (`${el[`${ele}`.toLowerCase()]}`.toLowerCase().includes(`${e}`.toLowerCase())) {
                    // console.log("true")
                    return true;
                }
                else {
                    return false;
                }
            }
        })
        setQuery(e)
        setTestimonialMainArr([...tempArr])
        console.log([...tempArr], "...tempArr")
    }


    return (
        <main>
            <AddModal
                ModalBox={ModalBox}
                setModalBox={setModalBox}
                name={ModalName}
                ModalType={ModalType}
                data={ModalData}
            />
            <section className="product-category">
                <div className="container-fluid p-0">
                    <div className="row">
                        {/* <div className="col-12 col-md-4">
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <h5 className="blue-1 m-0">{testimonialObj && testimonialObj.name ? "Edit " : "Add "} Testimonial</h5>
                                <CustomButton isLink iconName="fa-solid fa-plus" btnName="BULK CATEGORY UPLOAD" path="/Product/Bulk-Category-Upload" roundedPill small />
                            </div>
                            <DashboardBox>
                                <AddTestimonial />
                            </DashboardBox>
                        </div> */}
                        <div className="col-12 col-md-12">
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <h5 className="blue-1 m-0">Book Now List</h5>
                                <div className="d-flex gap-3 align-items-center">
                                    {/* <CustomButton isLink iconName="fa-solid fa-download" btnName="CATEGORY CSV" path="/Product/Bulk-Category-Upload" small roundedPill downloadAble /> */}
                                    <SearchBox setQuery={(e) => { handleFilterByQuery(e, ["name"]); }} query={query} extraClass="bg-white" />
                                </div>
                            </div>
                            <DashboardTable>
                                <DataTable columns={category_columns} data={testimonialMainArr && testimonialMainArr.length > 0 ? testimonialMainArr : []} pagination />
                            </DashboardTable>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Booknow;
