# Full Stack open CI/CD

This repository is used for the last two questions of the Containers module (part 12) of the Full stack open course. 

## Regarding exercises 20 and 21
The base project is a solution to [Part 4](https://fullstackopen.com/en/part4) and [Part 5](https://fullstackopen.com/en/part5) of the course.

### Environment variables

Add the following variables in `/blog-server/.env`. Note that a Mongo database must be connected

```
MONGO_URL
PORT
DB_NAME 
SECRET
```

### Adding a user

There is no user stored by default. Create a user by sending a POST request to `/api/users` with `username`, `name` and `password` in request body.