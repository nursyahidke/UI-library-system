import React, {Component} from 'react'
import axios from 'axios'
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';


export default class ModalImage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            books: [],
            newBookData: {
                image: '',
                description: '',
                title: ''
            },
            editBookData: {
                id: '',
                image: '',
                description: '',
                title: ''
            },
            newBookModal: false,
            editBookModal: false,
        }
    }

    componentWillMount() {
        this._refreshBooks()
    }

    toggleNewBookModal() {
        this.setState({
            newBookModal: !this.state.newBookModal
        })
    }

    toggleEditBookModal() {
        this.setState({
            editBookModal: !this.state.editBookModal
        })
    }

    addBook() {
        axios.post('https://libraryapps.herokuapp.com/api/books', this.state.newBookData)
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

    updateBook() {
        let { image, description, title } = this.state.editBookData

        axios.put('https://libraryapps.herokuapp.com/api/books', this.state.editBookData, {
            image, description, title
        }).then((response) => {
            this._refreshBooks()

            this.setState({
                editBookModal: false, editBookData: { image: '', description: '', title: ''}
            })
        })
    }

    editBook(id, image, description, title) {
        this.setState({
            editBookData: { id, image, description, title }, editBookModal: !this.state.editBookModal
        })
    }

    deleteBook(id) {
        axios.delete('https://libraryapps.herokuapp.com/api/books?id=' + id)
            .then((response) => {
                this._refreshBooks()
            })
    }

    _refreshBooks() {
        axios.get('https://libraryapps.herokuapp.com/api/books')
            .then((response) => {
                this.setState({
                    books: response.data
                })
            })
    }

    render() {

        let books = this.state.books.map((book) => {
            return (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.image}</td>
                <td>{book.description}</td>
                <td>{book.title}</td>
                <td>
                  <Button color="success" size="sm" className="mr-2" onClick={this.editBook.bind(this, book.id, book.image, book.description, book.title)}>
                      Edit
                  </Button>
                  <Button color="danger" size="sm" onClick={this.deleteBook.bind(this, book.id)}>
                      Delete
                  </Button>
                </td>
              </tr>
            )
          })

        return (

            <div className="App container">

            <h1>Books App</h1>
      
            <Button className="my-3" color="primary" onClick={this.toggleNewBookModal.bind(this)}>Add Book</Button>
      
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
      
            <Modal isOpen={this.state.editBookModal} toggle={this.toggleEditBookModal.bind(this)}>
              <ModalHeader toggle={this.toggleEditBookModal.bind(this)}>Edit Book</ModalHeader>

              <ModalBody>
                <FormGroup>
                  <Label for="image">URL Image</Label>
                  <Input id="image" value={this.state.editBookData.image} onChange={(e) => {
                    let { editBookData } = this.state;
      
                    editBookData.image = e.target.value;
      
                    this.setState({ editBookData });
                  }} />
                </FormGroup>

                <FormGroup>
                  <Label for="description">Description</Label>
                  <Input id="description" value={this.state.editBookData.description} onChange={(e) => {
                    let { editBookData } = this.state;
      
                    editBookData.description = e.target.value;
      
                    this.setState({ editBookData });
                  }} />
                </FormGroup>
                <FormGroup>
                  <Label for="title">Title</Label>
                  <Input id="title" value={this.state.editBookData.title} onChange={(e) => {
                    let { editBookData } = this.state;
      
                    editBookData.title = e.target.value;
      
                    this.setState({ editBookData });
                  }} />
                </FormGroup>
      
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.updateBook.bind(this)}>Update Book</Button>{' '}
                <Button color="secondary" onClick={this.toggleEditBookModal.bind(this)}>Cancel</Button>
              </ModalFooter>
            </Modal>
      
      
              <Table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Title</th>
                    <th>Actions</th>
                  </tr>
                </thead>
      
                <tbody>
                  {books}
                </tbody>
              </Table>
            </div>
        )
    }
}
