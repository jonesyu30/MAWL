function changeScreen(fromDiv, toDiv) {
    // Hide the current screen
    var screen = document.getElementById(fromDiv);
    screen.style.display = "none";
    // Show the new screen
    screen = document.getElementById(toDiv);
    screen.style.display = "block";
}

var NAME;
function getName(name){
    var name = document.getElementById('name-input').value;
    if(name == '') {
        alert('Please enter your name');
        return false;
    } else {
        NAME = name;
        document.getElementById("name-input").value = "";
        return true;
    }
}

function createRoom(){
}
function joinRoom(){

}