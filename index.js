import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }));

var data = {
  list: "",
  tasksToDo: []
}

var dayTasks = [
  {
    task: "task 1",
    completed: true
  },
  {
    task: "task 2",
    completed: true
  },
  {
    task: "task 3",
    completed: false
  },
  {
    task: "task 4",
    completed: false
  },
  {
    task: "task 5",
    completed: false
  }
]

var workTasks = [
  {
    task: "work task 1",
    completed: false
  },
  {
    task: "work task 2",
    completed: false
  }
]

data.list = "day"
data.tasksToDo = dayTasks;

app.get("/", (req, res) => {
  res.render("index.ejs", data);
});

app.get("/work", (req, res) => {
  data.list = "work";
  data.tasksToDo = workTasks;
  res.redirect("/");
});

app.get("/day", (req, res) => {
  data.list = "day";
  data.tasksToDo = dayTasks;
  res.redirect("/");
});

app.post("/add", (req, res) => {
  addTask(data.list,req.body["task"]);
  res.redirect("/")
});

app.post("/check", (req, res) => {
  console.log(req.body);
  checkTask(req.body.index);
  res.redirect("/")
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

//function
function addTask(list,taskToAdd) {
  if (list == "day") {
    dayTasks.push(
      {
        task: taskToAdd,
        completed: false
      }
      )

    data.tasksToDo = dayTasks;

  } else if (list == "work") {
    workTasks.push(
      {
        task: taskToAdd,
        completed: false
      }
      )

    data.tasksToDo = workTasks;
  }
}

function checkTask (index) {
  if (data.list == "day") {
    dayTasks[index].completed = true;
    data.tasksToDo = dayTasks;
  } else if (data.list == "work") {
    workTasks[index].completed = true;
    data.tasksToDo = workTasks;
  }
}