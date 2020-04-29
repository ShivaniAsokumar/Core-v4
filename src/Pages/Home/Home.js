import React, { Component } from 'react';
import { Container } from 'reactstrap';
import './home.css';
//import Slideshow from '../../Components/Slideshow/Slideshow.js';
import Footer from '../../Components/Footer/Footer.js';
import Benefits from '../../Components/Benefits/Benefits.js';
import Jumbotron from '../../Components/Jumbotron/Jumbotron.js';
import Iframe from 'react-iframe';
//import Image from 'https://user-images.githubusercontent.com/56044487/80262112-49f4d600-8641-11ea-8f3c-b17437db411f.png';
// import Calendar from '../../Calendar/App.js'; <Calendar/>

/*
  <Iframe url="https://calendar.google.com/calendar/embed?src=
  llv828585faitko1m2nh39s3js%40group.calendar.google.co
  m&ctz=America%2FLos_Angeles"
        width="1000px"
        height="800px"
        id="myId"
        className="myClassname"
        display="initial"
        position="relative"
        allowFullScreen/>

        <Iframe url="https://calendar.google.com/calendar/b/4/embed?showTitle=
        0&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0&amp;
        height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;src=llv828585faitko1
        m2nh39s3js%40group.calendar.google.com&amp;color=%23182C57&amp;ctz=
        America%2FLos_Angeles" style="border-width:0" width="1000"
        height="850" frameborder="0" scrolling="no"/>
        */
       const collage = [
        {
          src: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUSEhIVFhUVFRUXFRUXFRUVFRUXFRUXFhUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGy0lHyUtLS0tLS0tLS0tLS0tLS0tLS0tLS0rLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAMIBAwMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAACAAEDBAUGBwj/xABBEAABAgMFAwkFBgUEAwAAAAABAAIDBBEFEiExQVFhcQYTIjKBkaGx0RRCUpLBByNDU+HwFTNigrJyosLSJCVE/8QAGgEAAwEBAQEAAAAAAAAAAAAAAAECAwQFBv/EACoRAAICAQMEAQQCAwEAAAAAAAABAhEDEzFRBBIhQWEUMnGhgZEi4fBC/9oADAMBAAIRAxEAPwDUb',
          altText: 'Officers',
          header: '2019-2020 Officers',
          top: '25%'
        }
       ];

class Home extends Component {
  render() {
    return (
      <>
        <Container className='home'>
          <div className='home'>
            <img src = "https://user-images.githubusercontent.com/56044487/80643922-b561ed80-8a1d-11ea-84c9-e7880ca408a5.png"></img> 
              
            {/* <Slideshow className='slideshow' /> */}
            <Jumbotron />

            {/* <div className='text-center'>
              <h1 className='display-4'>SCE Events Calendar</h1>{' '}
            </div>
            <p className='lead text-center'>
              {' '}
              Add SCE Calendar to your own by clicking the Google Calendar icon
              on the bottom right side!
            </p> */}

          <div className='outer-div'>
            {/* <div className='inner-div'>
              <Iframe
                // Unable to breka up iframe url
                // eslint-disable-next-line
                url='https://calendar.google.com/calendar/b/4/embed?showTitle=0&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0&amp;height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;src=llv828585faitko1m2nh39s3js%40group.calendar.google.com&amp;color=%23182C57&amp;ctz=America%2FLos_Angeles'
                className='calendar'
                allowFullScreen
              />
            </div> */}
            <Benefits className='benefits' />
            <Footer />
          </div>
          </div>
        </Container>
      </>
    );
  }
}

export default Home;
