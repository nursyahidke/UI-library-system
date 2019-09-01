import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';
import {Link}  from 'react-router-dom';
import './Details.css';
import axios from 'axios';
import { Container } from 'react-bootstrap';

class Details extends Component{
    constructor(props){
        super(props);
        this.state={
            databook:[],
            editBookData: {
              id: '',
              image: '',
              description: '',
              title: ''
            },
            editBookModal: false
        }
      }
      componentDidMount = () => {
        axios.get('http://localhost:8000/books')
          .then (res => {
            this.setState ({databook: res.data});
            console.log ('databook =', this.state.databook);
          })
          .catch (err => console.log ('error =', err));
      }

      toggleEditBookModal() {
        this.setState({
          editBookModal: !this.state.editBookModal
        })
      }
      
      updateBook() {

        axios.put('http://localhost:8000/books/', this.state.editBookData)
          .then((response) => {
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
        axios.delete('http://localhost:8000/books?id=' + id)
          .then((response) => {
            console.log(response)
            this._refreshBooks()
          })
      }

      _refreshBooks() {
        axios.get('http://localhost:8000/books')
          .then((response) => {
            this.setState({
              databook: response.data
            })
          })
      }



    render(){
        const {databook}=this.state;
        return(
        <Container>
            {databook.map((item)=>{
                if(item.id == this.props.match.params.id){
                  console.log(item.image)
                  return(
                  <Container>
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

                   
                        <div className="image-detail">
                        <img src={item.image} className="cover"></img>
                        </div>
                        

                        <div style={{fontSize: 50}}className="ellips" >
                            <Link to='/' style={{color: "yellow"}}><i className="far fa-arrow-alt-circle-left"></i></Link>
                        </div>
                        <div className="covermini"><img src={item.image}></img></div>
                        <Link><div color="white" size="sm" className="edit" onClick={this.editBook.bind(this, item.id, item.image, item.description, item.title)}><b>Edit</b></div></Link>
                        <Link><div color="white" size="sm" className="delete" onClick={this.deleteBook.bind(this, item.id)}><b>Delete</b></div></Link>
                 
                      <div className="rectangle" style={{fontSize: 18, textAlign: "center"}}>{item.book_genre}</div>
                      <p className="title">{item.title}</p>
                      <p className="date">{item.released_date}</p>
                      <p className="box">{item.description}</p>
                      <div className="avail">{item.available}</div>
                      <div className="borrow" style={{fontSize: 37, textAlign: "center"}}>Borrow</div>
                </Container>
                    
                )}
              })
            }
          </Container>
      )
    }
}
export default Details;