import React from 'react'
import axios from 'axios'

class Profile extends React.Component {
    constructor() {
        super()
        this.state = {
            image: [],
            id: window.location.pathname.split('/').pop(),
            isLoading:true,
        }
    }

    componentDidMount() {
        axios.get("http://localhost:4000/item/listitem").then((response) => {
          console.log("rdfdf", response.data.data[0])
            if (response.data.success === true) {
              this.setState({
                image: response.data.data[0]
              })
            }
          })
      }


    render() {
        var image = this.state.image
        console.log('result', image.name)
        return (
            <div>
            <img src={`http://localhost:4000/uploads/${this.state.image.imageUrl}`} alt ='' style={{width:"50%", height:"50%"}}></img>
            <h1>{this.state.image.name}</h1>
            <h1>{this.state.image.description}</h1>
            <h1>${this.state.image.price}</h1>
            </div>
        )
    }
}

export default Profile;