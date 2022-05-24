import React from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Spinner } from "./Spinner";
import "../Styles/NuevoCliente.css";

const Formulario = ({ cliente, cargando }) => {
  const navigate = useNavigate();

  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string()
      .required("El nombre del cliente es obligatorio.")
      .min(3, "El nombre es muy corto")
      .max(30, "el nombre es demasiado largo"),
    empresa: Yup.string().required("El nombre de la empresa es obligatorio"),
    email: Yup.string()
      .email("Email no valido")
      .required("El email es obligatorio"),
    telefono: Yup.number()
      .typeError("El formato de número no es válido")
      .integer("Número no válido")
      .positive("Número no válido"),
  });

  const handleSubmit = async (valores) => {
    try {
      let respuesta;
      if (cliente.id) {
        //Editando Registro
        const url = `http://localhost:4000/clientes/${cliente.id}`;
        respuesta = await fetch(url, {
          method: "PUT",
          body: JSON.stringify(valores),
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        //Nuevo Registro
        const url = "http://localhost:4000/clientes";
        respuesta = await fetch(url, {
          method: "POST",
          body: JSON.stringify(valores),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
      await respuesta.json();
      navigate("/clientes");
    } catch (error) {
      console.log(error);
    }
  };

  return cargando ? (
    <Spinner />
  ) : (
    <div className="formContainer">
      <h2 className="textAddClient">
        {cliente?.nombre ? "Editar Cliente" : "Agregar Cliente"}
      </h2>
      <Formik
        initialValues={{
          nombre: cliente?.nombre ?? "",
          empresa: cliente?.empresa ?? "",
          email: cliente?.email ?? "",
          telefono: cliente?.telefono ?? "",
          notas: cliente?.notas ?? "",
        }}
        enableReinitialize={true}
        onSubmit={async (values, { resetForm }) => {
          await handleSubmit(values);
          resetForm();
        }}
        validationSchema={nuevoClienteSchema}
      >
        {({ errors, touched }) => {
          return (
            <Form>
              <div className="labelInputContainer">
                <label className="labelName" htmlFor="nombre">
                  Nombre:
                </label>
                <Field
                  type="text"
                  className="inputName"
                  id="nombre"
                  placeholder="Nombre del cliente"
                  name="nombre"
                />
                {errors.nombre && touched.nombre ? (
                  <div className="errorMessage">{errors.nombre}</div>
                ) : null}
              </div>
              <div className="labelInputContainer">
                <label className="labelName" htmlFor="empresa">
                  Empresa:
                </label>
                <Field
                  type="text"
                  className="inputName"
                  id="empresa"
                  placeholder="Empresa del cliente"
                  name="empresa"
                />
                {errors.empresa && touched.empresa ? (
                  <div className="errorMessage">{errors.empresa}</div>
                ) : null}
              </div>
              <div className="labelInputContainer">
                <label className="labelName" htmlFor="email">
                  E-mail:
                </label>
                <Field
                  type="email"
                  className="inputName"
                  id="email"
                  placeholder="Correo del cliente"
                  name="email"
                />
                {errors.email && touched.email ? (
                  <div className="errorMessage">{errors.email}</div>
                ) : null}
              </div>
              <div className="labelInputContainer">
                <label className="labelName" htmlFor="telefono">
                  Teléfono:
                </label>
                <Field
                  type="tel"
                  className="inputName"
                  id="telefono"
                  placeholder="Teléfono del cliente"
                  name="telefono"
                />
                {errors.telefono && touched.telefono ? (
                  <div className="errorMessage">{errors.telefono}</div>
                ) : null}
              </div>
              <div className="labelInputContainer">
                <label className="labelName" htmlFor="notas">
                  Notas:
                </label>
                <Field
                  as="textarea"
                  type="text"
                  className="inputName"
                  id="notas"
                  placeholder="Notas sobre el cliente"
                  name="notas"
                />
              </div>

              <input
                type="submit"
                className="formInputButton"
                value={cliente?.nombre ? "Editar Cliente" : "Agregar Cliente"}
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

Formulario.defaultProps = {
  client: {},
};

export { Formulario };
