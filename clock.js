//window.onload = delay;

//window.onload = function () {
//  var MyClock = new clock();
//  MyClock.delay();
//}

//function addEvent(obj, evType, fn){
// if (obj.addEventListener){
//   obj.addEventListener(evType, fn, true);
//   return true;
// } else if (obj.attachEvent){
//   var r = obj.attachEvent("on"+evType, fn);
//   return r;
// } else {
//   return false;
// }
//}

//addEvent(window, 'load', clock);

function clock() {
//variable de l'objet
  this.ClockHeight=40;
  this.ClockWidth=40;
  //this.ClockFromMouseY=0;
  //this.ClockFromMouseX=100;
  
  //recuperation de la date
  this.d=new Array("DIMANCHE","LUNDI","MARDI","MERCREDI","JEUDI","VENDREDI","SAMEDI");
  this.m=new Array("JANVIER","FEVRIER","MARS","AVRIL","MAI","JUIN","JUILLET","AOUT","SEPTEMBRE","OCTOBRE","NOVEMBRE","DECEMBRE");
  this.date=new Date();
  this.day=this.date.getDate();
  this.year=this.date.getYear();
  if (this.year < 2000) this.year=this.year+1900;
  this.TodaysDate=" " + this.d[this.date.getDay()] + " " + this.day + " " + this.m[this.date.getMonth()] + " " + this.year;
  this.D=this.TodaysDate.split('');
  
  this.H='...';
  this.H=this.H.split('');
  this.M='....';
  this.M=this.M.split('');
  this.S='.....';
  this.S=this.S.split('');
  this.Face='1 2 3 4 5 6 7 8 9 10 11 12';
  this.Face=this.Face.split(' ');
  this.n=this.Face.length;
  this.speed=0.6;
  
  this.Split=360/this.n;
  this.Dsplit=360/this.D.length;
  this.HandHeight=this.ClockHeight/4.5
  this.HandWidth=this.ClockWidth/4.5
  this.HandY=-7;
  this.HandX=-2.5;
  this.step=0.06;
  this.currStep=0;
  
  this.y=new Array();this.x=new Array();this.Y=new Array();this.X=new Array();
  //for (i=0; i < this.n; i++){this.y[i]=0;this.x[i]=0;this.Y[i]=0;this.X[i]=0};
  for (i=0; i < this.n; i++){this.y[i]=100;this.x[i]=100;this.Y[i]=100;this.X[i]=100};

  this.Dy=new Array();this.Dx=new Array();this.DY=new Array();this.DX=new Array();
  //for (i=0; i < this.D.length; i++){this.Dy[i]=0;this.Dx[i]=0;this.DY[i]=0;this.DX[i]=0};
  for (i=0; i < this.D.length; i++){this.Dy[i]=100;this.Dx[i]=100;this.DY[i]=100;this.DX[i]=100};

  for (i=0; i < this.n; i++) document.write('<div name="nFace">' + this.Face[i] + '</div>');
  for (i=0; i < this.H.length; i++) document.write('<div name="nHours">' + this.H[i] + '</div>');
  for (i=0; i < this.M.length; i++) document.write('<div name="nMinutes">' + this.M[i] + '</div>');
  for (i=0; i < this.S.length; i++) document.write('<div name="nSeconds">' + this.S[i] + '</div>'); 
  for (i=0; i < this.D.length; i++) document.write('<div name="nDate">' + this.D[i] + '</div>');


//Methode de l'objet
  this.Delay=Delay;
  this.GetPosition=GetPosition;
  this.ClockAndAssign=ClockAndAssign;
    
  
}


function GetPosition(){
    //var place = document.getElementById("horloge").style;
    var objClock = document.getElementById("horloge");
    objTop = document.defaultView.getComputedStyle(objClock, "").getPropertyValue("top");
    objLeft = document.defaultView.getComputedStyle(objClock, "").getPropertyValue("left");
    objHeight = document.defaultView.getComputedStyle(objClock, "").getPropertyValue("height");
    objWidth = document.defaultView.getComputedStyle(objClock, "").getPropertyValue("width");
    //window.alert(place.offsetLeft);  
    window.alert(objTop);
    //ne marche pas...
    //window.alert("'" + place.style.left + "'")
}

