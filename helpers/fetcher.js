import axios from "axios";

const fetcher = (...args) => axios.get(...args);

export default fetcher;
