import React, {useEffect, useState} from 'react';
import {Menu} from "antd";
import {
    AlertOutlined,
    AppstoreAddOutlined,
    AppstoreOutlined,
    EnvironmentOutlined,
    FacebookOutlined,
    FlagOutlined,
    GoogleOutlined,
    InfoCircleOutlined,
    InstagramOutlined,
    LinkedinOutlined,
    MobileOutlined,
    ReadOutlined,
    ShareAltOutlined,
    SlidersOutlined,
    XOutlined,
    YoutubeOutlined
} from "@ant-design/icons";
import {useTranslation} from "react-i18next";

const Index = () => {
    const [selectedMenu, setSelectedMenu] = useState([]);
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
            getItem(<a href="/adminPanel/referencesCategories">{t("leftMenu.createListCategory")}</a>, 'categoriesReferences', <AppstoreAddOutlined/>),
            getItem(<a href="/adminPanel/referencesList">{t("leftMenu.createListReferences")}</a>, 'references', <FlagOutlined />,),
        ]),
        getItem(t("leftMenu.socialsNetworks"), 'socialsNetworks', <XOutlined/>, [
            getItem(<a href="/adminPanel/x">{t("ourPage.x")}</a>, 'x', <XOutlined/>),
            getItem(<a href="/adminPanel/instagram">{t("ourPage.instagram")}</a>, 'instagram', <InstagramOutlined />),
            getItem(<a href="/adminPanel/facebook">{t("ourPage.facebook")}</a>, 'facebook', <FacebookOutlined />),
            getItem(<a href="/adminPanel/linkedin">{t("ourPage.linkedin")}</a>, 'linkedin', <LinkedinOutlined />),
            getItem(<a href="/adminPanel/google">{t("ourPage.google")}</a>, 'google', <GoogleOutlined />),
            getItem(<a href="/adminPanel/youtube">{t("ourPage.youtube")}</a>, 'youtube', <YoutubeOutlined />),
        ]),
        getItem(t("leftMenu.siteDetail"), 'siteDetail', <InfoCircleOutlined/>, [
            getItem(<a href="/adminPanel/aboutUs">{t("leftMenu.aboutUs")}</a>, 'aboutUs', <ReadOutlined/>),
            getItem(<a href="/adminPanel/ourVision">{t("leftMenu.ourVision")}</a>, 'ourVision', <FlagOutlined/>),
            getItem(<a href="/adminPanel/ourMission">{t("leftMenu.ourMission")}</a>, 'ourMission', <FlagOutlined/>),
            getItem(<a href="/adminPanel/contact">{t("leftMenu.contact")}</a>, 'contact', <EnvironmentOutlined/>),
        ])
    ];

    useEffect(() => {
        if (localStorage.getItem('leftMenuKey')) {
            setSelectedMenu(localStorage.getItem('leftMenuKey').split(","));
        }
    }, []);

    const onSelectMenu = (data) => {
        localStorage.setItem('leftMenuKey', data.keyPath);
    }

    return (
        <Menu
            style={{width: "299px"}}
            selectedKeys={selectedMenu}
            onClick={onSelectMenu}
            mode={'vertical'}
            theme={"light"}
            items={items}
        />
    );
};

export default Index;