function ClockAndAssign(){
  this.time = new Date ();
  this.sec = -1.57 + Math.PI * this.time.getSeconds() / 30;;
  this.min = -1.57 + Math.PI * this.time.getMinutes() /30;
  this.hrs = -1.575 + Math.PI * this.time.getHours()/6+Math.PI*parseInt(this.time.getMinutes())/360;
  
  // récupération 
  //affichage du cadrant d'heure
  var nFace = document.getElementsByName("nFace");
  for (i=0; i < this.n; i++){
   var F= nFace[i].style;
   F.position="absolute";
   F.top=this.y[i] + this.ClockHeight*Math.sin(-1.0471 + i*this.Split*Math.PI/180) + "px";
   F.left=this.x[i] + this.ClockWidth*Math.cos(-1.0471 + i*this.Split*Math.PI/180) + "px";
   }
  //affiche l'aiguille des heures
  var nHours = document.getElementsByName("nHours");
  for (i=0; i < this.H.length; i++){
    var HL=nHours[i].style;
    HL.position="absolute";
    HL.top=this.y[i] + this.HandY+(i*this.HandHeight)*Math.sin(this.hrs) + "px";
    HL.left=this.x[i] + this.HandX+(i*this.HandWidth)*Math.cos(this.hrs) + "px";
  }
  //affiche l'aiguille des minutes
  var nMinutes = document.getElementsByName("nMinutes");
  for (i=0; i < this.M.length; i++){
    var ML=nMinutes[i].style;
    ML.position="absolute";
    ML.top=this.y[i] + this.HandY + (i*this.HandHeight)*Math.sin(this.min) + "px";
    ML.left=this.x[i] + this.HandX + (i*this.HandWidth)*Math.cos(this.min) + "px";
  }
  //affiche l'aiguille des secondes
  var nSeconds = document.getElementsByName("nSeconds");
  for (i=0; i < this.S.length; i++){
    var SL=nSeconds[i].style;
    SL.position="absolute";
    SL.top=this.y[i] + this.HandY + (i*this.HandHeight)*Math.sin(this.sec) + "px";
    SL.left=this.x[i] + this.HandX + (i*this.HandWidth)*Math.cos(this.sec) + "px";
  }
  //affichage de la date
  var nDate = document.getElementsByName("nDate");
  for (i=0; i < this.D.length; i++){
    var DL=nDate[i].style;
    DL.position="absolute";
    DL.top=this.Dy[i] + this.ClockHeight*1.5*Math.sin(this.currStep+i*this.Dsplit*Math.PI/180) + "px";
    DL.left=this.Dx[i] + this.ClockWidth*1.5*Math.cos(this.currStep+i*this.Dsplit*Math.PI/180) + "px";
  }
  this.currStep-=this.step;
}

function Delay() {
    /*
  this.Dy[0] = Math.round(this.DY[0] += (-this.DY[0])*this.speed);
  this.Dx[0] = Math.round(this.DX[0] += (-this.DX[0])*this.speed);
  for (i=1; i < this.D.length; i++){
    this.Dy[i]=Math.round(this.DY[i] += (this.Dy[i-1]-this.DY[i])*this.speed);
    this.Dx[i]=Math.round(this.DX[i] += (this.Dx[i-1]-this.DX[i])*this.speed);
    }
    */
  
  /*this.y[0]=Math.round(this.Y[0] += (-this.Y[0])*this.speed);
  this.x[0]=Math.round(this.X[0]+=(-this.X[0])*this.speed);
  for (i=1; i < this.n; i++){
    this.y[i]=Math.round(this.Y[i] += (this.y[i-1]-this.Y[i])*this.speed);
    this.x[i]=Math.round(this.X[i] += (this.x[i-1]-this.X[i])*this.speed);
    }
  */
  this.ClockAndAssign();
}