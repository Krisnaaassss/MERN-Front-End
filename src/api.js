import axios from "axios";

const costumApi = axios.create({
  baseURL: "/api/v1",
});

export default costumApi;
