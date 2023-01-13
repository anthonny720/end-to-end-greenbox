import React from 'react';
import Humanize from "humanize-plus";

const Conditioning = ({conditioning}) => {
    return (<div>
        <p className='font-semibold text-md font-sans my-3 w-full '>4) CONTROL DE ACONDICIONADO </p>

        <table className="bg-white w-full">
            <thead className="text-xs   text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className={"border-1 border border-black"}>
                <th className="px-6 py-3 text-center border-1 border border-black">FECHA DE PROCESO</th>
                <th className="px-6 py-3 text-center border-1 border border-black">CLORO EN RED</th>
                <th className="px-6 py-3 text-center border-1 border border-black">CLORO EN TINA</th>
                <th className="px-6 py-3 text-center border-1 border border-black">BRIX</th>
                <th className="px-6 py-3 text-center border-1 border border-black">PH</th>
                <th className="px-6 py-3 text-center border-1 border border-black">ESPESOR</th>
                <th className="px-6 py-3 text-center border-1 border border-black">ASPECTO</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td className="font-bold border-black border px-2 py-1 text-center">{new Date().toLocaleDateString()}</td>
                <td className="font-bold border-black border px-2 py-1 text-center">{Humanize.formatNumber(0,2) }</td>
                <td className="font-bold border-black border px-2 py-1 text-center">{Humanize.formatNumber(0,2) }</td>
                <td className="font-bold border-black border px-2 py-1 text-center">{Humanize.formatNumber(0,2) }</td>
                <td className="font-bold border-black border px-2 py-1 text-center">{Humanize.formatNumber(0,2) }</td>
                <td className="font-bold border-black border px-2 py-1 text-center">{Humanize.formatNumber(0,2) }</td>
                <td className="font-bold border-black border px-2 py-1 text-center">{Humanize.formatNumber(0,2) }</td>
            </tr>
            <tr>
                <td className="font-bold border-black border px-2 py-1 text-center">{new Date().toLocaleDateString()}</td>
                <td className="font-bold border-black border px-2 py-1 text-center">{Humanize.formatNumber(0,2) }</td>
                <td className="font-bold border-black border px-2 py-1 text-center">{Humanize.formatNumber(0,2) }</td>
                <td className="font-bold border-black border px-2 py-1 text-center">{Humanize.formatNumber(0,2) }</td>
                <td className="font-bold border-black border px-2 py-1 text-center">{Humanize.formatNumber(0,2) }</td>
                <td className="font-bold border-black border px-2 py-1 text-center">{Humanize.formatNumber(0,2) }</td>
                <td className="font-bold border-black border px-2 py-1 text-center">{Humanize.formatNumber(0,2) }</td>
            </tr>

            </tbody>
        </table>


    </div>);

};

export default Conditioning;
