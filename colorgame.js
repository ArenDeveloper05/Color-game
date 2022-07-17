    if(!localStorage.getItem("bestScore")){
        localStorage.setItem("bestScore",0);
        bestScoreDiv.innerHTML = "Best Score "+ 0; 
    }

    drawGame();
    gameController();
    
    
    let playerName = prompt("Write your name");

    function drawGame() {
        document.querySelector("body").innerHTML = 
        `
        <h1>GOOD LUCK</h1>
        <div class="pointsDiv"> <b><span class="points">0 Points </span> </b></div>
        <div class="bestScore"><span><b>Best Score 0</b></span></div>
        <div class="players"></div>
        <input type="text" class="search-input" >
        <aside><p> <b>Rules of the game</b></p>
            The player must press the button at any time when the game starts. If, when button pressed, the color of the arrow and the color of the wall are the same, the player receives 1 point. If he does not hit the right side, the game stops.</aside>
            <div class="wrapper">
                <button class="btn" >Try your luck</button>  
                <div class="taracq">
                    <div class="kub kub1"></div>
                    <div class="kub kub2"></div>
                    <div class="kub kub3"></div>
                    <div class="kub kub4"></div>
                <div class="SLAQ">
                    <div class="slaq"></div>
                    <div class="slaqi-poch"></div>
                </div>
            </div>
                `
                const bestScoreDiv = document.querySelector(".bestScore");
                let bestScore = JSON.parse(localStorage.getItem("bestScore"));
                bestScoreDiv.innerHTML = "Best Score "+ bestScore;
                
    }

    function gameController() {
        let arr = ['red', 'yellow', 'greenyellow', 'blueviolet'];
        const slaq = document.querySelector(".slaq");
        const SLAQ = document.querySelector(".SLAQ");
        const btn = document.querySelector(".btn");
        const playersDiv = document.querySelector(".players");
        const bestScoreDiv = document.querySelector(".bestScore");
        const pointsDiv = document.querySelector(".points");
        const searchInput =  document.querySelector(".search-input");
        
        let rotation = 0;
        let animationTime = 2.5;
        slaq.style.backgroundColor = "yellow";
        let points = 0;
    
        showPlayersResults();
        searchPlayer();

    btn.addEventListener('click',()=>{
      

        let tr = window.getComputedStyle(SLAQ).transform;
            let values = tr.split('(')[1];
            values = values.split(')')[0];
            [a,b] = values.split(',');   
            let angle = Math.round(Math.atan2(b, a) * (180/Math.PI))
            console.log(angle);

        if(points==10){
            localStorage.setItem("bestScore",points);
            bestScore();
            localStorage.setItem(`${playerName}`,points);
            showPlayersResults();
            SLAQ.style.animationPlayState = 'paused';
            alert("You Win");
        
        }else{
            if(((angle>=-45)&&(angle<=45)) && slaq.style.backgroundColor=="greenyellow"){
                console.log("salat ");
                console.log(slaq.style.backgroundColor);
                setColor();
                nextLevel();
            } 
            else if(((angle>=45)&&(angle<=135)) && slaq.style.backgroundColor=="blueviolet"){
                console.log("blueviolet ");
                console.log(slaq.style.backgroundColor);
                setColor();
                nextLevel();
            } 
            else if(((angle>=135)&&(angle<=180)||(angle<=-135)&&(angle>=-180)) && slaq.style.backgroundColor=="yellow"){
                console.log("yellow");     
                setColor();
                nextLevel();
            } 
            else if (((angle >= -135) && (angle <= -45)) && slaq.style.backgroundColor=="red"){
                console.log("red");
                setColor();
                nextLevel();
            } 
            else {

                bestScore()  
                localStorage.setItem(`${playerName?playerName:"unknown"}`,points)
                showPlayersResults();
                SLAQ.style.animationPlayState = 'paused';
                document.querySelector("body").innerHTML+=
                `
                <div class="againDiv">
                    <i class="fa-solid fa-reply-all"></i>
                    <p><b>Game Over</b></p>
                </div>
                `;
                
              
            }
            
            points++
            pointsDiv.innerHTML = points+" Points";
           
            
            

        }
     

    })
   

    function setColor() {
        let color2 = arr[Math.floor(Math.random()*4)];
        slaq.style.backgroundColor = color2;
    }
    function nextLevel() {
        animationTime -= 0.2;
        rotation += 90;
        SLAQ.style.animationDuration = `${animationTime}s`;
        document.querySelector(".taracq").style.setProperty('transform', `rotate(${rotation}deg)`);
    }
    function showPlayersResults() {
        playersDiv.innerHTML="";
        let entArr = Object.entries({...localStorage});      
            entArr.sort((a,b)=>{
                    if( Number(a[1]) < Number(b[1]))return 1
                    else if(Number(a[1]) > Number(b[1])) return -1
                    else return 0
            }).forEach(([key,value])=>{
                    if(key!="bestScore"){
                        Number(value)==10?playersDiv.innerHTML+=`<div class="player"><span>${key}(Winner) - ${value}</span></div>`:playersDiv.innerHTML+=`<div class="player"><span>${key} - ${value}</span></div>`;
                    }
                })
    }
    function bestScore() {
        
        let lastPoint = localStorage.getItem("bestScore");
                
                if((Number(points) > Number(lastPoint)) || Number(points)==10){
                    localStorage.setItem("bestScore",points);
                    let bestScore = localStorage.getItem("bestScore");
                    console.log(bestScore);
                    bestScoreDiv.innerHTML = "Best Score "+ bestScore;
                }   
        
    }
    function searchPlayer() {
        
        searchInput.addEventListener('input',()=>{
            playersDiv.innerHTML = "";
            let stObj = {...localStorage};
            Object.keys(stObj).forEach( key=>{
               if(searchInput.value) {
                    if(key!="bestScore" && key.toLowerCase().trim().includes(searchInput.value.toLowerCase().trim())){
                        Number(stObj[key])==10?playersDiv.innerHTML+=`<div class="player"><span>${key}(Winner) - ${stObj[key]}</span></div>`:playersDiv.innerHTML+=`<div class="player"><span>${key} - ${stObj[key]}</span></div>`;
                        console.log(key , stObj[key]);
                    }      
               }else{
                showPlayersResults();
               }
            })
        })
    }
}
