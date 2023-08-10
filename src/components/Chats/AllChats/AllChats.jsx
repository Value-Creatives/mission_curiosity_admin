import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { Switch } from "@mui/material";
import ActionIcon from "../../Utility/ActionIcon";
import CustomButton from "../../Utility/Button";
import SearchBox from "../../Utility/SearchBox";
import { DashboardTable } from "../../Utility/DashboardBox";
import { useEffect } from "react";
import { toastError } from "../../Utility/ToastUtils";
import { getChats } from "../../../services/Chat.service";

export default function AllChats() {
  const [query, setQuery] = useState("");
  const chats_columns = [
    {
      name: "SL",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "5%",
    },
    {
      name: "USer Name",
      selector: (row) => row?.usersArr[0]?.userObj?.name,
      width: "20%",
    },
    {
      name: "Phone Number",
      selector: (row) => row?.usersArr[0]?.userObj?.phone,
      width: "20%",
    },
    {
      name: "Email",
      grow: 0,
      selector: (row) => row?.usersArr[0]?.userObj?.email,
      width: "20%",
    },
    {
      name: "View chat",
      cell: (row, index) => <ActionIcon detail={true} detailpath={`/Chats/Single-Chat/${row._id}`} Uniquekey={index} isRedirected={true} />,
      width: "15%",
    },
  ];
  const [chats_data, setChats_data] = useState([]);

  const [mainArr, setMainArr] = useState([]);





  const handleSearch = (queryValue) => {
    setQuery(queryValue)
    let tempArr = mainArr
    tempArr = tempArr.filter(el => `${el?.usersArr[0]?.userObj?.name}`.toLowerCase().includes(`${queryValue}`.toLowerCase()))
    setChats_data([...tempArr])
  }


  const handleGetChats = async () => {
    try {
      let { data: res } = await getChats();
      if (res.data) {
        setChats_data(res.data);
        setMainArr(res.data);
      }
    } catch (err) {
      toastError(err);
    }
  };

  useEffect(() => {
    handleGetChats();
  }, []);

  return (
    <main>
      <section className="product-category" style={{ minHeight: "75vh" }}>
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h5 className="blue-1 m-0">Chats List</h5>
                <div className="d-flex gap-3">
                  <SearchBox query={query} setQuery={handleSearch} extraClass="bg-white" />
                </div>
              </div>
              <DashboardTable>
                <DataTable columns={chats_columns} data={chats_data} pagination />
              </DashboardTable>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
