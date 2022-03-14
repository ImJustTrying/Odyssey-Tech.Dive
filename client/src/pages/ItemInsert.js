import React, { Component } from 'react';
import {shared} from '../constants';
import api from '../api';
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

const DayInput = styled.input.attrs({
  className: '',
})`
  margin: 5px 5px 5px auto;
  text-align: center;
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
      patientID: '',
      age: 0,
      sex: '',
      race: '',
      zip: 0,
      latestBMI: 0,
      latestWeight: 0,
      latestHeight: '',
      testName: '',
      ICUAdmits: 0,

    };
  }

  handleChangeInputPatientID = async event => {
    const patientID = event.target.value;
    this.setState({ patientID });
  };

  // handleChangeDays = async event => {
  //   const { checked, value } = event.target;
  //   const { daysOfWeek } = this.state;
  //   const { DAYS_OF_WEEK } = shared;

  //   if (checked && !daysOfWeek[value]) {
  //     daysOfWeek[value] = DAYS_OF_WEEK[value];
  //   } else if (!checked && daysOfWeek[value]) {
  //     delete daysOfWeek[value];
  //   }
  //   this.setState({ daysOfWeek });
  // };

  handleChangeInputAge = async event => {
    const age = event.target.value;
    this.setState({ age });
  };

  handleChangeInputSex = async event => {
    const sex = event.target.value;

    this.setState({ sex });
  };

  handleChangeInputRace = async event => {
    const race = event.target.value;
    this.setState({ race });
  };

  handleChangeInputZip = async event => {
    const zip = event.target.value;
    this.setState({ zip });
  };

  handleChangeInputLatestBMI = async event => {
    const latestBMI = event.target.value;
    this.setState({ latestBMI });
  };

  handleChangeInputLatestWeight = async event => {
    const latestWeight = event.target.value;
    this.setState({ latestWeight });
  };

  handleChangeInputLatestHeight = async event => {
    const latestHeight = event.target.value;
    this.setState({ latestHeight });
  };

  handleChangeInputTestName = async event => {
    const testName = event.target.value;
    this.setState({ testName });
  };

  handleChangeInputICUAdmits = async event => {
    const ICUAdmits = event.target.value;
    this.setState({ ICUAdmits });
  };

  insertSingleItem = item => {
    return api
      .insertPatient(item)
      .then(resp => {
        console.log('insertPatient: resp');
        console.log(resp);
        if ((resp.data || {}).success) {
          const newItem = JSON.parse(resp.config.data);
          console.log('insertPateint: newPatient', newItem);
        }
        return resp;
      })
      .catch(err => {
        console.error(`ERROR in 'insertSinglePatient': ${err}`);
        console.error(err);
        return err;
      });
  };

  handleInsertItem = event => {
    event.preventDefault();

    const { patientID, age, sex, race, zip, latestBMI, latestWeight, latestHeight, testName, ICUAdmits } = this.state;
    const item = { patientID, age, sex, race, zip, latestBMI, latestWeight, latestHeight, testName, ICUAdmits };

    this.insertSingleItem(item)
      .then(resp => {
        console.log('handleInsertPatient: resp');
        console.log(resp);
        if (typeof resp === 'object' && resp.status < 300 && resp.status >= 200) {
          window.alert('Item inserted successfully');
          this.setState({
            patientID: '',
            age: 0,
            sex: '',
            race: '',
            zip: 0,
            latestBMI: 0,
            latestWeight: 0,
            latestHeight: '',
            testName: '',
            ICUAdmits: 0,
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
    const { patientID, age, sex, race, zip, latestBMI, latestWeight, latestHeight, testName, ICUAdmits } = this.state;

    return (
      <Wrapper>
        <Title>Enter Patient Record</Title>

        <Label>Patient ID: </Label>
        <InputText type="text" value={patientID} onChange={this.handleChangeInputPatientID} />

        {/* <Fieldset>
          <legend>Day(s) of the Week: </legend>
          {Object.keys(DAYS_OF_WEEK).map((day, i) => (
            <React.Fragment key={day}>
              <Label htmlFor={day}>
                <DayInput
                  type="checkbox"
                  id={day}
                  value={day}
                  onChange={this.handleChangeDays}
                  checked={typeof daysOfWeek[day] === 'string'}
                />
                {DAYS_OF_WEEK[day]}
              </Label>
            </React.Fragment>
          ))}
        </Fieldset> */}

        <Label>Age: </Label>
        <InputText type="text" value={age} onChange={this.handleChangeInputAge} />

        {/* <Label>Priority: </Label>
        <InputText
          type="number"
          step="0.1"
          lang="en-US"
          min="0"
          max="1000"
          pattern="[0-9]+([,\.][0-9]+)?"
          value={priority}
          onChange={this.handleChangeInputPriority}
        /> */}

        <Label>SEX: </Label>
        <InputText type="text" value={sex} onChange={this.handleChangeInputSex} />

        <Label>RACE: </Label>
        <InputText type="text" value={race} onChange={this.handleChangeInputRace} />

        <Label>ZIP: </Label>
        <InputText type="text" value={zip} onChange={this.handleChangeInputZip} />

        <Label>LATEST BMI: </Label>
        <InputText type="text" value={latestBMI} onChange={this.handleChangeInputLatestBMI} />

        <Label>LATEST WEIGHT: </Label>
        <InputText type="text" value={latestWeight} onChange={this.handleChangeInputLatestWeight} />

        <Label>LATEST HEIGHT: </Label>
        <InputText type="text" value={latestHeight} onChange={this.handleChangeInputLatestHeight} />

        <Label>TEST NAME: </Label>
        <InputText type="text" value={testName} onChange={this.handleChangeInputTestName} />

        <Label>ICU ADMITS: </Label>
        <InputText type="text" value={ICUAdmits} onChange={this.handleChangeInputICUAdmits} />

        <Button onClick={this.handleInsertItem}>Add Patient</Button>
        <CancelButton href={'/items'}>Cancel</CancelButton>
      </Wrapper>
    );
  }
}

export default ItemInsert;
