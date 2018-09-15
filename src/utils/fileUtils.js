"use strict";

function loadJSON(path, callback) 
{
    var xmlRequest = new XMLHttpRequest();
    xmlRequest.overrideMimeType("application/json");
	xmlRequest.open('GET', path, true);
	
    xmlRequest.onreadystatechange = function() 
    {
		if (xmlRequest.readyState == 4 && xmlRequest.status == 200) 
		{
            callback(xmlRequest.responseText);
        }
    };
    xmlRequest.send(null);
}