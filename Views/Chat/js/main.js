const token = localStorage.getItem('token');

window.addEventListener('DOMContentLoaded', (e) => {
    var sendbtn = document.getElementById('sendbtn');
    sendbtn.addEventListener('click', sendMsg);
    e.preventDefault();
    // setInterval(()=>{
    //     showMsg();
    // },1000);
     showMsg();
     getGrps();
     getuser();
    

    var creategrp = document.getElementById('create-group');
    creategrp.addEventListener('click', createGrp);
})


function sendMsg(){
    var msg = document.getElementById('msg').value;

        let msgDetails = {
            token: token,
            message: msg,
        }

        axios.post('http://localhost:3000/msg', msgDetails , {
            headers: {"Authorization":token}
        })
        .then(() => {
            document.getElementById('msg').value = "";
        })
}

function showMsg(){
    const token = localStorage.getItem('token');
    axios.get('http://localhost:3000/getMsg', {headers: {"Authorization":token}})
        .then(response => {
            if(response.status === 200){
                document.getElementById('showMsg').innerHTML="";
                response.data.message.forEach(message => {
                    var parentElemnt = document.getElementById('showMsg');
                    var msgId = `${message.id}`;
                    //console.log(msgId,message);
                    parentElemnt.innerHTML += `
                    <div class="message" id=${msgId}>
                        <p class="meta">${message.Username}</p>
                        <p class="text">
                            ${message.message}
                        </p>
                    </div>`
                })
            }else{
                throw new Error();
            }
        })
}

async function getuser(){
    const dbout = await axios.get("http://localhost:3000/user/getusers", {headers: {"Authorization":token}});
    const dbuser = dbout.data.dbuser;
    dbuser.forEach((user) => {
        var parentElemnt = document.getElementById('users');
        parentElemnt.innerHTML += `<li>${user.name}</li>`
    })
}

function createGrp (){
    const groupName = document.getElementById('Create-group-input').value;
    let groupDetails = {
        groupName: groupName
    }
    axios.post("http://localhost:3000/creategrp", groupDetails,{headers: {"Authorization":token}})
        try {
            alert("group created successfully");
            document.getElementById('Create-group-input').value = "";
        }
        catch(err) {
            console.log(err);
        }
}

async function getGrps() {
    const dbout = await axios.get("http://localhost:3000/getgrps", {headers: {"Authorization":token}});
    const dbgrp =dbout.data.memberof;
    dbgrp.forEach((grp) => {
        var parentElemnt = document.getElementById("GrpName");
        parentElemnt.innerHTML += `<h2 id="room-name">${grp.grpName}</h2>`
    })
}