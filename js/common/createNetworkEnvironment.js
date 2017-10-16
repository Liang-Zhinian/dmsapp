

import React, { Component } from 'react'
import Base64 from './Base64'

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
    }
};

export default DmsRestApi;