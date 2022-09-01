import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { Button, ButtonGroup, Col, Container, InputGroup, InputGroupText, Row } from 'reactstrap'
import PropTypes from 'prop-types';
import { object, string, number } from 'yup';
import Calculador from '../utils/utils';

let validationSchema = object({
  nome: string()
    .required("Campo 'nome' vazio"),
  campoA: number()
    .required("Campo 'campoA' vazio")
    .positive("Aceita somente numeros positivos"),
  campoB: number()
    .required("Campo 'campoB' vazio")
    .positive("Aceita somente numeros positivos"),
  campoC: number()
    .required("Campo 'campoC' vazio")
    .positive("Aceita somente numeros positivos"),
});

const initialValues = {
  nome: "",
  campoA: 0,
  campoB: 0,
  campoC: 0,
};

export default function HomePage() {
  const [resultadoExpressao, setResultado] = useState("0.0")

  return (
    <Container>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, formikHelpers) => {
          let campoNome = values.nome;
          let campoA = values.campoA;
          let campoB = values.campoB;
          let campoC = values.campoC;
          let resultadoCalculaMedida = Calculador.CalculaMedida(campoA, campoB, campoC);
          let resultadoCalculaMedidaExpressao = Calculador.CalculaMedidaExpressao(resultadoCalculaMedida, campoC, campoNome);
          setResultado(resultadoCalculaMedidaExpressao);
        }}
        validationSchema={validationSchema}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <Row>
              <Col md={12} className="mb-5 mt-3">
                <h1 className="text-center">App Calculador v3</h1>
              </Col>
              <Campo
                label="Nome"
                type="text"
                id="campo_nome"
                name="campo_nome"
                placeholder="Nome da medida"
                value={values.nome}
              />
              <Campo
                label="Campo A"
                type="number"
                id="campo_a"
                name="campo_a"
                placeholder="Medida campo A"
                value={values.campoA}
              />
              <Campo
                label="Campo B"
                type="number"
                id="campo_b"
                name="campo_b"
                placeholder="Medida campo B"
                value={values.campoB}
              />
              <Campo
                label="Campo C"
                type="number"
                id="campo_c"
                name="campo_c"
                placeholder="Medida campo C"
                value={values.campoC}
              />
              <Col md={12} className="text-center mt-4">
                <h2>Resultado</h2>
                <h3>{resultadoExpressao}</h3>
              </Col>
              <Col md={12} className="text-center mt-3">
                <ButtonGroup>
                  <Button
                    type="submit"
                    color="primary"
                  >Calcular</Button>
                  <Button
                    type="button"
                    color="danger"
                    onClick={() => {
                      setFieldValue("nome", "");
                      setFieldValue("campoA", "");
                      setFieldValue("campoB", "");
                      setFieldValue("campoC", "");
                      setResultado("0.0");
                    }}
                  >Limpar</Button>
                  <Button
                    type="button"
                    color="info"
                    onClick={() => {
                      alert(`
                        App calculador
                        a --- c
                        b --- x
                        x=(b*c)/a
                      `);
                    }}
                  >Ajuda</Button>
                </ButtonGroup>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </Container>
  )
}

function Campo(props) {
  return (
    <Col md={12} className="mb-3">
      <InputGroup>
        <InputGroupText>{props.label}</InputGroupText>
        <Field
          type={props.type}
          className="form-control"
          id={props.id}
          name={props.name}
          placeholder={props.placeholder}
          value={props.value}
        />
      </InputGroup>
      <ErrorMessage
        component="span"
        name={props.name}
      />
    </Col>
  );
}

Campo.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.any,
};
