import { useState, useEffect } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

const RegisterScreen = () => {
    const [companyName, setCompanyName] = useState('');
    const [companyEmail, setCompanyEmail] = useState('');
    const [companyContactNo, setCompanyContactNo] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userInfo }  = useSelector((state) => state.auth);

    const [register, { isLoading }] = useRegisterMutation();

    useEffect(() => {
        if (userInfo) {
            navigate('/dashboard');
        }
    }, [navigate, userInfo]);


    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
        } else {
            try {
                const res = await register({ 
                    companyName,
                    companyEmail,
                    companyContactNo,
                    password
                }).unwrap();
                dispatch(setCredentials({ ...res }));
                navigate('/dashboard');
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

  return (
    <FormContainer>
        <h1>Company Registration</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group className='my-2' controlId='companyName'>
                <Form.Control
                    type='text'
                    placeholder='Enter company name'
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='companyEmail'>
                <Form.Control
                    type='text'
                    placeholder='Enter company email'
                    value={companyEmail}
                    onChange={(e) => setCompanyEmail(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='companyContactNo'>
                <Form.Control
                    type='text'
                    placeholder='Enter company contact number'
                    value={companyContactNo}
                    onChange={(e) => setCompanyContactNo(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='password'>
                <Form.Control
                    type='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='confirmPassword'>
                <Form.Control
                    type='password'
                    placeholder='Confirm password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>

            {isLoading && <Loader />}

            <Button type='submit' variant='primary' className='mt-2'>
                {isLoading ? 'Registering...' : 'Register'}
            </Button>

            <Row className='py-3'>
                <Col>
                    Already Registered? <Link to='/login'>Sign in</Link>
                </Col>
            </Row>
        </Form>
    </FormContainer>
  )
}

export default RegisterScreen;