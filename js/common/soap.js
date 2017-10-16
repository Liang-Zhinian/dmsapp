const soap = {

    send: (url: string, method: string, xml: string, callback: (data) => void) => {
        var request = new XMLHttpRequest();
        request.onreadystatechange = (e) => {
          if (request.readyState !== 4) {
            return;
          }
        
          if (request.status === 200) {
            console.log('success', request.responseText);
          } else {
            console.warn('error');
          }
        };

        request.open(method, url);

        // Set some headers: the body of this POST request is XML
        request.setRequestHeader('Content-Type', 'text/xml');
        request.setRequestHeader('Content-Length', xml.length);
        // This header is a required part of the SOAP protocol
        request.setRequestHeader("SOAPAction", '""');

        // Now send an XML-formatted SOAP request to the server
        request.send(xml);

/*
        var http = require('http');
        var http_options = {
            hostname: hostname,
            port: port || 80,
            path: path,
            method: method || 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': xml.length
            }
        }

        var req = http.request(http_options, (res) => {
            console.log(`STATUS: ${res.statusCode}`);
            console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                console.log(`BODY: ${chunk}`);
                callback(`${chunk}`);
            });

            res.on('end', () => {
                console.log('No more data in response.')
            })
        });

        req.on('error', (e) => {
            console.log(`problem with request: ${e.message}`);
        });

        // write data to request body
        req.write(xml); // xml would have been set somewhere to a complete xml document in the form of a string
        req.end();
*/
    }
};

export default soap;