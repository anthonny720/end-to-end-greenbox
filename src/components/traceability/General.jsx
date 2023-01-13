import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBox, faMoneyBill, faPercentage, faWeightScale} from "@fortawesome/free-solid-svg-icons";
import Humanize from "humanize-plus";

const General = ({acopio, report_mp}) => {
    return (
        <div>
                <p className='font-semibold text-md font-sans my-3 w-full '>1) DATOS RELACIONADOS CON LA FRUTA</p>
                <table className="bg-white w-full">
                    <tbody>
                    <tr>
                        <td className="font-bold border border-black px-2 py-1">Lote de ingreso de materia prima:
                        </td>
                        <td className="font-semibold  text-center border border-black px-8 py-1">{acopio?.lot}</td>
                    </tr>
                    <tr>
                        <td className="font-bold border border-black px-2 py-1">Categoría:</td>
                        <td className="font-semibold  text-center border border-black px-8 py-1">{acopio?.category_name}</td>
                    </tr>
                    <tr>
                        <td className="font-bold border border-black px-2 py-1">Fecha del punto de partida:
                        </td>
                        <td className="font-semibold  text-center border border-black px-2 py-1">
                            {new Date(acopio?.starting_point_date).toLocaleDateString('es-PE', {
                                timeZone: 'UTC', day: 'numeric', month: 'long', year: 'numeric'
                            })}
                        </td>
                    </tr>
                    <tr>
                        <td className="font-bold border border-black px-2 py-1">Fecha de ingreso:</td>
                        <td className="font-semibold  text-center border border-black px-8 py-1">
                            {new Date(acopio?.entryDate).toLocaleDateString('es-PE', {
                                timeZone: 'UTC', day: 'numeric', month: 'long', year: 'numeric'
                            })}</td>
                    </tr>
                    <tr>
                        <td className="font-bold border border-black px-2 py-1">Fecha de descarga:</td>
                        <td className="font-semibold  text-center border border-black px-8 py-1">
                            {new Date(acopio?.downloadDate).toLocaleDateString('es-PE', {
                                timeZone: 'UTC', day: 'numeric', month: 'long', year: 'numeric'
                            })}</td>
                    </tr>
                    <tr>
                        <td className="font-bold border border-black px-2 py-1">Proveedor:</td>
                        <td className="font-semibold  text-center border border-black px-8 py-1">{acopio?.provider_name}</td>
                    </tr>
                    <tr>
                        <td className="font-bold border border-black px-2 py-1">Procedencia:</td>
                        <td className="font-semibold  text-center border border-black px-8 py-1">{acopio?.origin}</td>
                    </tr>
                    <tr>
                        <td className="font-bold border border-black px-2 py-1">Variedad/Condición:</td>
                        <td className="font-semibold  text-center border border-black px-8 py-1">{acopio?.variety} - {acopio?.condition}</td>
                    </tr>
                    <tr>
                        <td className="font-bold border border-black px-2 py-1">Guía de remisión:</td>
                        <td className="font-semibold  text-center border border-black px-8 py-1">{acopio?.providerGuide}</td>
                    </tr>
                    <tr>
                        <td className="font-bold border border-black px-2 py-1">Guía de transporte:</td>
                        <td className="font-semibold  text-center border border-black px-8 py-1">{acopio?.carrierGuide}</td>
                    </tr>
                    <tr>
                        <td className="font-bold border border-black px-2 py-1">Factura:</td>
                        <td className="font-semibold  text-center border border-black px-8 py-1">{acopio?.invoice_code}</td>
                    </tr>
                    <tr>
                        <td className="font-bold border border-black px-2 py-1">Parcela:</td>
                        <td className="font-semibold text-sm text-center border border-black px-8 py-1">{acopio?.parcel}</td>
                    </tr>
                    <tr>
                        <td className="font-bold border border-black px-2 py-1">Transporte:</td>
                        <td className="font-semibold text-sm text-center border border-black px-8 py-1">{report_mp?.driver} - {report_mp?.carrier} - {report_mp?.code}</td>
                    </tr>
                    </tbody>

                </table>
                <div className="bg-white p-4 flex justify-center items-center flex-wrap">
                  <span
                      className="inline-flex items-center m-2 px-2 py-1 bg-gray-100 hover:bg-gray-300 rounded-full text-sm font-semibold text-gray-600">
                      <FontAwesomeIcon icon={faBox}/>
                      <span className="ml-1">
                      Cantidad de jabas: {report_mp?.number_boxes} und
                      </span>
                  </span>
                    <span
                        className="inline-flex items-center m-2 px-2 py-1 bg-gray-100 hover:bg-gray-300 rounded-full text-sm font-semibold text-gray-600">
                        <FontAwesomeIcon icon={faWeightScale}/>
                        <span className="ml-1">
                          Peso guía: {Humanize.formatNumber(report_mp?.weight_guide, 2)} kg
                        </span>
                    </span>
                    <span
                        className="inline-flex items-center m-2 px-2 py-1 bg-gray-100 hover:bg-gray-300 rounded-full text-sm font-semibold text-gray-600">
                        <FontAwesomeIcon icon={faWeightScale}/>
                        <span className="ml-1">
                          Peso bruto: {Humanize.formatNumber(report_mp?.brute_weight, 2)} kg
                        </span>
                    </span>
                    <span
                        className="inline-flex items-center m-2 px-2 py-1 bg-gray-100 hover:bg-gray-300 rounded-full text-sm font-semibold text-gray-600">
                        <FontAwesomeIcon icon={faWeightScale}/>
                        <span className="ml-1">
                          Peso neto: {Humanize.formatNumber(report_mp?.net_weight, 2)} kg
                        </span>
                    </span>
                    <span
                        className="inline-flex items-center m-2 px-2 py-1 bg-red-200 hover:bg-red-300 rounded-full text-sm font-semibold text-gray-600">
                        <FontAwesomeIcon icon={faPercentage}/>
                        <span className="ml-1">
                          Descuento: {Humanize.formatNumber(report_mp?.discount_percentage, 2)} %
                        </span>
                    </span>
                     <span
                        className="inline-flex items-center m-2 px-2 py-1 bg-gray-100 hover:bg-gray-300 rounded-full text-sm font-semibold text-gray-600">
                        <FontAwesomeIcon icon={faWeightScale}/>
                        <span className="ml-1">
                          Peso aprovechable: {Humanize.formatNumber(report_mp?.kg_usable, 2)} kg
                        </span>
                    </span>
                    <span
                        className="inline-flex items-center m-2 px-2 py-1 bg-green-200 hover:bg-green-300 rounded-full text-sm font-semibold text-gray-600">
                        <FontAwesomeIcon icon={faMoneyBill}/>
                        <span className="ml-1">
                          Total a pagar: S/{Humanize.formatNumber(report_mp?.total_amount, 2)}
                        </span>
                    </span>


                </div>
            <p className={"font-bold"}>Observaciones: ___________________________________________________________________________________________________________________________________________________</p>
            <p className={"font-bold"}>___________________________________________________________________________________________________________________________________________________</p>
            <p className={"font-bold"}>___________________________________________________________________________________________________________________________________________________</p>
            <p className={"font-bold"}>___________________________________________________________________________________________________________________________________________________</p>
            <p className={"font-bold"}>___________________________________________________________________________________________________________________________________________________</p>

            </div>
    );
};

export default General;
