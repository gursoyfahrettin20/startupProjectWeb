import React from 'react';
import {Menu} from "antd";
import {
    AlertOutlined,
    AppstoreAddOutlined,
    AppstoreOutlined,
    EnvironmentOutlined,
    FlagOutlined,
    InfoCircleOutlined,
    MobileOutlined,
    ReadOutlined,
    ShareAltOutlined,
    SlidersOutlined, XOutlined
} from "@ant-design/icons";
import {useTranslation} from "react-i18next";

const Index = () => {
    const {t} = useTranslation();
    function getItem(label, key, icon, children) {
        return {
            key,
            icon,
            children,
            label,
        };
    }

    const items = [
     /*   getItem('Admin İşlemleri', 'adminMenu', <SecurityScanOutlined/>, [
            getItem(<a href="/adminPanel/userList">Kullanıcı Listesi</a>, 'userListLink', <UserOutlined/>),
            getItem(<a href="/adminPanel/userAdministratorPage">Kullanıcı Yetkilendirme</a>, 'userAdministratorPage',
                <UserSwitchOutlined/>),
            getItem(<a href="/adminPanel/mailSettings">Mail Ayarları</a>, 'mailSettings', <MailOutlined/>),
            getItem(<a href="/adminPanel/siteSettings">Site Ayarları</a>, 'siteSettings', <SettingOutlined/>),
        ]),*/
        getItem(t("leftMenu.homePageTransactions"), 'mainPageAndSliderAndNews', <AppstoreOutlined/>, [
            getItem(t("leftMenu.homePage"), 'mainPages', <ReadOutlined/>, [
                getItem(<a href="/adminPanel/mainPage">{t("leftMenu.headline") + "- 1"}</a>, 'mainHeadline1', <SlidersOutlined/>),
                getItem(<a href="/adminPanel/mainHeadline">{t("leftMenu.headline") + "- 2"}</a>, 'mainHeadline2', <SlidersOutlined/>),
                getItem(<a href="/adminPanel/breakHeadline">{t("leftMenu.headline") + "- 3"}</a>, 'mainHeadline3', <SlidersOutlined/>),
                getItem(<a href="/adminPanel/lastHeadline">{t("leftMenu.headline") + "- 4"}</a>, 'mainHeadline4', <SlidersOutlined/>),
            ]),
            getItem(<a href="/adminPanel/slider">{t("leftMenu.slider")}</a>, 'slider', <SlidersOutlined/>),
            getItem(<a href="/adminPanel/news">{t("leftMenu.newsSlider")}</a>, 'news', <SlidersOutlined/>)
        ]),
        getItem(t("leftMenu.productCategory"), 'categoryAndProduct', <ShareAltOutlined/>, [
            getItem(<a href="/adminPanel/categories">{t("leftMenu.createListCategory")}</a>, 'categories', <AppstoreAddOutlined/>),
            getItem(<a href="/adminPanel/product">{t("leftMenu.createListProduct")}</a>, 'product', <MobileOutlined/>,),
        ]),
        getItem(t("leftMenu.referenceCategory"), 'categoryAndReferences', <AlertOutlined />, [
            getItem(<a href="/adminPanel">{t("leftMenu.createListCategory")}</a>, 'categories', <AppstoreAddOutlined/>),
            getItem(<a href="/adminPanel">{t("leftMenu.createListReferences")}</a>, 'references', <FlagOutlined />,),
        ]),
        getItem(<a href="/adminPanel">{t("leftMenu.socialsNetworks")}</a>, 'socialsNetworks', <XOutlined />),
        getItem(t("leftMenu.siteDetail"), 'siteDetail', <InfoCircleOutlined/>, [
            getItem(<a href="/adminPanel/aboutUs">{t("leftMenu.aboutUs")}</a>, 'aboutUs', <ReadOutlined/>),
            getItem(<a href="/adminPanel/ourVision">{t("leftMenu.ourVision")}</a>, 'ourVision', <FlagOutlined/>),
            getItem(<a href="/adminPanel/ourMission">{t("leftMenu.ourMission")}</a>, 'ourMission', <FlagOutlined/>),
            getItem(<a href="/adminPanel/contact">{t("leftMenu.contact")}</a>, 'contact', <EnvironmentOutlined/>),
        ])
    ];
    return (
        <Menu
            style={{width: "299px"}}
            defaultOpenKeys={['mainPage']}
            mode={'inline'}
            theme={"light"}
            items={items}
        />
    );
};

export default Index;