import React from 'react';
import {ItemsList} from '../pages';


const Welcome = () => (
  <div className="welcome--container">
        <h1 className="page-layout--name">Check and View Exams</h1>
        <section className = "desc"> 
        This can help visualize infections such as pneumonia within a patient’s lungs. 
        With this in mind, your task is to create a web application that allows doctors to submit structured radiology reports (assessments of x-ray images) for exams of patients with COVID-19. 
        This application will allow staff to review patient trends, update exam information, and view patient history.
        </section>
      <br/>
    <ItemsList/>
  </div>
);

export default Welcome;
