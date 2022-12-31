import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useState, useContext, useEffect} from 'react';
import { AuthContext } from './App';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {

  const [user, setUser] = useState({});
  const { authToken } = useContext(AuthContext);

  useEffect(() => {
    const url = `http://localhost:4000/user/${localStorage.getItem("user")}`
    axios.defaults.headers.common["Authorization"] = `${authToken || localStorage.getItem("token")}`;
    axios.get(url)
    .then(res => {
      console.log(res.data.data.user);
      setUser(res.data.data.user);
    })
    .catch(error => {
      alert(error.response.data.message);
    })
  }, [])

  return (
    <>
    <Navbar>
      <Container>
        <Navbar.Brand href="#home">Home page</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Link to="/logout"> Log out </Link>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={user.image} />
        <Card.Body>
          <Card.Title>User Profile</Card.Title>
          <Card.Text>
            <p>Name: {user.name}</p>
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>
            <p>Email: {user.email}</p>
          </ListGroup.Item>
          <ListGroup.Item>
            <p>DOB: {user?.dob?.split('T')[0]}</p>
          </ListGroup.Item>
          <ListGroup.Item>
            <p>Gender: {user.gender}</p>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </>
  );
}

export default Home;
