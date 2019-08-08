//Libraries
import {Modal} from 'antd';

export function ERROR_MODAL(title, err_message) {
  Modal.error({
    title: title,
    content: err_message
  });
};

export function SUCCESS_MODAL(title, err_message) {
  Modal.success({
    title: title,
    content: err_message
  });
};

export function CONFIRM_MODAL(title, err_message) {
  Modal.success({
    title: title,
    content: err_message,
    onOk() {
      window.location.reload();
    },
  });
};

export function ERROR_NEW_MODAL(title, err_message) {
  Modal.error({
    title: title,
    content: err_message,
    onOk() {
      window.location.reload();
    },
  });
};

export function WARNING_MODAL(title, err_message) {
  Modal.warning({
    title: title,
    content: err_message,
  });
};

export function allowEmergingWindows() {
  Modal.warning({
    title: 'Ventanas emergentes',
    content: 'Por favor habilite las ventanas emergentes de acuerdo con su navegador',
  });
};