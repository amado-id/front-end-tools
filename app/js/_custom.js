(function (factory) {
	typeof define === 'function' && define.amd ? define(factory) :
	factory();
}(function () { 'use strict';

	class form {
	  constructor(array) {
	    this.params = array;
	  }

	  consoleLog() {
	    console.log(this.params);
	  }

	}

	const newform = new form({
	  name: 'Jhon'
	});
	newform.consoleLog();

}));
