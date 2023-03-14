var http = require('http')
var axios = require('axios')
var templates = require('./templates')
var static = require('./static.js')
const { parse } = require('querystring');

const port = 7777

// Aux functions
function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

function getUsers() {
    return axios.get("http://localhost:3000/users/")
        .then(res => {
            res.data.sort((u1, u2) => u1.nome.localeCompare(u2.nome))
            return res.data
        })
}

function getTasks() {
    return axios.get("http://localhost:3000/tasks/")
        .then(res => {
            return res.data
        })
}

function doneTask(res, taskID) {
    axios.get("http://localhost:3000/tasks/" + taskID)
        .then(result => {
            result.data['done'] = 1
            axios.put("http://localhost:3000/tasks/" + taskID, result.data)
                .then(() => {
                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                    res.end(templates.successMessage('Tarefa ' + taskID + ' realizada'))
                })
        })
}

function editTask(res, task) {
    getUsers()
        .then(users => {
            axios.get("http://localhost:3000/tasks/" + task)
                .then(result => {
                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                    res.end(templates.editTask(result.data, users))
                })
        })
}

function addUser_Task(req, res) {
    collectRequestBodyData(req, result => {
        if (result) {
            if (result.user != undefined)
                addTask(res, result)
            else
                addUser(res, result)
        }
    })
}

function addUser(res, result) {
    axios.post("http://localhost:3000/users", result).
        then(() => {
            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
            res.end(templates.successMessage('User ' + result.id + ' adicionada com sucesso.'))
        })
}

function addTask(res, result) {
    axios.post("http://localhost:3000/tasks", result).
        then(() => {
            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
            res.end(templates.successMessage('Tarefa ' + result.id + ' adicionada com sucesso.'))
        })
}


// Server creation

var taskServer = http.createServer(function (req, res) {
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)
    if (static.staticResource(req)) {
        static.serveStaticResource(req, res)
    }
    else {
        switch (req.method) {
            case "GET":
                if (req.url == "/") {
                    getTasks()
                        .then(tasks => {
                            getUsers()
                                .then(users => {
                                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                    res.end(templates.mainPage(users, tasks))
                                })
                        })
                }
                else if (/\/task\/edit\/\w+/.test(req.url)) {
                    var taskID = req.url.split('/')[3]
                    editTask(res, taskID)
                }
                else if (/\/task\/done\/\w+/.test(req.url)) {
                    var taskID = req.url.split('/')[3]
                    doneTask(res, taskID)
                }
                break
            case "POST":
                if (req.url == '/') {
                    addUser_Task(req, res)
                }
                else if (/\/task\/edit\/.+/.test(req.url)) {
                    var taskID = req.url.split('/')[3]
                    collectRequestBodyData(req, result => {
                        if (result) {
                            axios.put('http://localhost:3000/tasks/' + taskID, result)
                                .then(
                                    res.end(templates.successMessage(`Edição da task ${taskID} bem-sucedida.`))
                                ).catch(error => {
                                    console.log('Erro: ' + error);
                                })
                        }
                    })
                }
                break
        }
    }
})



taskServer.listen(port, ()=>{
    console.log("Servidor à escuta na porta " + port)
})



