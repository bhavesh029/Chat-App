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