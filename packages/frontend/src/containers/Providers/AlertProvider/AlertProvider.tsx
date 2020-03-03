import React, { createContext, FunctionComponent, ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';
import Alert from '../../../components/Alert';

type AlertContextFunction = (title: string, content: ReactNode) => void;

export const AlertContext = createContext<AlertContextFunction | undefined>(undefined);

const AlertProvider: FunctionComponent = ({ children }) => {
  const [isVisible, setVisible] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<ReactNode>(<></>);

  const handleAlert = (newTitle: string, newContent: ReactNode) => {
    setTitle(newTitle);
    setContent(newContent);
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <>
      {createPortal(
        <Alert title={title} isVisible={isVisible} onClose={handleClose}>
          {content}
        </Alert>,
        document.getElementById('alert')!
      )}
      <AlertContext.Provider value={handleAlert}>{children}</AlertContext.Provider>
    </>
  );
};

export default AlertProvider;
