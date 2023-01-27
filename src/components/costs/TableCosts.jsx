import React from 'react';
import {map, size} from "lodash";
import {CustomTd} from "../../helpers/util";
import Skeleton from "react-loading-skeleton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faEye} from "@fortawesome/free-solid-svg-icons";
import Humanize from "humanize-plus";
import {useSelector} from "react-redux";

const TableCosts = ({data, viewer, update, update_costs}) => {
    const user = useSelector(state => state.Auth.user);
    const columns = ['', 'Fecha', 'Materia prima', 'Kg procesados', 'Kg de producto terminado', 'Rendimiento', 'Costo producción', 'Costo unitario'];
    return (<div className="overflow-x-auto w-full relative scrollbar-hide ">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-white dark:bg-gray-700 dark:text-gray-400">
            <tr>
                {map(columns, (column, index) => (<th key={index} className="px-6 py-3 text-center">{column}</th>))}
            </tr>
            </thead>
            <tbody>
            {data !== null && size(data) > 0 ? map(data, (row, index) => (<>

                <tr key={index} className="bg-white border-b">
                    <CustomTd>
                        <div className={"flex justify-center items-center"}>
                            <FontAwesomeIcon icon={faEye} onClick={() => {
                                viewer(row)
                            }}
                                             className={"text-black cursor-pointer"}/>
                            {user && user !== undefined && user !== null && user.get_role_name === 'Producción' &&
                                <FontAwesomeIcon icon={faEdit} onClick={() => {
                                    update(row)
                                }} className={"text-blue-400 ml-4 cursor-pointer"}/>}
                            {user && user !== undefined && user !== null && user.get_role_name === "Administración" &&
                                <FontAwesomeIcon icon={faEdit} onClick={() => {
                                    update_costs(row?.item_variable)
                                }} className={"text-cyan-400 ml-4 cursor-pointer"}/>}
                            {user && user !== undefined && user !== null && user.get_role_name === "Logistica" &&
                                <FontAwesomeIcon icon={faEdit} onClick={() => {
                                    update_costs(row?.item_variable)
                                }} className={"text-cyan-400 ml-4 cursor-pointer"}/>}

                        </div>

                    </CustomTd>
                    <CustomTd><p
                        className={"text-center text-xs"}>{new Date(row?.date).toLocaleDateString('es-PE', {
                        timeZone: 'UTC',
                    })}</p></CustomTd>

                    <CustomTd>{row?.mp}</CustomTd>
                    <CustomTd>{Humanize.formatNumber(row?.kg_processed, 2)}</CustomTd>
                    <CustomTd>{Humanize.formatNumber(row?.kg_total, 2)}</CustomTd>
                    <CustomTd>{Humanize.formatNumber(row?.performance, 2)} %</CustomTd>
                    <CustomTd>S/{Humanize.formatNumber(row?.total_cost, 2)}</CustomTd>
                    <CustomTd>S/{Humanize.formatNumber(row?.total_cost_unit, 2)}</CustomTd>

                </tr>
            </>)) : <tr>
                {map(columns, (column, index) => (
                    <th key={index} className="px-6 py-3 text-center"><Skeleton count={7}/></th>))}
            </tr>}


            </tbody>
        </table>
    </div>)

};

export default TableCosts;
