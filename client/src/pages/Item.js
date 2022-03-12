import React, { Component } from 'react';
import api from '../api';
import styled from 'styled-components';
import { TextField } from '@material-ui/core';

const Title = styled.h1.attrs({
  className: 'h1',
})``;

const Wrapper = styled.div.attrs({
  className: 'form-group',
})`
  margin-top: 0 30px;
`;


const Button = styled.button.attrs({
  className: 'btn btn-primary',
})`
  margin: 15px 15px 15px 5px;
`;

const CancelButton = styled.a.attrs({
  className: 'btn btn-danger',
})`
  margin: 15px 15px 15px 5px;
`;

declare class Item {
  constructor(props) {
    super(props);
    this.state = {
      _id: '',
      firstName: '',
      lastName: '',
      age: 0,
      zipCode: '',
      keyFindings: '',
      address: '',
      hoursAd: '',
      brix:'',
    };
  }

  componentDidMount() {
    const itemId = this.props.match.params.id;
    this.fetchSingleItem(itemId).then(resp => {
      const { item } = resp.data;
      this.setState({ ...item });
    });
  }

  fetchSingleItem = itemId => {
    return api
      .getItemById(itemId)
      .then(resp => {
        console.log('getItemById: resp');
        console.log(resp);
        return resp;
      })
      .catch(err => {
        console.error(`ERROR in 'fetchSingleItem': ${err}`);
        console.error(err);
        return err;
      });
  };
 
  handleChangeInputFirstName = async event => {
    const firstName = event.target.value;
    this.setState({ firstName });
  };
  handleChangeInputLastName = async event => {
    const lastName = event.target.value;
    this.setState({ lastName });
  };

  handleChangeInputAge = async event => {
    const age = event.target.value;
    this.setState({ age });
  };

  handleChangeInputZipCode = async event => {
    const zipCode = event.target.value;
    this.setState({ zipCode });
  };

  handleChangeInputKeyFindings = async event => {
    const keyFindings = event.target.value;
    this.setState({ keyFindings });
  };

  handleChangeInputAddress = async event => {
    const address = event.target.value;
    this.setState({ address });
  };
  handleChangeInputHoursAd = async event => {
    const hoursAd = event.target.value;
    this.setState({ hoursAd });
  };

 handleChangeInputBrix = async event => {
    const brix = event.target.value;
    this.setState({ brix });
  };
  handleChangeInputImageName = async event => {
    const imageName = event.target.value;
    this.setState({ imageName });
  };
  
  updateSingleItem = item => {
    return api
      .updateItemById(item._id, item)
      .then(resp => {
        console.log('updateItem: resp');
        console.log(resp);
        if ((resp.data || {}).success) {
          const newItem = JSON.parse(resp.config.data);
          console.log('newItem: ', newItem);
        }
        return resp;
      })
      .catch(err => {
        console.error(`ERROR in 'updateSingleItem': ${err}`);
        console.error(err);
        return err;
      });
  };


  handleUpdateItem = event => {
    const { _id, firstName, lastName, age, zipCode, keyFindings, address, hoursAd, brix, imageName } = this.state;
    const item = { _id, firstName, lastName, age, zipCode, keyFindings, address, hoursAd, brix, imageName };

    return this.updateSingleItem(item)
      .then(resp => {
        console.log('handleUpdateItem: resp');
        console.log(resp);
        if (typeof resp === 'object' && resp.status < 300 && resp.status >= 200) {
          window.alert('Item updated successfully');
          return true;
        } else {
          throw resp;
        }
      })
      .catch(err => {
        window.alert(`There was an error updating the item... :(`);
        console.error('handleUpdateItem: err');
        console.error(err);
      });
  };

  confirmUpdateItem = event => {
    if (window.confirm(`Are you sure you want to update this item? ${this.state._id}`)) {
      return this.handleUpdateItem(event);
    }
  };

  render() {
    const { _id, firstName, lastName, age, zipCode, keyFindings, address, hoursAd, brix, imageName } = this.state;

    return (
      _id && (
        <Wrapper>
        <Title>Enter Exam Record</Title>
        <br></br>

        <TextField type="text"     
        value={firstName} onChange={this.handleChangeInputFirstName} 
        label="First Name" InputLabelProps={{
        style: { color: '#22577E' },
        }}
        className="txtfield" 
        variant="filled"/>

        <br></br>
        <br></br>

        <TextField type="text" value={lastName} 
        onChange={this.handleChangeInputLastName} 
        label="Last Name"
        className="txtfield" 
        variant="filled"
        InputLabelProps={{
          style: { color: '#22577E' },
          }}
        />       
        <br></br>
        <br></br>

        <TextField type="text"
          value={address}
          onChange={this.handleChangeInputAddress}
          label="Address" 
          className="txtfield"
          variant="filled"
          InputLabelProps={{
            style: { color: '#22577E' },
            }}
        />       
        <br></br>
        <br></br>

        <TextField type="number"
          value={zipCode} 
          onChange={this.handleChangeInputZipCode}
          label = "ZIP Code"
          className="txtfield"
          variant="filled"
          InputLabelProps={{
            style: { color: '#22577E' },
            }}
        />
        <br></br>
        <br></br>

        <TextField
          label = "Age"
          type="number"
          step="1"
          lang="en-US"
          min="0"
          max="100"
          pattern="[0-9]+([,\.][0-9]+)?"
          value={age}
          onChange={this.handleChangeInputAge}
          className="txtfield"
          variant="filled"
          InputLabelProps={{
            style: { color: '#22577E' },
            }}

        />
        <br></br>
        <br></br>
        
        <TextField
          label = "Hours Since Admission"
          type="number"
          step="1"
          lang="en-US"
          min="0"
          max="99999"
          pattern="[0-9]+([,\.][0-9]+)?"
          value={hoursAd}
          onChange={this.handleChangeInputHoursAd}
          className="txtfield"
          variant="filled"
          InputLabelProps={{
            style: { color: '#22577E' },
            }}

        />
       <br></br>
       <br></br>

        <TextField
        label="Brixia Score"
        variant="filled"

        type="number"
        min="1"
        lang="en-US"  
        pattern="[0-9]+([,\.][0-9]+)?"
        value={brix}
        onInput = {(e) =>{
          e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,6);
        }
      }
        onChange={this.handleChangeInputBrix}
        className="txtfield"
        InputLabelProps={{
          style: { color: '#22577E' },
          }}
        />

        <br></br>
        <br></br>

        <TextField type="textarea"
         value={keyFindings}
          onChange={this.handleChangeInputKeyFindings}
          label="Key Findings"
          className="txtfield"
          variant="filled"
          InputLabelProps={{
            style: { color: '#22577E' },
            }}
        />
        <br></br>
        <br></br>
        
        <TextField type="text"
        value={imageName}
        onChange={this.handleChangeInputImageName}
        label="Insert Image Link" 
        className="txtfield" 
        variant="filled"
        InputLabelProps={{
          style: { color: '#22577E' },
          }}
        />
        <br></br>
        <br></br>

          <Button onClick={this.confirmUpdateItem}>Update Item</Button>
          <CancelButton href={'/'}>Cancel</CancelButton>
        </Wrapper>
      )
    );
  }
}

export default Item;
