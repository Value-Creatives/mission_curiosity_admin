import React from "react";
import { images } from "../Images/Images";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

function SideBar() {
  let location = useLocation();
  const [sidebar_item, setsidebar_item] = useState([
    {
      isrotated: true,
      active: true,
      name: "dashboard",
      path: "/",
      icon: "ion-grid",
      children: [],
    },
    // {
    //   isrotated: false,
    //   active: false,
    //   name: "Banners",
    //   path: "/Dashboard",
    //   icon: "fa-brands fa-product-hunt",
    //   children: [
    //     {
    //       name: "Banners",
    //       path: "/Banners",
    //       active: false,
    //     },
    //   ],
    // },
    // {
    //   isrotated: false,
    //   active: false,
    //   name: "Price",
    //   path: "/Dashboard",
    //   icon: "fa-brands fa-product-hunt",
    //   children: [
    //     {
    //       name: "Add New Price",
    //       path: "/Product/AddProduct",
    //       active: false,
    //     },
    //     {
    //       name: "Price List",
    //       path: "/Product/Product-List",
    //       active: false,
    //     },
    //   ],
    // },
    // {
    //   isrotated: false,
    //   active: false,
    //   name: "itenary",
    //   path: "/Dashboard",
    //   icon: "fa-brands fa-product-hunt",
    //   children: [
    //     {
    //       name: "Add New Itenary",
    //       path: "/Itenary/AddItenary",
    //       active: false,
    //     },
    //     {
    //       name: "Itenary List",
    //       path: "/Itenary/Itenary-List",
    //       active: false,
    //     },
    //   ],
    // },
    // {
    //   isrotated: false,
    //   active: false,
    //   name: "policy",
    //   path: "/Dashboard", 
    //   icon: "fa-brands fa-product-hunt",
    //   children: [
    //     {
    //       name: "Privacy And Policy",
    //       path: "/privacy-policy",
    //       active: false,
    //     }
    //   ],
    // },
    // {
    //   isrotated: false,
    //   active: false,
    //   name: "About Us",
    //   path: "/Dashboard", 
    //   icon: "fa-brands fa-product-hunt",
    //   children: [
    //     {
    //       name: "About Us",
    //       path: "/About-us",
    //       active: false,
    //     }
    //   ],
    // },
    // {
    //   isrotated: false,
    //   active: false,
    //   name: "Speakers ",
    //   path: "/Dashboard", 
    //   icon: "fa-brands fa-product-hunt",
    //   children: [
    //     {
    //       name: "Speaker",
    //       path: "/Speaker",
    //       active: false,
    //     }
    //   ],
    // },
    // {
    //   isrotated: false,
    //   active: false,
    //   name: "Venue",
    //   path: "/Dashboard", 
    //   icon: "fa-brands fa-product-hunt",
    //   children: [
    //     {
    //       name: "Venue",
    //       path: "/Venue",
    //       active: false,
    //     }
    //   ],
    // }, 
    // {
    //   isrotated: false,
    //   active: false,
    //   name: "Clients",
    //   path: "/Dashboard", 
    //   icon: "fa-brands fa-product-hunt",
    //   children: [
    //     {
    //       name: "Clients",
    //       path: "/Clients",
    //       active: false,
    //     }
    //   ],
    // }, 
    // {
    //   isrotated: false,
    //   active: false,
    //   name: "Faq",
    //   path: "/Dashboard", 
    //   icon: "fa-brands fa-product-hunt",
    //   children: [
    //     {
    //       name: "Faq",
    //       path: "/Faq",
    //       active: false,
    //     }
    //   ],   
    // },
    // {
    //   isrotated: false,
    //   active: false,
    //   name: "Testimonial",
    //   path: "/Dashboard", 
    //   icon: "fa-brands fa-product-hunt",
    //   children: [
    //     {
    //       name: "Testimonial",
    //       path: "/Testimonial",
    //       active: false,
    //     }
    //   ],
    // },
    {
      isrotated: false,
      active: false,
      name: "Book now",
      path: "/Dashboard",
      icon: "fa-brands fa-product-hunt",
      children: [
        {
          name: "Book now",
          path: "/Booknow",
          active: false,
        }
      ],
    },
    {
      isrotated: false,
      active: false,
      name: "Contacts",
      path: "/Dashboard",
      icon: "fa-brands fa-product-hunt",
      children: [
        {
          name: "Contacts",
          path: "/Contact",
          active: false,
        }
      ],
    },
    // {
    //   isrotated: false,
    //   active: false,
    //   name: "Request a Call",
    //   path: "/Dashboard", 
    //   icon: "fa-brands fa-product-hunt",
    //   children: [
    //     {
    //       name: "Request a Call",
    //       path: "/Request-Call",
    //       active: false,
    //     }
    //   ],
    // },
    // {
    //   isrotated: false,
    //   active: false,
    //   name: "Discount Coupons",
    //   path: "/Discounts/View",
    //   icon: "ion-card",
    //   children: [],
    // },
    // {
    //   isrotated: false,
    //   active: false,
    //   name: "Customer",
    //   path: "/Dashboard",
    //   icon: "fa-solid fa-users",
    //   children: [
    //     {
    //       name: "View Customer Categories",
    //       path: "/Customer-Category",
    //       active: false,
    //     },
    //     {
    //       name: "All Customer",
    //       path: "/Customer-list",
    //       active: false,
    //     },
    //   ],
    // },
    // {
    //   isrotated: false,
    //   active: false,
    //   name: "Customer Orders",
    //   path: "/User-Order/View-All",
    //   icon: "fa-solid fa-users",
    //   children: [],
    // },
    // {
    //   isrotated: false,
    //   active: false,
    //   name: "Chats",
    //   path: "/Chats/AllChats",
    //   icon: "fa-sharp fa-solid fa-comment",
    //   children: [],
    // },
    // {
    //   isrotated: false,
    //   active: false,
    //   name: "Email Config",
    //   path: "/EmailConfig",
    //   icon: "fa-sharp fa-solid fa-comment",
    //   children: [],
    // },
    // {
    //   isrotated: false,
    //   active: false,
    //   name: "Report",
    //   path: "/Report",
    //   icon: "fa-solid fa-users",
    //   children: [
    //     {
    //       name: "View Product Sale",
    //       path: "/Report/Product-Sale",
    //       active: false,
    //     },
    //     {
    //       name: "View Coupon Sale",
    //       path: "/Report/Coupon-Sale",
    //       active: false,
    //     },
    //     {
    //       name: "View New Customers",
    //       path: "/Report/New-Customers",
    //       active: false,
    //     },
    //     {
    //       name: "View Customers by category",
    //       path: "/Report/Customers-Orders",
    //       active: false,
    //     },
    //     {
    //       name: "View Prouduct Searches",
    //       path: "/Report/Prouduct-Searches",
    //       active: false,
    //     },
    //   ],
    // },
  ]);

  const isRotating = (i) => {
    let temp_array = sidebar_item.map((el, index) => {
      if (index === i) {
        el.isrotated = !el.isrotated;
        el.active = true;
      } else {
        el.active = false;
      }
      return el;
    });
    setsidebar_item([...temp_array]);
  };

  const childActive = (i) => {
    let temp_array = sidebar_item.map((el, index) => {
      if (el.children.length > 0) {
        el.children.map((item, childIndex) => {
          if (childIndex === i) {
            item.active = true;
          } else {
            item.active = false;
          }
          return item;
        });
      }
      return el;
    });
    setsidebar_item([...temp_array]);
  };

  return (
    <div id="sidebar">
      <div className="main-logo">
        <img src={images.logo} width="220px" height="100px" alt="" />
      </div>
      <ul className="sidebar-menu" id="sidebarMenu">
        {sidebar_item.map((item, i) => {
          if (typeof array === "undefined" && item.children.length === 0) {
            return (
              <li key={`sidebar_item_${i}`}>
                <Link
                  to={item.path}
                  className={item.active ? "active" : ""}
                  onClick={() => isRotating(i)}
                >
                  <i className={item.icon}></i>
                  <p className="mb-0">{item.name}</p>
                </Link>
              </li>
            );
          } else {
            return (
              <li key={`sidebar_item_${i}`}>
                <Link
                  to={`#sidebar_item_children_${i}`}
                  className={
                    item.active || location === item.path ? "active" : ""
                  }
                  data-bs-toggle="collapse"
                  aria-expanded={item.active}
                  aria-controls={`sidebar_item_children_${i}`}
                  role="button"
                  onClick={() => isRotating(i)}
                >
                  <i className={item.icon}></i>
                  <p className="mb-0">
                    {item.name}
                    {item.isrotated ? (
                      <i className="ion-arrow-up-b pe-3"></i>
                    ) : (
                      <i className="ion-arrow-down-b pe-3"></i>
                    )}
                  </p>
                </Link>
                <ul
                  className="collapse"
                  id={`sidebar_item_children_${i}`}
                  data-bs-parent="#sidebarMenu"
                >
                  {item.children.map((child, index) => {
                    return (
                      <li key={`${child.name}_${index}`}>
                        <Link
                          to={child.path}
                          className={
                            child.active || location === child.path
                              ? "active"
                              : ""
                          }
                          onClick={() => childActive(index)}
                        >
                          {child.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}

export default SideBar;
