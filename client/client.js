/*** GET ***/
// instantiate a new request


/**
 * [Function get from luke.json]
 * @return {[]} [print the object]
 */
function getFromLuke() {
    var getRequest = new XMLHttpRequest();
    // add event listeners
    getRequest.addEventListener('load', function() {
        var lukeData = JSON.parse(getRequest.responseText);
        document.getElementById('luketext').innerHTML = "Io sono "+lukeData.getJson.nome+" "+lukeData.getJson.cognome+
        " e <br>"+yediyes(lukeData.getJson.Jedi)+"<br>"+printMission(lukeData.getJson.missionieffetuate,0)+"<br>"+
        printMission(lukeData.getJson.missionidaeffettuare,1);
    });
    getRequest.open('GET', 'http://localhost:3000/json/luke', true);
    getRequest.setRequestHeader('Content-type', 'application/json');
    getRequest.send();
}

/**
 * [Function get from leila.json]
 * @return {[]} [print the object]
 */
function getFromLeia() {
    var getRequest = new XMLHttpRequest();
    // add event listeners
    getRequest.addEventListener('load', function() {
      var leilaData = JSON.parse(getRequest.responseText);
      document.getElementById('leilatext').innerHTML = "Io sono "+leilaData.getJson.nome+" "+leilaData.getJson.cognome+
      " e <br>"+yediyes(leilaData.getJson.Jedi)+"<br>"+printMission(leilaData.getJson.missionieffetuate,0)+"<br>"+
      printMission(leilaData.getJson.missionidaeffettuare,1);
    });

    getRequest.open('GET', 'http://localhost:3000/json/leila', true);
    getRequest.setRequestHeader('Content-type', 'application/json');
    getRequest.send();
}

/**
 * [Function get from han.json]
 * @return {[]} [print the object]
 */
function getFromHan() {
    var getRequest = new XMLHttpRequest();
    // add event listeners
    getRequest.addEventListener('load', function() {
        // transform a string into a usable object
        var hanData = JSON.parse(getRequest.responseText);
        document.getElementById('hantext').innerHTML = "Io sono "+hanData.getJson.nome+" "+hanData.getJson.cognome+" e <br>"+yediyes(hanData.getJson.Jedi)+"<br>"+printMission(hanData.getJson.missionieffetuate,0)+"<br>"+printMission(hanData.getJson.missionidaeffettuare,1);
    });

    getRequest.open('GET', 'http://localhost:3000/json/han', true);
    getRequest.setRequestHeader('Content-type', 'application/json');
    getRequest.send();
}

/*** PUT  ***/

/**
 * [Function put to luke.json]
 * @return {[]} [print the object in the console]
 */
function putToLuke () {
    var putRequest = new XMLHttpRequest();
    putRequest.open('PUT', 'http://localhost:3000/json/luke');
    putRequest.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    putRequest.onload = function() {
        if (putRequest.status === 200) {
            var userInfo = JSON.parse(putRequest.responseText);
            var putMessage = document.getElementById('putMessageLuke');
            putMessage.innerHTML = userInfo.message;
        }
    };

    putRequest.send(
        JSON.stringify({
          "nome":"Luke",
          "cognome":"Skywalker",
          "Jedi":"Yes",
          "missionieffetuate":["Yoda mission","Morte nera mission","Darth Vader mission"],
          "missionidaeffettuare":["insegnamento jedi","Potenziamento della forza",newlukemission.value]
        })
    );
}


/**
 * [Function put to leia.json]
 * @return {[]} [print the object in the console]
 */
function putToLeila () {
    var putRequest = new XMLHttpRequest();
    putRequest.open('PUT', 'http://localhost:3000/json/leila');
    putRequest.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    putRequest.onload = function() {
        if (putRequest.status === 200) {
            var userInfo = JSON.parse(putRequest.responseText);
            var putMessage = document.getElementById('putMessageLeila');
            putMessage.innerHTML = userInfo.message;
        }
    };

    putRequest.send(
        JSON.stringify({
          "nome":"Leia",
          "cognome":"Skywalker",
          "Jedi":"yes",
          "missionieffetuate":["pace su Tatooine","Morte nera mission"],
           "missionidaeffettuare":["pace nella galassia","Potenziamento della forza",newleilamission.value]
        })
    );
}



/**
 * [Function put to leia.json]
 * @return {[]} [print the object in the console]
 */
