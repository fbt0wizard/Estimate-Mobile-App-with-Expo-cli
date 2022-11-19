import React, { useState, createContext, useContext, useEffect } from "react";
import { engine } from "../engine";

const PriceList = createContext();
const ClientData = createContext();
const CollapsibleData = createContext();
const UpdatePriceList = createContext();

export const PriceListProvider = ({ children }) => {
  const setInitialValues = async () => {
    const client = await engine.getJsonItem("clientsLists")
    const priceList = await engine.getJsonItem("priceLists")

    setClientList(client || [])
    setDefaultPrices(priceList || [])
  }
  const [defaultPrices, setDefaultPrices] = useState([]);
  const [clientLists, setClientList] = useState([]);
  const [raw, setRaw] = useState([]);

  useEffect(()=> {
    setInitialValues()
  },[])

  const updateData = (obj, target) => {
    if (target === "clients") {
      setClientList(obj);
    } else if (target === "price") {
      setDefaultPrices(obj);
    } else if (target === "reset") {
      setDefaultPrices(
        defaultPrices.map(row=> {
          row['isExpanded'] = false
          row.sub.map(data=> {
            data["selected"] = false
          })
          return row
        })
      )
    }
  };

  return (
    <PriceList.Provider value={defaultPrices}>
      <CollapsibleData.Provider value={raw}>
        <UpdatePriceList.Provider value={updateData}>
          <ClientData.Provider value={clientLists}>
            {children}
          </ClientData.Provider>
        </UpdatePriceList.Provider>
      </CollapsibleData.Provider>
    </PriceList.Provider>
  );
};

export const priceLists = () => {
  return useContext(PriceList);
};

export const collapseContext = () => {
  return useContext(CollapsibleData);
};

export const setPriceLists = () => {
  return useContext(UpdatePriceList);
};

export const clientInformation = () => {
  return useContext(ClientData);
};
