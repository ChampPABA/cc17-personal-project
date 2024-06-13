import axios from "../config/axios";

const quotationApi = {};

quotationApi.uploadPdf = (pdf) =>
  axios.post("/quotation/create", pdf, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export default quotationApi;
