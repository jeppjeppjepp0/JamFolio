# JamFolio
A gif of how the deployed application looks:

![Deployed Image](public/assets/deployedjamfolio.gif)

## Technology Used 

| `Technology Used`         | `Resource URL`           | 
| ------------- |:-------------:| 
| JavaScript | [https://developer.mozilla.org/en-US/docs/Web/JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)|   
| Git | [https://git-scm.com/](https://git-scm.com/) |
| Node.js | [https://nodejs.org/en](https://nodejs.org/en) |
| NPM | [https://www.npmjs.com/](https://www.npmjs.com/) |
| Sequelize | [https://sequelize.org/](https://sequelize.org/) |
| mysql | [https://www.mysql.com/](https://www.mysql.com/) |
| bcrypt | [https://www.npmjs.com/package/bcrypt](https://www.npmjs.com/package/bcrypt) |
| cloudinary | [https://www.npmjs.com/package/cloudinary](https://www.npmjs.com/package/cloudinary) |
| handlebars | [https://handlebarsjs.com/guide/](https://handlebarsjs.com/guide/) |

<hr>

## Description 

 Deployed Link: [https://jamfolio.herokuapp.com/](https://jamfolio.herokuapp.com/)

 JamFolio is an application that allows musicians to connect to employers, venues, fans, and other musicians by listing their discography and experience.

 This application was created because of a UCB Coding Bootcamp project. This project focused on group work and required groups to make a full stack application with the following requirements:

```md
* Use Node.js and Express.js to create a RESTful API.

* Use MySQL and the Sequelize ORM for the database.

* Have both GET and POST routes for retrieving and adding new data.

* Use at least one new library, package, or technology that we haven’t discussed.

* Have a folder structure that meets the MVC paradigm.

* Include authentication (express-session and cookies).

* Protect API keys and sensitive information with environment variables.

* Be deployed using Heroku (with data).

* Have a polished UI.

* Be responsive.

* Be interactive (i.e., accept and respond to user input).

* Meet good-quality coding standards (file structure, naming conventions, follows best practices for class/id naming conventions, indentation, quality comments, etc.).
```

<hr>

## Table of Contents

* [Code Sample](#code-sample)
* [Usage](#usage)
* [Learning Points](#learning-points)
* [Author Info](#author-info)

<hr>

## Code Sample

The following code shows the get route for the musician page that displays the information for a selected user. It first selects the given `Musician` by the `id` in the url. It also includes the other `models` associated with it to be displayed on-screen, such as `Gigs`, `Instruments`, `Songs`, and `Media`. It then sends all this information to be read by `handlebars` to be displayed. If there is any error, the `request` will instead `respond` with an error. 

```js
router.get('/musician/:id', async (req, res) => {
  try {
    // selects one specific musician and stores info
    const musicianData = await Musician.findByPk(req.params.id, {
        include: [
            {
                model: Gigs,
                attributes: [/* various information included in the Gigs class */],
            },
            /* 
            also includes Instruments, Songs, Media classes
            omitted for clarity
            */
        ],
    });

    // makes data readable
    const musician = musicianData.get({ plain: true });
    //sends information to the profile page to be rendered
    res.render('profile', { 
        musician,
        logged_in: req.session.logged_in 
    });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
```

The following `signup route` uses `express` in combination with `sequelize` in order to create a new `Musician` object to be referenced for later use. The route first checks to see if the appropriate information is supplied. If it is not, or if the email given matches that of another `Musician`, an error will be returned. If there is any other error, the catch block will return that a server error has occured. 

```js
// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { first_name, last_name, email, password, description } = req.body;

    // Check if name, email, and password are provided
    if (!first_name || !last_name || !email || !password || !description) {
      return res.status(400).json({ error: 'first name, last name, email, password and description are required.' });
    }

    // Check if musician already exists
    const existingMusician = await Musician.findOne({ where: { email } });
    if (existingMusician) {
      return res.status(400).json({ error: 'Musician already exists.' });
    }

    // Create new musician
    const newMusician = await Musician.create({ first_name, last_name, email, password, description });
    return res.status(201).json(newMusician);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to create musician.' });
  }
});
```

<hr>

## Usage

Our application implements the following User Story:
 `Story`        | `Description`          | 
| ------------- |:-------------:| 
| User Story 1 | User (musician) can sign up for their account |
| User Story 2 | User can log in to their account |
| User Story 3| User can upload their media files (photos/audio) |
| User Story 4| User can advertise themselves by adding details about themselves |
| User Story 5 | User can search for other musicians in the search bar which returns relevant users by search terms|

Each of these features (except for the search functionality) were implemented through our `Sprint` this past week. A user can successfully sign up, log in, upload media files, and has a shareable profile page that contains relevant information to their music.

<hr>

## Learning Points 

Below are the following topics/methods that we learned through this project:

| `Topic`         | `Resource URL`| 
| ------------- |:-------------:| 
| Sequelize | [https://sequelize.org/](https://sequelize.org/) |
| bcrypt | [https://www.npmjs.com/package/bcrypt](https://www.npmjs.com/package/bcrypt) |
| cloudinary | [https://www.npmjs.com/package/cloudinary](https://www.npmjs.com/package/cloudinary) |
| handlebars | [https://handlebarsjs.com/guide/](https://handlebarsjs.com/guide/) |

<hr>

## Author Info


### Aarti Contractor

* [LinkedIn](https://www.linkedin.com/in/aarti-contractor/)
* [Github](github.com/aarticontractor)

### Jedd Javier

* [LinkedIn](https://www.linkedin.com/in/jedd-javier-4b323426b/)
* [Github](github.com/jeppjeppjepp0)

### Suchaya Ostasis

* [LinkedIn](https://www.linkedin.com/in/suchaya-osatis-0b81a378)
* [Github](github.com/osuchaya)

