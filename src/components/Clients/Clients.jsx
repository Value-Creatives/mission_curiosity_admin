import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import ActionIcon from "../Utility/ActionIcon";
import { images } from "../Images/Images";
import CustomButton from "../Utility/Button";
import { DashboardTable } from "../Utility/DashboardBox";
import SearchBox from "../Utility/SearchBox";
import { useDispatch, useSelector } from "react-redux";
import { CLIENTGet, SetCLIENTObj ,CLIENTDelete} from "../../redux/actions/Client/Client.actions";
import { generateFilePath } from "../Utility/utils";

function Clients() {
  const dispatch = useDispatch();

  const bannerArr = useSelector((state) => state.client.clients);

  useEffect(() => {
    dispatch(CLIENTGet());
  }, []);

  const handleEdit = (row) => {
    dispatch(SetCLIENTObj(row));
  };

  const handleBlogDelete = (row) => {
    let confirm =window.confirm("Do you really want to delete this item?")
    if (confirm) {
      dispatch(CLIENTDelete(row));
      dispatch(CLIENTGet());
    }
  };
  const brand_columns = [
    {
      name: "ID",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "20%",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      width: "20%",
    },
    {
      name: "Image",
      grow: 0,
      width: "20%",
      cell: (row) => <img height="84px" width="56px" alt={row.name} src={generateFilePath(row.image)} />,
    },
    {
      name: "Status",
      button: true,
      width: "20%",
      cell: (row) => <CustomButton greenBtn btnName={row.status ? "Active" : "Inactive"} isRedirected={true} editPath="/Clients" />,
    },
    {
      name: "Action",
      width: "20%",
      cell: (row) => <ActionIcon isRedirected={true} onEditClick={() => handleEdit(row)} editPath="/Clients/Client-Create" onDeleteClick={() => handleBlogDelete(row?._id)} deletePath="/Clients" remove edit Uniquekey={row.id} />,
    },
  ];

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="blue-1 m-0">Client List</h5>
                <div className="d-flex align-items-center gap-3">
                  <CustomButton isLink iconName="fa-solid fa-plus" btnName="ADD NEW CLIENT" path="/Clients/Client-Create" small roundedPill />
                  <SearchBox extraClass="bg-white" />
                </div>
              </div>
              <DashboardTable>
                <DataTable columns={brand_columns} data={bannerArr && bannerArr.length > 0 ? bannerArr : []} pagination />
              </DashboardTable>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Clients;
