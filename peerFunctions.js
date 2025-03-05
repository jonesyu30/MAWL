var peer;

async function createPeer() {
    return new Promise((resolve, reject) => {
        // generate unique id with excatly 10 upper english letters
        var id = Math.random().toString(36).substring(2, 9).toUpperCase();

        //create peer instance
        peer = new Peer(id);
        peer.on('open', function(id) {
            console.log('My peer ID is: ' + id);
            ID = id;
            resolve(id);
        });
        peer.on('error', function(err) {
            reject(err);
        });
    });
}

async function connectToPeer(peerId) {
    return new Promise((resolve, reject) => {
        const conn = peer.connect(peerId);
        console.log(conn)
        conn.on('open', function() {
            console.log('Connected to: ' + peerId);
            resolve(conn);
        });
        conn.on('error', function(err) {
            console.error('Error connecting to peer:', err);
            reject(err);
        });
    });
}