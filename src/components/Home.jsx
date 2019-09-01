import React, {Component} from 'react'
import axios from 'axios'
import {Jumbotron, Container, Carousel, Pagination} from 'react-bootstrap'
import CardImage from './Card'
import './Home.css'

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          data: []
        }
      }
      componentDidMount() {
        const apiUrl = 'https://libraryapps.herokuapp.com/api/books';
    
        axios.get(apiUrl)
          .then(res => {
            const data = res.data
            this.setState({ data })
          })
          .catch(err => console.log('error: ', err))
      }    
      render() {
        const { error, data} = this.state;

        if(error) {
          return (
            <div>Error: {error.message}</div>
          )
        } else {
        return (
            <Container>
                <Jumbotron>
                    <Carousel>
                        {data.map(item => (
                        <Carousel.Item key={item.id}>
                          <div className="overflow">
                            <img 
                                    className="d-block w-100"
                                    src={item.image}
                                    alt="First slide"
                            />
                          </div>
                            <Carousel.Caption>
                                <h3>{item.title}</h3>
                                <p>{item.description.substr(0,20)}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        ))}
                    </Carousel>
                </Jumbotron>
                <br/>
                <br/>
                <CardImage />
                <Pagination>
                <Pagination.First />
                <Pagination.Prev />
                <Pagination.Item>{1}</Pagination.Item>

                <Pagination.Item>{2}</Pagination.Item>
                <Pagination.Item active>{3}</Pagination.Item>
                <Pagination.Item>{4}</Pagination.Item>

                <Pagination.Item>{5}</Pagination.Item>
                <Pagination.Next />
                <Pagination.Last />
                </Pagination>
                <br/>
                <footer id="footer">
                    Created with ❤ by <b>Nursyahid</b> Powered by <a href="http://www.arkademy.com" target="_blank" rel="noopener noreferrer">Arkademy</a> @2019
                </footer>

            </Container>
            )
        }
    }
}