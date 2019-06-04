//javascript for maths game
//executed once
var playing = false;
var score;

var timeremaining;

var correctAnswer;
//executed whenever you click start/reset button
document.getElementById("startreset").onclick = function(){
    //code to be executed when start/reset button is clicked
    
    //checking whether we are playing or not
    if(playing == true){
        location.reload(); //refresh or reload the page             // if we are playing means playing==true so if we click on startreset button it will reload the page ....And..... if we arent playing(i.e we have came 1st tym on that page ) den it will go in else part and will set the playing as true.
        
        //    if we are playing toh if block will be executed
//            and wen we are playing there will be resetgame 
//            button so jab reset ko click krenge toh page reload                 hoga taki phir se start game kr paay. 
    
    }else{
        
        playing = true;      //yeh kyu kia  ???
        
        score = 0;
        document.getElementById("scoreValue").innerHTML = score;    // 1sr score will be zero
        
        hide("gameover");
        
        show("timeremaining");
        timeremaining = 60;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        startCountdown();
        
        //changing the text of the button
        document.getElementById("startreset").innerHTML = ("Reset Game");
        
        generateQA();
    }
}
function startCountdown(){
    var action = setInterval(function(){
        timeremaining -= 1;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        if(timeremaining == 0){//game over
            clearInterval(action);  //after executing the clearInteval it will make sure that time doesnt crosses zero while decrementing.
            document.getElementById("gameover").innerHTML = "<p>Game Over!</p><p>Your Score is " + score + " .</p>"
            show("gameover");
            hide("timeremaining");
            document.getElementById("startreset").innerHTML = ("Start Game");

            playing = false;
        }
    }, 1000);
}
//Handling events for answer boxes
for(i=1; i<5; i++){
    document.getElementById("box"+i).onclick = function(){
        if(playing = true){
                
            if(this.innerHTML == correctAnswer){
                //correct answer
                score++;
                document.getElementById("scoreValue").innerHTML = score;
                hide("wrong");
                show("correct");
                setTimeout(function(){
                    hide("correct");    //ek sec k baad correct 
                }, 1000);               //chle jayega.
                
                //generate new QA
                generateQA();
            }else{
                //wrong answer
                hide("correct");
                show("wrong");
                setTimeout(function(){
                    hide("correct");
                }, 1000);
            }
        }
    }
}

function generateQA(){
    var x = 1 + Math.round(9 * Math.random());
    var y = 1 + Math.round(9 * Math.random());
//  random method generates a random no or decimal betwn 0 to 1
//  for eg: 0, 0.1, 0.2, 0.3, ... 1  
//  and we want 1 to 10 numbers which should come randomly
//  in quiz. agr random method ne 0 generate kiya toh it will be       multiplied by 9 or any number will give 0 only so for that we       do plus one(+1).if we want bigger nos than we hv to specify for     eg 20 or any no and then + 1.means upto 22 no can come in quiz. 
//  round method decimal ko round krke dega means jo bhi nearest       number rahga decimal k vo dega. for eg:4.3 h toh 4 dega
//  kyuki point k baad 5 ya 5 k upper hua toh aage ka number dega.

    correctAnswer = x * y;
    document.getElementById("question").innerHTML = x + "x" + y;
    var correctPosition = 1 + (Math.round(3 * Math.random()));
    
    //below code fills  correct answer into random box
    document.getElementById("box"+correctPosition).innerHTML = correctAnswer;
    
    var answers = [correctAnswer];     // The correct ans is put into the answers array. you will understand why we have done this 
    /*confirm what this line is actually doing*/
    
    for(i=1; i<5; i++){
        
        if(i!=correctPosition){     /*correntPosition p kuch nai dAALNA H we have to put different/random values only in 3 boxes of total 4.*/
                                    // so if i == correctPosition den dont go inside if loop just skip bcz we dont have to do anything to the box which contains correctAnswer we just have to put random numbers in the other 3 boxes which shoulnt be same as the correctAnswer .
                    
            var wrongAnswer;
            do{
                wrongAnswer = (1 + Math.round(9 * Math.random())) * (1 + Math.round(9 * Math.random()));  /*we have generated 2 random numbers and we have multiplied them and the result of that will be stored in that 3 boxes*/
            }while(answers.indexOf(wrongAnswer) > -1)   /* > -1 means if answers array me wrongAnswers hai toh vo index dega lekin humko coreectAnswer and WrongAnswer which we have generated should not be same */
                /*do while loop tab tak chlega jab tak wrongAnswer answers array me already h toh wrongAnswer phirse genreate krega loop me 
                kyuki we dont want same wrongAnswers in that 3 boxes*/
            
            answers.push(wrongAnswer); // push kiya answers me so that we can check if wrongAnswer Already exist it in or not .
            document.getElementById("box" + i).innerHTML = wrongAnswer;  /*And wrong answer  we have put it in one box*/
            /*This will continue for 4 tyms as we have run the for loop for 4 tyms bcz we have 4 boxes but it wont work for the box which contains correctAnswer as we have restricted that thing in if loop*/ 
        }
    }
}
function show(Id){
    document.getElementById(Id).style.display = "block";
}
function hide(Id){
    document.getElementById(Id).style.display = "none";
}