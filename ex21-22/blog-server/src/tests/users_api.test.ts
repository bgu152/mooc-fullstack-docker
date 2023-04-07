import supertest from 'supertest';
import app from '../app';
import User from '../models/user';
import bcrypt from 'bcrypt';
import Blog from '../models/blog';
import mongoose from 'mongoose';

const api = supertest(app);

const initialBlogs: Blog[] = [
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations4/Go_To_Considered_Harmful.html',
        likes: 5,
    },
    {
        title: 'Some cool stuff',
        author: 'Ada',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations3/Go_To_Considered_Harmful.html',
        likes: 2,
    },
    {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        likes: 12,
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations2/Go_To_Considered_Harmful.html',
    },
    {
        title: 'First blog',
        author: 'Erik',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violationsa1/Go_To_Considered_Harmful.html',
    },
];

describe('adding a user', () => {
    beforeEach(async () => {
        await User.deleteMany({});
        const passwordHash = await bcrypt.hash('sekret', 10);
        const user = new User({
            name: 'Superuser',
            username: 'root',
            passwordHash,
        });

        await user.save();
    });

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await User.find();
        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        };

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/);
        const usersAtEnd = await User.find();
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

        const usernames = usersAtEnd.map((u) => u.name);
        expect(usernames).toContain(newUser.name);
    });

    test('creating a duplicate username should return 409', async () => {
        const newUser = {
            name: 'Superuser',
            username: 'root',
            password: 'sekret',
        };
        await api.post('/api/users').send(newUser).expect(409);
    });

    test('creating user without username should return 400', async () => {
        const newUser = {
            name: 'Mr wont be saved',
            password: 'sekret',
        };
        await api.post('/api/users').send(newUser).expect(400);
    });

    test('creating user with too short username should return 400', async () => {
        const newUser = {
            name: 'Mr',
            username: 'Mr',
            password: 'sekret',
        };
        await api.post('/api/users').send(newUser).expect(400);
    });

    test('creating user without password should return 400', async () => {
        const newUser = {
            name: 'Mr',
            username: 'Mr wont be saved',
        };
        await api.post('/api/users').send(newUser).expect(400);
    });

    test('creating user too short password should return 400', async () => {
        const newUser = {
            name: 'Mr',
            username: 'Mr wont be saved',
            password: 'hi',
        };
        await api.post('/api/users').send(newUser).expect(400);
    });
});

describe('Retrieving users', () => {
    beforeEach(async () => {
        await User.deleteMany({});
        const passwordHash = await bcrypt.hash('sekret', 10);
        const user = new User({
            name: 'Superuser',
            username: 'root',
            passwordHash,
        });

        const user2 = new User({
            name: 'Aminuser',
            username: 'admin',
            passwordHash,
        });

        const savedUser2 = await user2.save();
        const savedUser1 = await user.save();

        await Blog.deleteMany({});

        for (const b of initialBlogs) {
            const index = Math.floor(Math.random() * 2);
            b.user = index === 1 ? savedUser1.id : savedUser2.id;
            await api.post('/api/blogs').send(b);
        }
    });

    test('Getting all the users', async () => {
        const response = await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/);
        const users = response.body;

        expect(users).toHaveLength(2);
    });
});


afterAll(async () => {
    await mongoose.connection.close();
});