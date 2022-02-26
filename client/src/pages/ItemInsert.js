import React, { Component } from 'react';
import {shared} from '../constants';
import api from '../api';
import styled from 'styled-components';
import { Upload } from '.';

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

  @media screen and (max-width: 420px) {
    height: auto;
    max-width: 75%;
  }
`;

const InputText = styled.input.attrs({
  className: 'form-control',
})`
  margin: 5px auto;
  max-width: 30%;
  text-align: center;

  @media screen and (max-width: 420px) {
    height: auto;
    max-width: 75%;
  }
`;

const Fieldset = styled.fieldset.attrs({
  className: 'form-control',
})`
  background-color: transparent;
  border-color: transparent;
  margin: 1em auto 0.5em;
  max-width: 50%;
  min-height: 6em;

  @media screen and (max-width: 420px) {
    height: auto;
    max-width: 75%;
  }
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

class ItemInsert extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

/*  handleChangeInputPriority = async event => {
    const priority = event.target.validity.valid ? event.target.value : this.state.priority;
    this.setState({ priority });
  };
  */

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
  
  insertSingleItem = item => {
    return api
      .insertItem(item)
      .then(resp => {
        console.log('insertItem: resp');
        console.log(resp);
        if ((resp.data || {}).success) {
          const newItem = JSON.parse(resp.config.data);
          console.log('insertItem: newItem', newItem);
        }
        return resp;
      })
      .catch(err => {
        console.error(`ERROR in 'insertSingleItem': ${err}`);
        console.error(err);
        return err;
      });
  };

  handleInsertItem = event => {
    event.preventDefault();

    const {firstName, lastName, age, zipCode, keyFindings, address, hoursAd, brix } = this.state;
    const item = {firstName, lastName, age, zipCode, keyFindings, address, hoursAd, brix };

    this.insertSingleItem(item)
      .then(resp => {
        console.log('handleInsertItem: resp');
        console.log(resp);
        if (typeof resp === 'object' && resp.status < 300 && resp.status >= 200) {
          window.alert('Item inserted successfully');
          this.setState({
            firstName: '',
            lastName: '',
            age: 0,
            zipCode: '',
            keyFindings: '',
            address: '',
            hoursAd: '',
            brix:'',

          });
        } else {
          throw resp;
        }
      })
      .catch(err => {
        // TODO: pass error object correctly so that things like validation errors can be displayed to user
        window.alert(`There was an error creating the item... :(`);
        console.log('handleInsertItem: err');
        console.log(err);
      });
  };

  render() {
    const {firstName, lastName, age, zipCode, keyFindings, address, hoursAd, brix } = this.state;
    return (
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
        <Upload></Upload>
        <Button onClick={this.handleInsertItem}>Add Item</Button>
        <CancelButton href={'/items'}>Cancel</CancelButton>
      </Wrapper>
    );
  }
}

export default ItemInsert;
