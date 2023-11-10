import * as Yup from "yup";

export const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, "Too Short!")
        .max(25, "Too Long!")
        .required("Name must be filled"),
    email: Yup.string()
        .email("Invalid email")
        .required("Password must be filled"),
    password: Yup.string()
        .min(4, "Too Short!")
        .max(10, "Too Long!")
        .required("Password must be filled"),
});

export const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("email must be filled"),
    password: Yup.string()
        .min(4, "Too Short!")
        .max(10, "Too Long!")
        .required("Password must be filled"),
});