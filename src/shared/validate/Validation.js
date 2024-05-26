export const VALIDATION = {
    CONTACT: {
        branchName: new RegExp('(^(.{1,100})$)'),
        address: new RegExp('(^(.{10,255})$)'),
        mobilNumber: new RegExp('(^([\\+0-9]{13})$)'),
        branchNumber: new RegExp('(^([\\+0-9]{13})$)'),
        mail: new RegExp('(^(("[\\w-\\s]+")|([\\w-]+(?:\\.[\\w-]+)*)|("[\\w-\\s]+")([\\w-]+(?:\\.[\\w-]+)*))(@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([a-z]{2,6}(?:\\.[a-z]{2})?)$)|(@\\[?((25[0-5]\\.|2[0-4][0-9]\\.|1[0-9]{2}\\.|[0-9]{1,2}\\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\\]?$))'),
        maps: new RegExp('(^((.)*){0,400}$)'),
    },
    PRODUCT_CATEGORY: {
        productName: new RegExp('(^(.{1,150})$)'),
        categoryName: new RegExp('(^(.{1,100})$)'),
    },
    SLIDER: {
        sliderName: new RegExp('(^(.{1,150})$)'),
    },
    NEWS: {
        newsName: new RegExp('(^(.{1,150})$)'),
    }


}