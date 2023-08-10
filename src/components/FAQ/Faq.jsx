import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import ActionIcon from "../Utility/ActionIcon";
import { images } from "../Images/Images";
import CustomButton from "../Utility/Button";
import { DashboardTable } from "../Utility/DashboardBox";
import SearchBox from "../Utility/SearchBox";
import { useDispatch, useSelector } from "react-redux";
import {
  FAQGet,
  SetFaqObj,
  FaqDelete,
} from "../../redux/actions/Faq/Faq.action";
import { generateFilePath } from "../Utility/utils";
import { getFaq } from "../../services/Faq.service";
import { toastError } from "../Utility/ToastUtils";

function Faq() {
  const dispatch = useDispatch();
  const faqArr = useSelector((state) => state.faq.faqs);
 
  const handleGet = () => {
    dispatch(FAQGet());
  };
  useEffect(() => {
    handleGet();
  }, []);
  const handleEdit = (row) => {
    console.log(row, "rowwe");
    dispatch(SetFaqObj(row));
  };
  const handlefaqDelete = (id) => {
    // console.log(id, "id=");
    dispatch(FaqDelete(id));
  };
  const brand_columns = [
    {
      name: "ID",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "3%",
    },
    {
      name: "Question",
      selector: (row) => row.heading,
      width: "8%",
    },
    {
      name: "Answer",
      selector: (row) => row.description,
      width: "8%",
    },
    {
      name: "Action",
      width: "8%",
      cell: (row) => (
        <ActionIcon
          isRedirected={true}
          edit
          onEditClick={() => handleEdit(row)}
          editPath="/Faq/Faq-Create"
          onDeleteClick={() => handlefaqDelete(row._id)}
          deletePath="/Faq"
          remove
          Uniquekey={row._id}
        />
      ),
    },
  ];

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="blue-1 m-0">Faq List</h5>
                <div className="d-flex align-items-center gap-3">
                  <CustomButton
                    isLink
                    iconName="fa-solid fa-plus"
                    btnName="ADD NEW FAQ"
                    path="/Faq/Faq-Create"
                    small
                    roundedPill
                  />
                  <SearchBox extraClass="bg-white" />
                </div>
              </div>
              <DashboardTable>
                <DataTable
                  columns={brand_columns}
                  data={faqArr && faqArr.length > 0 ? faqArr : []}
                  pagination
                />
              </DashboardTable>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Faq;
