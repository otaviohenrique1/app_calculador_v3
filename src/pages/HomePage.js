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
  const [resultadoExpressao, setResultado] = useState("")
  
  function onSubmitForm(values) {
    let campoNome = values.nome;
    let campoA = values.campoA;
    let campoB = values.campoB;
    let campoC = values.campoC;
    let resultadoCalculaMedida = Calculador.CalculaMedida(campoA, campoB, campoC);
    let resultadoCalculaMedidaExpressao = Calculador.CalculaMedidaExpressao(resultadoCalculaMedida, campoC, campoNome);
    setResultado(resultadoCalculaMedidaExpressao);
  }

  function abreAjuda() {
    alert(`
      App calculador
      a --- c
      b --- x
      x=(b*c)/a
    `);
  }

  return (
    <Container>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmitForm}
        validationSchema={validationSchema}
      >
        {({ values }) => (
          <Form>
            <Row>
              <Col md={12}>
                <h1 class="text-center">App Calculador v3</h1>
              </Col>
              <Campo
                label="Nome"
                type="text"
                id="campo_nome"
                name="campo_nome"
                placeholder="Nome da medida"
              />
              <Campo
                label="Campo A"
                type="number"
                id="campo_a"
                name="campo_a"
                placeholder="Medida campo A"
              />
              <Campo
                label="Campo B"
                type="number"
                id="campo_b"
                name="campo_b"
                placeholder="Medida campo B"
              />
              <Campo
                label="Campo C"
                type="number"
                id="campo_c"
                name="campo_c"
                placeholder="Medida campo C"
              />
              <Col md={12} className="text-center">
                <h2>Resultado</h2>
                <h3>{resultadoExpressao}</h3>
              </Col>
              <Col md={12} className="text-center">
                <ButtonGroup>
                  <Button
                    type="submit"
                    color="primary"
                  >Calcular</Button>
                  <Button
                    type="reset"
                    color="danger"
                  >Limpar</Button>
                  <Button
                    type="button"
                    color="info"
                    onClick={abreAjuda}
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
    <Col md={12}>
      <InputGroup>
        <InputGroupText>{props.label}</InputGroupText>
        <Field
          type={props.type}
          class="form-control"
          id={props.id}
          name={props.name}
          placeholder={props.placeholder}
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
};
