import { Switch } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill"; // ES6
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { BrandAdd, BrandUpdate, SetBrandObj } from "../../redux/actions/Brand/brand.actions";
import { PRODUCTGet } from "../../redux/actions/Product/Product.actions";
import { updateUserPi, userPiAdd } from "../../redux/actions/UserPi/userPi.actions";
import { usersGet } from "../../redux/actions/Users/users.actions";
import { toastError } from "../../utils/toastUtils";
import CustomButton from "../Utility/Button";
import { generalModelStatuses } from "../Utility/constants";
import { DashboardBox } from "../Utility/DashboardBox";
import FileUpload from "../Utility/FileUpload";

export default function CreateUserOrder({ makeChange }) {
    const dispatch = useDispatch();
    const userPiOrderObj = useSelector((state) => state.userPi.userPiObj);
    const options = Object.keys(generalModelStatuses).map((el) => ({ value: generalModelStatuses[el], label: el }));
    const [isUpdateBrand, setIsUpdateBrand] = useState(false);
    const [status, setStatus] = useState("");
    const [statusObj, setStatusObj] = useState({});
    const productArr = useSelector((state) => state.product.products);
    const [items, setItems] = useState([{ productId: "", quantity: 1 }]);
    const userArr = useSelector((state) => state.users.users);
    const [userObj, setUserObj] = useState({});
    const [userId, setUserId] = useState("");
    const [discountObj, setDiscountObj] = useState({});
    const [discountValue, setDiscountValue] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);
    const [additionalDiscount, setAdditionalDiscount] = useState(0);
    const [shippingCharges, setShippingCharges] = useState(0);
    const [freightCharges, setFreightCharges] = useState(0);
    const [updatedByadmin, setUpdatedByadmin] = useState(false);
    const [gst, setGst] = useState(0);
    const [useUserSpecificDiscount, setUseUserSpecificDiscount] = useState(false);
    useEffect(() => {
        if (userPiOrderObj) {
            console.log(userPiOrderObj.userId, "userPiOrderObj.userId")
            setUserId(userPiOrderObj.userId);
            setUserObj(userPiOrderObj.userObj);
            setItems(userPiOrderObj.items);
            console.log(userPiOrderObj, "userPiOrderObj");
            setIsUpdateBrand(true);
            setDiscountObj(userPiOrderObj?.discount);
            setDiscountValue(userPiOrderObj?.discountValue);
            setGst(userPiOrderObj?.gst ? userPiOrderObj?.gst : 0);
            setStatusObj({
                label: userPiOrderObj?.status,
                value: userPiOrderObj?.status,
            });
            setUpdatedByadmin(userPiOrderObj?.updatedByadmin)
            setStatus(userPiOrderObj?.status);
            setAdditionalDiscount(userPiOrderObj?.additionalDiscount);
            setFreightCharges(userPiOrderObj?.freightCharges);
            setShippingCharges(userPiOrderObj?.shippingCharges);
            setUseUserSpecificDiscount(userPiOrderObj?.useUserSpecificDiscount);
        }
        return () => {
            dispatch(SetBrandObj(null));
        };
    }, [userPiOrderObj]);

    const handleSubmit = () => {
        if (parseInt(handleCalculateGrandTotal()) < 0) {
            toastError("Grand Total cannot be less than 0")
            return
        }
        let obj = {
            userId: userId,
            isfromAdmin: true,
            items: items.map(el => {
                let tempObj = {
                    ...el,
                    quantity: parseInt(el.quantity),
                    productId: el.productId,
                    mrp: el.productObj.price,
                    price: (el.productObj.price - ((userObj?.customerCategoryObj?.percentage && useUserSpecificDiscount) ? percentageCalculation(userObj?.customerCategoryObj?.percentage, el.productObj.price) : 0)),
                    totalPrice: ((el.productObj.price - ((userObj?.customerCategoryObj?.percentage && useUserSpecificDiscount) ? percentageCalculation(userObj?.customerCategoryObj?.percentage, el.productObj.price) : 0)) * el.quantity),
                }
                return tempObj
            }),
            total: parseInt(getTotalBeforeDiscount()),
            grandTotal: parseInt(handleCalculateGrandTotal()),
            shippingCharges,
            freightCharges,
            additionalDiscount,
            gst,
            updatedByadmin: true,
            status: status
        };
        if (discountObj?.discountCode) {
            obj.discountValue = parseInt(handleTotalDiscount(discountObj, getTotalBeforeDiscount()))
        }
        else {
            obj.discountValue = 0
        }
        console.log(obj)
        if (userPiOrderObj && userPiOrderObj._id) {
            dispatch(updateUserPi(obj, userPiOrderObj._id));
        } else {
            dispatch(userPiAdd(obj))
        }
    };



    const handleObjAdd = () => {
        let tempArr = items
        tempArr.push({ productId: "", quantity: 1 })
        console.log(tempArr, "asdas")
        setItems([...tempArr])
    }
    const handleObjRemove = () => {
        if (items.length > 1) {
            let tempArr = items.filter((el, index) => index != items.length - 1);
            setItems([...tempArr])
        }
    }



    const handleProductSelect = (value, index) => {
        let tempArr = items;
        tempArr[index].productId = value.value
        tempArr[index].productObj = value
        setItems([...tempArr]);
    };
    const handleProductQuantitySet = (value, index) => {
        let tempArr = items;
        tempArr[index].quantity = value
        setItems([...tempArr]);
    };

    const percentageCalculation = (percent, total) => {
        console.log(percent, total, "asd")
        return ((percent / 100) * total).toFixed(2)
    }
    const handleTotalDiscount = (discountObj, total) => {

        if (`${discountObj?.type}`.toLowerCase() == "percentage") {
            return (percentageCalculation(discountObj?.value, total))
        }
        else {
            return discountObj?.value
        }
    }

    const handleCalculateTotalDiscount = () => {
        let value = parseInt(handleTotalDiscount(discountObj, getTotalBeforeDiscount()))
        if (additionalDiscount && additionalDiscount > 0) {
            value = parseInt(value) + parseInt(additionalDiscount)
        }
        setDiscountValue(value)
    }

    useEffect(() => {

        if (discountObj && discountObj.discountCode) {
            handleCalculateTotalDiscount()
        }

    }, [items, discountObj, additionalDiscount])


    // const handleCalculateTotal = () => {
    //     if (userObj && userObj.customerCategoryObj) {
    //         return (items.reduce((acc, el) => acc + (el?.productObj?.price - percentageCalculation(userObj?.customerCategoryObj?.percentage, el?.productObj?.price)), 0) ? items.reduce((acc, el) => acc + ((el?.productObj?.price - percentageCalculation(userObj?.customerCategoryObj?.percentage, el?.productObj?.price)) * el?.quantity), 0) : 0).toFixed(2)
    //     }
    //     else {
    //         return "Please select a user to get a total"
    //     }
    // }
    const handleCalculateGrandTotal = () => {
        if (userObj && userObj.customerCategoryObj && items && items.length > 0) {
            let total = items.reduce((acc, el) => acc + el.quantity * (el?.productObj?.price - ((userObj?.customerCategoryObj?.percentage && useUserSpecificDiscount) ? percentageCalculation(userObj?.customerCategoryObj?.percentage, el?.productObj?.price) : 0)), 0)
            if (discountObj && discountObj.discountCode) {
                if (`${discountObj?.type}`.toLowerCase() == "percentage") {
                    total = (parseInt(total) - parseInt((percentageCalculation(discountObj?.value, total)))) > 0 ? (parseInt(total) - parseInt((percentageCalculation(discountObj?.value, total)))) : 0
                }
                else {
                    total = (parseInt(total) - parseInt(discountObj?.value)) > 0 ? parseInt(total) - parseInt(discountObj?.value) : 0
                }
            }

            if (additionalDiscount && parseInt(additionalDiscount) > 0) {
                total = parseInt(total) - parseInt(additionalDiscount)
            }
            if (shippingCharges && shippingCharges > 0) {
                total = parseInt(total) + parseInt(shippingCharges)
            }
            if (freightCharges && freightCharges > 0) {
                total = parseInt(total) + parseInt(freightCharges)
            }

            if (gst && gst > 0) {
                total = parseInt(total) + parseInt(percentageCalculation(gst, total))
            }



            return total && parseInt(total).toFixed(1)
        }
        else {
            let total = items.reduce((acc, el) => acc + el.quantity * (el?.productObj?.price), 0)
            if (discountObj && discountObj.discountCode) {
                if (`${discountObj?.type}`.toLowerCase() == "percentage") {
                    total = (parseInt(total) - parseInt(percentageCalculation(discountObj?.value, total))) > 0 ? (parseInt(total) - parseInt(percentageCalculation(discountObj?.value, total))) : 0
                }
                else {
                    total = (parseInt(total) - parseInt(discountObj?.value)) > 0 ? parseInt(total) - parseInt(discountObj?.value) : 0
                }
            }

            if (additionalDiscount && parseInt(additionalDiscount) > 0) {
                total = parseInt(total) - parseInt(additionalDiscount)
            }
            if (shippingCharges && shippingCharges > 0) {
                total = parseInt(total) + parseInt(shippingCharges)
            }
            if (freightCharges && freightCharges > 0) {
                total = parseInt(total) + parseInt(freightCharges)
            }

            if (gst && gst > 0) {
                total = parseInt(total) + parseInt(percentageCalculation(gst, total))
            }

            return total && parseInt(total).toFixed(1)


            // return "Please select a user to get a total"
        }
    }



    const getTotalBeforeDiscount = () => {
        if (items && items.length > 0) {
            let total = items.reduce((acc, el) => acc + el.quantity * (parseInt(el?.productObj?.price) - ((userObj?.customerCategoryObj?.percentage && useUserSpecificDiscount) ? percentageCalculation(userObj?.customerCategoryObj?.percentage, el?.productObj?.price) : 0)), 0)
            console.log(total, "getTotalBeforeDiscount", items.map((el) => el.quantity * (parseInt(el?.productObj?.price) - ((userObj?.customerCategoryObj?.percentage && useUserSpecificDiscount) ? percentageCalculation(userObj?.customerCategoryObj?.percentage, el?.productObj?.price) : 0))))
            return total
        }
    }


    useEffect(() => {
        handleCalculateGrandTotal()
    }, [items, userObj, additionalDiscount])

    const handleGetAllUsers = () => {
        dispatch(usersGet());
        dispatch(PRODUCTGet());
    };
    useEffect(() => {
        handleGetAllUsers();
    }, []);
    return (
        <div className={makeChange ? "makeChange" : ""}>
            <form className="form">
                <div className="row">
                    <div className="col-12 col-md-8 mb-0">
                        <DashboardBox className={makeChange ? "p-0" : ""}>
                            <div className="border-bottom pb-3 mb-4 row">
                                <h5 className={makeChange ? "blue-1" : "blue-1 mb-4"}>Order Information</h5>
                                <div className="col-12 col-md-4 mb-3">
                                    <label>
                                        Customer
                                        <span className="red">*</span>
                                    </label>
                                    <Select isDisabled onChange={(e) => { setUserObj(e); setUserId(e.value) }} defaultValue={userId} value={userObj} options={userArr && userArr.length > 0 ? userArr.map(el => ({ label: el.name, value: el._id, ...el })) : []} />

                                </div>
                                <div className="row d-flex">

                                    <h5 className="blue-1 mb-3">Products Info</h5>
                                    <div className="row">
                                        <div className="col-2 me-5">
                                            <CustomButton btntype="button" ClickEvent={handleObjAdd} isBtn noIcon btnName="+" />
                                        </div>
                                        <div className="col-2">
                                            <CustomButton btntype="button" ClickEvent={handleObjRemove} isBtn noIcon btnName="-" />
                                        </div>
                                    </div>
                                </div>

                                {
                                    items && items.length > 0 && items.map((el, i) => {
                                        return (
                                            <div>
                                                <div className="col-12 col-md-4 mb-3">
                                                    <label>
                                                        Product {el.price} ({el.quantity})
                                                        <span className="red">*</span>
                                                    </label>
                                                    <Select onChange={(e) => { handleProductSelect(e, i) }} defaultValue={el.productId} value={el.productObj} options={productArr && productArr.length > 0 ? productArr.map(el => ({ label: el.name, value: el._id, ...el })) : []} />
                                                </div>
                                                <div className="col-12">
                                                    <label>
                                                        quantity <span className="red">*</span>
                                                    </label>
                                                    <input type="number" onChange={(event) => handleProductQuantitySet(event.target.value, i)} value={el.quantity} className="form-control" />
                                                </div>
                                            </div>

                                        )
                                    })

                                }
                            </div>
                            <h6 className="blue-1 mb-3">Discount code : {discountObj?.discountCode ? discountObj?.discountCode : "NA"}</h6>
                            <h6 className="blue-1 mb-3">Discount Value : {discountObj?.value ? discountObj?.value : "NA"}</h6>
                            <h6 className="blue-1 mb-3">Discount type : {discountObj?.type ? discountObj?.type : "NA"}</h6>
                            <hr />
                            <h6 className="blue-1 mb-3">Total : Rs {getTotalBeforeDiscount()}</h6>
                            <h6 className="blue-1 mb-3">Total Discount from app : Rs {discountValue ? discountValue : 0}</h6>
                            <h5 className="blue-1 mb-3">Grand Total : Rs {handleCalculateGrandTotal()}</h5>

                        </DashboardBox>
                    </div>
                    <div className="col-12 col-md-4 mb-0">
                        <DashboardBox className={makeChange ? "p-0" : ""}>
                            <div className="row">
                                <h5 className={makeChange ? "blue-1" : "blue-1 mb-4"}>Status Info</h5>

                                <div className="col-12">
                                    <label>
                                        STATUS <span className="red">*</span>
                                    </label>
                                    <Select options={options} defaultValue={status} value={statusObj} onChange={(e) => { setStatus(e.value); setStatusObj(e) }} />
                                </div>
                                <div className="col-12">
                                    <label>
                                        FREIGHT CHARGES <span className="red">*</span>
                                    </label>
                                    <input type="number" onChange={(event) => { setFreightCharges(event.target.value) }} value={freightCharges} className="form-control" />
                                </div>
                                <div className="col-12">
                                    <label>
                                        SHIPPING CHARGES <span className="red">*</span>
                                    </label>
                                    <input type="number" onChange={(event) => { setShippingCharges(event.target.value) }} value={shippingCharges} className="form-control" />
                                </div>
                                <div className="col-12">
                                    <label>
                                        ADDITIONAL DISCOUNT <span className="red">*</span>
                                    </label>
                                    <input type="number" onChange={(event) => { setAdditionalDiscount(event.target.value) }} value={additionalDiscount} className="form-control" />
                                </div>

                                <div className="col-12">
                                    <label>
                                        GST <span className="red">*</span>
                                    </label>
                                    <input type="number" onChange={(event) => { setGst(event.target.value) }} value={`${gst}`} className="form-control" />
                                </div>


                                <div className="col-12">
                                    <CustomButton isBtn btntype="button" ClickEvent={handleSubmit} iconName="fa-solid fa-check" btnName="Save" small={makeChange ? true : false} />
                                </div>
                            </div>
                        </DashboardBox>
                    </div>
                </div>
            </form>
        </div>
    );
}
