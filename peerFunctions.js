var peer;
var conn;

async function createPeer() {
    return new Promise((resolve, reject) => {
        // generate unique id with excatly 10 upper english letters
        var id = Math.random().toString(36).substring(2, 9).toUpperCase();
        ID = id;

        //create peer instance
        peer = new Peer(id + roomSuffix);
        peer.on('open', function(id) {
            console.log('My peer ID is: ' + id);
            resolve(ID);
        });
        peer.on('connection', function(connection) {
            conn = connection;
            conn.on('open', function() {
                initConnection(conn);
            });
        });
        peer.on('error', function(err) {
            reject(err);
        });
    });
}

async function connectToPeer(peerId) {
    console.log('Attempting to connect to peer:', peerId + roomSuffix);
    return new Promise((resolve, reject) => {
        const conn = peer.connect(peerId + roomSuffix);
        conn.on('open', function() {
            console.log('Connected to: ' + peerId);
            conn.send({
                type: 'init',
                name: NAME
            })
            resolve(conn);
        });
        peer.on('error', function(err) {
            conn.close();
            reject(err);
        });
    });
}

function initConnection(conn){
    console.log("Connection established with: ", conn.peer);
    conn.on('data', function(data) {
        console.log('Received', data);
        if(data.type == 'message'){
            var msg = data.message;
            var name = data.name;
            var time = data.time;
            addMessage(msg, name, time);
        }
        if(data.type == 'init'){
            var name = data.name;
            addParticipant(name);
        }
    });
}