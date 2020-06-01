import {
  CUSTOMER_DETAILS,
  GET_MENU,
  COMBO_PRODUCT,
  CUSTOMIZABLE_PRODUCT,
  INVENTORY_PRODUCT,
  SIMPLE_PRODUCT,
  ORDER,
  ORDERS,
  SIMPLE_RECIPE,
} from './queries';

import { CREATE_CUSTOMER, UPDATE_CART, CREATE_CART } from './mutations';

import {
  CUSTOMER,
  SAFETY_CHECK,
  CART_BY_PK,
  STORE_SETTINGS,
} from './subscriptions';

export {
  CUSTOMER,
  CUSTOMER_DETAILS,
  GET_MENU,
  COMBO_PRODUCT,
  CUSTOMIZABLE_PRODUCT,
  INVENTORY_PRODUCT,
  SIMPLE_PRODUCT,
  CREATE_CUSTOMER,
  CREATE_CART,
  UPDATE_CART,
  SAFETY_CHECK,
  CART_BY_PK,
  ORDER,
  ORDERS,
  SIMPLE_RECIPE,
  STORE_SETTINGS,
};
