const token = localStorage.getItem('token');

window.addEventListener('DOMContentLoaded', () => {
    var sendbtn = document.getElementById('sendbtn');
    sendbtn.addEventListener('click', (e) => {
        var msg = document.getElementById('msg').value;
        e.preventDefault();

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
    })
})

window.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:3000/getMsg', {headers: {"Authorization":token}})
        .then(response => {
            if(response.status === 200){
                //console.log(response);
                response.data.message.forEach(message => {
                    getMsg(message);
                })
            }else{
                throw new Error();
            }
        })
})

function getMsg(message){
    var parentElemnt = document.getElementById('showMsg');
    var msgId = `${message.id}`;
   // console.log(msgId,message);
    parentElemnt.innerHTML += `
    <div class="message" id=${msgId}>
        <p class="meta">Mary<span>9:15pm</span></p>
        <p class="text">
            ${message.message}
        </p>
    </div>`
}