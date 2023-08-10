import React, { useEffect, useState } from "react";
import { DashboardBox } from "../Utility/DashboardBox";
import { useSearchParams } from 'react-router-dom';
import { getContact, deleteContact, getById } from "../../services/contact.service";

function ViewContact() {

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
   
    },[]);

    let contactget = async(id)=>{
        try{
            let { data:res } = await getById(id);
            if(id){
                let data = res?.data;
                console.log(data , " getArry")
                setContactArr(data);
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
          <h5 className="blue-1 mb-4">Contact Detail</h5>
          <DashboardBox>
            <ul className="blue-1 fs-14 customer-profile p-3">
              <li>
                <span className="fw-600">
                  Name<span>:</span>
                </span>
                {ContactArr?.queryName}
              </li>
              <li>
                <span className="fw-600">
                  Email<span>:</span>
                </span>
                {ContactArr?.queryEmail}
              </li>
              <li>
                <span className="fw-600">
                  Phone<span>:</span>
                </span>
                {ContactArr?.queryPhone}
              </li>
              <li>
                <span className="fw-600">
                  Subject<span>:</span>
                </span>
                {ContactArr?.querysubject}
              </li>
              <li>
                <span className="fw-600">
                  Message<span>:</span>
                </span>
                {ContactArr?.queryMessage}
              </li>
            </ul>
          </DashboardBox>
        </div>
      </section>
    </main>
  );
}

export default ViewContact;
