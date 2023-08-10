import React from "react";
import { images } from "../Images/Images";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

function SideBar() {
  let location = useLocation();
  const [sidebar_item, setsidebar_item] = useState([

    {
      isrotated: false,
      active: false,
      name: "Bookings",
      path: "/",
      icon: "fa-brands fa-product-hunt",
      children: [
        {
          name: "View Bookings",
          path: "/",
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
          name: "View Contacts",
          path: "/Contact",
          active: false,
        }
      ],
    },
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
