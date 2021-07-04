const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
// http://localhost:3000/?kundetype=a&pensionist=ja&samboende=ja&born=nej&tlf_eksisterer=ja&kontrakt=arlig&inbound_opkald=nej&betalingsservice=nej&vaerdi=5000
// var mydata = JSON.parse(churn);
// console(mydata)
function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}
console.log(params)
//usage:
readTextFile("/churn.json", function(text){
    var data = JSON.parse(text);
    var features = ['kundetype', 'pensionist', 'samboende', 'born', 'tlf_eksisterer', 'kontrakt', 'inbound_opkald', 'betalingsservice', 'vaerdi','churn']
    
    var ids = Object.keys(data[features[0]]);

    var filtered_ids_1 = [];
    for (let i = 0; i < ids.length; i++) {
        if (data[features[0]][ids[i]] == params[features[0]]) {
            filtered_ids_1.push(ids[i])
        }
    }
    var filtered_ids_2 = [];
    for (let i = 0; i < filtered_ids_1.length; i++) {
        if (data[features[1]][filtered_ids_1[i]] == params[features[1]]) {
            filtered_ids_2.push(filtered_ids_1[i])
        }
    }
    var filtered_ids_3 = [];
    for (let i = 0; i < filtered_ids_2.length; i++) {
        if (data[features[2]][filtered_ids_2[i]] == params[features[2]]) {
            filtered_ids_3.push(filtered_ids_2[i])
        }
    }
    var filtered_ids_4 = [];
    for (let i = 0; i < filtered_ids_3.length; i++) {
        if (data[features[3]][filtered_ids_3[i]] == params[features[3]]) {
            filtered_ids_4.push(filtered_ids_3[i])
        }
    }
    var filtered_ids_5 = [];
    for (let i = 0; i < filtered_ids_4.length; i++) {
        if (data[features[4]][filtered_ids_4[i]] == params[features[4]]) {
            filtered_ids_5.push(filtered_ids_4[i])
        }
    }
    var filtered_ids_6 = [];
    for (let i = 0; i < filtered_ids_5.length; i++) {
        if (data[features[5]][filtered_ids_5[i]] == params[features[5]]) {
            filtered_ids_6.push(filtered_ids_5[i])
        }
    }
    var filtered_ids_7 = [];
    for (let i = 0; i < filtered_ids_6.length; i++) {
        if (data[features[6]][filtered_ids_6[i]] == params[features[6]]) {
            filtered_ids_7.push(filtered_ids_6[i])
        }
    }
    var filtered_ids_8 = [];
    for (let i = 0; i < filtered_ids_7.length; i++) {
        if (data[features[7]][filtered_ids_7[i]] == params[features[7]]) {
            filtered_ids_8.push(filtered_ids_7[i])
        }
    }
    var churned = [];
    for (let i = 0; i < filtered_ids_8.length; i++) {
        if (data[features[9]][filtered_ids_8[i]] == 'ja') {
            churned.push(filtered_ids_8[i])
        }
    }

    var total_number = filtered_ids_8.length;
    var churned_number = churned.length;
    var probability = churned_number/total_number;
    probability = probability.toFixed(3);

    //Let's return the probability now... Yahooooooooo!
    var response = {
        'probability': probability,
        'Scoring Date': new Date().toISOString().slice(0, 10)
    }
    $('body').html(JSON.stringify(response))
    

});
