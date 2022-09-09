import * as yup from "yup";

const validations = yup.object().shape({
    email: yup.string().email("Geçerli bir e-mail girin").required("Zorunlu alan."),
    password: yup.string().required("Zorunlu alan."),
})

export default validations