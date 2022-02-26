import React, { Component } from 'react';
import api from '../api';
import { shared } from '../constants';
import styled from 'styled-components';

const Title = styled.h1.attrs({
  className: 'h1',
})``;

const Wrapper = styled.div.attrs({
  className: 'form-group',
})`
  margin-top: 0 30px;
`;

const Label = styled.label`
  margin: 5px;
  max-width: 30%;
`;

const InputText = styled.input.attrs({
  className: 'form-control',
})`
  margin: 5px auto;
  max-width: 30%;
  text-align: center;
`;

const Fieldset = styled.fieldset.attrs({
  className: 'form-control',
})`
  border-color: transparent;
  margin: 1em auto 0.5em;
  max-width: 50%;
  min-height: 6em;
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

class ItemUpdate extends Component {
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
    const { _id, firstName, lastName, age, zipCode, keyFindings, address, hoursAd, brix } = this.state;
    const item = { _id, firstName, lastName, age, zipCode, keyFindings, address, hoursAd, brix };

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
    const { _id, firstName, lastName, age, zipCode, keyFindings, address, hoursAd, brix } = this.state;

    return (
      _id && (
        <Wrapper>
        <Title>Enter Exam Record</Title>
        <Label>First Name: </Label>
        <InputText type="text" value={firstName} onChange={this.handleChangeInputFirstName} />
        <Label>Last Name: </Label>
        <InputText type="text" value={lastName} onChange={this.handleChangeInputLastName} />
        <Label>Address: </Label>
        <InputText type="text" value={address} onChange={this.handleChangeInputAddress} />
        <Label>ZIP Code: </Label>
        <InputText type="number" value={zipCode} onChange={this.handleChangeInputZipCode} />

        <Label>Age: </Label>
        <InputText
          type="number"
          step="1"
          lang="en-US"
          min="0"
          max="100"
          pattern="[0-9]+([,\.][0-9]+)?"
          value={age}
          onChange={this.handleChangeInputAge}
        />

        <Label>Hours Since Admission: </Label>
        <InputText
          type="number"
          step="1"
          lang="en-US"
          min="0"
          max="100"
          pattern="[0-9]+([,\.][0-9]+)?"
          value={hoursAd}
          onChange={this.handleChangeInputHoursAd}
        />

   <Label>Brixia Score: </Label>
        <InputText
          type="number"
          lang="en-US"
          min="1"
          max="2"
          value={brix}
          onChange={this.handleChangeInputBrix}
        />

        <Label>Key Findings: </Label>
        <InputText type="textarea" value={keyFindings} onChange={this.handleChangeInputKeyFindings} />

          <Button onClick={this.confirmUpdateItem}>Update Item</Button>
          <CancelButton href={'/items'}>Cancel</CancelButton>
        </Wrapper>
      )
    );
  }
}

export default ItemUpdate;
