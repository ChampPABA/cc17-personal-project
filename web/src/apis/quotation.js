import axios from "../config/axios";

const quotationApi = {};

quotationApi.uploadPdf = (pdf) =>
  axios.post("/quotation/create", pdf, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

quotationApi.getAllQuotations = () => axios.get("/quotation");

quotationApi.updateStatus = (quotationId, newStatus) =>
  axios.put(`/quotation/${quotationId}/status`, { status: newStatus });

export default quotationApi;
