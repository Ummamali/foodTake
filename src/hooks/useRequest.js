import { useEffect, useState } from "react";

// the URL is form local dev server, you may change this...
const configs = {
  URL: "http://127.0.0.1:5000",
};

async function sendRequest(data) {
  let response;
  if (data.type === "GET") {
    data.params = data.params === undefined ? "" : data.params;
    response = await fetch(configs.URL + data.route + "?" + data.params);
  } else if (data.type === "POST") {
    const init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data.body),
    };
    response = await fetch(configs.URL + data.route, init);
  }
  if (response.ok) {
    const resObj = await response.json();
    return resObj;
  } else {
    throw new Error("Response is not ok");
  }
}

/*
Status:
    0 ----> not sent
    1 -----> request sent, waiting for reply
    2 ----> response received successfully
    3 ----> response is ok but resObj is bad
    4 ----> request failed
*/

const initialReqData = {
  status: 0,
  resObj: null,
};

export default function useRequest(type) {
  const [reqData, setReqData] = useState(initialReqData);

  function sendReq(data) {
    setReqData({ status: 1, resObj: null });
    data.type = type;
    sendRequest(data)
      .then((resObj) => {
        let statusCode;
        if (resObj.status === 200) {
          statusCode = 2;
        } else {
          statusCode = 3;
        }
        setReqData({ status: statusCode, resObj: resObj });
      })
      .catch((error) => {
        setReqData({ status: 4, resObj: error });
      });
  }

  return [reqData, sendReq];
}
