import * as yup from "yup";

const validations = yup.object().shape({
    email: yup.string().email("Geçerli bir e-mail girin").required("Zorunlu alan."),
    name: yup.string().required("Zorunlu Alan"),
    surname: yup.string().required("Zorunlu Alan"),
    phone_number: yup.string().min(10, "Numaraya 0 koymadan giriniz.").required("Zorunlu Alan"),
    country: yup.string().required("Zorunlu Alan"),
    address: yup.string().required("Zorunlu Alan")


})

export default validations