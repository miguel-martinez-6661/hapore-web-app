import { createContext, useState } from "react";
import { Alert, AlertType } from "./alert";

interface AlertProviderProps {
  children: React.ReactNode;
}

interface AlertContextValue {
  show?: (type: AlertType, msg: string) => void;
}

const INITIAL_STATE = {
  visible: false,
  type: AlertType.info,
  msg: "Info",
};

export const AlertContext = createContext<AlertContextValue>({});

export const AlertProvider = ({ children }: AlertProviderProps) => {
  const [visible, setVisible] = useState(INITIAL_STATE.visible);
  const [type, setType] = useState<AlertType>(INITIAL_STATE.type);
  const [msg, setMsg] = useState(INITIAL_STATE.msg);

  const show = (type: AlertType, msg: string) => {
    setType(type);
    setMsg(msg);
    setVisible(true);
    setTimeout(() => {
      setVisible(INITIAL_STATE.visible);
    }, 3000);
  };
  return (
    <AlertContext.Provider value={{ show }}>
      {children}
      <Alert visible={visible} type={type} msg={msg} />
    </AlertContext.Provider>
  );
};
