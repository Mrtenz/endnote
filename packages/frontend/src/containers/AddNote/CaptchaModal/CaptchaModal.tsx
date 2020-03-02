import React, { FunctionComponent, useEffect, useState } from 'react';
import ReCaptcha from 'react-google-recaptcha';
import Modal, { ModalBody, ModalFooter } from '../../../components/Modal';
import Button from '../../../components/ui/Button';
import Text from '../../../components/ui/Text';
import { useConfig } from '../../../hooks';

interface Props {
  isVisible: boolean;

  onClose(): void;
  onComplete(token: string): void;
}

const CaptchaModal: FunctionComponent<Props> = ({ isVisible, onClose, onComplete }) => {
  const { RECAPTCHA_SITE_KEY } = useConfig();
  const [token, setToken] = useState<string | null>('');

  useEffect(() => {
    setToken(null);
  }, [isVisible]);

  const handleExpired = () => {
    setToken(null);
  };

  const handleContinue = () => {
    if (token) {
      onComplete(token);
    }
  };

  return (
    <Modal title="Almost done..." isVisible={isVisible} onClose={onClose}>
      <ModalBody>
        <Text>Please complete the captcha to continue.</Text>
        <ReCaptcha sitekey={RECAPTCHA_SITE_KEY} onChange={setToken} onExpired={handleExpired} />
      </ModalBody>
      <ModalFooter>
        <Button type="primary" disabled={!token} onClick={handleContinue}>
          Continue
        </Button>
        <Button type="secondary" onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CaptchaModal;
