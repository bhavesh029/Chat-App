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
    setInterval(()=>{
        const token = localStorage.getItem('token');
    axios.get('http://localhost:3000/getMsg', {headers: {"Authorization":token}})
        .then(response => {
            if(response.status === 200){
                document.getElementById('showMsg').innerHTML="";
                response.data.message.forEach(message => {
                    getMsg(message);
                })
            }else{
                throw new Error();
            }
        })
    },1000);
    
})

function getMsg(message){
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
}