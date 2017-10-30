

import Base64 from '../lib/Base64'


const PROTOCOL = 'http:'
const HOST = 'dms.isd4u.com'
const PORT = '8080'

// API URL
const API = `${PROTOCOL}//${HOST}${PORT ? ':' + PORT : ''}/services`

const AuthSoapAPI = API + '/Auth?wsdl'
const FolderSoapAPI = API + '/Folder?wsdl'
const FolderRestAPI = API + '/rest/folder'
const DocumentSoapAPI = API + '/Document?wsdl'
const DocumentRestAPI = API + '/rest/document'


function buildJsonHeaders(username: string, password: string) {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': 'Basic ' + Base64.btoa(username + ':' + password),
    };
}
function buildPlainHeaders(username: string, password: string) {
    return {
        'Accept': 'application/octet-stream;charset=UTF-8',
        'Content-Type': 'application/octet-stream;charset=UTF-8',
        'authorization': 'Basic ' + Base64.btoa(username + ':' + password),
    };
}

// Auth API

export const login = (username: string, password: string) => {
    let xml = '<?xml version="1.0" encoding="utf-8"?>'
    xml += '<soap:Envelope '
    xml += 'xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" '
    xml += 'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" '
    xml += 'xmlns:tns="http://ws.logicaldoc.com" '
    xml += 'xmlns:ns1="http://ws.logicaldoc.com"> '
    xml += '<soap:Body> '
    xml += '<ns1:login xmlns:ns1="http://ws.logicaldoc.com"> 	'
    xml += '<username>' + username + '</username> 	'
    xml += '<password>' + password + '</password>  '
    xml += '</ns1:login>'
    xml += '</soap:Body></soap:Envelope>';

    var options = {
        method: 'POST',
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml,text/xml;q=0.9,*/*;q=0.8',
            'Content-Length': xml.length,
            'Content-Type': 'text/xml; charset=utf-8',
            'SOAPAction': '""'
        },
        body: xml
    };

    return fetch(AuthSoapAPI, options)
        .then(response => Promise.all([response, response.text()]))
}

export const renew = (sid: string) => {
    let xml = '<?xml version="1.0" encoding="utf-8"?>'
    xml += '<soap:Envelope '
    xml += 'xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" '
    xml += 'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" '
    xml += 'xmlns:tns="http://ws.logicaldoc.com" '
    xml += 'xmlns:ns1="http://ws.logicaldoc.com"> '
    xml += '<soap:Body> '
    xml += '<ns1:renew xmlns:ns1="http://ws.logicaldoc.com"> 	'
    xml += '<sid>' + sid + '</sid> 	'
    xml += '</ns1:renew>'
    xml += '</soap:Body></soap:Envelope>';

    var options = {
        method: 'POST',
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml,text/xml;q=0.9,*/*;q=0.8',
            'Content-Length': xml.length,
            'Content-Type': 'text/xml; charset=utf-8',
            'SOAPAction': '""'
        },
        body: xml
    };

    return fetch(AuthSoapAPI, options)
        .then(response => Promise.all([response, response.text()]))

}

