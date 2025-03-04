var ID;

async function createPeer() {
    return new Promise((resolve, reject) => {
        const peer = new Peer();
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