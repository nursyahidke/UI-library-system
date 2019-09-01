import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Details.css'
import axios from 'axios'

class Details extends Component{
    constructor(props){
        super(props);
        this.state={
            databook:[],
        };
      }
      componentDidMount = () => {
        axios.get('http://localhost:8000/books')
          .then (res => {
            this.setState ({databook: res.data})
            console.log ('databook =', this.state.databook)
          })
          .catch (err => console.log ('error =', err))
      }
      
    render(){
        const {databook}=this.state;
        return(
          <div>
            {databook.map((item)=>{
                if(item.genre_id === this.props.match.params.genre_id){
                  console.log(item.image)
                  return(
                    <div>
                        <img src={item.image} />    
                        <p>{item.description}</p>
                    </div>
                    
                )}
              })
            }
          </div>
      )
    }
}
export default Details;