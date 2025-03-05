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
            initConnection(conn);
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
            resolve(conn);
        });
        peer.on('error', function(err) {
            conn.close();
            reject(err);
        });
    });
}

function initConnection(conn){
    conn.on('data', function(data) {
        console.log('Received', data);
        if(data.type == 'message'){
            var msg = data.message;
            var name = data.name;
            var time = data.time;
            addMessage(msg, name, time);
        }
    });
}