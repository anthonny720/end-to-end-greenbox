import React, {useEffect} from 'react';
import Layout from "../../hocs/Layout";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {get_traceability} from "../../redux/actions/traceability";
import {Document, Image, Page, PDFViewer, StyleSheet, Text, View} from "@react-pdf/renderer";
import General from "./General";
import Logo from "../../assets/logo.jpg";
import Production from "./Production";
import Analysis from "./Analysis";
import Conditioning from "./Conditioning";
import Terminated from "./Terminated";
import Released from "./Released";
import Packing from "./Packing";
import COMEX from "./COMEX";

const styles = StyleSheet.create({
    image: {
        width: 35, borderRadius: 10, marginVertical: 15, marginHorizontal: 50,
    }, body: {
        marginVertical: 15, marginHorizontal: 50,
    }
});
const Traceability = () => {
    const {lot} = useParams();
    const dispatch = useDispatch()
    const acopio = useSelector(state => state.Traceability.acopio)
    const report_mp = useSelector(state => state.Traceability.report_mp)
    const report_pt = useSelector(state => state.Traceability.report_pt)
    const quality = useSelector(state => state.Traceability.quality)
    const conditioning = useSelector(state => state.Traceability.conditioning)
    const terminated = useSelector(state => state.Traceability.terminated)
    const released = useSelector(state => state.Traceability.released)
    const packing = useSelector(state => state.Traceability.packing)
    const comex = useSelector(state => state.Traceability.comex)
    useEffect(() => {
        dispatch(get_traceability(lot))
    }, []);


    return (<Layout>
        <div className={"w-full  mr-2 px-24 bg-white rounded-md py-4 h-screen"}>
            <PDFViewer style={{width: "100%", height: "100%"}}>
                <Document style={styles.body}>
                    <Page size={"A4"}>
                        <View style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                            <Image style={styles.image} src={Logo}/>
                            <Text style={{
                                fontWeight: "ultrabold",
                                textAlign: "center",
                                fontSize: "20",
                                fontFamily: "Times-Roman",
                                marginLeft: 25
                            }}>REGISTRO DE
                                TRAZABILIDAD</Text>
                        </View>
                        <General acopio={acopio} report_mp={report_mp}/>
                        <Production production={report_pt} category={acopio?.category_name}/>
                    </Page>
                    <Page size={"A4"}>
                        <View style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                            <Image style={styles.image} src={Logo}/>
                        </View>
                        <Analysis analysis={quality} category={acopio?.category_name}/>
                        <Conditioning conditioning={conditioning}/>

                    </Page>
                    <Page size={"A4"}>
                        <View style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                            <Image style={styles.image} src={Logo}/>
                        </View>
                        <Terminated terminated={terminated}/>

                    </Page>
                    <Page size={"A4"}>
                        <View style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                            <Image style={styles.image} src={Logo}/>
                        </View>
                        <Released released={released}/>
                        <Packing packing={packing}/>
                        <COMEX comex={comex}/>

                    </Page>
                </Document>
            </PDFViewer>



        </div>
    </Layout>)

};

export default Traceability;
