/*
  objet horloge, qui suit la souris lors de ses déplacements à l'écran
*/

function clock() {
  //recuperation de la date
  this.d=new Array("DIMANCHE","LUNDI","MARDI","MERCREDI","JEUDI","VENDREDI","SAMEDI");
  this.m=new Array("JANVIER","FEVRIER","MARS","AVRIL","MAI","JUIN","JUILLET","AOUT","SEPTEMBRE","OCTOBRE","NOVEMBRE","DECEMBRE");
  this.date=new Date();
  this.day=this.date.getDate();
  this.year=this.date.getYear();
  if (this.year < 2000) this.year=this.year+1900;
  this.TodaysDate=" " + this.d[this.date.getDay()] + " " + this.day + " " + this.m[this.date.getMonth()] + " " + this.year;
  this.D=this.TodaysDate.split('');
  
  //variable de l'objet
  this.H='...';
  this.H=this.H.split('');
  this.M='....';
  this.M=this.M.split('');
  this.S='.....';
  this.S=this.S.split('');
  this.Cadrant='1 2 3 4 5 6 7 8 9 10 11 12';
  this.Cadrant=this.Cadrant.split(' ');
  this.n=this.Cadrant.length;
  this.speed=0.6;
  
  this.ClockHeight=40;
  this.ClockWidth=40;
  this.Split=360/this.n;
  this.Dsplit=360/this.D.length;
  this.HandHeight=this.ClockHeight/4.5
  this.HandWidth=this.ClockWidth/4.5
  this.HandY=-7;
  this.HandX=-2.5;
  this.step=0.06;
  this.currStep=0;

  
  this.y=new Array();this.x=new Array();this.Y=new Array();this.X=new Array();
  for (i=0; i < this.n; i++){this.y[i]=0;this.x[i]=0;this.Y[i]=0;this.X[i]=0};

  this.Dy=new Array();this.Dx=new Array();this.DY=new Array();this.DX=new Array();
  for (i=0; i < this.D.length; i++){this.Dy[i]=0;this.Dx[i]=0;this.DY[i]=0;this.DX[i]=0};

  //prends le premier éléments du tableau retourné par getElementsByTagName
  tagBody = document.getElementsByTagName("body")[0];
  //définition du cadrant
  for (i=0; i < this.n; i++) AddElem(tagBody,"div","name","nCadrant",this.Cadrant[i]);
  //définition des heures (sur 3 '.')
  for (i=0; i < this.H.length; i++) AddElem(tagBody,"div","name","nHours",this.H[i]);
  //définition des minutes (sur 4 '.')
  for (i=0; i < this.M.length; i++) AddElem(tagBody,"div","name","nMinutes",this.M[i]);
  //définition des secondes (sur 5 '.')
  for (i=0; i < this.S.length; i++) AddElem(tagBody,"div","name","nSeconds",this.S[i]);
  //définition de la date
  for (i=0; i < this.D.length; i++) AddElem(tagBody,"div","name","nDate",this.D[i]);

//Methode de l'objet
  this.Delay = Delay;
  this.DrawClock = DrawClock;
  this.AddElem = AddElem;


}

/*
  ajoute un élément xml <elem attrName="attrValue">textValue</elem>
  sous un tagFather.
  Positionne son style position à "absolute"
*/
function AddElem(tagFather, elem, attrName, attrValue, textValue)
{
   var newElem = document.createElement(elem);
   newElem.setAttribute(attrName, attrValue);
   newElem.setAttribute("id", attrValue); //necessaire pour Internet Explorer
   newElem.appendChild(document.createTextNode(textValue));
   newElem.style.position = "absolute";
   newElem.style.height = "10px";
   newElem.style.width = "10px";
   newElem.style.fontFamily = "Arial";
   newElem.style.fontSize = "12px";
   newElem.style.fontWeight = "bold";
   tagFather.appendChild(newElem);
}



