import React from 'react';
import {ItemsTable } from '../pages';

const Welcome = () => (
  <div className="welcome--container">
        <h1 className="page-layout--name">🏥 Check and View Exams 🏥 </h1>
        <section className = "desc"> 
        This app helps visualize infections like pneumonia within a patient’s lungs 🫁 
        We've created this web app that allows for doctors to submit structured radiology reports via x-ray images  for exams of patients with COVID-19 🦠 
        This application allows staff to review patient trends, update exam information, and view patient history 📝
        </section>
      <br/>
      <br/>
    <ItemsTable/>
  </div>
);

export default Welcome;
