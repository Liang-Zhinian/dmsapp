

import React, { Component } from 'react'
import Base64 from './Base64'
import XMLParser from './XMLParser'

const PROTOCOL = 'http:';
const HOST = 'dms.isd4u.com';
const PORT = '8080';
const AUTHORIZATION = 'Basic ' + Base64.btoa('admin:admin');

function fetchQuery(url, options) {
    return fetch(PROTOCOL + '//' + HOST + (!!PORT ? ':' + PORT : '') + url, options);
}

const DmsRestApi = {
    listChildren: (folderId: int, callback: (error: Error | null, value: any) => void) => {
        let dataArray = [];

        var options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': AUTHORIZATION,
            }
        };
        fetchQuery('/services/rest/folder/listChildren?folderId=' + folderId, options)
            .then(response => {
                return response.json()
            })
            .then((responseData) => {
                let dataBlob = [];
                let i = 0;

                //console.log(responseData);

                responseData.map(function (item) {
                    dataBlob.push({
                        key: i,
                        value: item //{id:item.id, name:item.name, type:item.type, description:item.description},
                    })
                    i++;
                });
                dataArray = dataArray.concat(dataBlob);
                dataBlob = [];



                fetchQuery('/services/rest/document/list?folderId=' + folderId, options)
                    .then(response => {
                        return response.json()
                    })
                    .then((responseData) => {
                        responseData.map(function (item) {
                            dataBlob.push({
                                key: i,
                                value: item //{id:item.id, name:item.name, type:item.type, description:item.description},
                            })
                            i++;
                        });
                        dataArray = dataArray.concat(dataBlob);

                        callback(null, dataArray);
                    })
                    .catch((error) => {
                        callback(error);
                    })
                    .done();

            })
            .catch((error) => {
                callback(error);
            })
            .done();
    },

    getRootFolder: (sid: string, callback: (error: Error | null, value: string) => void) => {
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

        fetchQuery('/services/Folder?wsdl', options)
            .then(response => {
                return response.text()
            })
            .then((responseData) => {
                var xmlParser = new XMLParser();
                var xml = xmlParser.parseFromString(responseData);
                var json = xmlParser.toJson(xml);
                if (json.Body.Fault)
                    callback(new Error(json.Body.Fault.faultstring));
                else
                    callback(null, json);
            })
            .catch((error) => {
                callback(error);
            })
            .done();
    },

    login: (username: string, password: string, callback: (error: Error | null, value: string) => void) => {
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

        fetchQuery('/services/Auth?wsdl', options)
            .then(response => {
                return response.text()
            })
            .then((responseData) => {
                var xmlParser = new XMLParser();
                var xml = xmlParser.parseFromString(responseData);
                var json = xmlParser.toJson(xml);
                if (json.Body.Fault)
                    callback(new Error(json.Body.Fault.faultstring));
                else
                    callback(null, json);
            })
            .catch((error) => {
                callback(error);
            })
            .done();
    }
};

export default DmsRestApi;