function putToHan () {
    var putRequest = new XMLHttpRequest();
    putRequest.open('PUT', 'http://localhost:3000/json/han');
    putRequest.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    putRequest.onload = function() {
        if (putRequest.status === 200) {
            var userInfo = JSON.parse(putRequest.responseText);
            var putMessage = document.getElementById('putMessageHan');
            putMessage.innerHTML = userInfo.message;
        }
    };

    putRequest.send(
        JSON.stringify({
          "nome":"Han",
          "cognome":"Solo",
          "Jedi":"no",
          "missionieffetuate":["manuntenzione Falcon","distruzione Morte Nera"],
          "missionidaeffettuare":["Sopresa a Leia",newhanmission.value]
        })
    );
}



/*** POST  ***/
/**
 * [Function that create a new element with post]
 * @return {[]} [print the object]
 */
function postToJson() {
    var postRequest = new XMLHttpRequest();
    postRequest.open('POST', 'http://localhost:3000/json/');
    postRequest.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    postRequest.onload = function() {
        if (postRequest.status === 200) {
            var userInfo = JSON.parse(postRequest.responseText);
        }

    };

    postRequest.send(
        JSON.stringify(createPostObj())
    );
}



/**
 * [manager the collapse panel]
 */
function managerCollapseluke(){
    document.getElementById('hantext').innerHTML = "";
    document.getElementById('leilatext').innerHTML = "";
    getFromLuke();

}
/**
 * [manager the collapse panel]
 */
function managerCollapseleila(){
    document.getElementById('hantext').innerHTML = "";
    document.getElementById('luketext').innerHTML = "";
    getFromLeia();

}
/**
 * [manager the collapse panel]
 */
function managerCollapsehan(){
    document.getElementById('leilatext').innerHTML = "";
    document.getElementById('luketext').innerHTML = "";
    getFromHan();

}

//function use for print the jedi status
function yediyes(yedi){
    if (yedi == "yes" || yedi == "Yes"){
        return "sono un Yedy.";
      }
      else {
        return "non sono un Yedy.";
      }

}


//function that print the mission
function printMission(array,l){
  if(l == 0){
      var mission = "Le mie missioni effettuate: ";

      for (var i = 0;i<array.length;i++){

        mission=mission+"<br>- "+array[i];
      }

      return mission;
  }else{
    var mission = "Le mie missioni da effettuare: ";

    for (var i = 0;i<array.length;i++){

      mission=mission+"<br>- "+array[i];
    }

    return mission;
  }

}




//take the element to the doma
var nomePostInput = document.getElementById('nome-post');
var cognomePostInput = document.getElementById('cognome-post');
var missione1PostInput = document.getElementById('missione1-post');
var missione2PostInput = document.getElementById('missione2-post');
var missione3PostInput = document.getElementById('missione3-post');
var compiuta1PostInput = document.getElementById('compiuta1-post');
var compiuta2PostInput = document.getElementById('compiuta2-post');
var compiuta3PostInput = document.getElementById('compiuta3-post');


var newlukemission =  document.getElementById('missioneluke-put');
var newleilamission =  document.getElementById('missioneleila-put');
var newhanmission =  document.getElementById('missionehan-put');

/**
 * [create the object for the post]
 */
function createPostObj() {
    return {
        nome: nomePostInput.value,
        cognome: cognomePostInput.value,
        missioniDaEffettuare: [missione1PostInput.value, missione2PostInput.value, missione3PostInput.value],
        missioniEffettuate: [compiuta1PostInput.value,compiuta2PostInput.value, compiuta3PostInput.value]
    };
}


//take the button to the dom
var getLukeBtn = document.getElementById('get-Luke');
var getHanBtn = document.getElementById('get-Han');
var getLeiaBtn = document.getElementById('get-Leila');
var putLukeBtn = document.getElementById('putluke-btn');
var putHanBtn = document.getElementById('puthan-btn');
var putLeilaBtn = document.getElementById('putleila-btn');
var postBtn = document.getElementById('post-btn');




//assign the function at the buttons
getLukeBtn.addEventListener('click', managerCollapseluke);
getLeiaBtn.addEventListener('click', managerCollapseleila);
getHanBtn.addEventListener('click', managerCollapsehan);
putLukeBtn.addEventListener('click', putToLuke);
putHanBtn.addEventListener('click', putToHan);
putLeilaBtn.addEventListener('click', putToLeila);
postBtn.addEventListener('click', postToJson);
