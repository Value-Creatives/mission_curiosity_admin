import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { PRODUCTDelete, PRODUCTGet, SetPRODUCTObj } from "../../redux/actions/Product/Product.actions";
import { SetUserPIObj, userPiDelete, usersPiGet } from "../../redux/actions/UserPi/userPi.actions";
import ActionIcon from "../Utility/ActionIcon";
import CustomButton from "../Utility/Button";
import { DashboardTable } from "../Utility/DashboardBox";
import { AddModal } from "../Utility/Modal";
import SearchBox from "../Utility/SearchBox";
import { generateFilePath } from "../Utility/utils";
export default function UserOrder() {
    const dispatch = useDispatch();

    const userPiArr = useSelector((state) => state.userPi.userPi);

    const [displayUserPiArr, setDisplayUserPiArr] = useState([]);
    const [mainArr, setMainArr] = useState([]);
    const [query, setQuery] = useState("");

    const [dateFilter, setDateFilter] = useState("");


    useEffect(() => {
        if (userPiArr) {
            setDisplayUserPiArr([...userPiArr])
            setMainArr([...userPiArr])
        }
    }, [userPiArr])


    useEffect(() => {
        let query = ''
        if (dateFilter) {
            let baseDate = new Date(dateFilter);
            let startDate = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate());
            let endDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 1);
            endDate.setTime(endDate.getTime() - 1)  // setting time as 23:59 
            query = query + `startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
        }
        dispatch(usersPiGet(query));
    }, [dateFilter]);

    const handleEdit = (row) => {
        dispatch(SetUserPIObj(row));
    };

    const handleDeleteById = (id) => {
        dispatch(userPiDelete(id));
    };

    const [ModalType, setModalType] = useState("");
    const [ModalName, setModalName] = useState("");
    const [ModalBox, setModalBox] = useState(false);

    const product_sale_columns = [
        {
            name: "SL",
            selector: (row, index) => index + 1,
            sortable: true,
            width: "5%",
        },
        {
            name: "User Name",
            selector: (row) => row?.userObj?.name,
            width: "15%",
        },
        {
            name: "Grand Total Cost",
            selector: (row) => `INR ${row?.grandTotal}`,
            width: "15%",
        },
        {
            name: "Ordered On",
            selector: (row) => `${new Date(row.createdAt).toDateString()}`,
            width: "10%",
        },
        {
            name: "Last Updated On",
            selector: (row) => `${new Date(row.updatedAt).toDateString()} | ${new Date(row.updatedAt).getHours()}:${new Date(row.updatedAt).getMinutes()}`,
            width: "14%",
        },
        {
            name: "Status",
            selector: (row) => `${row.status}`,
            width: "15%",
        },
        {
            name: "Action",
            width: "15%",
            cell: (row) => (
                <>
                    <ActionIcon
                        Uniquekey={row.id}
                        edit
                        deletePath="/User-Order/View-All"
                        onDeleteClick={() => handleDeleteById(row._id)}
                        isRedirected={true}
                        onEditClick={() => handleEdit(row)}
                        editPath="/User-Order/Create"
                    // detail
                    // detailClick={(e) => {
                    //   e.preventDefault();
                    //   setModalBox(true);
                    //   setModalType("show-product");
                    //   setModalName(row.Name);
                    // }}
                    />

                    <AddModal ModalBox={ModalBox} setModalBox={setModalBox} name={ModalName} ModalType={ModalType} />
                </>
            ),
        },
    ];



    const handleSearch = (queryValue) => {
        setQuery(queryValue)
        let tempArr = mainArr
        tempArr = tempArr.filter(el => `${el?.userObj?.name}`.toLowerCase().includes(`${queryValue}`.toLowerCase()))
        setDisplayUserPiArr([...tempArr])
    }


    return (
        <main>
            <section className="product-category">
                <div className="container-fluid p-0">
                    <div className="row">
                        <div className="col-12">
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <h5 className="blue-1">User Order List</h5>
                                <div className="d-flex align-items-center gap-3">
                                    <input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} className="form-control" />

                                    <CustomButton isLink iconName="fa-solid fa-plus" btnName="ADD NEW ORDER" path="/User-Order/Create" />
                                    <SearchBox query={query} setQuery={handleSearch} extraClass="bg-white" />

                                </div>
                            </div>
                            <DashboardTable>
                                <DataTable columns={product_sale_columns} data={displayUserPiArr && displayUserPiArr.length > 0 ? displayUserPiArr : []} pagination />
                            </DashboardTable>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
