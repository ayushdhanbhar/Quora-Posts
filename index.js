const express = require("express")
const app = express();
const path = require("path");
const port = 8080;
const { v4: uuidv4 } = require('uuid');
uuidv4();
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
let posts = [
    {
        id: uuidv4(),
        username: "einstein",
        content: "Imagination is more important than knowledge. Knowledge is limited. Imagination encircles the world."
    },
    {
        id: uuidv4(),
        username: "mandela",
        content: "It always seems impossible until it's done."
    },
    {
        id: uuidv4(),
        username: "jobs",
        content: "Stay hungry, stay foolish."
    },
    {
        id: uuidv4(),
        username: "gandhi",
        content: "Be the change you wish to see in the world."
    },
    {
        id: uuidv4(),
        username: "disney",
        content: "The way to get started is to quit talking and begin doing."
    },
    {
        id: uuidv4(),
        username: "twain",
        content: "The secret of getting ahead is getting started."
    },
    {
        id: uuidv4(),
        username: "curie",
        content: "Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less."
    },
    {
        id: uuidv4(),
        username: "roosevelt",
        content: "Believe you can and you're halfway there."
    },
    {
        id: uuidv4(),
        username: "dali",
        content: "Have no fear of perfection - you'll never reach it."
    },
    {
        id: uuidv4(),
        username: "keller",
        content: "The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart."
    }
]
app.get("/posts", (req, res) => {
    res.render("home.ejs", { posts });
})
app.get("/posts/new", (req, res) => {
    res.render("new.ejs")
})
app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content })
    res.redirect("/posts")
});
app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    console.log(id);
    let post = posts.find((p) => id == p.id);
    // console.log(post);
    // res.send("response working");
    res.render("show.ejs", { post });
})
app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newcontent = req.body.content;
    let post = posts.find((p) => id == p.id);
    post.content = newcontent;
    console.log(post)

    // console.log(newcontent);
    res.redirect("/posts")
})

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id == p.id);
    res.render("edit.ejs", { post });
})

app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
})

app.listen(port, () => {
    console.log(`listen starting at port ${port}`);
});