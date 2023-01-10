import React from 'react';
import {useFormik} from "formik";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {useDispatch} from "react-redux";
import {update_lot} from "../../redux/actions/raw_material";


const FormInvoice = ({close, lot}) => {

    const dispatch = useDispatch()

    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(), validateOnChange: true,
        onSubmit: (form) => {
            let data = new FormData();
            data.append('invoice_code', form.invoice_code);

            if (form.invoice !== '') {
                data.append('invoice', form.invoice);
            }
            dispatch(update_lot(data, lot), close())

        }
    })


    return (
        <div className="w-full z-20">
            <form className="bg-white px-8 pt-6 pb-8 mb-4">
                <p className={"text-base mt-4 font-medium leading-none text-gray-800"}>Factura:</p>

                <div>
                    <input type={"file"} accept={"application/pdf"}
                           className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 "
                           onChange={text => formik.setFieldValue('invoice', text.target.files[0])}/>
                </div>
                <div>
                    <input type={"text"}
                           className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 "
                           onChange={text => formik.setFieldValue('invoice_code', text.target.value)}/>
                </div>
                <div className="w-full flex justify-center">
                    <button onClick={formik.handleSubmit} type="button"
                            className="max-w-xl mx-2 my-2 bg-green-300 transition duration-150 ease-in-out focus:outline-none hover:bg-green-100 rounded-full text-white font-bold px-6 py-2 text-xs">
                        <FontAwesomeIcon icon={faPaperPlane}/>
                    </button>
                </div>
            </form>

        </div>
    )

}

const initialValues = () => {
    return {
        invoice: '',
        invoice_code: '',
    }
}

export default FormInvoice;