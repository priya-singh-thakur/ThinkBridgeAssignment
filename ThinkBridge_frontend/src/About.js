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
            if (response.data.success === true) {
              this.setState({
                image: response.data.data
              })
            }
          })
      }

    render() {
        // var result = this.state.profiles.filter(item =>(item.id == this.state.id))
        // console.log('result', result)
        var display = <h1>Loading</h1>
        return (
            <div>
               <table className="w3-table-all w3-margin-bottom" style={{ padding: 10, margin: "10%" }}>
               <tbody>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
              <tr>
                <td><img src={`http://localhost:4000/uploads/${this.state.image[0].imageUrl}`} style={{width:50, height:50}}></img></td>
                <td>{this.state.image[0].name}</td>
                <td>{this.state.image[0].description}</td>
                <td>{this.state.image[0].price}</td>
              </tr>
            {/* ))} */}
          </tbody>
          </table>
            </div>
        )
    }
}

export default Profile;