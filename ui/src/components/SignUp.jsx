import React from 'react';
import {useTranslation} from 'react-i18next';
import {Form as ReactRouterForm, useActionData} from 'react-router-dom';
import Header from './Header';
import PasswordFieldWithStrength from './PasswordFieldWithStrength';
import ApiResponse from './ApiResponse';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';

const SignUp = () => {
  const { t } = useTranslation();

  const signupResponse = useActionData();
  console.log(signupResponse);

  return (
    <>
      <Header/>
      <Container>
          <ApiResponse/>
          <ReactRouterForm method='post'>
              <Row className='mt-3'>
                  <Col>
                      {t('sign.up.account')}
                  </Col>
              </Row>
              <Row className='mt-3'>
                  <Col>
                      <FloatingLabel label={t('first.name')}>
                          <Form.Control
                              id='firstName'
                              name='firstName'
                              placeholder='First Name'
                          />
                      </FloatingLabel>
                  </Col>
              </Row>
              <Row className='mt-3'>
                  <Col>
                      <FloatingLabel label={t('last.name')}>
                          <Form.Control
                              id='lastName'
                              name='lastName'
                              placeholder='Last Name'
                          />
                      </FloatingLabel>
                  </Col>
              </Row>
              <Row className='mt-3'>
                  <Col>
                      <FloatingLabel label={t('email')}>
                          <Form.Control
                              id='email'
                              name='email'
                              type='email'
                              placeholder='email@example.com'
                          />
                      </FloatingLabel>
                  </Col>
              </Row>
              <PasswordFieldWithStrength id='password' name='password' label={t('password')} />
              <Row className='mt-3'>
                  <Col>
                      <Button type='submit'>{t('sign.up')}</Button>
                  </Col>
              </Row>
          </ReactRouterForm>
      </Container>
    </>
  );
};

export default SignUp;
