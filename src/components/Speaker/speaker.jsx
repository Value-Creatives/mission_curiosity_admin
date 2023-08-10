import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import ActionIcon from "../Utility/ActionIcon";
import { images } from "../Images/Images";
import CustomButton from "../Utility/Button";
import { DashboardTable } from "../Utility/DashboardBox";
import SearchBox from "../Utility/SearchBox";
import { useDispatch, useSelector } from "react-redux";
// import { BANNERGet, SetBANNERObj } from "../../redux/actions/Banner/Banner.actions";
import { generateFilePath } from "../Utility/utils";
import { getSpeaker } from "../../services/speaker.service";
import { useNavigate } from "react-router-dom";

function Speaker() {

    const navigate = useNavigate();
    const [speakerGet, setSpeakerArr] = useState('');   
    const bannerArr = useSelector((state) => state.banner.banners);

  useEffect(() => {
    allSpeakerGet();
  }, []);

  const handleEdit = (row) => {
    navigate(`/Speaker-Create?speakerId=${row?._id}`);
    // dispatch(SetBANNERObj(row));
  };

  let allSpeakerGet = async()=>{
    try{
        let { data:res } = await getSpeaker();
        if(res){
            let data = res?.data;
            setSpeakerArr(data);
            console.log(res?.data);
        }
    }catch(error){
        console.log(error);
    }
  }
  const brand_columns = [
    {
      name: "ID",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "17%",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      width: "17%",
    },
    {
        name: "Post",
        selector: (row) => row.post,
        width: "17%",
      },
    {
      name: "Image",
      grow: 0,
      width: "17%",
      cell: (row) => <img height="84px" width="56px" alt={row.name} src={generateFilePath(row.image)} />,
    },
    {
      name: "Status",
      button: true,
      width: "17%",
      // cell: (row) => <CustomButton greenBtn btnName="Active" />,
      cell: (row) => <CustomButton greenBtn btnName={`${row.status == "APPROVED" ? "Active" : "InActive"}`} />,
    },
    {
      name: "Action",
      width: "17%",
      cell: (row) => <ActionIcon isRedirected={true} onEditClick={() => handleEdit(row)} editPath={`/Speaker-Create?speakerId=${row?._id}`} onDeleteClick={() => console.log("deleted")} deletePath="/Speaker" remove edit Uniquekey={row.id} />,
    },
  ];

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="blue-1 m-0">Speaker List</h5>
                <div className="d-flex align-items-center gap-3">
                  <CustomButton isLink iconName="fa-solid fa-plus" btnName="ADD NEW SPEAKER" path="/Speaker-Create" small roundedPill />
                  <SearchBox extraClass="bg-white" />
                </div>
              </div>
              <DashboardTable>
                <DataTable columns={brand_columns} data={speakerGet && speakerGet.length > 0 ? speakerGet : []} pagination />
              </DashboardTable>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Speaker;
