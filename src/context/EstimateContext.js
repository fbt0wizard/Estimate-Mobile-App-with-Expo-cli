import React, { useState, createContext, useContext } from "react";

const Estimate = createContext();
const UpdateEstimate = createContext();
const Estimations = createContext();

export const EstimateProvider = ({ children }) => {
  const [data, setData] = useState({});
  const [estimations, setEstimations] = useState([]);

  const updateData = (obj, action) => {
    if(obj['client_uuid']) {
        setData(obj);
        setEstimations([])
    }else if (action === "edit") {
      setEstimations(obj)
    }else if(action === "reset") {
      setEstimations([])
    }else if(action === "unselect") {
      setEstimations(estimations.filter(row=> row.item_uuid !== obj))
    }else {
      if(!action) {
        setEstimations(estimations.filter(row=> row.item_uuid !== obj.item_uuid))
      }else {
        const temp = estimations
        const check = temp.filter(row=> row.item_uuid !== obj.item_uuid)
        check.push(obj)
        setEstimations(check)
      }
    }
  };

  return (
    <Estimate.Provider value={data}>
      <UpdateEstimate.Provider value={updateData}>
        <Estimations.Provider value={estimations}>
            {children}
        </Estimations.Provider>
      </UpdateEstimate.Provider>
    </Estimate.Provider>
  );
};

export const estimateContext = () => {
  return useContext(Estimate);
};

export const updateEstimateContext = () => {
  return useContext(UpdateEstimate);
};


export const estimationContext = () => {
    return useContext(Estimations);
};

