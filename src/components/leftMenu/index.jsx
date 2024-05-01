import React from 'react';
import {Menu} from "antd";
import {
    AppstoreAddOutlined,
    AppstoreOutlined,
    ClusterOutlined, CodepenOutlined,
    EnvironmentOutlined,
    FileTextOutlined,
    FlagOutlined, InfoCircleOutlined, LaptopOutlined, MailOutlined, MobileOutlined,
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
            getItem(<a href="/slider">Slider</a>, 'slider', <SlidersOutlined/>),
            getItem(<a href="/news">Haber Slider</a>, 'news', <SlidersOutlined/>)
        ]),
        getItem('Ürün Kategorisi', 'products', <ShareAltOutlined/>, [
            getItem(<a href="/categories">Kategori Oluştur</a>, 'categories', <AppstoreAddOutlined/>),
            getItem(<a href="/product">Akıllı Sistemler</a>, 'product1', <MobileOutlined/>,),
            getItem(<a href="/product">Kamera Sistemleri</a>, 'product2', <LaptopOutlined/>),
            getItem(<a href="/product">Güvenlik Sistemleri</a>, 'product3', <CodepenOutlined/>)
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
            defaultOpenKeys={['products']}
            mode={'inline'}
            theme={"light"}
            items={items}
        />
    );
};

export default Index;