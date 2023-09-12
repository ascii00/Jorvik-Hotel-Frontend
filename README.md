# Jorvik Hotel Frontend

## Preview

Preview available at: https://jorvik.world/

## Description

This repository contains the frontend of the Jorvik Hotel project. 
The frontend is a Single-Page Application (SPA) written in Vue.js.

## Table of Contents

* [Technologies](#technologies)
* [Getting Started](#getting-started)
* [Installation](#installation)
* [Architecture](#architecture)

## Technologies

* [Vue.js](https://vuejs.org/)
* [Vue Router](https://router.vuejs.org/)
* [Vuex](https://vuex.vuejs.org/)
* [Vuetify](https://vuetifyjs.com/en/)

## Getting Started

These instructions will get you a copy of the project up and running on 
your local machine for development and testing purposes.

### Installation

1. Clone the repository

```bash
git clone https://github.com/ascii00/Jorvik-Hotel-Frontend.git
```

2. Install dependencies

```bash
npm install
```

3. Run the application

```bash
npm run serve
```

4. Open the application in your browser

The app will start and by default will run on http://localhost:8080

## Architecture

The web application for the hotel consists of a central element, which is the Online Hotel
System. This system is the main point of contact for users - Hotel Customers. The Hotel System,
being the heart of the architecture, communicates with two external systems: the Payment
System and the E-mail System. The Payment System is responsible for processing payments from
customers, which is a key element of the entire operation. The E-mail System, on the other
hand, facilitates communication between the hotel and the customers, sending email
notifications to the customers about their reservations and other important information.

The first point of contact for the Hotel Customer is the Single-Page Application. This tool,
created using JavaScript and Vue, serves as the user interface, unlocking the possibilities
of using hotel functions.

Under the hood of this application, the Single-Page Application directly communicates with
the API service using JSON and HTTP-based API calls. This bidirectional communication is a
crucial element that allows reliable data transmission between the client and the server.
The API service, being a highly effective mechanism, is designed on the Java and Spring
platform and offers a set of REST JSON APIs that are essential for the application's functioning.

The API service is also the communication hub with three key elements. Firstly, it
communicates with the database via Spring Data JPA, allowing for reading and writing
data as needed. Secondly, the API service connects with the external E-mail System, sending
notifications to customers. Thirdly, the API service collaborates with the external
Payment System, processing financial transactions.

![Architecture](https://i.imgur.com/RVPWS78.png)


