import { Container, Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Hero = () => {
  return (
    <div className=' py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <h1 className='text-center mb-4'>DriverLog</h1>
          <p className='text-center mb-4'>
          Efficiently Track and Manage Your Driver Logs with DriverLog Web App - Simplify Compliance, Maximize Efficiency, and Improve Safety.
          </p>
          <div className='d-flex'>
            <LinkContainer to='/login'>
            <Button variant='primary' className='me-3'>
              Sign In
            </Button>
            </LinkContainer>
            <LinkContainer to='/register'>
            <Button variant='secondary'>
              Sign Up
            </Button>
            </LinkContainer>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;