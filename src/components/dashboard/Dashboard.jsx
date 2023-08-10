import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import CustomButton from "../Utility/Button";
import tabClick from "../Utility/TabClick";
import { DashboardBox, DashboardChart, DashboardTable } from "../Utility/DashboardBox";
import { toastError } from "../Utility/ToastUtils";
import { useEffect } from "react";
import { getProductCount, getProducts } from "../../services/product.service";
import { getTotalUser } from "../../services/users.service";
import { getTotalUserPi, getUserPi } from "../../services/userPi.service";
import { generalModelStatuses } from "../Utility/constants";

function Dashboard() {

  const [customerCount, setCustomerCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [productArr, setProductArr] = useState([]);
  const [userPiArr, setUserPiArr] = useState([]);

  const [filter, setfilter] = useState([
    {
      name: "Today",
      active: true,
      type: "today",
    },
    {
      name: "This Week",
      active: false,
      type: "week",
    },
    {
      name: "This Month",
      active: false,
      type: "month",
    },
    {
      name: "This Year",
      active: false,
      type: "year",
    },
    {
      name: "Last Year",
      active: false,
      type: "last-year",
    },
  ]);

  const [productCount, setProductCount] = useState(0);

  const getProductCountFromDb = async (type) => {
    try {
      let { data: res } = await getProductCount(`type=${type}`)
      if (res) {
        setProductCount(res.data)
      }
    }
    catch (err) {
      toastError(err)
    }
  }
  const getTotalUserPiFromDb = async (type) => {
    try {
      let { data: res } = await getTotalUserPi(`type=${type}`)
      if (res) {
        setOrderCount(res.data)
      }
    }
    catch (err) {
      toastError(err)
    }
  }
  const getTotalUserFromDb = async (type) => {
    try {
      let { data: res } = await getTotalUser(`type=${type}`)
      if (res) {
        setCustomerCount(res.data)
      }
    }
    catch (err) {
      toastError(err)
    }
  }


  const getUserPiFromDb = async (type) => {
    try {
      let { data: res } = await getUserPi(`type=${type}`)
      if (res) {
        setOrderChartData({
          labels: ["APPROVED",
            "CREATED",
            "DECLINED",
            "PENDING",
            "CANCELLED"],
          datasets: [
            {
              label: "Orders Summary",
              data: [res.data.filter(el => el.status == generalModelStatuses.APPROVED).length,
              res.data.filter(el => el.status == "CREATED").length,
              res.data.filter(el => el.status == generalModelStatuses.PENDING).length,
              res.data.filter(el => el.status == generalModelStatuses.PENDING).length,
              res.data.filter(el => el.status == generalModelStatuses.CANCELLED).length,
              ],
              backgroundColor: [
                "rgba(75, 192, 192, 0.2)", //green
                "rgba(54, 162, 235, 0.2)", //blue
                "rgba(255, 206, 86, 0.2)", //yellow
                "rgba(153, 102, 255, 0.2)", //purple
              ],
              borderColor: [
                "rgba(75, 192, 192)",
                "rgba(54, 162, 235)",
                "rgba(255, 206, 86)",
                "rgba(153, 102, 255)",
              ],
              borderWidth: 1,
            },
          ],
        })
        console.log(res.data.map(el => el.status), res.data.filter(el => el.status == generalModelStatuses.APPROVED),
          res.data.filter(el => el.status == generalModelStatuses.DECLINED),
          res.data.filter(el => el.status == generalModelStatuses.PENDING),
          res.data.filter(el => el.status == generalModelStatuses.CANCELLED), "asd")
        setUserPiArr(res.data)
      }
    }
    catch (err) {
      toastError(err)
    }
  }

  // const getProductFromDb = async (type) => {
  //   try {
  //     let { data: res } = await getProducts(`type=${type}`)
  //     if (res) {
  //       setProductChartData({
  //         labels: ["Published", "Total"],
  //         datasets: [
  //           {
  //             label: "Products",
  //             data: [50, 50],
  //             backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(75, 192, 192, 0.2)"],
  //             borderColor: ["rgba(54, 162, 235)", "rgba(75, 192, 192)"],
  //             borderWidth: 1,
  //           },
  //         ],
  //       })
  //       setUserPiArr(res.data)
  //     }
  //   }
  //   catch (err) {
  //     toastError(err)
  //   }
  // }


  useEffect(() => {
    let temp = filter.find(el => el.active == true)
    if (temp) {
      // getProductCountFromDb(temp.type)
      // getTotalUserPiFromDb(temp.type)
      // getTotalUserFromDb(temp.type)
      // getUserPiFromDb(temp.type)
    }
  }, [filter])

  useEffect(() => {
    console.log(customerCount,
      orderCount, productCount, userPiArr)
  }, [customerCount,
    orderCount, productCount, userPiArr])



  ChartJS.register(ArcElement, Tooltip, Legend);




  const [OrderChartData, setOrderChartData] = useState({
    labels: ["Total", "Complete", "Processing", "pending"],
    datasets: [
      {
        label: "Orders Summary",
        data: [3, 0, 0, 0],
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)", //green
          "rgba(54, 162, 235, 0.2)", //blue
          "rgba(255, 206, 86, 0.2)", //yellow
          "rgba(153, 102, 255, 0.2)", //purple
        ],
        borderColor: [
          "rgba(75, 192, 192)",
          "rgba(54, 162, 235)",
          "rgba(255, 206, 86)",
          "rgba(153, 102, 255)",
        ],
        borderWidth: 1,
      },
    ],
  });


  return (
    <main>
      <section className="dashboard-head mb-5">
        <div className="container-fluid ">
          <div className="row text-center">
          <h5 className="blue-1 mt-4 text-center">Mission Curiosity</h5>
          </div>
          
          {/* <ul className="dashboard-filter filters">
            {filter.map((item, i) => {
              return (
                <li key={`${item.type}_${i}`}>
                  <CustomButton
                    navPills
                    btnName={item.name}
                    changeClass="filtering"
                    pillActive={item.active ? true : false}
                    data-type={item.type}
                    ClickEvent={() => tabClick(i, filter, setfilter)}
                  />
                </li>
              );
            })}
          </ul> */}
        </div>
      </section>

      {/* <section className="mb-5">
        <div className="container-fluid">
          <div className="row">

            <div className="col-12 col-lg-4" >
              <DashboardBox className="dashboard-summary">
                <h5 className="blue-1">Total Products</h5>
                <h4 className="text-dark mb-0">{productCount}</h4>
              </DashboardBox>
            </div>
            <div className="col-12 col-lg-4" >
              <DashboardBox className="dashboard-summary">
                <h5 className="blue-1">Total Customer</h5>
                <h4 className="text-dark mb-0">{customerCount}</h4>
              </DashboardBox>
            </div>
            <div className="col-12 col-lg-4" >
              <DashboardBox className="dashboard-summary">
                <h5 className="blue-1">Total Order</h5>
                <h4 className="text-dark mb-0">{orderCount}</h4>
              </DashboardBox>
            </div>
            
          </div>
        </div>
      </section> */}

      {/* <section>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-6 mb-5">
              <DashboardChart>
                <h5 className="blue-1 mb-4">Products</h5>
                <Doughnut data={productChartData} />
              </DashboardChart>
            </div>
            <div className="col-12 col-md-12 mb-5">
              <DashboardChart>
                <h5 className="blue-1 mb-4">Orders Summary</h5>
                <Doughnut data={OrderChartData} />
              </DashboardChart>
            </div>
          </div>
        </div>
      </section> */}

    </main>
  );
}

export default Dashboard;
