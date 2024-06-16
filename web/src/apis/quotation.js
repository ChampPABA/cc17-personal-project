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
  axios.patch(`/quotation/${quotationId}/status`, { status: newStatus });

quotationApi.updateQuotation = (id, pdf) =>
  axios.patch(`/quotation/${id}`, pdf, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

quotationApi.getQuotationById = (id) => axios.get(`/quotation/${id}`);

quotationApi.hardDeleteQuotation = (id) =>
  axios.delete(`/quotation/${id}/delete`);

quotationApi.softDeleteQuotation = (id, deletedAt) =>
  axios.patch(`/quotation/${id}/delete`, { deletedAt });

quotationApi.sendEmail = (quotationId, email) =>
  axios.post(`/quotation/${quotationId}/send-email`, { email });

export default quotationApi;
