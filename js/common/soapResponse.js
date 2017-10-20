
// Changes XML to JSON
const xmlToJson = (xml) => {

    // Create the return object
    var obj = {};

    if (xml.nodeType == 1) {// element
        // do attributes
        if (xml.attributes.length > 0) {
            obj["@attributes"] = {};
            for (var j = 0; j < xml.attributes.length; j++) {
                var attribute = xml.attributes.item(j);
                obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (xml.nodeType == 3) {// text
        obj = xml.nodeValue;
    }

    // do children
    if (xml.hasChildNodes()) {
        for (var i = 0; i < xml.childNodes.length; i++) {
            var item = xml.childNodes.item(i);
            var nodeName = item.nodeName.substring(item.nodeName.indexOf(":") + 1).replace('#', '');
            if (typeof (obj[nodeName]) == "undefined") {
                obj[nodeName] = xmlToJson(item);
            } else {
                if (typeof (obj[nodeName].push) == "undefined") {
                    var old = obj[nodeName];
                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                }
                obj[nodeName].push(xmlToJson(item));
            }
        }
    }
    return obj;
};

const soapResponse = {
    toJson: (xml) => {
        var json = xmlToJson(xml).Body;

        console.debug(json);

        var response = {};
        for (var outterKey in json) {
            if (json.hasOwnProperty(outterKey)) {
                temp = json[outterKey];
                for (var innerKey in temp) {
                    if (temp.hasOwnProperty(innerKey)) {
                        response[innerKey] = temp[innerKey].text;
                    }
                }
            }
        }

        console.debug(response);
        return response;
    }
};

export default soapResponse.toJson;
