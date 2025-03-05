var peer;

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
            console.error('Error connecting to peer:', err);
            reject(err);
        });
    });
}