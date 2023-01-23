import React from 'react';
import {StyleSheet, Text, View} from "@react-pdf/renderer";
import ProductionMango from "./ProductionMango";
import ProductionPineapple from "./ProductionPineapple";
import ProductionGoldenberry from "./ProductionGoldenberry";
import ProductionBlueberry from "./ProductionBlueberry";
import ProductionBanana from "./ProductionBanana";

const styles = StyleSheet.create({
    view: {
        width: "80%", marginHorizontal: 50,marginVertical:20
    }
});
const Production = ({production,category}) => {
    return (<View style={styles.view}>
        <Text style={{fontSize: "10", fontFamily: "Times-Roman"}}>2) PRODUCCIÓN GENERAL</Text>
        {category && category!==null && category ==='Mango' && <ProductionMango production={production}/>}
        {category && category!==null && category ==='Piña' && <ProductionPineapple production={production}/>}
        {category && category!==null && category ==='Aguaymanto' && <ProductionGoldenberry production={production}/>}
        {category && category!==null && category ==='Arándanos' && <ProductionBlueberry production={production}/>}
        {category && category!==null && category ==='Banano' && <ProductionBanana production={production}/>}
        {category && category!==null && category ==='Fresa' && <Text style={{fontSize:10,textAlign:"center"}}>No existen registros</Text>}
    </View>);
};

export default Production;
