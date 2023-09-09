import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { setCredentials } from '../slices/authSlice';
import { useUpdateUserMutation } from '../slices/usersApiSlice';

const ProfileScreen = () => {
    const [companyName, setCompanyName] = useState('');
    const [companyEmail, setCompanyEmail] = useState('');
    const [companyContactNo, setCompanyContactNo] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');
    const [companyRegNo, setCompanyRegNo] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userInfo }  = useSelector((state) => state.auth);

    const [updateProfile, { isLoading }] = useUpdateUserMutation();

    useEffect(() => {
        setCompanyName(userInfo.companyName);
        setCompanyEmail(userInfo.companyEmail);
        setCompanyContactNo(userInfo.companyContactNo);
        setCompanyAddress(userInfo.companyAddress);
        setCompanyRegNo(userInfo.companyRegNo);
    }, [
        userInfo.companyName,
        userInfo.companyEmail,
        userInfo.companyContactNo,
        userInfo.companyAddress,
        userInfo.companyRegNo
    ]);


    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
        } else {try {
            const res = await updateProfile({
                id: userInfo.id,
                companyName,
                companyEmail,
                companyContactNo,
                companyAddress,
                companyRegNo,
                password
            }).unwrap();
            dispatch(setCredentials({...res}));
            toast.success('Profile Updated Successfully');
            navigate('/dashboard');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
        }
    };

  return (
    <FormContainer>
        <h1>Update Company Profile</h1>

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

            <Form.Group className='my-2' controlId='companyAddress'>
                <Form.Control
                    type='text'
                    placeholder='Enter company address'
                    value={companyAddress}
                    onChange={(e) => setCompanyAddress(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='companyRegNo'>
                <Form.Control
                    type='text'
                    placeholder='Enter company registration number'
                    value={companyRegNo}
                    onChange={(e) => setCompanyRegNo(e.target.value)}
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
                {isLoading ? 'Updating...' : 'Update'}
            </Button>

        </Form>
    </FormContainer>
  )
}

export default ProfileScreen;