import React from "react";
import {useTranslation} from "react-i18next";
import {Col, Divider, Row} from "antd";
import './index.scss'
import {
    AppstoreAddOutlined,
    EnvironmentOutlined,
    FacebookOutlined,
    FlagOutlined,
    GoogleOutlined,
    InstagramOutlined,
    LinkedinOutlined,
    MobileOutlined,
    ReadOutlined,
    SlidersOutlined,
    YoutubeOutlined
} from "@ant-design/icons";

function index() {
    const {t} = useTranslation();
    return (
        <div className={"card"}>
            <div className={"card-header text-center fs-4"}>{t("shortcuts")}</div>
            <div className={"card-body dashBoard"}>
                <Row gutter={16} justify="space-around" align="middle" title={t("leftMenu.homePageTransactions")}>
                    <Divider orientation="left">{t("leftMenu.homePageTransactions")}</Divider>
                    <Col span={4} className={"colStyle gutter-row"}>
                        <a className={"box"} href="/adminPanel/mainPage">
                            <SlidersOutlined/>
                            <br/>
                            {t("leftMenu.headline") + "- 1"}
                        </a>
                    </Col>
                    <Col span={4} className={"colStyle gutter-row"}>
                        <a className={"box"} href="/adminPanel/mainHeadline">
                            <SlidersOutlined/>
                            <br/>
                            {t("leftMenu.headline") + "- 2"}
                        </a></Col>
                    <Col span={4} className={"colStyle gutter-row"}>
                        <a className={"box"} href="/adminPanel/breakHeadline">
                        <SlidersOutlined/>
                        <br/>
                        {t("leftMenu.headline") + "- 3"}
                    </a></Col>
                    <Col span={4} className={"colStyle gutter-row"}>
                        <a className={"box"} href="/adminPanel/lastHeadline">
                            <SlidersOutlined/>
                            <br/>
                            {t("leftMenu.headline") + "- 4"}
                        </a>
                    </Col>
                    <Col span={4} className={"colStyle gutter-row"}>
                        <a className={"box"} href="/adminPanel/slider">
                            <SlidersOutlined/>
                            <br/>
                            {t("leftMenu.slider")}
                        </a>
                    </Col>
                    <Col span={4} className={"colStyle gutter-row"}>
                        <a className={"box"} href="/adminPanel/news">
                            <SlidersOutlined/>
                            <br/>
                            {t("leftMenu.newsSlider")}
                        </a>
                    </Col>
                </Row>
                <Row gutter={16} justify="space-around" align="middle" title={t("leftMenu.productCategory")}>
                    <Divider orientation="left">{t("leftMenu.productCategory")}</Divider>
                    <Col span={4} className={"colStyle gutter-row"}>
                        <a className={"box"} href="/adminPanel/categories">
                            <AppstoreAddOutlined/>
                            <br/>
                            {t("leftMenu.createListCategory")}
                        </a>
                    </Col>
                    <Col span={4} className={"colStyle gutter-row"}>
                        <a className={"box"} href="/adminPanel/product">
                            <MobileOutlined/>
                            <br/>
                            {t("leftMenu.createListProduct")}
                        </a>
                    </Col>
                    <Col span={4} className={"colStyle gutter-row"}/>
                    <Col span={4} className={"colStyle gutter-row"}/>
                    <Col span={4} className={"colStyle gutter-row"}/>
                    <Col span={4} className={"colStyle gutter-row"}/>
                </Row>
                <Row gutter={16} justify="space-around" align="middle" title={t("leftMenu.referenceCategory")}>
                    <Divider orientation="left">{t("leftMenu.referenceCategory")}</Divider>
                    <Col span={4} className={"colStyle gutter-row"}>
                        <a className={"box"} href="/adminPanel/referencesCategories">
                            <AppstoreAddOutlined/>
                            <br/>
                            {t("leftMenu.createListCategory")}
                        </a>
                    </Col>
                    <Col span={4} className={"colStyle gutter-row"}>
                        <a className={"box"} href="/adminPanel/referencesList">
                            <FlagOutlined/>
                            <br/>
                            {t("leftMenu.createListReferences")}
                        </a>
                    </Col>
                    <Col span={4} className={"colStyle gutter-row"}/>
                    <Col span={4} className={"colStyle gutter-row"}/>
                    <Col span={4} className={"colStyle gutter-row"}/>
                    <Col span={4} className={"colStyle gutter-row"}/>
                </Row>
                <Row gutter={4} justify="space-around" align="middle" title={t("leftMenu.socialsNetworks")}>
                    <Divider orientation="left">{t("leftMenu.socialsNetworks")}</Divider>
                    <Col span={4} className={"colStyle gutter-row"}>
                        <a className={"box"} href="/adminPanel/x">
                            X
                            <br/>
                            {t("ourPage.x")}
                        </a>
                    </Col>
                    <Col span={4} className={"colStyle gutter-row"}>
                        <a className={"box"} href="/adminPanel/instagram">
                            <InstagramOutlined/>
                            <br/>
                            {t("ourPage.instagram")}
                        </a>
                    </Col>
                    <Col span={4} className={"colStyle gutter-row"}>
                        <a className={"box"} href="/adminPanel/facebook">
                            <FacebookOutlined/>
                            <br/>
                            {t("ourPage.facebook")}
                        </a>
                    </Col>
                    <Col span={4} className={"colStyle gutter-row"}>
                        <a className={"box"} href="/adminPanel/linkedin">
                            <LinkedinOutlined/>
                            <br/>
                            {t("ourPage.linkedin")}
                        </a>
                    </Col>
                    <Col span={4} className={"colStyle gutter-row"}>
                        <a className={"box"} href="/adminPanel/google">
                            <GoogleOutlined/>
                            <br/>
                            {t("ourPage.google")}
                        </a>
                    </Col>
                    <Col span={4} className={"colStyle gutter-row"}>
                        <a className={"box"} href="/adminPanel/youtube">
                            <YoutubeOutlined/>
                            <br/>
                            {t("ourPage.youtube")}
                        </a>
                    </Col>
                </Row>
                <Row gutter={16} justify="space-around" align="middle" title={t("leftMenu.siteDetail")}>
                    <Divider orientation="left">{t("leftMenu.siteDetail")}</Divider>
                    <Col span={4} className={"colStyle gutter-row"}>
                        <a className={"box"} href="/adminPanel/aboutUs">
                            <ReadOutlined/>
                            <br/>
                            {t("leftMenu.aboutUs")}
                        </a>
                    </Col>
                    <Col span={4} className={"colStyle gutter-row"}>
                        <a className={"box"} href="/adminPanel/ourVision">
                            <FlagOutlined/>
                            <br/>
                            {t("leftMenu.ourVision")}
                        </a>
                    </Col>
                    <Col span={4} className={"colStyle gutter-row"}>
                        <a className={"box"} href="/adminPanel/ourMission">
                            <FlagOutlined/>
                            <br/>
                            {t("leftMenu.ourMission")}
                        </a>
                    </Col>
                    <Col span={4} className={"colStyle gutter-row"}>
                        <a className={"box"} href="/adminPanel/contact">
                            <EnvironmentOutlined/>
                            <br/>
                            {t("leftMenu.contact")}
                        </a>
                    </Col>
                    <Col span={4} className={"colStyle gutter-row"}/>
                    <Col span={4} className={"colStyle gutter-row"}/>
                </Row>
            </div>
        </div>
    );
}

export default index;