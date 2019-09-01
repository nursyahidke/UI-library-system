
import React from 'react';
import {Card, Button, CardColumns} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import axios from 'axios';

class CardImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      data: []
    }
  }

  componentDidMount() {
    const apiUrl = 'http://localhost:8000/books';

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
      return ( <div>Error: {error.message}</div> )
    } else {
      return(
        <div>
          <h2>List Books</h2>
            <CardColumns>
            {data.map(item => (
                <Card key={item.id}>
                    <Card.Img height={350} width={200} variant='top' src={item.image}/>
                    <Card.Body>
                        <Card.Title>{item.title.substr(0.26)}</Card.Title>
                        <Card.Text>
                            {item.description.substr(0,80)}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Link to={`/details/${item.id}`}>
                            <Button bsstyle='primary'>Details</Button>
                        </Link>
                    </Card.Footer>
                </Card>
            ))}
            </CardColumns>
        </div>
      )
    }
  }
}

export default CardImage;
