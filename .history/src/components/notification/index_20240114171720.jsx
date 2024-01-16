export const openNotification = (api, message, description, type, placement) => {
    [api][type]({
        message: message,
        description: description,
        placement: placement ? placement : 'topRight'
    });
};

/* 
        type tipleri        : 'success', 'info', 'warning', 'error'
        placement tipleri   : 'topLeft', 'topRight', 'bottomLeft', 'bottomRight'

 */