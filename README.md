# Movie Finder

A simple web app that retrieves movies playing today from browser geo-location. Implemented with React and Flux.

![App screen shot](assests/images/mf-ss.gif?raw=true)

## Live demo

[http://movie-finder.herokuapp.com](http://movie-finder.herokuapp.com)

## Install

1. Install [brew](http://brew.sh/): `ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

2. Install git and node: `brew install git node`

3. Install gulp globally by running: `npm install -g gulp`

4. Clone project: `git clone https://github.com/mistermendez/movie-finder.git`

5. After cloning, just `cd` in there, install dependencies by running `npm install`

6. Build the project by running `gulp watch`

7. Open in browser: 
[http://localhost:4444/](http://localhost:4444/)

## Project Layout

  * /assets - application media assets (images, app icons, video)
  * /src - JavaScript source files. Flux (Reflux) architecture:
  	* /actions - helper functions that pass data to the dispatcher and api services to fetch data
    * /components - modular components of pages
    * /stores - store application state and logic, similar to model in MVC
    * /views - page views
  * /styles - src (less, scss, sass) stylesheets, styles for individual components should be broken out and put in the components folder. They can be included in the build using an @import statement