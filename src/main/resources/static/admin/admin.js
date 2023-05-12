const url = 'admin/json'
const user = fetch(url)
    .then(data => data.json())
    .then(json => table(json))

const modalEdit = new bootstrap.Modal(document.getElementById('editModal'));
const modalDelete = new bootstrap.Modal(document.getElementById('deleteModal'));

const tableid = document.getElementById('table');

const idfield = document.getElementById('id-field');
const first = document.getElementById('first-name');
const last = document.getElementById('last-name');
const a = document.getElementById('age');
const e = document.getElementById('email');

const idfielddel = document.getElementById('id-field-del');
const firstnamedel = document.getElementById('first-name-del');
const lastnamedel = document.getElementById('last-name-del');
const agedel = document.getElementById('age-del');
const emaildel = document.getElementById('email-del');

const form_new = document.getElementById('formForNewUser');
const role_new = document.getElementById('roles').selectedOptions;



const table = (data) => {
    let temp = "";
    data.forEach((user) => {
        temp += "<tr>";
        temp += "<td>" + user.id + "</td>";
        temp += "<td>" + user.firstName + "</td>";
        temp += "<td>" + user.lastName + "</td>";
        temp += "<td>" + user.age + "</td>";
        temp += "<td>" + user.userName + "</td><td>";
        for (let i = 0; i < user.roles.length; i++){
            if (i >= 1) {
                temp += ", ";
            }
            temp += user.roles[i].role.slice(5);
        }
        temp += "<td><button class=\"btn btn-info\" id='edit' data-toggle=\"modal\" data-userid ='" + user.id + "' data-firstName ='" + user.firstName + "' data-lastName ='" + user.lastName + "' data-age ='" + user.age + "' data-email ='" + user.userName + "'>Edit</button></td>";
        temp += "<td><button class=\"btn btn-danger\" id='delete' data-toggle=\"modal\" data-userid ='" + user.id + "' data-firstName ='" + user.firstName + "' data-lastName ='" + user.lastName + "' data-age ='" + user.age + "' data-email ='" + user.userName + "'>Delete</button></td>";
    })
    temp += "</tr>";
    tableid.innerHTML = temp;

    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('click', handleClick)
    })


}

const handleClick = (event) => {
    let editButtonPressed = event.target.id === 'edit';
    let deleteButtonPressed = event.target.id === 'delete';
    let createButtonPressed = event.target.id === 'create';

    let userid = event.target.dataset.userid;
    let firstname = event.target.dataset.firstname;
    let lastname = event.target.dataset.lastname;
    let age = event.target.dataset.age;
    let email = event.target.dataset.email;


    if (editButtonPressed) {
        modalEdit.show();

        idfield.value = userid;
        first.value = firstname;
        last.value = lastname;
        a.value = age;
        e.value = email;

    }

    if (deleteButtonPressed) {
        modalDelete.show();

        idfielddel.value = userid;
        firstnamedel.value = firstname;
        lastnamedel.value = lastname;
        agedel.value = age;
        emaildel.value = email;
    }

    if (createButtonPressed) {
        let listOfRole = [];
        for (let i = 0; i < role_new.length; i++) {
            listOfRole.push({
                id:role_new[i].value
            });
        }
        const res = fetch ("json/newAddUser" , {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName: form_new.newfirstName.value,
                lastName: form_new.newlastName.value,
                age: form_new.newAge.value,
                userName: form_new.newUserName.value,
                password: form_new.newPassword.value,
                roles: listOfRole
            })
        })
    }

}













