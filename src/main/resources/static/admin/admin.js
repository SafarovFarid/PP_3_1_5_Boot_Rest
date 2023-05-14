const url = 'http://localhost:8080/api/admin';
const renderTable = document.getElementById("table");
const addForm = document.getElementById("create");




const modalDelete = new bootstrap.Modal(document.getElementById('deleteModal'));
const modalEdit = new bootstrap.Modal(document.getElementById('editModal'));




//Все пользователи
const table = (data) => {
    let temp = '';
    data.forEach((user) => {
        let roles = user.roles.map(name => name.role.slice(5)).join(' ');
        temp += "<tr>";
        temp += "<td>" + user.id + "</td>";
        temp += "<td>" + user.firstName + "</td>";
        temp += "<td>" + user.lastName + "</td>";
        temp += "<td>" + user.age + "</td>";
        temp += "<td>" + user.userName + "</td>";
        temp += "<td>" + roles +"</td>"
        temp += "<td><button class=\"btn btn-info\" id='edit' data-toggle=\"modal\" data-userid ='"
            + user.id + "' data-firstName ='" + user.firstName + "' data-lastName ='"
            + user.lastName + "' data-age ='" + user.age + "' data-email ='"
            + user.userName + "' data-password ='" + user.password + "'>Edit</button></td>";
        temp += "<td><button class=\"btn btn-danger\" id='delete' data-toggle=\"modal\" data-userid ='"
            + user.id + "' data-firstName ='" + user.firstName + "' data-lastName ='" + user.lastName + "' data-age ='"
            + user.age + "' data-email ='" + user.userName + "'>Delete</button></td></tr>";
    })
    renderTable.innerHTML = temp;

    document.querySelectorAll(".btn").forEach(button => {
        button.addEventListener('click', handleClick)
    })

    document.getElementById("newUserFirstName").value = '';
    document.getElementById("newUserLastName").value = '';
    document.getElementById("newUserAge").value = '';
    document.getElementById("newUserEmail").value = '';
    document.getElementById("newUserPassword").value = '';
    document.getElementById("password").value='';

}

function getAllUsers() {
    fetch(url)
        .then(api => api.json())
        .then(data => table(data))
}

getAllUsers();

// Добавление нового пользователя

addForm.addEventListener('click', () => {
    const addUrl = "http://localhost:8080/api/admin/create"
    let nameValue = document.getElementById("newUserFirstName").value;
    let lastNameValue = document.getElementById("newUserLastName").value;
    let ageValue = document.getElementById("newUserAge").value;
    let emailValue = document.getElementById("newUserEmail").value;
    let passwordValue = document.getElementById("newUserPassword").value;
    let roles = getRoles(Array.from(document.getElementById("newUserRoles").selectedOptions)
        .map(role => role.value));
    let newUser = {
        firstName: nameValue,
        lastName: lastNameValue,
        age: ageValue,
        userName: emailValue,
        password: passwordValue,
        roles: roles
    }
    fetch(addUrl, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(newUser)
    }).then(() => getAllUsers())
        .then(() => document.getElementById("usersTableButton").click())
})

function getRoles(rols) {
    let roles = [];
    if (rols.indexOf("1") >= 0) {
        roles.push({
            "id": 1,
            "name": "ROLE_ADMIN",
            "users": null,
            "authority": "ROLE_ADMIN"
        });
    }
    if (rols.indexOf("2") >= 0) {
        roles.push({
            "id": 2,
            "name": "ROLE_USER",
            "users": null,
            "authority": "ROLE_USER"
        });
    }
    return roles;
}

//Удаление пользователя

let deleteUrl = '';
document.getElementById("deleteUser").addEventListener('click',() => deleteForm(deleteUrl));
function deleteForm (d) {
    fetch(d, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
    }).then(() => getAllUsers())
        .then(() => modalDelete.hide())

}

//Редактирование пользователя
const editUrl = '/api/admin/updateUser';
document.getElementById("editUser").addEventListener('click',() => editForm(editUrl));
function editForm (e) {
    let idValue = document.getElementById("id-field").value;
    let nameValue = document.getElementById("first-name").value;
    let lastNameValue = document.getElementById("last-name").value;
    let ageValue = document.getElementById("age").value;
    let emailValue = document.getElementById("email").value;
    let passwordValue = document.getElementById("password").value;
    let roles = getRoles(Array.from(document.getElementById("userRoles").selectedOptions)
        .map(role => role.value));


    if (passwordValue === '') {
        let userUrs = "/api/admin/" + idValue;
        fetch(userUrs)
            .then(api => api.json())
            .then(data => data.password)
            .then(password => {
                let user = {
                    id : idValue,
                    firstName: nameValue,
                    lastName: lastNameValue,
                    age: ageValue,
                    userName: emailValue,
                    password: password,
                    roles: roles
                }
                return user;
            })
            .then(user => fetch(e, {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify(user)
            }).then(() => modalEdit.hide())
                .then(() => getAllUsers()))

    } else {
        let user = {
            id : idValue,
            firstName: nameValue,
            lastName: lastNameValue,
            age: ageValue,
            userName: emailValue,
            password: passwordValue,
            roles: roles
        }
        fetch(e, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify(user)
        }).then(() => modalEdit.hide())
            .then(() => getAllUsers())
    }


}



//Открытие модальных окон
const handleClick = (event) => {

    //Удаление пользователя
    if(event.target.id === 'delete') {
        modalDelete.show();
        deleteUrl = 'api/admin/delete/' + event.target.dataset.userid;
        document.getElementById("id-field-del").value = event.target.dataset.userid;
        document.getElementById("first-name-del").value = event.target.dataset.firstname;
        document.getElementById("last-name-del").value = event.target.dataset.lastname;
        document.getElementById("age-del").value = event.target.dataset.age;
        document.getElementById("email-del").value = event.target.dataset.email;
    }

    //Редактирование пользователя
    if(event.target.id === 'edit') {
        modalEdit.show();
        document.getElementById("id-field").value = event.target.dataset.userid;
        document.getElementById("first-name").value = event.target.dataset.firstname;
        document.getElementById("last-name").value = event.target.dataset.lastname;
        document.getElementById("age").value = event.target.dataset.age;
        document.getElementById("email").value = event.target.dataset.email;
    }

}



