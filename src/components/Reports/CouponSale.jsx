import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import SearchBox from "../Utility/SearchBox";
import { Modal, Box } from "@mui/material";

import { useDispatch } from "react-redux";
import { getCouponsSoldWithinDates, getProductsSoldWithinDates, getProductsSoldWithinDatesAndCouponId } from "../../services/userPi.service";
import { DashboardTable } from "../Utility/DashboardBox";
import { toastError } from "../Utility/ToastUtils";
import moment from "moment";
import { DisplayDate } from "../../utils/DateUtils";
import CustomButton from "../Utility/Button";
export default function CouponSale() {
    // ==============================================================================================================
    const dispatch = useDispatch();
    const [selectedDiscountObj, setSelectedDiscountObj] = useState({});
    const [reloadCount, setReloadCount] = useState(0);
    const [productArr, setProductArr] = useState([]);
    const [mainArr, setMainArr] = useState([]);
    const [query, setQuery] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [selectedProductOrders, setSelectedProductOrders] = useState([]);
    const [selectedProductName, setSelectedProductName] = useState("");
    const [loading, setLoading] = useState(false);
    const [ModalBox, setModalBox] = useState(false);



    const handleGetProductOrders = async (startDate, endDate, id) => {
        setSelectedProductOrders([])

        setModalBox(true);
        setLoading(true)
        try {
            let { data: res } = await getProductsSoldWithinDatesAndCouponId(startDate, endDate, id)
            if (res.data) {
                console.log(res.data)
                setLoading(false)
                setSelectedProductOrders(res.data)
            }
        }
        catch (err) {
            setLoading(false)
            toastError(err)
        }
    }

    const handleGetDiscounts = async () => {
        try {
            let { data: res } = await getCouponsSoldWithinDates(startDate, endDate)
            if (res.data) {
                console.log(res.data)
                setProductArr(res.data)
                setMainArr(res.data)
            }
        }
        catch (err) {
            toastError(err)
        }
    }


    useEffect(() => {
        handleGetDiscounts()
    }, [startDate, endDate])



    const category_columns = [
        {
            name: "Discount Code",
            selector: (row) => row?._id?.discount,
        },
        {
            name: "Count",
            selector: (row) => row?.count,
        },
        {
            name: "View",
            cell: (row) => <CustomButton
                isBtn
                iconName="fa-solid fa-eye"
                btnName="View"
                btntype="button"
                ClickEvent={() => { handleGetProductOrders(startDate, endDate, row?._id?.discountId); setSelectedProductName(row?._id?.discount) }}
            />,
        },
    ];



    const handleSearch = (queryValue) => {
        setQuery(queryValue)
        let tempArr = mainArr
        tempArr = tempArr.filter(el => `${el.productObj?.name}`.toLowerCase().includes(`${queryValue}`.toLowerCase()))
        setProductArr([...tempArr])
    }





    // ==============================================================================================================

    return (
        <main>
            <section className="product-category">
                <div className="container-fluid p-0">
                    <div className="row">
                        <div className="col-12 col-md-12">
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <h5 className="blue-1 m-0">Coupon Sale</h5>
                                <div className="d-flex gap-3 align-items-center">
                                    <div className="col-12 col-md-4 mb-3">
                                        <label>
                                            Start Date <span className="red">*</span>
                                        </label>
                                        <input
                                            name="name"
                                            className="form-control"
                                            type="date"
                                            value={moment(startDate).format('YYYY-MM-DD')}
                                            onChange={(e) => setStartDate(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-12 col-md-4 mb-3">
                                        <label>
                                            End Date <span className="red">*</span>
                                        </label>
                                        <input
                                            name="name"
                                            className="form-control"
                                            type="date"
                                            value={moment(endDate).format('YYYY-MM-DD')}
                                            onChange={(e) => setEndDate(e.target.value)}
                                        />
                                    </div>
                                    <SearchBox query={query} setQuery={e => handleSearch(e)} extraClass="bg-white" />
                                </div>
                            </div>
                            <DashboardTable>
                                <DataTable columns={category_columns} data={productArr && productArr.length > 0 ? productArr : []} pagination />
                            </DashboardTable>
                        </div>
                    </div>
                </div>
            </section>

            <Modal open={ModalBox} onClose={() => setModalBox(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box className="modal-box">
                    <div className="modal-container" style={{ width: "90vw" }}>
                        <div className="modal-header">
                            <h5>Coupon sale For {selectedProductName} ({DisplayDate(startDate, "dd/mm/yyyy")} - {DisplayDate(endDate, "dd/mm/yyyy")})</h5>
                            <CustomButton
                                isBtn
                                btntype="button"
                                iconName="ion-close-circled text-white"
                                changeClass="border-0 bg-transparent rounded-circle modal-close"
                                ClickEvent={(e) => {
                                    e.preventDefault();
                                    setModalBox(false);
                                }}
                            />
                        </div>
                        <div className="modal-body">
                            {
                                loading ?
                                    <h5>Loading...</h5>
                                    :
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">User Name</th>
                                                <th scope="col">On</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                selectedProductOrders && selectedProductOrders.length > 0 ? selectedProductOrders.map((el, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <th scope="row">{index + 1}</th>
                                                            <td>{el?.userObj?.name}</td>
                                                            <td>{DisplayDate(el.createdAt, "dd/mm/yyyy")}</td>
                                                            {/* <td>
                                                        <CustomButton
                                                            isBtn
                                                            btntype="button"
                                                            btnName={"View Order"}
                                                            iconName="fa-solid fa-eye"
                                                            ClickEvent={(e) => {
                                                                e.preventDefault();
                                                                setModalBox(false);
                                                                dispatch(SetUserPIObj(el));
                                                                navigate("/User-Order/Create")
                                                            }}
                                                        />
                                                    </td> */}
                                                        </tr>
                                                    )
                                                })

                                                    :
                                                    <tr>
                                                        <th scope="row">1</th>
                                                        <td colSpan={3}>No data found</td>
                                                    </tr>
                                            }
                                        </tbody>
                                    </table>
                            }
                        </div>
                    </div>
                </Box>
            </Modal>
        </main>
    );
}