import React from 'react';
import {Menu} from "antd";
import {
    AppstoreOutlined,
    BranchesOutlined,
    ClusterOutlined, CodepenOutlined,
    EnvironmentOutlined,
    FileTextOutlined,
    FlagOutlined, LaptopOutlined, MobileOutlined,
    ReadOutlined,
    SettingOutlined, ShareAltOutlined,
    SlidersOutlined,
    UserOutlined
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
        getItem('Admin İşlemleri', 'admnMenu1', <BranchesOutlined/>, [
            getItem(
                <a href="/userList">
                    Kullanıcı Listesi
                </a>,
                'userListLink',
                <UserOutlined/>,
            )
        ]),
        getItem('Ana Sayfa İşlemleri', 'mainPage', <AppstoreOutlined/>, [
            getItem('Slider', 'slider', <SlidersOutlined/>),
            getItem('Haber Slider', 'news', <SlidersOutlined/>),
            getItem('İçerikler', 'content', <ClusterOutlined/>, [
                getItem('İçerik - 1', 'content-1', <FileTextOutlined/>),
                getItem('İçerik - 2', 'content-2', <FileTextOutlined/>),
                getItem('İçerik - 3', 'content-3', <FileTextOutlined/>),
                getItem('İçerik - 4', 'content-4', <FileTextOutlined/>),
            ]),
        ]),
        getItem('Ürün Kategorisi', 'products', <ShareAltOutlined/>, [
            getItem('Akıllı Sistemler', 'product-1', <MobileOutlined/>),
            getItem('Kamera Sistemleri', 'product-2', <LaptopOutlined/>),
            getItem('Güvenlik Sistemleri', 'product-3', <CodepenOutlined/>)
        ]),
        getItem('Sayfa Detay', 'about', <SettingOutlined/>, [
            getItem('Hakkımızda', 'about-us', <ReadOutlined/>),
            getItem('Vizyonumuz', 'our-vision', <FlagOutlined/>),
            getItem('Misyonumuz', 'our-Mission', <FlagOutlined/>),
            getItem('İletişim', 'contact', <EnvironmentOutlined/>),
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