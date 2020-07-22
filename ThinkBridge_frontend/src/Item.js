
import React from 'react'
import { Link } from 'react-router-dom'
const axios = require("axios");


class Item extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      price: '',
      file: null,
      show: false,
      data: [],
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.fetchItemList();
  }

  handleChange(e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    })
  }
  deleteItem(itemId) {
    const id = itemId
    axios.delete(`http://localhost:4000/item/deleteitem/${id}`)
      .then(response => {
        if (response.data.success === true) {
          this.fetchItemList();
        }
        console.log("delete response", response)
        alert("data deleted")
      })
  }
  fetchItemList() {
    axios.get("http://localhost:4000/item/listitem").then((response) => {
      console.log("response", response)
      if (response.data.success === true) {
        this.setState({
          data: response.data.data
        })
      }
    })
  }
  onFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', this.state.name);
    formData.append('description', this.state.description);
    formData.append('price', this.state.price);
    formData.append('myImage', this.state.file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
    axios.post("http://localhost:4000/item/additem", formData, config)
      .then((response) => {
        this.fetchItemList();
        alert("Form Sumitted");
      }).catch((error) => {
        console.log("Error", error)
      });
      this.setState({
        name: '',
        description: '',
        price: '',
        file: null,
      })
  }
  onFileChange(e) {
    this.setState({ file: e.target.files[0] });
  }

  render() {
    const { data } = this.state;
    console.log("data", data)
    return (
      <div>
        <button className="button w3-btn w3-Green w3-display-topmiddle"
          onClick={() => this.setState({ show: true })}>Add Item</button>

        <div className={`w3-modal ${this.state.show ? "w3-show" : "w3-hide"}`}>
          <div className="model w3-container w3-modal-content w3-card-4 w3-animate-zoom w3-white"
          >

            <form className="w3-container" onSubmit={this.onFormSubmit}>
              <h2><b>Add Item</b></h2>

              <label><b>Item Name</b></label>
              <input className="w3-input w3-border w3-margin-bottom"
                placeholder="Please Enter the Product Name" type="text" name="name"
                onChange={this.handleChange}
                value={this.state.name}></input>

              <label><b>Item Description</b></label>
              <input className="desc w3-input w3-border w3-margin-bottom"
                placeholder="Please Enter the Description" type="text" name="description"
                onChange={this.handleChange}
                value={this.state.description} ></input>

              <label className="w3-left"><b>Item Price</b></label>
              <input className="w3-input w3-border w3-margin-bottom"
                placeholder="Please Enter the Amount" type="text" name="price"
                onChange={this.handleChange}
                value={this.state.price} ></input>

              <label><b>Item Image</b></label>
              <input type="file" name="myImage" onChange={this.onFileChange} className='w3-button w3-teal w3-margin-left' />

              <div class="w3-container w3-border-top w3-padding-16">
                <button type="button" className="w3-button w3-grey"
                  onClick={() => this.setState({ show: false })}>Cacel</button>

                <button className="w3-right w3-padding w3-grey"
                  onClick={() => this.setState({ show: false })}>Submit</button>
              </div>
            </form>
          </div>
        </div>
        <div className="w3-container">
          <table className="w3-table-all"
            style={{ width: "1200px", margin: "auto", marginTop: "10%" }}>
            <tr>
              <th >Product</th>
              <th >Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
            {this.state.data.map((list, idx) => {
              return <tr>
                <Link to={{ pathname: `/about/${list.id}` }}>
                  <td><img className='image' key={idx} src={`http://localhost:4000/uploads/${list.imageUrl}`} alt=''></img></td>
                </Link>
                <td>{list.name}</td>
                <td>{list.price}</td>
                <td>
                  <button className="w3-button w3-red" onClick={this.deleteItem.bind(this, list.id)}>Delete</button>
                </td>
              </tr>
            })}
          </table>
        </div>
      </div>
    )
  }
}

export default Item;
