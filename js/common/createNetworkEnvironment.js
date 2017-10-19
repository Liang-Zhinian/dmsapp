

import React, { Component } from 'react'
import Base64 from './Base64'
import dmssoap from './dmssoap'

const PROTOCOL = 'http:';
const HOST = 'dms.isd4u.com';
const PORT = '8080';
const AUTHORIZATION = 'Basic ' + Base64.btoa('admin:admin');

function fetchQuery(url) {
    return fetch(PROTOCOL + '//' + HOST + (!!PORT ? ':' + PORT : '') + url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': AUTHORIZATION,
        }
    }).then(response => {
        return response.json()
    });
}

const DmsRestApi = {
    listChildren: (folderId: int, callback: (error: Error | null, value: any) => void) => {
        let dataArray = [];

        fetchQuery('/services/rest/folder/listChildren?folderId=' + folderId)
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



                fetchQuery('/services/rest/document/list?folderId=' + folderId)
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

    getRootFolder: (sid: string, callback: (error: Error | null, value: any) => void) => {
        let xml = '<?xml version="1.0" encoding="utf-8"?>'
        xml += '<soap:Envelope '
        xml += 'xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" '
        xml += 'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" '
        xml += 'xmlns:tns="http://ws.logicaldoc.com" '
        xml += 'xmlns:ns1="http://ws.logicaldoc.com"> '
        xml += '<soap:Body> '
        xml += '<ns1:getRootFolder xmlns:ns1="http://ws.logicaldoc.com"> '
        xml += '    <sid>'+sid+'</sid>'
        xml += '</ns1:getRootFolder>'
        xml += '</soap:Body></soap:Envelope>';

        dmssoap.send(PROTOCOL + '//' + HOST + (!!PORT ? ':' + PORT : '') + '/services/Folder?wsdl', 'GET', callback);
    }
};

export default DmsRestApi;