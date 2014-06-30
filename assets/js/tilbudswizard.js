;(function(window, document, undefined) {
	var Tilbudswizard = new namespace("Tilbudswizard");
	// Set default data
	Tilbudswizard.data = {
		logCount: 0
	};
	Tilbudswizard.log = function(msg) {
		try {
			if (this.data.logCount > 200) {
				console.clear();
				this.data.logCount = 0;
			}
			if (msg.toString().trim() === 'true') {
				console.log('%c' + msg,'background-color: green; color: #fff;');
			}
			else if (msg.toString().trim() === 'false') {
				console.log('%c' + msg,'background-color: red; color: #fff;');
			}
			else {
				console.log(msg);
			}
			this.data.logCount++;
		}
		catch(err) {
			//send error to developer platform
		}
	};
	Tilbudswizard.init = function() {

	};

	Tilbudswizard.init();

	// Make sure that module is exposed to window
	window.Tilbudswizard = Tilbudswizard;
})(window, window.document);


