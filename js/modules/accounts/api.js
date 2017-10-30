
import XMLParser from '../../common/XMLParser'
import Config, { dms } from '../../config'

// API URL
const API = `${dms.PROTOCOL}//${dms.HOST}${dms.PORT ? ':' + dms.PORT : ''}/services`

const AuthSoapAPI = API + '/Auth?wsdl'


function filterText(res) {
    try {
        if (res.headers.get("content-length") > 0) {
            return res.text();
        }
    }
    catch (e) {
        throw new Error('data format error');
    }
}

function filterStatus(res) {
    if (res.ok) {
        return res;
    } else {
        res.text().then(text => { throw new Error(text) })
    }
}

function parseJSON(xml) {
    try {
        var xmlParser = new XMLParser();
        var xmlDoc = xmlParser.parseFromString(xml);
        return xmlParser.toJson(xmlDoc);
    }
    catch (e) {
        throw new Error('data format error');
    }
}

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

    return new Promise((resolve, reject) => {
        fetch(AuthSoapAPI, options)

            .then(filterStatus)
            .then(filterText)
            .then((xml) => {
                resolve(parseJSON(xml));
            })
            .catch(function (error) {
                reject(error);
            });
    });

    // })
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

    return new Promise((resolve, reject) => {
        fetch(AuthSoapAPI, options)

            .then(filterStatus)
            .then(filterText)
            .then((xml) => {
                resolve(parseJSON(xml));
            })
            .catch(function (error) {
                reject(error);
            });
    });

    // })
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

    return new Promise((resolve, reject) => {
        fetch(AuthSoapAPI, options)

            .then(filterStatus)
            .then(filterText)
            .then((xml) => {
                resolve(parseJSON(xml));
            })
            .catch(function (error) {
                reject(error);
            });
    });

    // })
}


