window.onload = function(){
    
async function initData() {
    const response = await fetch('assets/user.json');
    const data = await response.json();

    return data;
}

let users;

initData().then(function(data) {
    this.users = data.filter(f => f.isActive);
    filterUsers('', '');
});

var genderInput = document.getElementById("genderInput");
var nameInput = document.getElementById("nameInput");
var container = document.getElementById("cards-container");

nameInput.addEventListener('input', function() {
    filterUsers(genderInput.value, nameInput.value);
});

genderInput.addEventListener('input', function() {
    filterUsers(genderInput.value, nameInput.value);
});


function filterUsers(gender, name) {
    var filteredUsers;

    if (gender === '')
        filteredUsers = this.users;
    else
        filteredUsers = this.users.filter(f => f.gender.toLowerCase() === gender);

    filteredUsers = filteredUsers.filter(f => f.fullName.toLowerCase().indexOf(name.toLowerCase()) > -1);

    container.innerHTML = "";
    filteredUsers.forEach((data) => {
        const template = `<div class="card col-md-3 custom-card">
        <div class="card-header row">
            <div class="col-md-3"><img src="${data.picture}" width="48" height="48" class="user-avatar" alt="${data.fullName}"></div>
            <div class="col-md-9">
                <b>
                ${data.fullName}
                </b>
                <span>
                ${data.email}
                </span>
            </div>
        </div>
        <div class="card-body">
            <b>Gender:</b>
            <span class="card-text">${data.gender}</span><br/><br/>
            <b>About:</b><br/>
            <p class="card-text about-text">${data.about}</p>
        </div>
        </div>`;
        container.innerHTML += template;
    });
}
};