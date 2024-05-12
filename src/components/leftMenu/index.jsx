import React from 'react';
import {Menu} from "antd";
import {
    AppstoreAddOutlined,
    AppstoreOutlined,
    EnvironmentOutlined,
    FlagOutlined, InfoCircleOutlined, MailOutlined, MobileOutlined,
    ReadOutlined, SecurityScanOutlined,
    SettingOutlined, ShareAltOutlined,
    SlidersOutlined,
    UserOutlined, UserSwitchOutlined
} from "@ant-design/icons";

const Index = () => {
    function getItem(label, key, icon, children) {
        return {
            key,
            icon,
            children,
            label,
        };
    }

    const items = [
        getItem('Admin İşlemleri', 'adminMenu', <SecurityScanOutlined/>, [
            getItem(<a href="/userList">Kullanıcı Listesi</a>, 'userListLink', <UserOutlined/>),
            getItem(<a href="/userAdministratorPage">Kullanıcı Yetkilendirme</a>, 'userAdministratorPage',
                <UserSwitchOutlined/>),
            getItem(<a href="/mailSettings">Mail Ayarları</a>, 'mailSettings', <MailOutlined/>),
            getItem(<a href="/siteSettings">Site Ayarları</a>, 'siteSettings', <SettingOutlined/>),
        ]),
        getItem('Ana Sayfa İşlemleri', 'mainPage', <AppstoreOutlined/>, [
            getItem("Ana Sayfa", 'aboutUs', <ReadOutlined/>, [
                getItem(<a href="/mainPage">Manşet-1</a>, 'mainHeadline1', <SlidersOutlined/>),
                getItem(<a href="/mainHeadline">Manşet-2</a>, 'mainHeadline2', <SlidersOutlined/>),
                getItem(<a href="/breakHeadline">Manşet-3</a>, 'mainHeadline3', <SlidersOutlined/>),
                getItem(<a href="/lastHeadline">Manşet-4</a>, 'mainHeadline4', <SlidersOutlined/>),
            ]),
            getItem(<a href="/slider">Slider</a>, 'slider', <SlidersOutlined/>),
            getItem(<a href="/news">Haber Slider</a>, 'news', <SlidersOutlined/>)
        ]),
        getItem('Ürün Kategorisi', 'products', <ShareAltOutlined/>, [
            getItem(<a href="/categories">Kategori Oluştur / Listele</a>, 'categories', <AppstoreAddOutlined/>),
            getItem(<a href="/product">Ürün Oluştur / Listele</a>, 'product', <MobileOutlined/>,),
            // getItem(<a href="/productNews">Ürünlerin Sayfa Bazında <br/> Haber Sayfası</a>, 'product', <MobileOutlined/>)
        ]),
        getItem('Site Detay', 'about', <InfoCircleOutlined/>, [
            getItem(<a href="/aboutUs">Hakkımızda</a>, 'aboutUs', <ReadOutlined/>),
            getItem(<a href="/ourVision">Vizyonumuz</a>, 'ourVision', <FlagOutlined/>),
            getItem(<a href="/ourMission">Misyonumuz</a>, 'ourMission', <FlagOutlined/>),
            getItem(<a href="/contact">İletişim</a>, 'contact', <EnvironmentOutlined/>),
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