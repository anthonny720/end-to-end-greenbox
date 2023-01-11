import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {map} from "lodash";
import {update_report_pt_pineapple} from "../../redux/actions/report";


const FormPTPineapple = ({data, close, params,id}) => {
    const columns = [
        {name: 'date_process', title: 'Fecha de proceso', type: 'date', maxLength: 8},
        {name: 'kg_processed', title: 'Kg procesados', type: 'text', maxLength: 8},
        {name: 'kg_discarded', title: 'Kg descarte', type: 'text', maxLength: 8},
        {name: 'merma', title: 'Kg merma', type: 'text', maxLength: 5},
        {name: 'shell', title: 'Cáscara', type: 'text', maxLength: 8},
        {name: 'crown', title: 'Corona', type: 'text', maxLength: 8},
        {name: 'juice_pulp', title: 'Jugo/pulpa', type: 'text', maxLength: 8},
        {name: 'retail_rings', title: 'Retail Rings', type: 'text', maxLength: 8},
        {name: 'retail_1_16', title: 'Retail 1/16', type: 'text', maxLength: 8},
        {name: 'retail_1_8', title: 'Granel 1/8', type: 'text', maxLength: 8},
        {name: 'granel_rings', title: 'Granel Rings', type: 'text', maxLength: 8},
        {name: 'granel_1_16', title: 'Granel 1/16', type: 'text', maxLength: 8},
        {name: 'granel_1_8', title: 'Granel 1/8', type: 'text', maxLength: 8},
    ]

    const dispatch = useDispatch();
    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(data),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form, onSubmitProps) => {
            dispatch(update_report_pt_pineapple(form, id, params))
            close()
        }
    })



    return (<form className="bg-white  rounded px-8 pt-6 pb-8 mb-4">

        <div className={`grid grid-cols-2 gap-2`}>
            {

                map(columns, (column, index) => (
                    <div key={index}>
                        <p className={`${formik.errors[column.name] ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>{column.title}:</p>
                        <input type={column.type} maxLength={column.maxLength}
                               className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 uppercase"
                               value={`${formik.values[column.name]}`}
                               onChange={text => formik.setFieldValue(column.name, text.target.value)}/>
                    </div>))

            }
        </div>


        <div className="w-full flex justify-center">
            <button onClick={formik.handleSubmit} type="button"
                    className="max-w-xl mx-2 my-2 bg-green-300 transition duration-150 ease-in-out focus:outline-none hover:bg-green-100 rounded-full text-white font-bold px-6 py-2 text-xs">
                <FontAwesomeIcon icon={faPaperPlane}/>
            </button>
        </div>

    </form>)

};


const initialValues = (data) => {
    return {
        date_process: data?.date_process || new Date(),
        kg_processed: data?.kg_processed || 0,
        kg_discarded: data?.kg_discarded || 0,
        merma: data?.merma || 0,
        shell: data?.shell || 0,
        crown: data?.crown || 0,
        juice_pulp: data?.juice_pulp || 0,
        retail_rings: data?.retail_rings || 0,
        retail_1_16: data?.retail_1_16 || 0,
        retail_1_8: data?.retail_1_8 || 0,
        granel_rings: data?.granel_rings || 0,
        granel_1_16: data?.granel_1_16 || 0,
        granel_1_8: data?.granel_1_8 || 0,

    }
}
const newSchema = () => {
    return {
        date_process: Yup.string().required(),
        kg_processed: Yup.number().min(0).required(),
        kg_discarded: Yup.number().min(0).required(),
        merma: Yup.number().min(0).required(),
        shell: Yup.number().min(0).required(),
        crown: Yup.number().min(0).required(),
        juice_pulp: Yup.number().min(0).required(),
        retail_rings: Yup.number().min(0).required(),
        retail_1_16: Yup.number().min(0).required(),
        retail_1_8: Yup.number().min(0).required(),
        granel_rings: Yup.number().min(0).required(),
        granel_1_16: Yup.number().min(0).required(),
        granel_1_8: Yup.number().min(0).required()
    }
}

export default FormPTPineapple;
