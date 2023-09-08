import React from 'react';
import Header from './Header';
import {useTranslation} from 'react-i18next';
import {Form as RectRouterForm, Link, useLoaderData} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ApiResponse from './ApiResponse';
import SignInError from './SignInError';
import PasswordField from './PasswordField';


const SignIn = () => {
  const { t} = useTranslation();

  const authenticationProviders = useLoaderData();

  function importAll(r) {
    let images = {};
    r.keys().map((item) => { images[item.replace('./', '')] = r(item); return null; });
    return images;
  }

  const images = importAll(require.context('../images/providers', false, /\.(png|jpe?g|svg)$/));

  return (
    <>
      <Header/>
      <Container>
          <ApiResponse/>
          <SignInError/>
          <Row className='mt-3'>
              <Col>
                  {t('sign.in.credentials')}
              </Col>
          </Row>
          <RectRouterForm method='post'>
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
              <Row className='mt-3'>
                  <Col>
                      <PasswordField id='password' name='password' label={t('password')}/>
                  </Col>
              </Row>
              <Row className='mt-3'>
                  <Col>
                      <Form.Check name='rememberMe' label={t('remember.me')} value={true} />
                  </Col>
              </Row>
              <Row className='mt-3'>
                  <Col>
                      <Button type='submit'>{t('sign.in')}</Button>
                  </Col>
              </Row>
              <Row className='mt-3'>
                  <Col>
                      {t('not.a.member')} <Link to='/signUp'>{t('sign.up.now')}</Link> | <Link to='/password/forgot'>{t('forgot.your.password')}</Link>
                  </Col>
              </Row>
              <Row className='mt-3'>
                  <Col>
                      {t('or.use.social')}
                  </Col>
              </Row>
              <Row className='mt-3'>
                  {authenticationProviders && authenticationProviders.length > 0 ? authenticationProviders.map((providerId, idx) => {
                      return(<Col key={idx}>
                          <a className={`provider ${providerId}`} href={'/authenticate/'+ providerId}>
                              <img src={images[providerId + '.png']} alt={providerId}/>
                          </a>
                      </Col>)
                  }) : null}

              </Row>
          </RectRouterForm>
      </Container>
    </>
  )
}

export default SignIn;
