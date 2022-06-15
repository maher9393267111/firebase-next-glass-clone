import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";

const diffContext = createContext();

export const diffcontext = () => {
  return useContext(diffContext);
};

const allContext = ({ children }) => {
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);

  
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };






  const value = {
    show,
    setShow,
    visible, setVisible
    , showDrawer, onClose
  };
  return <diffContext.Provider {...{ value }}>{children}</diffContext.Provider>;
};

export default allContext;
