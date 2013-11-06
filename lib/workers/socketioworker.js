(function() {

	var io = require('socket.io-client'),
		util = require('util'),
        BaseWorker = require('./baseworker.js');

    /**
    * SocketIOWorker Worker class inherits form BaseWorker
    */
	var SocketIOWorker =  function(server, generator) {
        SocketIOWorker.super_.apply(this, arguments);
    };

    util.inherits(SocketIOWorker, BaseWorker);

	SocketIOWorker.prototype.createClient =function(callback) {

		var hash = Math.floor(Math.random() * 100000000).toString(16);
		var client = io.connect(this.server + "?hash="+hash , { 'force new connection' : true});
		client.hash = hash;

		client.on('connect', function(){
			callback(false, client);
		});

		client.on('connect_failed', function() {
			callback(true, client);
		});

		client.on('error', function() {
			callback(true, client);
		});
	};

	module.exports = SocketIOWorker;

})();
