import React from 'react';
import Humanize from 'humanize-plus';
import {map, sumBy} from 'lodash';

const BadgePT = ({report, total}) => {
    return (<div className="w-full flex my-4 flex-wrap gap-2 grid-cols-2">

        <div
            className="flex flex-row m-auto bg-gradient-to-r from-green-400 via-green-500 to-green-600 p-4 gap-2 rounded-lg border-2 border-green-300">
            <div className="my-auto">
                <div className="text-lg text-green-200">Kg aprovechables:</div>
                {total && total !== null && <div
                    className="text-2xl text-green-100">{Humanize.formatNumber(sumBy(total, 'kg_usable'), 2)} kg</div>}

                <div className="text-lg text-green-200">Kg producto terminado:</div>
                {total && total !== null &&
                    <div className="text-2xl text-green-100">{Humanize.formatNumber(sumBy(total, 'kg_pt'), 2)} kg</div>}
            </div>
            <div
                className="text-green-300 my-auto bg-gradient-to-l from-green-700 via-green-800 to-green-900 rounded-full p-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="currentColor" viewBox="0 0 640 512">
                    <path
                        d="M384 32H512c17.7 0 32 14.3 32 32s-14.3 32-32 32H398.4c-5.2 25.8-22.9 47.1-46.4 57.3V448H512c17.7 0 32 14.3 32 32s-14.3 32-32 32H320 128c-17.7 0-32-14.3-32-32s14.3-32 32-32H288V153.3c-23.5-10.3-41.2-31.6-46.4-57.3H128c-17.7 0-32-14.3-32-32s14.3-32 32-32H256c14.6-19.4 37.8-32 64-32s49.4 12.6 64 32zM125.8 177.3L51.1 320H204.9L130.2 177.3c-.4-.8-1.3-1.3-2.2-1.3s-1.7 .5-2.2 1.3zM128 128c18.8 0 36 10.4 44.7 27l77.8 148.5c3.1 5.8 6.1 14 5.5 23.8c-.7 12.1-4.8 35.2-24.8 55.1C210.9 402.6 178.2 416 128 416s-82.9-13.4-103.2-33.5c-20-20-24.2-43-24.8-55.1c-.6-9.8 2.5-18 5.5-23.8L83.3 155c8.7-16.6 25.9-27 44.7-27zm384 48c-.9 0-1.7 .5-2.2 1.3L435.1 320H588.9L514.2 177.3c-.4-.8-1.3-1.3-2.2-1.3zm-44.7-21c8.7-16.6 25.9-27 44.7-27s36 10.4 44.7 27l77.8 148.5c3.1 5.8 6.1 14 5.5 23.8c-.7 12.1-4.8 35.2-24.8 55.1C594.9 402.6 562.2 416 512 416s-82.9-13.4-103.2-33.5c-20-20-24.2-43-24.8-55.1c-.6-9.8 2.5-18 5.5-23.8L467.3 155z"/>
                </svg>
            </div>
        </div>
        {map(report, (presentation, index) => {
            return (<div key={index}
                         className="flex flex-col m-auto bg-gradient-to-r from-green-400 via-green-500 to-green-600 px-4 py-2 gap-2 rounded-lg border-2 border-green-300">
                <div className="text-lg text-green-200 font-bold uppercase text-center w-full">{index}</div>
                <div className={"flex flex-row"}>
                    <div className="my-auto flex-row">
                        {map(presentation, (value, key) => {
                            return (
                                <div key={key} className="text-sm text-green-200 uppercase font-semibold ">{key}: <span
                                    className={"font-normal"}>{Humanize.formatNumber(value, 2)} kg</span></div>)
                        })}
                    </div>
                    <div
                        className="text-green-300 mx-1 my-auto bg-gradient-to-l from-green-700 via-green-800 to-green-900 rounded-full p-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="currentColor"
                             viewBox="0 0 448 512">
                            <path
                                d="M448 80v48c0 44.2-100.3 80-224 80S0 172.2 0 128V80C0 35.8 100.3 0 224 0S448 35.8 448 80zM393.2 214.7c20.8-7.4 39.9-16.9 54.8-28.6V288c0 44.2-100.3 80-224 80S0 332.2 0 288V186.1c14.9 11.8 34 21.2 54.8 28.6C99.7 230.7 159.5 240 224 240s124.3-9.3 169.2-25.3zM0 346.1c14.9 11.8 34 21.2 54.8 28.6C99.7 390.7 159.5 400 224 400s124.3-9.3 169.2-25.3c20.8-7.4 39.9-16.9 54.8-28.6V432c0 44.2-100.3 80-224 80S0 476.2 0 432V346.1z"/>
                        </svg>
                    </div>
                </div>
            </div>)
        })}

    </div>)

};

export default BadgePT;
