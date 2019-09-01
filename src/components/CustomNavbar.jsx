import React, { Component } from 'react'
import { Navbar, Nav, FormControl, NavDropdown, Button, Form, Container } from 'react-bootstrap';
import axios from 'axios'
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './CustomNavbar.css'



export default class CustomNavbar extends Component {
  constructor(props) {
    super(props)

    this.state = {
        books: [],
        searchField: '',
        sort: '',
        newBookData: {
            image: '',
            description: '',
            title: ''
        },
        newBookModal: false,

    }
}

componentDidMount() {
  axios.get('http://localhost:8000/books/search')
    .then((data) => {
      this.setState({ books: [data] })
    })
}

handleSubmit = (e) => {
  e.preventDefault()
  axios.get('http://localhost:8000/books/search')
    .then((data) => {
      console.log(data)
      this.setState({ books: [data] })
    })
}

handleChange = (e) => {
  this.setState({ searchField: e.target.value })
}

handleSort = (e) => {
  this.setState({ sort: e.target.value })
}

componentWillMount() {
  this._refreshBooks()
}

toggleNewBookModal() {
  this.setState({
      newBookModal: !this.state.newBookModal
  })
}

addBook() {
  axios.post('http://localhost:8000/books', this.state.newBookData)
      .then((response) => {
          let { books } = this.state

          books.push(response.data)

          this.setState({books, newBookModal: false, newBookData: {
              image: '',
              description: '',
              title: ''
          }})
      })
}

_refreshBooks() {
  axios.get('http://localhost:8000/books')
      .then((response) => {
          this.setState({
              books: response.data
          })
      })
}
  


  // FUNCTION SIDEBAR

  openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }
  
  closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
  }


  render() {

      return (

          <Container>

            <Modal isOpen={this.state.newBookModal} toggle={this.toggleNewBookModal.bind(this)}>
              <ModalHeader toggle={this.toggleNewBookModal.bind(this)}>Add New Book</ModalHeader>
              <ModalBody>
                <FormGroup>
                  <Label for="image">URL Image</Label>
                  <Input id="title" value={this.state.newBookData.image} onChange={(e) => {
                    let { newBookData } = this.state;

                    newBookData.image = e.target.value;

                    this.setState({ newBookData });
                  }} />
                </FormGroup>
                <FormGroup>
                  <Label for="description">Description</Label>
                  <Input id="description" value={this.state.newBookData.description} onChange={(e) => {
                    let { newBookData } = this.state;

                    newBookData.description = e.target.value;

                    this.setState({ newBookData });
                  }} />
                </FormGroup>
                <FormGroup>
                  <Label for="title">Title</Label>
                  <Input id="title" value={this.state.newBookData.title} onChange={(e) => {
                    let { newBookData } = this.state;

                    newBookData.title = e.target.value;

                    this.setState({ newBookData });
                  }} />
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.addBook.bind(this)}>Add Book</Button>{' '}
                <Button color="secondary" onClick={this.toggleNewBookModal.bind(this)}>Cancel</Button>
              </ModalFooter>
            </Modal>

            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">

                <div id="mySidenav" className="sidenav">
                  <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>&times;</a>
                  <a href="/">Home</a>
                  <a href="/explore">Explore</a>
                  <a href="history">History</a>
                  <a href="#" onClick={this.toggleNewBookModal.bind(this)}>Add Book</a>
                </div>
                <div id="main">
                <span style={{fontSize: 30, cursor: "pointer"}} onClick={this.openNav}>&#9776;</span>
                </div>  
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                      <NavDropdown title="All Genres" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/genre/1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="/genre/:id">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="/genre/:id">Something</NavDropdown.Item>
                      </NavDropdown>
                      <NavDropdown title="All Times" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/release/1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="/release">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="/release">Something</NavDropdown.Item>
                      </NavDropdown>
                    </Nav>
                    <Form inline onSubmit={this.handleSubmit}>
                        <FormControl onChange={this.handleChange} type="text" placeholder="Search" className="mr-sm-2" />
                        <Button type="submit" variant="outline-primary">Search</Button>
                    </Form>
                    <Nav>
                      <Nav.Link href="/login">Login</Nav.Link>
                      <Nav.Link eventKey={2} href="/register">
                        Register
                      </Nav.Link>
                    </Nav>
                  </Navbar.Collapse>

                </Navbar>

          </Container>
      )
  }
}
