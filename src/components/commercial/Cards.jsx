import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowTrendUp,
    faBagShopping,
    faBox,
    faBraille,
    faBug,
    faBullseye,
    faCarAlt,
    faCartShopping,
    faExclamation,
    faInfo,
    faLayerGroup,
    faMagnifyingGlassChart,
    faScissors,
    faServer,
    faSkullCrossbones,
    faSpinner,
    faTimeline,
    faUser,
    faUserCheck
} from "@fortawesome/free-solid-svg-icons";
import Humanize from "humanize-plus";
import Slider from "react-styled-carousel";

const responsive = [{breakPoint: 1280, cardsToShow: 4},
    {breakPoint: 760, cardsToShow: 2}, {breakPoint: 100, cardsToShow: 1}];

const Data = ({Children}) => {
    return (
        <h1 className={"bg-white font-bold hover:text-white text-[#26d07d]  p-3 w-11/12 bg-white hover:bg-[#26d07d] rounded-md h-max text-center"}>
            {Children}
        </h1>
    )
}

const Cards = ({data}) => {
    return (
        <div className={"w-full"}>
            <Slider responsive={responsive} rightArrow={true} pauseOnMouseOver={true}>
                <Data Children={<p className={"flex justify-center flex-col text-xs md:text-lg"}><FontAwesomeIcon
                    icon={faInfo} className={"block h-4 sm:h-8"}/>Lote
                    <p className={"text-xs font-light"}>{data?.name}</p>
                </p>}/>
                <Data Children={<p className={"flex justify-center flex-col text-xs md:text-lg"}><FontAwesomeIcon
                    icon={faCarAlt} className={"block h-4 sm:h-8"}/>Fcl
                    <p className={"text-xs font-light"}>{data?.fcl_name}</p>
                </p>}/>
                <Data Children={<p className={"flex justify-center flex-col text-xs md:text-lg"}><FontAwesomeIcon
                    icon={faArrowTrendUp} className={"block h-4 sm:h-8"}/>Stock
                    <p className={"text-xs font-light"}>{data?.stock}</p>
                </p>}/>
                <Data Children={<p className={"flex justify-center flex-col text-xs md:text-lg"}><FontAwesomeIcon
                    icon={faBullseye} className={"block h-4 sm:h-8"}/>Objetivo
                    <p className={"text-xs font-light"}>{data?.objective}</p>
                </p>}/>
                <Data Children={<p className={"flex justify-center flex-col text-xs md:text-lg"}><FontAwesomeIcon
                    icon={faSpinner} className={"block h-4 sm:h-8 animate-spin"}/>Progreso
                    <p className={"text-xs font-light"}>{Humanize.formatNumber(data?.progress, 2)}</p>
                </p>}/>
                <Data Children={<p className={"flex justify-center flex-col text-xs md:text-lg"}><FontAwesomeIcon
                    icon={faLayerGroup} className={"block h-4 sm:h-8"}/>Familia
                    <p className={"text-xs font-light"}>{data?.family_name}</p>
                </p>}/>
                <Data Children={<p className={"flex justify-center flex-col text-xs md:text-lg"}><FontAwesomeIcon
                    icon={faLayerGroup} className={"block h-4 sm:h-8"}/>Grupo
                    <p className={"text-xs font-light"}>{data?.group_name}</p>
                </p>}/>
                <Data Children={<p className={"flex justify-center flex-col text-xs md:text-lg"}><FontAwesomeIcon
                    icon={faLayerGroup} className={"block h-4 sm:h-8"}/>Tipo
                    <p className={"text-xs font-light"}>{data?.type_inf_name}</p>
                </p>}/>
                <Data Children={<p className={"flex justify-center flex-col text-xs md:text-lg"}><FontAwesomeIcon
                    icon={faCartShopping} className={"block h-4 sm:h-8"}/>Producto
                    <p className={"text-xs font-light"}>{data?.product_name}</p>
                </p>}/>
                <Data Children={<p className={"flex justify-center flex-col text-xs md:text-lg"}><FontAwesomeIcon
                    icon={faScissors} className={"block h-4 sm:h-8"}/>Corte
                    <p className={"text-xs font-light"}>{data?.cut_name}</p>
                </p>}/>
                <Data Children={<p className={"flex justify-center flex-col text-xs md:text-lg"}><FontAwesomeIcon
                    icon={faBraille} className={"block h-4 sm:h-8"}/>Variedad
                    <p className={"text-xs font-light"}>{data?.variety_name}</p>
                </p>}/>
                <Data Children={<p className={"flex justify-center flex-col text-xs md:text-lg"}><FontAwesomeIcon
                    icon={faUser} className={"block h-4 sm:h-8"}/>Cliente
                    <p className={"text-xs font-light"}>{data?.client_name}</p>
                </p>}/>
                <Data Children={<p className={"flex justify-center flex-col text-xs md:text-lg"}><FontAwesomeIcon
                    icon={faServer} className={"block h-4 sm:h-8"}/>Presentación
                    <p className={"text-xs font-light"}>{data?.presentation_name}</p>
                </p>}/>
                <Data Children={<p className={"flex justify-center flex-col text-xs md:text-lg"}><FontAwesomeIcon
                    icon={faBagShopping} className={"block h-4 sm:h-8"}/>Embalaje
                    <p className={"text-xs font-light"}>{data?.packaging_name}</p>
                </p>}/>
                <Data Children={<p className={"flex justify-center flex-col text-xs md:text-lg"}><FontAwesomeIcon
                    icon={faBox} className={"block h-4 sm:h-8"}/>Empaque
                    <p className={"text-xs font-light"}>{data?.packing_name}</p>
                </p>}/>
                <Data Children={<p className={"flex justify-center flex-col text-xs md:text-lg"}><FontAwesomeIcon
                    icon={faTimeline} className={"block h-4 sm:h-8"}/>Fecha de producción
                    <p className={"text-xs font-light"}>{data?.production_date}</p>
                </p>}/>
                <Data Children={<p className={"flex justify-center flex-col text-xs md:text-lg"}><FontAwesomeIcon
                    icon={faSkullCrossbones} className={"block h-4 sm:h-8"}/>Fecha de vencimiento
                    <p className={"text-xs font-light"}>{data?.expiring_date}</p>
                </p>}/>
                <Data Children={<p className={"flex justify-center flex-col text-xs md:text-lg"}><FontAwesomeIcon
                    icon={faUserCheck} className={"block h-4 sm:h-8"}/>Proveedor
                    <p className={"text-xs font-light"}>{data?.provider_name}</p>
                </p>}/>
                <Data Children={<p className={"flex justify-center flex-col text-xs md:text-lg"}><FontAwesomeIcon
                    icon={faMagnifyingGlassChart} className={"block h-4 sm:h-8"}/>% Fosetyl
                    <p className={"text-xs font-light"}>{data?.fosetyl}</p>
                </p>}/>
                <Data Children={<p className={"flex justify-center flex-col text-xs md:text-lg"}><FontAwesomeIcon
                    icon={faBug} className={"block h-4 sm:h-8"}/>% Pesticidas
                    <p className={"text-xs font-light"}>{data?.pesticides}</p>
                </p>}/>

                <Data Children={<p className={"flex justify-center flex-col text-xs md:text-lg"}><FontAwesomeIcon
                    icon={faExclamation} className={"block h-4 sm:h-8"}/>Observaciones
                    <p className={"text-xs font-light"}>{data?.observation}</p>
                </p>}/>

            </Slider>
        </div>
    );
};

export default Cards;
