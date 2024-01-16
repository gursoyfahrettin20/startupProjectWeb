import { notification } from 'antd';


export const openNotification = (message, description, type, placement) => {
    const [api] = notification.useNotification();

    api[type]({
        message: message,
        description: description,
        placement: placement ? placement : 'topRight'
    });
};

/* 
        type tipleri        : 'success', 'info', 'warning', 'error'
        placement tipleri   : 'topLeft', 'topRight', 'bottomLeft', 'bottomRight'

 */