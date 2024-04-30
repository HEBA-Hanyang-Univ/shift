import { useState } from 'react';

const useModal = (initialIsOpen = false) => {
  const [isOpen, setIsOpen] = useState(initialIsOpen);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return { isOpen, openModal, closeModal };
};

export default useModal;