import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faFileExcel} from "@fortawesome/free-solid-svg-icons";
import Skeleton from "react-loading-skeleton";
import {map, size} from "lodash";
import {DownloadTableExcel} from 'react-export-table-to-excel';
import React, {useRef} from "react";
import {Link} from "react-router-dom";
import Humanize from 'humanize-plus'

const Table = ({data, update}) => {
    const columns = [' ', 'Semana', 'Fecha de Ingreso', 'Lote MP', 'Peso neto', 'Jabas', 'Color 1 %', 'Color 1,5 %', 'Color 2 %', 'Color 2.5 %', 'Color 3 %', 'Color 3.5 &', 'Brix < 7', 'Brix 7-8 %', 'Brix 8-9 %', 'Brix >9 %', 'Peso <280 %', 'Peso 280-300 %', 'Peso >300 %', 'Daños mecánicos %', 'Rajados  %', 'Daños de sol %', 'Antracnosis %', 'Pudrido %', 'Latex %', 'Queresa %', 'Insectos %', 'Maduro %', 'Sobre maduro %', 'Total defectos %', 'Total fruta sin daño %',]
    const tableRef = useRef(null);
    return (<div className="overflow-x-auto relative scrollbar-hide">
        <DownloadTableExcel
            filename="Analisis Mango"
            sheet="analisis-mango"
            currentTableRef={tableRef.current}
        >
            <button
                className=" border-0 text-lg h-12 w-36 bg-green-400 hover:bg-green-500 text-white mt-2 px-3 rounded-md">
                <span>Descargar</span>
                <FontAwesomeIcon icon={faFileExcel} className={"ml-2"}/>
            </button>

        </DownloadTableExcel>
        <table ref={tableRef} className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                {map(columns, (column, index) => (<th key={index} className="px-6 py-3 text-center">{column}</th>))}
            </tr>
            </thead>
            <tbody>
            {data !== null && size(data) > 0 ? map(data, (row, index) => (<tr key={index} className="bg-white border-b">
                <td className="py-4 px-6 whitespace-nowrap text-center">{<FontAwesomeIcon
                    className={"text-blue-400 cursor-pointer"} icon={faEdit}
                    onClick={() => update(row)}/>}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.week}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{new Date(row?.entry_date).toLocaleDateString('es-PE', {
                    timeZone: 'UTC'
                })}</td>

                <td className="py-4 px-6 whitespace-nowrap text-center">{<Link to={`/lot/${row?.lot_name}`}><p
                    className={"cursor-pointer hover:text-[#26d07d] text-xs text-center"}>{row?.lot_name}</p>
                </Link>}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.net_weight, 2)}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.boxes}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.color_1, 2)}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.color_1_5, 2)}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.color_2, 2)}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.color_2_5, 2)}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.color_3, 2)}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.color_3_5, 2)}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.brix_7, 2)}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.brix_7_8, 2)}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.brix_8_9, 2)}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.brix_9, 2)}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.weight_280, 2)}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.weight_280_300, 2)}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.weight_300, 2)}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.mechanical_damage, 2)}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.cracked, 2)}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.sun_damage, 2)}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.anthracnose, 2)}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.rot, 2)}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.latex, 2)}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.queresa, 2)}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.insect_bite, 2)}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.mature, 2)}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.overripe, 2)}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.total_defects, 2)}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.total_unharmed, 2)}</td>


            </tr>)) : <tr>
                {map(columns, (column, index) => (
                    <th key={index} className="px-6 py-3 text-center"><Skeleton count={10}/></th>))}
            </tr>}


            </tbody>
        </table>
    </div>);
};
export default Table;