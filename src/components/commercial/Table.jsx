import Skeleton from "react-loading-skeleton";
import {map, size} from "lodash";
import React, {useRef} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faEye, faTrash} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import Humanize from "humanize-plus";
import ColorScale from "color-scales";
import {useSelector} from "react-redux";

const Table = ({data, update, remove}) => {
    const color = new ColorScale(0, 100, ["#ff0000", "#00ff00"]);
    const columns = ['', 'Lote', 'Stock', 'Objetivo', 'Progreso', 'Fcl', 'Cliente', 'Grupo', 'Certificación', 'Descripción', 'Variedad', 'Presentación', 'Pesticidas', 'Fosetyl', 'Embalaje', 'Empaque', 'Fecha de proceso', 'Fecha de vencimiento', 'N° Caja', 'N° Bolsas', 'Proveedor', 'Observación']
    const tableRef = useRef(null);
    const user = useSelector(state => state.Auth.user);

    return (<div className="overflow-x-auto relative scrollbar-hide">

        <table ref={tableRef} className="w-full rounded-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs   text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                {map(columns, (column, index) => (<th key={index} className="px-6 py-3 text-center">{column}</th>))}
            </tr>
            </thead>
            <tbody>
            {data !== null && size(data) > 0 ? map(data, (row, index) => (<tr key={index} className="bg-white border-b">
                <td className="px-6 py-4 text-center gap-x"><FontAwesomeIcon icon={faEdit} onClick={() => update(row)}
                                                                             className={"text-blue-400 cursor-pointer"}
                />
                    {user && user !== undefined && user !== null && user.get_role_name === 'Logistica' && <>
                        <FontAwesomeIcon icon={faTrash} onClick={() => remove(row.slug)}
                                         className={"text-red-400 cursor-pointer"}
                        />
                        <Link to={`/commercial/${row.slug}`}><FontAwesomeIcon icon={faEye}
                                                                              className={"text-black cursor-pointer"}/></Link></>}

                </td>
                <td className="px-2 py-4 text-center text-xs">{row?.name}</td>
                <td className={`px-6 py-4 text-center `}
                >
                    {Humanize.formatNumber(row?.stock, 2)}</td>
                <td className="px-6 py-4 text-center"
                >{Humanize.formatNumber(row?.objective, 2)}</td>
                <td className="px-6 py-4 text-center text-white font-bold text-xs "
                ><p className={"rounded-full"} style={{
                    width: "10px !important",
                    padding: "5px",
                    background: "rgba" + "(" + color.getColor(row?.progress).r + ',' + color.getColor(row?.progress).g + ',' + color.getColor(row?.progress).b + ',' + color.getColor(row?.progress).a + ")"
                }}> {Humanize.formatNumber(row?.progress, 2)} %</p>
                </td>
                <td className="px-6 py-4 text-center">{row?.fcl_short_name}</td>
                <td className="px-6 py-4 text-center">{row?.client_name}</td>
                <td className="px-6 py-4 text-center">{row?.group_name}</td>
                <td className="px-6 py-4 text-center">{row?.type_inf_name}</td>
                <td className="px-6 py-4 text-center">{row?.product_name} {row?.family_name} {row?.cut_name}</td>
                <td className="px-6 py-4 text-center">{row?.variety_name}</td>
                <td className="px-6 py-4 text-center">{row?.presentation_name}</td>
                <td className="px-6 py-4 text-center">{Humanize.formatNumber(row?.pesticides, 2)} %</td>
                <td className="px-6 py-4 text-center">{Humanize.formatNumber(row?.fosetyl, 2)} %</td>

                <td className="px-6 py-4 text-center">{row?.packaging_name}</td>
                <td className="px-6 py-4 text-center">{row?.packing_name}</td>
                <td className="px-6 py-4 text-center">{new Date(row?.production_date).toLocaleDateString('es-PE', {
                    timeZone: 'UTC', day: 'numeric', month: 'long', year: 'numeric'
                })}</td>
                <td className="px-6 py-4 text-center">{new Date(row?.expiring_date).toLocaleDateString('es-PE', {
                    timeZone: 'UTC', day: 'numeric', month: 'long', year: 'numeric'
                })}</td>
                <td className="px-6 py-4 text-center">{row?.boxes}</td>
                <td className="px-6 py-4 text-center">{row?.bags}</td>
                <td className="px-6 py-4 text-center">{row?.provider_name}</td>
                <td className="px-6 py-4 text-center">{row?.observation}</td>
            </tr>)) : <tr>
                {map(columns, (column, index) => (
                    <th key={index} className="px-6 py-3 text-center"><Skeleton count={10}/></th>))}
            </tr>}


            </tbody>
        </table>
    </div>);
};
export default Table;