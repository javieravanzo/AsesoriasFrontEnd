import {Modal} from 'antd';

/*--------------- Login ---------------*/
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGGING = "LOGGING";
export const RESET_ALL = "RESET_ALL";
export const LOGOUT = 'LOGOUT';
export const SET_ROLE = 'SET_ROLE';


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

export function allowEmergingWindows() {
  Modal.warning({
    title: 'Ventanas emergentes',
    content: 'Por favor habilite las ventanas emergentes de acuerdo con su navegador',
  });
};