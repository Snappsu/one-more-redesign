function csvJSON(csv){

    var lines=csv.split("\n");
  
    var result = [];
  
    // NOTE: If your columns contain commas in their values, you'll need
    // to deal with those before doing the next step 
    // (you might convert them to &&& or something, then covert them back later)
    // jsfiddle showing the issue https://jsfiddle.net/
    var headers=lines[0].split(",");
  
    for(var i=1;i<lines.length;i++){
  
        var obj = {};
        var currentline=lines[i].split(",");
  
        for(var j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }
  
    //return result; //JavaScript object
    return result; //JSON
  }

async function loadAvailable(type){
    const options = {
        method: 'GET',
        headers: {
          }
    };
    
    data = fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vSFMwUhWaKghJZZr9huoskkX7kn32jZqy4qLhcLe_k9H-aTCRPu4bFrTdjQh6tXFWbfE6NXHX1qwqRH/pub?gid=2032269315&single=true&output=csv', options).then(response => response.text()).then(response => {
        
        var data = csvJSON(response)
        switch (type){
            case "open":
                document.getElementById("available-header").innerHTML=data[0].Open+"!"
                data.forEach(element => {
                    document.getElementById("available-for-header").innerHTML+='<tagitem><span>✔️</span><span><a href="samples#'+element.Types.replace(" ","-").toLowerCase()+'s">'+element.Types+'s</a></span></tagitem>'

                    
                });
                break
            case "desc":
                data.forEach(element => {
                    console.log(element.Types.replaceAll(" ","-").toLowerCase()+"s-desc")
                    document.getElementById(element.Types.replaceAll(" ","-").toLowerCase()+"s-desc").innerHTML+=element["Description\r"]
                });
                break
        }
    })
}