/*
  dessine l'horloge
*/
function DrawClock(){
  this.time = new Date ();
  this.sec = -1.57 + Math.PI * this.time.getSeconds() / 30;;
  this.min = -1.57 + Math.PI * this.time.getMinutes() /30;
  this.hrs = -1.575 + Math.PI * this.time.getHours()/6+Math.PI*parseInt(this.time.getMinutes())/360;
  
  //affichage du cadrant d'heure
  var nCadrant = document.getElementsByName("nCadrant");
  for (i=0; i<this.n; i++) { 
   var F= nCadrant[i].style;
   F.top=this.y[i] + this.ClockHeight * Math.sin(-1.0471 + i * this.Split * Math.PI/180) + "px";
   F.left=this.x[i] + this.ClockWidth * Math.cos(-1.0471 + i * this.Split * Math.PI/180) + "px";
   }
  //affiche l'aiguille des heures
  var nHours = document.getElementsByName("nHours");
  for (i=0; i<this.H.length; i++){
    var HL=nHours[i].style;
    HL.top=this.y[i] + this.HandY + (i * this.HandHeight)*Math.sin(this.hrs) + "px";
    HL.left=this.x[i] + this.HandX + (i * this.HandWidth)*Math.cos(this.hrs) + "px";
    
  }
  //affiche l'aiguille des minutes
  var nMinutes = document.getElementsByName("nMinutes");
  for (i=0; i < this.M.length; i++){
    var ML=nMinutes[i].style;
    ML.top=this.y[i] + this.HandY + (i * this.HandHeight)*Math.sin(this.min) + "px";
    ML.left=this.x[i] + this.HandX + (i * this.HandWidth)*Math.cos(this.min) + "px";
  }
  //affiche l'aiguille des secondes
  var nSeconds = document.getElementsByName("nSeconds");
  for (i=0; i < this.S.length; i++){
    var SL=nSeconds[i].style;
    SL.top=this.y[i] + this.HandY + (i * this.HandHeight) * Math.sin(this.sec) + "px";
    SL.left=this.x[i] + this.HandX + (i * this.HandWidth) * Math.cos(this.sec) + "px";
  }
  //affichage de la date
  var nDate = document.getElementsByName("nDate");
  for (i=0; i < this.D.length; i++){
    var DL=nDate[i].style;
    DL.top=this.Dy[i] + this.ClockHeight * 1.5 * Math.sin(this.currStep + i*this.Dsplit*Math.PI/180) + "px";
    DL.left=this.Dx[i] + this.ClockWidth * 1.5 * Math.cos(this.currStep + i*this.Dsplit*Math.PI/180) + "px";
  }
  this.currStep-=this.step;
}

/*
  calcule la position de l'horloge par rapport à la souris
  appelle ClockAndAssign() pour dessiner l'horloge à l'écran
*/
function Delay(xmouse, ymouse) {
  ymouse += 75;  xmouse += 75;
  this.Dy[0] = Math.round(this.DY[0] += (ymouse - this.DY[0]) * this.speed);
  this.Dx[0] = Math.round(this.DX[0] += (xmouse - this.DX[0]) * this.speed);
  for (i=1; i < this.D.length; i++){
    this.Dy[i]=Math.round(this.DY[i] += (this.Dy[i-1] - this.DY[i]) * this.speed);
    this.Dx[i]=Math.round(this.DX[i] += (this.Dx[i-1] - this.DX[i]) * this.speed);
    }

  this.y[0] = Math.round(this.Y[0] += (ymouse - this.Y[0]) * this.speed);
  this.x[0] = Math.round(this.X[0] += (xmouse - this.X[0]) * this.speed);
  for (i=1; i < this.n; i++){
    this.y[i]=Math.round(this.Y[i] += (this.y[i-1] - this.Y[i]) * this.speed);
    this.x[i]=Math.round(this.X[i] += (this.x[i-1] - this.X[i]) * this.speed);
    }
  this.DrawClock();
}

