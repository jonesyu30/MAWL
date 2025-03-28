var roomSuffix = "-MAWL"

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

function getRoomID(){
    var roomID = ID;
    return roomID;
}

async function joinRoom(id){
    var conn =  await connectToPeer(id);
    console.log(conn.peer);
    return id;
}
function addParticipant(conn, name){
    var ul = document.getElementById("participants-list");
    var button = document.createElement("button");
    button.className = "namelist-button";
    button.onclick = function(){
        conn.send({
            type: 'confirm',
            name: NAME
        });
        startGame(conn);
    }
    button.appendChild(document.createTextNode(name));
    var li = document.createElement("li");
    li.appendChild(button);
    ul.appendChild(li);
}