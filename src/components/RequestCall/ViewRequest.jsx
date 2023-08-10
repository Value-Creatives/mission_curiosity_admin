import React, { useEffect, useState } from "react";
import { DashboardBox } from "../Utility/DashboardBox";
import { useSearchParams } from 'react-router-dom';
import { getBooknow, deleteBooknow , getById } from "../../services/requestcall.service";

function ViewRequest() {

    const [ContactArr, setContactArr ] = useState([]);
    const [id, setId ] = useState('');

    const [searchParams] = useSearchParams();

    useEffect(()=>{
        let idGet = searchParams.get('id');
        if(idGet){
        console.log(idGet , "idGet idGet idGet")

            setId(idGet)
            contactget(idGet);
        }
        // contactget();
    },[]);

    let contactget = async(id)=>{
        try{
            let { data:res } = await getById(id);
            if(res){
                let data = res?.data;
                setContactArr(data);
                // setTestimonialMainArr(data)
                console.log(res?.data, "book book  book book");
            }
        }catch(error){
            console.log(error);
        }
    }

  return (
    <main>
      <section className="product-category" style={{ minHeight: "75vh" }}>
        <div className="container-fluid p-0">
          <h5 className="blue-1 mb-4">booking  Detail</h5>
          <DashboardBox>
            <ul className="blue-1 fs-14 customer-profile p-3">
              <li>
                <span className="fw-600">
                  Name<span>:</span>
                </span>
                {ContactArr?.name}
              </li>
              <li>
                <span className="fw-600">
                  Email<span>:</span>
                </span>
                {ContactArr?.email}
              </li>
              <li>
                <span className="fw-600">
                  Phone<span>:</span>
                </span>
                {ContactArr?.phone}
              </li>
              <li>
                <span className="fw-600">
                  Date<span>:</span>
                </span>
                {new Date(ContactArr?.createdAt).toDateString()}
              </li>
              <li>
                <span className="fw-600">
                  School<span>:</span>
                </span>
                {ContactArr?.school}
              </li>
              <li>
                <span className="fw-600">
                Ticket <span>:</span>
                </span>
                {ContactArr?.ticketFor}
              </li>
        
            </ul>
          </DashboardBox>
        </div>
      </section>
    </main>
  );
}

export default ViewRequest;
