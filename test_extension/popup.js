async function getData(){
    const url = new URL('https://api.coronavirus.data.gov.uk/v1/data');
    const rawData = await fetch(url);
    const jsonData = await rawData.json();
    return jsonData["data"];
}

async function populateData(){
    const data = await getData();
    const { date, areaName, confirmed, death } = data[0];
    document.getElementById("date").innerHTML = date;
    document.getElementById("areaName").innerHTML = areaName;
    document.getElementById("confirmed").innerHTML = confirmed;
    document.getElementById("death").innerHTML = death;
}

async function getAverageData(){
    const data = await getData();
    const finalObj = {
        confirmedRate:0,
        latestBy:0,
        confirmed:0,
        deathNew:0,
        death:0,
        deathRate:0
    };
    const count = data.length;
    data.map((item)=>{
        const { confirmedRate, latestBy, confirmed, deathNew,death,deathRate } = item;
        finalObj["confirmedRate"] += confirmedRate || 0;
        finalObj["latestBy"] += latestBy || 0;
        finalObj["confirmed"] += confirmed || 0;
        finalObj["deathNew"] += deathNew || 0;
        finalObj["death"] += death || 0;
        finalObj["deathRate"] += deathRate || 0;
    });

    document.getElementById("avgConfirmed").innerHTML = Math.trunc(finalObj["confirmed"]/count);
    document.getElementById("avgDeathNew").innerHTML = Math.trunc(finalObj["deathNew"]/count);
    document.getElementById("avgDeath").innerHTML = Math.trunc(finalObj["death"]/count);
    document.getElementById("avgDeathRate").innerHTML = Math.trunc(finalObj["deathRate"]/count);
}

// (function($) {
//     $.fn.invisible = function() {
//         return this.each(function() {
//             $(this).css("visibility", "hidden");
//         });
//     };
//     $.fn.visible = function() {
//         return this.each(function() {
//             $(this).css("visibility", "visible");
//         });
//     };
// }(jQuery));

// $(document).ready(function(){
//     $("#avgButtonClick").on('click',async function(){
//         const buttonText = document.getElementById("avgButtonClick").innerText;
//         console.log(buttonText);
//         if(buttonText==="Get Average Data"){
//             await getAverageData();
//             document.getElementById("avgButtonClick").innerText = "Hide Details";
//             $("#tableAvg").css("visibility", "visible");
//         }
//         else{
//             document.getElementById("avgButtonClick").innerText = "Get Average Data";
//             $("#tableAvg").css("visibility", "hidden");
//         }
//     })
// });


function onButtonClick(){
    const buttonText = document.getElementById("avgButtonClick").innerText;
    if(buttonText==="Get Average Data"){
        getAverageData()
        .then(()=>{
            document.getElementById("avgButtonClick").innerText = "Hide Details";
            document.getElementById("tableAvg").style.visibility = "visible";
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    else{
        document.getElementById("avgButtonClick").innerText = "Get Average Data";
        document.getElementById("tableAvg").style.visibility = "hidden";
    }
}

document.getElementById('avgButtonClick').addEventListener('click',function(){
    onButtonClick();
 });

populateData();

// {"date":"2022-05-20","areaName":"United Kingdom","areaCode":"K02000001","confirmedRate":33151.9,"latestBy":6338,"confirmed":22238713,"deathNew":87,"death":177977,"deathRate":2