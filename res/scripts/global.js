if (window.location.pathname!="/"){
    if (Cookies.get('nsfwConsent')!="true") {
        window.location.pathname = "/";
    }
}

var openMenu;
    //BG color, BG Image,bg Texture,TEXT, BG2, BGAc, Ac, Border color,
var themes = {
    "dark":["#000","standard","pcb","#eee","#333","#444","acc","#000"],
    "light":["#fff","standard","pcb","#000","#fff","#ddd","acc","#000"],
    "cobalt":["#2F4858","standard","pcb","#eee","#33658A","#86BBD8","#F6AE2D","#000"],
    "qu4zar":["#991133","url(/res/img/bg/qu4zar.png)","","#eee","#fff5","#fff","#ff8833","#000"],
}

standardBG=  "linear-gradient(125deg, var(--textColor) 10%, var(--accentColor1) 9%, rgba(0,0,0,0) 10%, var(--accentColor1) 10%, var(--accentColor1) 15%, var(--backgroundColor) 15%, var(--backgroundColor) 85%, var(--accentColor1) 85%, var(--accentColor1) 90%, var(--textColor) 90%) "

var accents = ["#f00", "#f80", "#8f0", "#0f8", "#0f0", "#0ff", "#09f", "#00f", "#90f", "#f0f", "#f09"]

function loadTheme(){
    var themeToLoad

    if (Cookies.get('themeAcc')!=undefined){
        document.documentElement.style.setProperty("--accentColor1",accents[parseInt(Cookies.get('themeAcc'))])
    }

    switch (Cookies.get('theme')){
        case "auto":
            var currentHour = new Date().getHours(); 
            if(currentHour>=7&&currentHour<=18)themeToLoad = "light"
            else themeToLoad = "dark"
            break;
        case undefined:
            var currentHour = new Date().getHours(); 
            if(currentHour>=7&&currentHour<=18)themeToLoad = "light"
            else themeToLoad = "dark"
            break;
        default:
           themeToLoad = Cookies.get('theme')
            break;
    }
    changeTheme(themeToLoad)
    
}

function openThemeMenu(){

    if(document.getElementsByClassName("menu")[0]!=undefined) return false

    openMenu = document.createElement("div");
    openMenu.innerHTML = ` <div class="fullscreen-center menu" onclick="closeMenu(event)">
    <div class="window-div"  >
        <div><h1>Theme Settings</h1></div>
        <div id="theme-options" class="center-hori">
            <input id="theme-option-accent" type="range" onchange="changeAccent()">
            <div>
                <span onclick="changeTheme('light')">☀️</span>
                <span onclick="changeTheme('auto')">🕰️</span>
                <span onclick="changeTheme('dark')">🌑</span>
                <span onclick="changeTheme('cobalt')">🛳️</span>
            </div>
            <a class="hero-button" id="menu-close-button" onclick="closeMenu(event)">CLOSE</a>
        </div>
    </div>
</div>`
document.body.appendChild(openMenu)

    document.getElementById("theme-option-accent").value = parseInt(Cookies.get('themeAcc'))

    sliderBG = "linear-gradient(90deg,"
    totalAccents = accents.length
    i = 0
    accents.forEach(color => {
        sliderBG += color+" "+(i/totalAccents)*100+"%,"
        i++;
        sliderBG += color+" "+(i/totalAccents)*100+"%,"
    });
    sliderBG = sliderBG.slice(0,sliderBG.length-1) + ")"
    console.log(sliderBG)
    document.getElementById("theme-option-accent").min=0
    document.getElementById("theme-option-accent").max=accents.length-1

}

function changeAccent(){
    option = document.getElementById("theme-option-accent").value
    document.documentElement.style.setProperty("--accentColor1",accents[option])
    if (Cookies.get('cookieConsent')=="true"){
        Cookies.set('themeAcc',option, { sameSite: 'strict' })
    }

}


function changeTheme(themeID){
    var theme = themes[themeID]

    if (themeID=="auto"){
        if (Cookies.get('cookieConsent')=="true"){
            Cookies.set('theme',themeID, { sameSite: 'strict' })
        }    
        loadTheme();
    } 
    else {
        if (Cookies.get('cookieConsent')=="true"){
            Cookies.set('theme',themeID, { sameSite: 'strict' })
        }    
    }
    


    console.log(theme[2])
    bg = theme[1];
    accent = theme[6]
    texture = theme[2]
    if (theme[1]=="standard") bg = theme[0] + " " +standardBG; 
    if (theme[6]=="acc") accent=(getComputedStyle(document.documentElement).getPropertyValue('--accentColor1'));
    switch(theme[2]){
        case "pcb":
            texture = "url(/res/img/bg.jpg)"
            break;
    }

    document.documentElement.style.setProperty("--backgroundColor",theme[0])
    document.documentElement.style.setProperty("--textColor",theme[3])
    document.documentElement.style.setProperty("--backgroundColor2",theme[4])
    document.documentElement.style.setProperty("--backgroundColor2Acc",theme[5])
    document.documentElement.style.setProperty("--accentColor1",accent)
    document.documentElement.style.setProperty("--borderColor",theme[7])
    document.documentElement.style.setProperty("--background",bg)
    document.documentElement.style.setProperty("--backgroundTexture",texture)



}

function closeMenu(event){
    if(event.target == document.getElementsByClassName("menu")[0]) openMenu.replaceWith("")
    if(event.target == document.getElementById("menu-close-button")) openMenu.replaceWith("")
}

loadTheme();

