<br />

<p align="center">
  <img src="https://cdn.pixabay.com/photo/2018/05/04/21/27/airbnb-3375057_960_720.png" alt="Logo" width="90" height="90">

  <h3 align="center">airBnb</h3>

  <p align="center">
    An accommodations booking website based off of <a target="_blank" href="https://www.gamestop.com/">Airbnb.com</a>
    <br />
    <a href="https://airbnb-pawan.herokuapp.com/" target="_blank"><strong>Explore the website »</strong></a>
    <br />
    <br />
  </p>
</p>

<details open="open">
  <summary id="table-of-contents">Table of Contents</summary>

  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li><a href="#usage">User Authentication</a></li>
        <li><a href="#finding-accommodations">Finding Accommodations</a></li>
        <li><a href="#booking-an-accommodation">Booking an Accommodation</a></li>
        <li><a href="#leaving-reviews">Leaving Reviews</a></li>
      </ul>
    </li>
    <li>
      <a href="#features-to-implement-next">Features to Implement Next</a>
      <ul>
        <li><a href="#search-by-location">Search by Location</a></li>
        <li><a href="#creating-new-bookings">Creating New Bookings</a></li>
      </ul>
      <li><a href="#contact">Contact</a></li>
    </li>
  </ol>
</details>

<br>

## About The Project

![about](/frontend/public/splashPage.gif)

airBnb is a full-stack web application built using the <a href="https://www.geeksforgeeks.org/what-is-pern-stack/" target="_blank">PERN Stack</a>. It is inspired by <a href="https://www.airbnb.com/" target="_blank">Airbnb.com</a> and offers MapBox API integration. This application is meant to replicate an online marketplace for lodging, primarily home-stays for vacation rentals.

### Built With

- [MapBox API](https://www.mapbox.com/maps/)
- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [ExpressJS](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)
- [PostgreSQL](https://www.postgresql.org/docs/)

<br>

# Usage

[Back to top](#table-of-contents)

<br>

## Create Account

To make an accommodation, users can sign-up on the "Sign Up" page which offers a sign-up form with full error-handling! This page is easily accessible from the top right submenu found in the navigation bar.

<br>

![sign-up](/frontend/public/signUp.gif)

<br>

## Log In

Returning users can log-back into their existing accounts by visiting the "Sign In" page. This page is easily accessible from the top right submenu found in the navigation bar.

If per-chance a user would like to test-drive this application's features and not create an account, there is an option for guests to log-in as "Demo User," accessible through the same submenu as forementioned.

<br>

![log-in](/frontend/public/login.gif)

<br>

# Finding Accommodations

[Back to top](#table-of-contents)

<br>

## Explore

Upon landing on the splash page, a user can opt for the choice of being flexible and pressing the "I'm Flexible" button which will directly navigate the user to an "Explore Page." From here the user can experience all of which airBnb has to offer throughout the state of California.

This option is great for new users who want to get a feel for the application's features and functionality!

<br>

![explore](/frontend/public/explore.gif)

<br>

## Search Feature

Got an idea of what you're looking for? Users can utilize the "Search Feature" found directly in the navigation menu! Accommodations may be searched for by "City Name" and "Dates". Finding your next adventure never's been easier!

<br>

![search](/frontend/public/search.gif)

<br>

# Booking an Accommodation

[Back to top](#table-of-contents)

<br>

## Reserving

Once a logged-in user is satisfied and has found what they're searching for, booking an accommodation is fairly straightforward. This can be done directly from the individual "Booking's Page" through the booking form. This form will validate whether or not the booking is available for the user's desired criteria. If the booking isn't available for the user's inputted criteria, the user will not able able to make the booking and an error message will populate letting the user know when their booking of interest is not available. From the information gathered, the user can then determine which dates better align with their interest, if at all.

<br>

![booking](/frontend/public/booking.gif)

<br>

## Cancellations and Editing Reservations

Things happen and many times we aren't able to make through with our intended plans. Luckily cancelling or editing a user's reservations is a breeze. By navigating to the user's "Booking Page" one may edit their reservation dates as so desired; so long as they do not overlap another user's booking's during the newly selected time period.

<br>

![edit](/frontend/public/edit.gif)

<br>

# Leaving Reviews

[Back to top](#table-of-contents)

<br>

Leaving reviews is fun and provides valuable insight for future users! To write a review, add content and click the "Submit" button in the "Add a Written Review" subsection on the booking's page. Now your idea's will be shared publicly; for better or for worse :)

<br>

![reviews](/frontend/public/reviews.gif)

<br>

# Features to Implement Next

[Back to top](#table-of-contents)

<br>

## Search by Location

With the MapBox API integration, I aim to provide users the functionality to search within a "X" mile radius from where they are currently located. The longitudinal and latitudinal coordinates of the user would be accessed via the browser upon user granting permission. These coordinates would be used to calculate distances from nearby booking locations that may be of interest to the user.

<br>

## Creating New Bookings

I would like to give the opportunity for users to list their own home or locations that others may reserve. Currently this access is not granted. Owner profiles would first have to be established to set apart users who do not own a listing; subsequently denying accessibility to edit someone elses's listing's information, or removing the listing entirely from the marketplace. AWS S3 integration would be most appropriate alongside this feature, to allow users to upload a listings corresponding photos and/or other related media.

<br>

# Contact

Pawan Chahal:

- LinkedIn: https://www.linkedin.com/in/pawanchahal/
- Email: chahal.pawanpreet@gmail.com

Project Repo Link: https://github.com/pawan087/w16_airBnbClone

Project Link: https://airbnb-pawan.herokuapp.com/

<br>

[Back to top](#table-of-contents)
