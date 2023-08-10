import React, { useEffect, useState } from "react";
import { DashboardBox } from "../Utility/DashboardBox";
import { useSearchParams } from 'react-router-dom';
import { getBooknow, deleteBooknow, getById } from "../../services/booknow.service";

function ViewBookNow() {

  const [ContactArr, setContactArr] = useState([]);
  const [id, setId] = useState('');

  const [searchParams] = useSearchParams();

  useEffect(() => {
    let idGet = searchParams.get('id');
    if (idGet) {
      console.log(idGet, "idGet idGet idGet")

      setId(idGet)
      contactget(idGet);
    }
    // contactget();
  }, []);

  let contactget = async (id) => {
    try {
      let { data: res } = await getById(id);
      if (res) {
        let data = res?.data;
        setContactArr(data);
        // setTestimonialMainArr(data)
        console.log(res?.data, "book book  book book");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main>
      <section className="product-category" style={{ minHeight: "75vh" }}>
        <div className="container-fluid p-0">
          <h5 className="blue-1 mb-4">Booking  Details</h5>
          <DashboardBox>
            <ul className="blue-1 fs-14 customer-profile p-3">
              <li>
                <span className="fw-600">
                  Name<span>:</span>
                </span>
                {ContactArr?.bookName}
              </li>
              <li>
                <span className="fw-600">
                  Email<span>:</span>
                </span>
                {ContactArr?.bookEmail}
              </li>
              <li>
                <span className="fw-600">
                  Phone<span>:</span>
                </span>
                {ContactArr?.bookPhone}
              </li>
              <li>
                <span className="fw-600">
                  Date<span>:</span>
                </span>
                {new Date(ContactArr?.createdAt).toDateString()}
              </li>
              <li>
                <span className="fw-600">
                  Price<span>:</span>
                </span>
                {ContactArr?.bookPrice / 100}
              </li>
              <li>
                <span className="fw-600">
                  Payment Id<span>:</span>
                </span>
                {ContactArr?.payment_id}
              </li>

            </ul>
          </DashboardBox>
        </div>
      </section>
    </main>
  );
}

export default ViewBookNow;
