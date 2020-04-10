/* ----------------- Account ---------------- */
export const loginTypes = {
  LOGGING: 'LOGGING',
  LOGOUT: 'LOGOUT',
  RESET_PASSWORD: 'RESET_PASSWORD',
  CONFIRM_PASSWORD: 'CONFIRM_PASSWORD'
};

/* --------------- Customer -------------- */
export const customerTypes = {
  GET_DOCUMENTS_TYPE: "GET_DOCUMENTS_TYPE",
  REGISTER: "REGISTER",
  GET_COMPANIES: "GET_COMPANIES",
  NEW_REGISTER: "NEW_REGISTER",
  GET_HOME_DATA: "GET_HOME_DATA",
  GET_REQUEST_DATA: "GET_REQUEST_DATA",
  GET_OUTLAY_DATA: "GET_OUTLAY_DATA",
  GET_OUTLAY_DATESLIST: "GET_OUTLAY_DATESLIST",
  GENERATE_DOCUMENTS: "GENERATE_DOCUMENTS",
  CREATE_REQUEST: "CREATE_REQUEST",
  GET_TRANSACTIONS_LIST: "GET_TRANSACTIONS_LIST",
  GET_REQUEST_LIST: "GET_REQUEST_LIST",
  GET_OUTLAYED_REQUEST_LIST: "GET_OUTLAYED_REQUEST_LIST",
  RESET_VALUES: "RESET_VALUES",
};

/* ----------------- Company ------------------- */
export const companyTypes = {
  GET_REQUEST_LIST: "GET_REQUEST_LIST",
};

/* ----------------- Admin ------------------- */
export const adminTypes = {
  GET_ALL_CUSTOMERS: "GET_ALL_CUSTOMERS",
  GET_CUSTOMERS_TO_APPROVE: "GET_CUSTOMERS_TO_APPROVE",
  GET_DATELIST_TO_CUSTOMER: "GET_DATELIST_TO_CUSTOMER",
  APPROVE_CUSTOMERS: "APPROVE_CUSTOMERS",
  GET_ALL_COMPANIES: "GET_ALL_COMPANIES",
  GET_COMPANY_WITH_SALARY: "GET_COMPANY_WITH_SALARY",
  REGISTER_ADMIN: "REGISTER_ADMIN",
  CREATE_COMPANY: "CREATE_COMPANY",
  UPDATE_COMPANY: "UPDATE_COMPANY",
  CREATE_CUSTOMER: "CREATE_CUSTOMER",
  ACTIVATE_CUSTOMER: "ACTIVATE_CUSTOMER",
  ACTIVATE_COMPANY: "ACTIVATE_COMPANY",
  UPDATE_CUSTOMER: "UPDATE_CUSTOMER",
  CREATE_MULTIPLE_CUSTOMER: "CREATE_MULTIPLE_CUSTOMER",
  GET_REQUEST_LIST: "GET_REQUEST_LIST",
  GET_REQUEST_TO_APPROVE: "GET_REQUEST_TO_APPROVE",
  GET_REQUEST_TO_OUTLAY: "GET_REQUEST_TO_OUTLAY",
  RESET_VALUES: "RESET_VALUES"
};

/* ---------------- General --------------------- */
export const generalTypes = {
  APPROVE_REJECT_REQUEST: "APPROVE_REJECT_REQUEST",
  GET_CUSTOMER_LIST: "GET_CUSTOMER_LIST",
  GET_CUSTOMER_REPORT: "GET_CUSTOMER_REPORT",
  GET_COMPANY_REPORT: "GET_COMPANY_REPORT",
};

export const integrationTypes = {
  INTEGRATION_REGISTER: "INTEGRATION_REGISTER",
};

