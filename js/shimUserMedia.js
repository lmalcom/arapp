// shim for navigator.getUserMedia
navigator.getUserMedia	= navigator.getUserMedia
			|| navigator.webkitGetUserMedia
			|| navigator.mozGetUserMedia
			|| navigator.msGetUserMedia
			|| navigator.oGetUserMedia;

// shim for window.URL.createObjectURL
window.URL	= window.URL || window.webkitURL;
if( window.URL ){
	window.URL.createObjectURL	= window.URL.createObjectURL || webkitURL.createObjectURL;
}

// sanity check - if the API available
if( !navigator.getUserMedia )	throw new Error("navigator.getUserMedia not found.");
if( !window.URL )		throw new Error("window.URL not found.");
if(!window.URL.createObjectURL)	throw new Error("window.URL.createObjectURL not found.");


