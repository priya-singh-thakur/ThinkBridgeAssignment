import React from 'react'
import axios from 'axios'

class About extends React.Component {
  constructor() {
    super()
    this.state = {
      data: [],
      id: window.location.pathname.split('/').pop(),
      isLoading: true,
    }
  }
  componentDidMount() {
    axios.get("http://localhost:4000/item/listitem").then((response) => {
      const result = response.data.data.filter(item => (item.id == this.state.id))
      this.setState({
        data: result,
        isLoading: false,
      })
    })
  }
  render() {
    var display = <h1>Loading</h1>
    return (
      <div class="w3-container">
        {this.state.isLoading ? display :
          <div className="main-card w3-card w3-center w3-display-middle" style={{width:"48%"}}>
            <div>
              <img src={`http://localhost:4000/uploads/${this.state.data[0].imageUrl}`} alt='' style={{marginTop:30}}></img>
            </div>
            <div>
              <h4><b>{this.state.data[0].name}</b></h4>
            </div>
            <div>
              <h3><b>₹{this.state.data[0].price}</b></h3>
            </div>
            <div>
              <h4><b>About Product:{this.state.data[0].description}</b></h4>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default About;