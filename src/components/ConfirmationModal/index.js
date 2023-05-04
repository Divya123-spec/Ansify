import { Modal } from "antd";

export const success = (info) => {
  Modal.success({
    content: info,
  });
};
