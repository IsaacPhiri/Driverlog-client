import { useState, useEffect } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';


const LoginScreen = () => {
    const [companyEmail, setCompanyEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();

    const { userInfo }  = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) {
            navigate('/dashboard');
        }
    }, [navigate, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ companyEmail, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            toast.success('Logged in successfully');
            navigate('/dashboard');
            setCompanyEmail('');
            setPassword('');

        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

  return (
    <FormContainer>
        <h1>Login</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group className='my-2' controlId='companyEmail'>
                <Form.Label>Company Email</Form.Label>
                <Form.Control
                    type='email'
                    placeholder='Enter email'
                    value={companyEmail}
                    onChange={(e) => setCompanyEmail(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>

            {isLoading && <Loader />}

            <Button type='submit' variant='primary' className='mt-2'>
                {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>

            <Row className='py-3'>
                <Col>
                    Not Registered? <Link to='/register'>Register</Link>
                </Col>
            </Row>
        </Form>
    </FormContainer>
  )
}

export default LoginScreen;