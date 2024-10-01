function getQuote(){
    var price = 0
    var commType = document.getElementById("comm-type").value
    var quoteVars=[];
    var calcReady=true
    Array.from(document.getElementsByClassName("quote-var")).forEach(element=>{
        if (element.value=="") calcReady = false
        if (element.type=="checkbox") quoteVars.push(element.checked)
        else quoteVars.push(element.value)
        
    })
    console.log(commType)
    console.log(quoteVars)
    switch(commType){
        case "0":
            price+=40*quoteVars[0]
            price+=5

            price += quoteVars[1]*12*1.25
            price *= .7
            break
        case "1":
            price+=40*quoteVars[0]
            price+=20
            if(quoteVars[1]==true)  price += 20
            price *= 1.3
            break
        case "2":
            price+=40*quoteVars[0]
            price+=20

            price += quoteVars[1]*12*1.25
            price *= 1.3
            break
    }
    price = Math.floor(price/5)*5
    if (calcReady == true) document.getElementById("quote-estimate").innerHTML="Your estimate is... $"+price
    else document.getElementById("quote-estimate").innerHTML="To Be Calculated..."
}

function loadCommQuestons() {

    //Gotta update these manually until you stop being lazy >:l
    var commDesc = [
        "A hand-animated doodle of a simple scene.",
        "A drawing with aspects animated via tweening more often then not.",
        "A hand-animated scene with more complex movements and detail.",
    ]

    var commQuestions = [
        [
            ["number","charNum","How many characters are present?",1,4],
            ["number","animLength","How long is the animation (in seconds)?",1,30],
        ],
        [
            ["number","charNum","How many characters are present?",1,4],
            ["check","animLength","Any animated assests?"],
        ],
        [
            ["number","charNum","How many characters are present?",1,4],
            ["number","animLength","How long is the animation (in seconds)?",1,30],
        ],

    ];


    var commType = document.getElementById("comm-type").value
    var commDescElement = document.getElementById("comm-desc")
    var questionAreaElement = document.getElementById("comm-questions")

    // Populate with questions

    commDescElement.innerHTML=commDesc[commType]
    questionAreaElement.replaceChildren()
    commQuestions[commType].forEach(input => {
        
        var a = createInput(questionAreaElement,input)

    });

    document.getElementById("quote-estimate").innerHTML="To Be Calculated..."
    
}

function createInput(container,data){
    
    questionContainer = document.createElement("div")
    questionContainer.classList.add("comm-question-container")

    switch(data[0]){
        
        case "number":
            label = document.createElement("label")
            label.innerHTML = data[2]
            label.for = data[1]
            input = document.createElement("input")
            input.type = "number"
            input.name = data[1]
            input.id = data[1] 
            input.min = data[3]
            input.max = data[4]
            input.classList.add("quote-var")
            input.onchange=getQuote
            questionContainer.appendChild(label)
            questionContainer.appendChild(input)        
            break
        case "check":
            label = document.createElement("label")
            label.innerHTML = data[2]
            label.for = data[1]
            input = document.createElement("input")
            input.type = "checkbox"
            input.name = data[1]
            input.id = data[1] 
            input.classList.add("quote-var")
            input.onchange=getQuote
            questionContainer.appendChild(label)
            questionContainer.appendChild(input)
            break
        case "select":
            label = document.createElement("label")
            label.innerHTML = data[2]
            label.for = data[1]
            select = document.createElement("select")
            select.name = data[1]
            select.onchange=getQuote
            select.classList.add("quote-var")
            select.id = data[1] 
            for (let index = 3; index < data.length; index++) {
                select.innerHTML+='<option value="'+ (index - 3)+'">'+data[index]+'</option>'
            } 
            questionContainer.appendChild(label)
            questionContainer.appendChild(select)
            break
    }

    container.appendChild(questionContainer)

}

loadCommQuestons(0)

