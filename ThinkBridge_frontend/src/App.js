
import React from 'react'
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
      image: [],
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
      // console.log("jjkhkjhkhk", response.data)
      if (response.data.success === true) {
        this.setState({
          image: response.data.data
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
        alert("The file is successfully uploaded");
      }).catch((error) => {
        console.log("Error", error)
      });
  }
  onFileChange(e) {
    this.setState({ file: e.target.files[0] });
  }

  render() {
    const { image } = this.state;
    console.log("image", image)
    return (
      <div>
        <button className="w3-btn w3-Green w3-display-topmiddle"
          style={{ padding: 10, margin: 40 }} onClick={() => this.setState({ show: true })}>Add Item</button>
        <div className={`w3-modal ${this.state.show ? "w3-show" : "w3-hide"}`}>
          <div className="w3-container w3-card-2 w3-white"
            style={{ width: "30%", margin: "auto", marginTop: "100px" }}>

            <form onSubmit={this.onFormSubmit}>
              <h1 className="w3-text-blue">Add Item</h1>

              <label className="w3-left">Item Name : </label>
              <input className="w3-input" type="input" name="name"
                onChange={this.handleChange}
                value={this.state.name}></input>

              <label className="w3-left">Item Description : </label>
              <input className="w3-input" type="input" name="description"
                onChange={this.handleChange}
                value={this.state.description} ></input>

              <label className="w3-left">Item Price: </label>
              <input className="w3-input" type="input" name="price"
                onChange={this.handleChange}
                value={this.state.price} ></input>

              <label className="w3-left">Item Image: </label>
              <input type="file" name="myImage" onChange={this.onFileChange} />
              <button type="submit"
                className="w3-btn w3-blue-grey w3-right w3-margin-bottom w3-margin-top"
                onClick={() => this.setState({ show: false })}>Submit</button>
              <button type="submit"
                className="w3-btn w3-blue-grey w3-left w3-margin-bottom w3-margin-top"
                onClick={() => this.setState({ show: false })}>Cancel</button>
            </form>
          </div>
        </div>
        {/* <div style={{ position: "absolute", top: 20, right: 20 }}> */}
        <table className="w3-table-all w3-margin-bottom" style={{ padding: 10, margin: "10%" }}>
          <tbody>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
            {this.state.image.map((res, idx) =>
              <tr key={idx}>
                
                <td><img key={idx} src={`http://localhost:4000/uploads/${res.imageUrl}`} style={{width:50, height:50}}></img></td>
                <td>{res.name}</td>
                <td>{res.description}</td>
                <td>{res.price}</td>
                <td><span
                  onClick={this.deleteItem.bind(this, res.id)}
                  className="w3-btn w3-white">Delete</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* </div> */}
      </div>
    )
  }
}

export default Item;
