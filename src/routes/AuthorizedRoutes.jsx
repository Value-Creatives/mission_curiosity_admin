import { useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import { axiosApiInstance } from "../App";
import "../assets/scss/main.css";
import Profile from "../components/Admin/Profile";
import AddBlog from "../components/Blog/AddBlog";
import Blog from "../components/Blog/Blog";
import BlogCategory from "../components/Blog/BlogCategory";
import ShowBlog from "../components/Blog/ShowBlog";
import CompanyInfo from "../components/CompanyInfo/CompanyInfo";
import ContactMail from "../components/ContactMail/ContactMail";
import ShowContact from "../components/ContactMail/ShowContact";
import AddCustomer from "../components/Customer/AddCustomer";
import Customer from "../components/Customer/Customer";
import CustomerDetail from "../components/Customer/CustomerDetail";
import Dashboard from "../components/dashboard/Dashboard";
import AddBanner from "../components/Frontend-CMS/Banners/AddBanner";
import Banners from "../components/Frontend-CMS/Banners/Banners";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import AddMenu from "../components/Menus/AddMenu";
import EditMenu from "../components/Menus/EditMenu";
import MenuItem from "../components/Menus/MenuItem";
import Menus from "../components/Menus/Menus";
import CancleReason from "../components/Order/CancleReason/CancleReason";
import DeliveryProcess from "../components/Order/DeliveryProcess/DeliveryProcess";
import SaleDetail from "../components/Order/Detail/SaleDetail";
import InHouse from "../components/Order/InhouseOrder/Inhouse";
import TotalOrder from "../components/Order/TotalOrder/TotalOrder";
import TrackOrder from "../components/Order/TrackOrder/TrackOrder";
import PaymentGateway from "../components/PaymentGateway/PaymentGateway";

import AddProduct from "../components/Products/AddProduct/AddProduct";
import TermCondition from "../components/Policy/AddTermCondition";
import PrivacyPolicy from "../components/Policy/AddPrivacyPolicy";
import AboutUs from "../components/AboutUs/AboutUs";
import Venue from "../components/Venue/Venue";

import Speaker from "../components/Speaker/speaker";
import AddSpeaker from "../components/Speaker/AddSpeaker";

import AddClients from "../components/Clients/AddClients";
import Clients from "../components/Clients/Clients";

import AddFaq from "../components/FAQ/AddFaq";
import Faq from "../components/FAQ/Faq";

import AddTestimonial from "../components/Testimonial/AddTestimonial";
import ViewTestimonial from "../components/Testimonial/ViewTestimonial";

import Booknow from "../components/Booknow/Booknow";
import ViewBookNow from "../components/Booknow/ViewBooknow";

import Contact from "../components/Contact/Contact";
import ViewContact from "../components/Contact/ViewContact";

import RequestCall from "../components/RequestCall/RequestCall";
import ViewRequest from "../components/RequestCall/ViewRequest";

import AddItenary from "../components/Itenary/AddItenary/AddItenary";
import ItenaryList from "../components/Itenary/ItenaryList";

import Attribute from "../components/Products/Attribute/Attribute";
import AttributeValue from "../components/Products/Attribute/AttributeValue";
import AddBrand from "../components/Products/Brand/AddBrand";
import Brand from "../components/Products/Brand/Brand";
import BulkBrandUpload from "../components/Products/Brand/BulkBrandUpload";
import BulkProductUpload from "../components/Products/BulkProductUpload";
import BulkCategoryUpload from "../components/Products/Category/BulkCategoryUpload";
import Category from "../components/Products/Category/Category";
import Config from "../components/Products/Config";
import ProductList from "../components/Products/ProductList";
import ProductReview from "../components/Review/ProductReview";
import ReviewConfig from "../components/Review/ReviewConfig";
import AddCurrency from "../components/SetUp/CurrencyList/AddCurrency";
import CurrencyList from "../components/SetUp/CurrencyList/CurrencyList";
import Location from "../components/SetUp/Location/Location";
import Tags from "../components/SetUp/Tags/Tags";
import SideBar from "../components/Sidebar/SideBar";
import { useSelector } from "react-redux"
import { logoutUser } from "../redux/actions/auth/auth.actions";
import AddCustomerCategory from "../components/Customer/AddCustomerCategory/AddCustomerCategory";
import ViewCustomerCategory from "../components/Customer/AddCustomerCategory/ViewCustomerCategory";
import ProductCategory from "../components/Products/ProductCategory/ProductCategory";
import AddProductCategory from "../components/Products/ProductCategory/AddProductCategory";
import UserOrder from "../components/UserOrders/UserOrder";
import CreateUserOrder from "../components/UserOrders/CreateUserOrder";
import SingleChat from "../components/Chats/SingleChat/SingleChat";
import AllChats from "../components/Chats/AllChats/AllChats";
import ViewDiscounts from "../components/Discounts/ViewDiscounts";
import ProductsSale from "../components/Reports/ProductsSale";
import CouponSale from "../components/Reports/CouponSale";
import UserRegisteredToday from "../components/Reports/UserRegisteredToday";
import ProductOrdersBySpecificCustomers from "../components/Reports/ProductOrdersBySpecificCustomers";
import ProductSearches from "../components/Reports/ProductSearches";
import Emailconfig from "../components/EmailConfig/Emailconfig";
export default function AuthorizedRoutes() {
  let token = useSelector((state) => state.auth.token)

  useMemo(() => {
    axiosApiInstance.interceptors.request.use(
      async (config) => {
        // console.log(token)
        if (token) {
          config.headers['authorization'] = 'Bearer ' + token;
        }
        // config.headers['Content-Type'] = 'application/json';
        return config;
      },
      error => {
        // console.log(error)
        Promise.reject(error)
      });
    axiosApiInstance.interceptors.response.use(
      (res) => {
        // Add configurations here
        return res;
      },
      async (err) => {
        console.log("INterceptor error")
        await logoutUser()
        return Promise.reject(err);
      }
    );
  }, [token])

  return (
    <section style={{ backgroundColor: "#ebebeb" }}>
      <div className="row g-0">
        <div className="col-12 col-md-2" style={{ contain: "content" }}>
          <SideBar />
        </div>
        <div className="col-12 col-md-10" style={{ height: "100vh", overflow: "hidden scroll" }}>
          <Header />
          <Routes>
            <Route exact path="/" element={<Dashboard />}></Route>
            <Route exact path="/Discounts/View" element={<ViewDiscounts />}></Route>
            {/* <Route exact path="/Chats/AllChats" element={<AllChats />}></Route> */}
            {/* <Route exact path="/Chats/Single-Chat/:id" element={<SingleChat />}></Route> */}
            {/* <Route exact path="/User-Order/Create" element={<CreateUserOrder />}></Route> */}
            {/* <Route exact path="/User-Order/Create" element={<CreateUserOrder />}></Route> */}
            {/* <Route exact path="/User-Order/View-All" element={<UserOrder />}></Route> */}
            {/* <Route exact path="/Product/Category" element={<Category />}></Route> */}
            {/* <Route exact path="/Product/ProductCategory" element={<ProductCategory />}></Route> */}
            {/* <Route exact path="/Product/AddProductCategory" element={<AddProductCategory />}></Route> */}
            {/* <Route exact path="/Product/Brand" element={<Brand />}></Route> */}
            {/* <Route exact path="/Product/Brand-Create" element={<AddBrand />}></Route> */}
            {/* <Route exact path="/Product/Attribute" element={<Attribute />}></Route> */}
            {/* <Route exact path="/Product/Attribute-Value" element={<AttributeValue />}></Route> */}



            <Route exact path="/Product/AddProduct" element={<AddProduct />}></Route>
            <Route exact path="/Product/Bulk-Product-Upload" element={<BulkProductUpload />}></Route>
            <Route exact path="/term-condition" element={<TermCondition />}></Route>
            <Route exact path="/privacy-policy" element={<PrivacyPolicy />}></Route>
            <Route exact path="/About-us" element={<AboutUs />}></Route>
            <Route exact path="/Venue" element={<Venue />}></Route>

            <Route exact path="/Speaker" element={<Speaker />}></Route>
            <Route exact path="/Speaker-Create" element={<AddSpeaker />}></Route>

            <Route exact path="/Clients" element={<Clients />}></Route>
            <Route exact path="/Clients/Client-Create" element={<AddClients />}></Route>

            <Route exact path="/Faq" element={<Faq />}></Route>
            <Route exact path="/Faq/Faq-Create" element={<AddFaq />}></Route>

            <Route exact path="/Testimonial" element={<ViewTestimonial />}></Route>
            <Route exact path="/Testimonial/Create" element={<AddTestimonial />}></Route>

            <Route exact path="/Booknow" element={<Booknow />}></Route>
            <Route exact path="/Booknow/ViewBooknow" element={<ViewBookNow />}></Route>

            <Route exact path="/Contact" element={<Contact />}></Route>
            <Route exact path="/Contact/ViewContact" element={<ViewContact />}></Route>

            <Route exact path="/Request-Call" element={<RequestCall />}></Route>
            <Route exact path="/RequestCall/ViewRequest" element={<ViewRequest />}></Route>

            <Route exact path="/Itenary/AddItenary" element={<AddItenary />}></Route>
            <Route exact path="/Itenary/Itenary-List" element={<ItenaryList />}></Route>

            {/* <Route exact path="/Product/Bulk-Category-Upload" element={<BulkCategoryUpload />}></Route> */}
            {/* <Route exact path="/Product/Bulk-Brand-Upload" element={<BulkBrandUpload />}></Route> */}
            <Route exact path="/Product/Product-List" element={<ProductList />}></Route>
            <Route exact path="/Product/Config" element={<Config />}></Route>
            <Route exact path="/Admin/Profile" element={<Profile />}></Route>
            <Route exact path="/Blog/post" element={<Blog />}></Route>
            <Route exact path="/Blog/post/create" element={<AddBlog />}></Route>
            <Route exact path="/Blog/Category" element={<BlogCategory />}></Route>
            <Route exact path="/Blog/View-Post" element={<ShowBlog />}></Route>
            {/* <Route exact path="/Order/Total-Order" element={<TotalOrder />}></Route> */}
            {/* <Route exact path="/Order/Inhouse-Order" element={<InHouse />}></Route> */}
            {/* <Route exact path="/Order/Delivery-Process" element={<DeliveryProcess />}></Route> */}
            {/* <Route exact path="/Order/Cancle-Reason" element={<CancleReason />}></Route> */}
            {/* <Route exact path="/Order/Track-Order" element={<TrackOrder />}></Route> */}
            {/* <Route exact path="/Order/Sale-Detail" element={<SaleDetail />}></Route> */}
            {/* <Route exact path="/Contact-Mail" element={<ContactMail />}></Route> */}
            {/* <Route exact path="/Contact-Info" element={<ShowContact />}></Route> */}
            {/* <Route exact path="/Review/Product-Review" element={<ProductReview />}></Route> */}
            {/* <Route exact path="/Review/Review-Configuration" element={<ReviewConfig />}></Route> */}
            {/* <Route exact path="/Company-Information" element={<CompanyInfo />}></Route> */}
            <Route exact path="/Menus" element={<Menus />}></Route>
            <Route exact path="/Menus/Menus-Create" element={<AddMenu />}></Route>
            <Route exact path="/Menus/Menus-Edit" element={<EditMenu />}></Route>
            <Route exact path="/Menus/Menus-Item" element={<MenuItem />}></Route>
            {/* <Route exact path="/Payment-Gateway" element={<PaymentGateway />}></Route> */}
            {/* <Route exact path="/Add-Customer-Category" element={<AddCustomerCategory />}></Route> */}
            {/* <Route exact path="/Customer-Category" element={<ViewCustomerCategory />}></Route> */}
            {/* <Route exact path="/Customer-list" element={<Customer />}></Route> */}
            {/* <Route exact path="/Customer-Create" element={<AddCustomer />}></Route> */}
            {/* <Route exact path="/Customer-Detail" element={<CustomerDetail />}></Route> */}
            <Route exact path="/Banners" element={<Banners />}></Route>
            <Route exact path="/Banners/Banner-Create" element={<AddBanner />}></Route>

            {/* <Route exact path="/SetUp/Currency-List" element={<CurrencyList />}></Route> */}
            {/* <Route exact path="/SetUp/Currency-Create" element={<AddCurrency />}></Route> */}
            {/* <Route exact path="/SetUp/Location" element={<Location />}></Route> */}
            <Route exact path="/SetUp/Tags" element={<Tags />}></Route>
            {/* <Route exact path="/Report/Product-Sale" element={<ProductsSale />}></Route> */}
            {/* <Route exact path="/Report/Coupon-Sale" element={<CouponSale />}></Route> */}
            {/* <Route exact path="/Report/New-Customers" element={<UserRegisteredToday />}></Route> */}
            {/* <Route exact path="/Report/Customers-Orders" element={<ProductOrdersBySpecificCustomers />}></Route> */}
            {/* <Route exact path="/Report/Prouduct-Searches" element={<ProductSearches />}></Route> */}
            {/* <Route exact path="/EmailConfig" element={<Emailconfig />}></Route> */}
          </Routes>
          <Footer />
        </div>
      </div>
    </section>
  );
}
