import { combineReducers } from "redux";

import { authReducer } from "./auth/auth.reducer";
import { BrandReducer } from "./Brand/Brand.reducer";
import { BannerReducer } from "./Banner/Branner.reducer";
import { userReducer } from "./Users/users.reducer";
import { AttributeReducer } from "./Attribute/Attribute.reducer";
import { CategoryReducer } from "./Category/Category.reducer";
import { ProductReducer } from "./Product/Product.reducer";
import { CustomerCategoryReducer } from "./CustomerCategory/CustomerCategory.reducer";
import { ProductCategoryReducer } from "./ProductCategory/ProductCategory.reducer";
import { userPiReducer } from "./UserPi/usersPi.reducer";
import { ClientReducer } from "./Client/Client.reducer";
import { faqReducer } from "./Faq/Faq.reducer";
import { PrivacyReducer } from "./Privacy/Privacy.reducer";
import { ConditionReducer } from "./Condition/termCondition.reducer";
import { testimonialReducer } from "./Testimonial/Testimonial.reducer";
import { ItenaryReducer } from "./Itenary/Itenary.reducer";

const RootReducer = combineReducers({
  auth: authReducer,
  brand: BrandReducer,
  banner: BannerReducer,
  users: userReducer,
  userPi: userPiReducer,
  attribute: AttributeReducer,
  category: CategoryReducer,
  productCategory: ProductCategoryReducer,
  product: ProductReducer,
  customerCategory: CustomerCategoryReducer,
  privacy: PrivacyReducer,
  condition: ConditionReducer,
  faq: faqReducer,
  client: ClientReducer,
  testimonial:testimonialReducer,
  itenary:ItenaryReducer,
});

export default RootReducer;
