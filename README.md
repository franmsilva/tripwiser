# TripWiser (Server)

<p align="center">
  <img src="https://user-images.githubusercontent.com/54188135/87220445-4b39c300-c353-11ea-99db-e6616cc8368f.png" width='300'/>
</p>

TripWiser is a Progressive Web App that assists users in planning their next multi-stop adventure by dynamically finding the best flight, as well as suggesting alternatives routes when no flights are available between locations.


## Screenshots

<p align="center">
  <img src="https://user-images.githubusercontent.com/54188135/87220453-57258500-c353-11ea-85cc-d1fad18a5401.gif" width='75%'/>
</p>


## Getting the Server Started 

1. Clone the repo and open in your code editor of choice

```
git clone https://github.com/fmsilva1996/tripwiser.git
```

2. Install all required dependencies
```
npm install
```

3. Create a .env file with the following variables:
```
PORT=YOUR_PORT_HERE
APOLLO_INTROSPECTION=true
APOLLO_PLAYGROUND=true
DB_URI=YOUR_MONGODB_URI_HERE
SALTROUND=15
SECRETKEY=YOUR_SECRET_KEY_HERE
MAILGUN_API_KEY=YOUR_MAILGUN_API_KEY_HERE
MAILGUN_DOMAIN=YOUR_MAILGUN_DOMAIN_HERE
TWILIO_SID=YOUR_TWILIO_SID_HERE
TWILIO_TOKEN=YOUR_TWILIO_TOKEN_HERE
TWILIO_PHONENUMBER=YOUR_TWILIO_PHONENUMBER_HERE
```

4. Seed your database with all of the available locations:
```
npm run seed
```

5. Start the application on localhost:
```
npm run start
```

6. Enjoy!

#### Changing the Code Base
If you change the code base, make sure to run the typescript compiler before restarting the server:
```
tsc --watch // If you have typescript installed globally
or 
npx tsc --watch 
```

If you change the graphQL type definitions, make sure to run the GraphQL Code Generator to automatically generate matching typescript interfaces:
```
npm run generate
```
**Please Note:** The server must be running for this command to work!


## Built With

<p align="center">
  <img src="https://user-images.githubusercontent.com/54188135/87221112-26e0e500-c359-11ea-9fac-de63d8f257a6.png" />
</p>


## Observations 

### Room For Improvement

### Looking to the Future 


## Contributing

Improvements are welcome 🙂

Fork the repo and do your thing. Push to your fork and submit a pull request.


## Authors

Andrew Cooke - [Github](https://github.com/andrewcooke89) - [LinkedIn](https://www.linkedin.com/in/andrewcooke89/) - [Portfolio](https://andrewcooke.dev/)
Ben Towler - [Github](https://github.com/Ben-Towler) - [LinkedIn](https://www.linkedin.com/in/ben-towler-108913130/)
Francisco Silva - [Github](https://github.com/fmsilva1996) - [LinkedIn](https://www.linkedin.com/in/fmsilva1996/)
Nils Wernecke - [Github](https://github.com/locomocoroco) - [LinkedIn](https://www.linkedin.com/in/niwern/)


## License

This project is licensed under the MIT License.
