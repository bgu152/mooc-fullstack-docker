import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../app';
import Blog, { IBlog } from '../models/blog';
import assert from 'assert';
import User from '../models/user';
import bcrypt from 'bcrypt';

const api = supertest(app);

let token = '';

beforeAll(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash('kaffe', 10);
    const user = new User({
        name: 'Erik',
        username: 'rammser',
        passwordHash,
    });

    await user.save();

    const response = await api.post('/api/login').send({
        username: 'rammser',
        password: 'kaffe',
    });

    console.log('response.body.token: ', response.body.token);

    token = response.body.token;
});

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

test('blogs are returned as JSON', async () => {
    await api
        .get('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);
});

test('all blogs are returned', async () => {
    const response = await api
        .get('/api/blogs')
        .set('Authorization', `Bearer ${token}`);
    expect(response.body).toHaveLength(initialBlogs.length);
});

test('blog id is called id (not _id)', async () => {
    const response = await api
        .get('/api/blogs')
        .set('Authorization', `Bearer ${token}`);
    const firstBlog = response.body[0];
    expect(firstBlog.id).toBeDefined();
});

test('adding a new blog', async () => {
    const newBlog = {
        title: 'Javascript is hard',
        author: 'Erik',
        url: 'http://localhost:3000',
    };
    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);
    const response = await api
        .get('/api/blogs')
        .set('Authorization', `Bearer ${token}`);
    expect(response.body).toHaveLength(initialBlogs.length + 1);
});

test('likes default to zero', async () => {
    const blog = {
        title: 'Javascript is hard',
        author: 'Erik',
        url: 'http://localhost:3000',
    };
    await api
        .post('/api/blogs')
        .send(blog)
        .set('Authorization', `Bearer ${token}`)
        .expect((response) => assert(response.body.likes === 0));
});

test('cannot save blogpost without title', async () => {
    const blog = {
        author: 'Erik',
        url: 'http://localhost:3001',
    };

    const response = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(blog);
    // console.log(response);
    expect(response.status).toBe(400);
});

test('cannot save blogpost without author', async () => {
    const blog = {
        title: 'Javascript is hard',
        url: 'http://localhost:3000',
    };

    const response = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(blog);
    // console.log(response);
    expect(response.status).toBe(400);
});

test('cannot save blogpost without url', async () => {
    const blog = {
        author: 'Erik',
        title: 'Javascript is hard',
    };

    const response = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(blog);
    // console.log(response);
    expect(response.status).toBe(400);
});

describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const response = await api
            .get('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .set('Authorization', `Bearer ${token}`);
        const blogsAtStart = response.body;
        const blogToDelete = blogsAtStart[0];
        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204);
        const responseAtEnd = await api
            .get('/api/blogs')
            .set('Authorization', `Bearer ${token}`);
        const blogsAtEnd = responseAtEnd.body;
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);
        const index = blogsAtEnd.findIndex(
            (b: IBlog) => b.id === blogToDelete.id
        );
        expect(index).toBe(-1);
    });
});

describe('updating a blog', () => {
    test('Updating the likes of a blog', async () => {
        const response = await api
            .get('/api/blogs')
            .set('Authorization', `Bearer ${token}`);
        const blogsAtStart = response.body;
        const blogToUpdate = blogsAtStart[0];
        const responseAfterUpdate = await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ likes: 100 })
            .expect(200);
        const blogAfterUpdate = responseAfterUpdate.body;
        expect(blogAfterUpdate.likes).toBe(100);
    });
});

beforeEach(async () => {

    await Blog.deleteMany({});
    for (const b of initialBlogs) {
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(b);
    }
});

afterAll(async () => {
    await mongoose.connection.close();
});

// export default () => process.exit(0);
