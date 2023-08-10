import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import SearchBox from "../Utility/SearchBox";

import { useDispatch } from "react-redux";
import { getProductsSoldWithinDates } from "../../services/userPi.service";
import { DashboardTable } from "../Utility/DashboardBox";
import { toastError } from "../Utility/ToastUtils";
import moment from "moment";
import { DisplayDate } from "../../utils/DateUtils";
import { getRegisteredUsersBetweeenDays } from "../../services/users.service";
import { getProductSearches } from "../../services/productSearches.service";
export default function ProductSearches() {
    // ==============================================================================================================
    const dispatch = useDispatch();
    const [selectedDiscountObj, setSelectedDiscountObj] = useState({});
    const [reloadCount, setReloadCount] = useState(0);
    const [usersArr, setUsersArr] = useState([]);
    const [mainArr, setMainArr] = useState([]);
    const [query, setQuery] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());


    const handleGetDiscounts = async () => {
        try {
            let { data: res } = await getProductSearches(startDate, endDate)
            if (res.data) {
                console.log(res.data)
                setUsersArr(res.data)
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
            name: "User Name",
            selector: (row) => row?.userObj?.name,
        },
        {
            name: "Product Name",
            selector: (row) => row?.productObj?.name,
        },
        {
            name: "On",
            selector: (row) => DisplayDate(row?.createdAt, "dd/mm/yyyy"),
        },
    ];



    const handleSearch = (queryValue) => {
        setQuery(queryValue)
        let tempArr = mainArr
        tempArr = tempArr.filter(el => `${el?.userObj?.name}`.toLowerCase().includes(`${queryValue}`.toLowerCase()) || `${el?.productObj?.name}`.toLowerCase().includes(`${queryValue}`.toLowerCase()))
        setUsersArr([...tempArr])
    }





    // ==============================================================================================================

    return (
        <main>
            <section className="product-category">
                <div className="container-fluid p-0">
                    <div className="row">
                        <div className="col-12 col-md-12">
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <h5 className="blue-1 m-0">Product Searches</h5>
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
                                <DataTable columns={category_columns} data={usersArr && usersArr.length > 0 ? usersArr : []} pagination />
                            </DashboardTable>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}