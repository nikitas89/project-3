![Convene](/app/assets/images/logo.png)
# Convene
### [Convene - Web App Link](https://convene3.herokuapp.com/)
 Convene helps users determine the minimum travel distance to meet and eat. Perfect for groups with picky friends, Convene takes the hassle out of planning and makes sure no one gets lost on the way to the restaurant. No friends? It even has a solo user mode which can be accessed without login, providing a list of dining options in the area.


## Flowchart

![project-3](https://i.imgur.com/xNvmz7n.png)

## Screenshots
![project-3](/app/assets/images/convene-home.png)

## User Stories
- When user loads landing page, google maps provides location marker. Map also shows marker of restaurants nearby. (Solo user)


- User register/log in by clicking on links at the top right corner of page which loads a pop up overlay.


- Once logged in, slider panel on the left shows groups joined. Text box at the top of column allows user to add new group.

- Clicking on the hamburger icon top left of panel view shows user profile.


- Google maps api generates minimum distance location for group of friends and markers for restaurants in the area.

- Recommended restaurant slides up from footer. User has option to generate another recommendation by clicking button on bottom right corner.


- If all parties agree on the recommendation, one user clicks “Confirm” button to set location for all users. Google maps will show user shortest route to the restaurant.  



## ERD

Models used:

- Users
- Groups
- Restaurants
![](/app/assets/images/ERD.png)

Screenshot TBA

## Wireframes
Wireframes can be viewed in the [linked powerpoint](https://docs.google.com/presentation/d/1in6kbtegpL88XDrO-k8XBjkr_c3hg36xaMJEvpbe7R8/edit?usp=sharing)

## This project is built with the following:

- HTML, CSS, JS
- Ruby on rails 4
- PostgreSQL
- Deployed with [Heroku](https://www.heroku.com)
+ Bootstrap 4 CSS Framework
+ Google Maps API
+ Devise

## Installation
+ Configuration:
$ bundle install

+ Database creation:
$ rails db:migrate

+ Database initialization:
$ rails db:seed

+ Deployment instructions:
$ rails server

## Script

### Authentication

Done using Devise for Ruby.

### Google Maps API

- [Google maps for Ruby](https://trello.com/c/j2aW4kXr/19-https-githubcom-edwardsamuel-google-maps-services-ruby)
- [Google maps for Rails](https://trello.com/c/kGiIili3/20-https-githubcom-apneadiving-google-maps-for-rails)
- [Google places for web service](https://trello.com/c/Im7AL33Q/21-https-developersgooglecom-places-web-service-intro)
- [Bootstrap ruby gem](https://trello.com/c/f5D2NYJr/9-https-githubcom-twbs-bootstrap-rubygem)
- [Finding centre of multiple locations](https://trello.com/c/WSvlwrwo/61-https-stackoverflowcom-questions-10634199-find-center-of-multiple-locations-in-google-maps)

### Sockets
ActionCable

### CSS Framework

[Bootstrap 4.0](http://getbootstrap.com/)

### Future Development

- Allow users to book restaurant directly on the site.
- Add chat function using sockets so users can communicate directly.

### Team Members

- [Nikita](https://github.com/nikitas89)
- [Grace](https://github.com/g174)
- [Zheng Yu](https://github.com/koozy0)

### Task Managers

- [Trello](https://trello.com/b/hS6efU8g/convene)
![](/app/assets/images/trello.png)
- Gannt Chart
![](/app/assets/images/gantt.png)

### Acknowledgement

- Prima Aulia
- Alex and Shumin
