import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

function Post(title, content){
    this.postTitle = title;
    this.postContent = content;
}
   
var blogArr = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.render("index.ejs", {blogArr : blogArr});  
  });

app.get("/create", (req,res) => {
    res.render("create.ejs");
})

app.post("/createnew", (req,res) => {
    let post = new Post(req.body.title, req.body.content);
    blogArr.push(post);
    res.redirect("/");
})

app.get("/:id", (req,res) => {
    let index = req.params.id;
    res.render("view.ejs", {title :blogArr[index].postTitle, content :blogArr[index].postContent,index });
})

app.get("/edit/:id", (req,res) => {
    let index = req.params.id;
    res.render("Edit.ejs", {title :blogArr[index].postTitle, content :blogArr[index].postContent,index });
})

app.post("/update/:id", (req,res) => {
    let index = req.params.id;
    blogArr[index] = new Post(req.body.editedTitle, req.body.editedContent);
    res.redirect("/");

})

app.post("/delete/:id", (req, res) => {
    let index = req.params.id;
    blogArr.splice(index, 1);
    res.redirect("/");
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})