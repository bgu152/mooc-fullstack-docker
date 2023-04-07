// eslint-disable-next-line @typescript-eslint/no-unused-vars
const dummy = (blogs: Blog[]) => {
    return 1;
};

const totalLikes = (blogs: Blog[]) => {
    function sum(acc: number, curr: Blog) {
        return curr?.likes ? curr.likes + acc : acc;
    }
    return blogs.reduce(sum, 0);
};

const favoriteBlog = (blogs: Blog[]) => {
    function morePopular(b: Blog, curr: Blog) {
        if (b?.likes && curr?.likes) {
            return b.likes > curr.likes ? b : curr;
        } else if (curr?.likes) {
            return curr;
        } else {
            return b;
        }
    }
    return blogs.reduce(morePopular);
};

const mostBlogs = (blogs: Blog[]) => {
    const blogNumbers: { [key: string]: number } = {};
    const ans = { author: '', blogs: 0 };
    blogs.forEach((b) => {
        if (Object.keys(blogNumbers).includes(b.author)) {
            blogNumbers[b.author]++;
        } else {
            blogNumbers[b.author] = 1;
        }
        if (blogNumbers[b.author] > ans.blogs) {
            ans.author = b.author;
            ans.blogs = blogNumbers[b.author];
        }
    });
    console.log(ans);
    return ans;
};

const mostLikes = (blogs: Blog[]) => {
    const likesNumbers: { [key: string]: number } = {};
    const ans = { author: '', likes: 0 };
    for (const b of blogs) {
        if (Object.keys(likesNumbers).includes(b.author)) {
            if (b?.likes) {
                likesNumbers[b.author] += b.likes;
            }
        } else {
            likesNumbers[b.author] = b?.likes ? b.likes : 0;
        }
        if (likesNumbers[b.author] >= ans.likes) {
            ans.author = b.author;
            ans.likes = likesNumbers[b.author];
        }
    }
    console.log(ans);
    return ans;
};

export { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
