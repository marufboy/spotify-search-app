import { Modal } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";

interface IModal {
  title: string;
  isOpen: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
  children: JSX.Element;
}

export const ModalBase = ({ title, isOpen, setModal, children }: IModal) => (
  <Modal
    centered
    title={title}
    opened={isOpen}
    onClose={() => setModal(false)}
  >
    {children}
  </Modal>
);
