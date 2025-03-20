import { notification } from 'antd';

export const toast = {
  success: (messageText: string, description?: string) => {
    notification.success({
      message: messageText,
      description: description,
      pauseOnHover: true,
      showProgress: true,
    });
  },
  error: (messageText: string, description?: string) => {
    notification.error({
      message: messageText,
      description: description,
      pauseOnHover: true,
      showProgress: true,
    });
  },
  info: (messageText: string, description?: string) => {
    notification.info({
      message: messageText,
      description: description,
      pauseOnHover: true,
      showProgress: true,
    });
  },
  warning: (messageText: string, description?: string) => {
    notification.warning({
      message: messageText,
      description: description,
      pauseOnHover: true,
      showProgress: true,
    });
  },
};
