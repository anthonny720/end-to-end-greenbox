import Skeleton from "react-loading-skeleton";
import {map, omit, size} from "lodash";
import React, {useRef} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faFileExcel} from "@fortawesome/free-solid-svg-icons";
import {useSelector} from "react-redux";
import {DownloadTableExcel} from "react-export-table-to-excel";
import Humanize from "humanize-plus";

const TablePT = ({data, update,header,columns}) => {
    const tableRef = useRef(null);
    const user = useSelector(state => state.Auth.user);

    return (<div className="overflow-x-auto relative scrollbar-hide">
        <DownloadTableExcel
            filename="Registro de lotes PT"
            sheet="registro-pt"
            currentTableRef={tableRef.current}
        >
            <button
                className=" border-0 text-lg h-12 w-36 bg-green-400 hover:bg-green-500 text-white mt-2 px-3 rounded-md">
                <span>Descargar</span>
                <FontAwesomeIcon icon={faFileExcel} className={"ml-2"}/>
            </button>

        </DownloadTableExcel>
        <table ref={tableRef} className="w-full rounded-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs   text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            {header}
            <tr>
                {map(columns, (column, index) => (<th key={index} className="px-6 py-3 text-center">{column}</th>))}
            </tr>
            </thead>
            <tbody>
            {data !== null && size(data) > 0 ? map(data, (row, index) => (<tr key={index} className="bg-white border-b">
                <td className="px-6 py-4 text-center gap-x">

                        <FontAwesomeIcon icon={faEdit} onClick={() => update(row)}
                                         className={"text-blue-400 cursor-pointer"}
                        />

                </td>
                {map(omit(row,['id']),(value, index) => (<td key={index}
                                                                      className="py-4 px-6 whitespace-nowrap text-center">{typeof (value) === 'number' ? Humanize.formatNumber(value,2) : value
                    }</td>))}
            </tr>)) : <tr>
                {map(columns, (column, index) => (
                    <th key={index} className="px-6 py-3 text-center"><Skeleton count={10}/></th>))}
            </tr>}

            </tbody>
        </table>
    </div>);
};
export default TablePT;