export const valid = (sid: string) => {
    let xml = '<?xml version="1.0" encoding="utf-8"?>'
    xml += '<soap:Envelope '
    xml += 'xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" '
    xml += 'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" '
    xml += 'xmlns:tns="http://ws.logicaldoc.com" '
    xml += 'xmlns:ns1="http://ws.logicaldoc.com"> '
    xml += '<soap:Body> '
    xml += '<ns1:valid xmlns:ns1="http://ws.logicaldoc.com"> 	'
    xml += '<sid>' + sid + '</sid> 	'
    xml += '</ns1:valid>'
    xml += '</soap:Body></soap:Envelope>';

    var options = {
        method: 'POST',
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml,text/xml;q=0.9,*/*;q=0.8',
            'Content-Length': xml.length,
            'Content-Type': 'text/xml; charset=utf-8',
            'SOAPAction': '""'
        },
        body: xml
    };

    return fetch(AuthSoapAPI, options)
        .then(response => Promise.all([response, response.text()]))
}


// Folder API
export const listChildrenFolders = (username: string, password: string, folderId: int) => {
    var options = {
        method: 'GET',
        headers: buildJsonHeaders(username, password)
    };
    return fetch(`${FolderRestAPI}/listChildren?folderId=${folderId}`, options)
        .then(response => Promise.all([response, response.json()]));

}

export const getRootFolder = (sid: string) => {
    let xml = '<?xml version="1.0" encoding="utf-8"?>'
    xml += '<soap:Envelope '
    xml += 'xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" '
    xml += 'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" '
    xml += 'xmlns:tns="http://ws.logicaldoc.com" '
    xml += 'xmlns:ns1="http://ws.logicaldoc.com"> '
    xml += '<soap:Body> '
    xml += '<ns1:getRootFolder> '
    xml += '    <sid>' + sid + '</sid>'
    xml += '</ns1:getRootFolder>'
    xml += '</soap:Body></soap:Envelope>';

    var options = {
        method: 'POST',
        headers: {
            'Content-Length': xml.length,
            'Content-Type': 'application/soap+xml; charset=utf-8',
            'SOAPAction': '""'
        },
        body: xml
    };

    return fetch(FolderSoapAPI, options)
        .then(response => Promise.all([response, response.text()]))
}

// Document API
export const listChildrenDocuments = (username: string, password: string, folderId: int) => {

    var options = {
        method: 'GET',
        headers: buildJsonHeaders(username, password)
    };

    return fetch(`${DocumentRestAPI}/list?folderId=${folderId}`, options)
        .then(response => Promise.all([response, response.json()]));
}

export const getContentSOAP = (sid: string, docId: int) => {
    let xml = '<?xml version="1.0" encoding="utf-8"?>'
    xml += '<soap:Envelope '
    xml += 'xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" '
    xml += 'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" '
    xml += 'xmlns:tns="http://ws.logicaldoc.com" '
    xml += 'xmlns:ns1="http://ws.logicaldoc.com"> '
    xml += '<soap:Body> '
    xml += '<ns1:getContent> '
    xml += '    <sid>' + sid + '</sid>'
    xml += '    <docId>' + docId + '</docId>'
    xml += '</ns1:getContent>'
    xml += '</soap:Body></soap:Envelope>';

    var options = {
        method: 'POST',
        headers: {
            'Content-Length': xml.length,
            'Content-Type': 'application/soap+xml; charset=utf-8',
            'SOAPAction': '""'
        },
        body: xml
    };

    return fetch(DocumentSoapAPI, options)
        .then(response => Promise.all([response, response.text()]))
}

export const getContent = (username: string, password: string, docId: int) => {

    var options = {
        method: 'GET',
        headers: buildPlainHeaders(username, password)
    };

    // return fetch(`${DocumentRestAPI}/getContent?docId=${docId}`, options)
    //     .then(response => Promise.all([response, response.text()]));

    return new Promise((resolve, reject)=>{
        var data = null;

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState !== 4){

            return;
            }
          if (this.status === 200) {
            console.log(this.responseText);
            resolve(this.responseText)
          } else {
            reject(Error(this.responseText))
          }

        });

        xhr.open("GET", `${DocumentRestAPI}/getContent?docId=${docId}`);
        // xhr.setRequestHeader("content-type", "application/octet-stream");
        // xhr.setRequestHeader("accept", "application/octet-stream");
        xhr.setRequestHeader("authorization", "Basic YWRtaW46YWRtaW4=");

        xhr.send(data);
    })
}

export const getDocument = (username: string, password: string, docId: int) => {

    var options = {
        method: 'GET',
        headers: buildJsonHeaders(username, password)
    };

    return fetch(`${DocumentRestAPI}/getDocument?docId=${docId}`, options)
        .then(response => Promise.all([response, response.json()]));
}

