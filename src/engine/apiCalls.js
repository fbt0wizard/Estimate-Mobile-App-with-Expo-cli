import axios from "axios";
import { engine } from ".";

export const communicate = async (method, endpoint, body) => {
  // const url = "http://budgetapp.entkreis.com/api/";
  const url = "http://192.168.8.102:8000/api/";
  const header = await engine.setHeaders();

  try {
    const res = await axios({
      method: method,
      url: url + endpoint,
      headers: header,
      data: body,
    });
    return res;
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Server nicht erreichbar" };
  }
};
