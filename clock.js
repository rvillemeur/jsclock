var Clock = Object.assign(Object.create(Object.prototype), {
    initializeDate: function initializeDate(date) { 
        var dayName = ['DIMANCHE','LUNDI','MARDI','MERCREDI','JEUDI','VENDREDI','SAMEDI'][date.getDay()];
        var monthName = ['JANVIER','FEVRIER','MARS','AVRIL','MAI','JUIN','JUILLET','AOUT','SEPTEMBRE','OCTOBRE','NOVEMBRE','DECEMBRE'][date.getMonth()];
  
        return ' ' + dayName + ' ' + date.getDate() + ' ' + monthName + ' ' +  date.getFullYear();
    },
    initSurroundAndNeedlePosition :  function initSurroundAndNeedlePosition() {
        for (var i=0; i < this.Surround.length; i++)
        {
            this.y[i]=0;
            this.x[i]=0;
            this.Y[i]=0;
            this.X[i]=0
        }
    },
    initDatePosition :  function initDatePosition() {
        for (var i=0; i < this.Date.length; i++)
        {
            this.Dy[i]=0;
            this.Dx[i]=0;
            this.DY[i]=0;
            this.DX[i]=0;
        }
    },
    AddClockElement : function AddClockElement(a_element, a_ElementName) {
        tagBody = window.document.getElementsByTagName('body')[0];
        
        for (var i=0; i < a_element.length; i++)
        {
            var newElem = document.createElement('div');
            newElem.setAttribute('name', a_ElementName);
            newElem.setAttribute('id', a_ElementName); //used for Internet Explorer
            newElem.appendChild(document.createTextNode(a_element[i]));
            
            newElem.style.position = 'absolute';
            newElem.className += ' clock ';

            tagBody.appendChild(newElem);
        }
    },
    displayNeedle : function displayNeedle(a_needleName, a_needle, a_needleAngle) {
        var l_elements = document.getElementsByName(a_needleName);
        for (var i=0; i<a_needle.length; i++)
        {
            var l_elementStyle = l_elements[i].style;
            l_elementStyle.top = this.y[i] + this.YNeedleRelativePosition + (i * this.NeedleHeight)*Math.sin(a_needleAngle) + 'px';
            l_elementStyle.left = this.x[i] + this.XNeedleRelativePosition + (i * this.NeedleWidth)*Math.cos(a_needleAngle) + 'px';
        }
    },
    displaySurrond : function displaySurrond() {
        var l_Surround = document.getElementsByName('nSurround');
        for (var i=0; i< this.Surround.length; i++) 
        { 
            var F = l_Surround[i].style;
            F.top = this.y[i] + this.ClockHeight * Math.sin(-1.0471 + i * this.Split * Math.PI/180) + 'px';
            F.left = this.x[i] + this.ClockWidth * Math.cos(-1.0471 + i * this.Split * Math.PI/180) + 'px';
        }
    },
    displayDate : function displayDate() {
        var l_date = document.getElementsByName('nDate');
        for (var i=0; i < this.Date.length; i++)
        {
            var DL = l_date[i].style;
            DL.top=this.Dy[i] + this.ClockHeight * 1.5 * Math.sin(this.currStep + i*this.Dsplit*Math.PI/180) + 'px';
            DL.left=this.Dx[i] + this.ClockWidth * 1.5 * Math.cos(this.currStep + i*this.Dsplit*Math.PI/180) + 'px';
        }
    },
    drawClock : function drawClock()  {
            var l_time = new Date ();
            var l_sec = -1.57 + Math.PI * l_time.getSeconds() / 30;;
            var l_min = -1.57 + Math.PI * l_time.getMinutes() /30;
            var l_hrs = -1.575 + Math.PI * l_time.getHours()/6+Math.PI*parseInt(l_time.getMinutes())/360;
    
            this.displaySurrond();
            
            this.displayNeedle('nHours',this.HourNeedle,l_hrs);
            this.displayNeedle('nMinutes',this.MinuteNeedle,l_min);
            this.displayNeedle('nSeconds',this.SecondNeedle,l_sec);
    
            this.displayDate();
    
            this.currStep-=this.step;
    },
    move :  function move(MouseX, MouseY) {
        var l_xmouse = window.MousePosition.x + 75;
        var l_ymouse = window.MousePosition.y + 75;
        
        this.calculateSurroundAndNeedleMove(l_xmouse, l_ymouse);
        this.calculateDateMove(l_xmouse, l_ymouse);

        this.drawClock();
    },
    calculateSurroundAndNeedleMove :  function calculateSurroundAndNeedleMove(a_xmouse, a_ymouse) {
        this.x[0] = Math.round(this.X[0] += (a_xmouse - this.X[0]) * this.speed);
        this.y[0] = Math.round(this.Y[0] += (a_ymouse - this.Y[0]) * this.speed);
        
        for (var i=1; i < this.Surround.length; i++)
        {
            this.y[i]=Math.round(this.Y[i] += (this.y[i-1] - this.Y[i]) * this.speed);
            this.x[i]=Math.round(this.X[i] += (this.x[i-1] - this.X[i]) * this.speed);
        }
    },
    calculateDateMove :  function calculateDateMove(a_xmouse, a_ymouse) {
        this.Dx[0] = Math.round(this.DX[0] += (a_xmouse - this.DX[0]) * this.speed);
        this.Dy[0] = Math.round(this.DY[0] += (a_ymouse - this.DY[0]) * this.speed);
        
        for (var i=1; i < this.Date.length; i++)
        {
            this.Dy[i]=Math.round(this.DY[i] += (this.Dy[i-1] - this.DY[i]) * this.speed);
            this.Dx[i]=Math.round(this.DX[i] += (this.Dx[i-1] - this.DX[i]) * this.speed);
        }
    },
    startClock : function startClock(){
        this.stopClock();
        var l_self = this;
        l_self.timer = setInterval(function(){l_self.move()},20);
    },
    stopClock : function stopClock() {
        clearInterval(this.timer);
    },
    step:0.06,
    currStep:0,
    speed:0.5,
    timer : null,
    ClockHeight:40,
    ClockWidth:40,

    create: function create(value) {
        var self = Object.create(this);

        this.HourNeedle='...'.split('');
        this.MinuteNeedle='....'.split('');
        this.SecondNeedle='.....'.split('');
        this.NeedleHeight=this.ClockHeight/4.5
        this.NeedleWidth=this.ClockWidth/4.5
        this.XNeedleRelativePosition=-2.5;
        this.YNeedleRelativePosition=-7;
            
        this.Surround='1 2 3 4 5 6 7 8 9 10 11 12'.split(' ');
        this.Split=360/this.Surround.length;


        this.y=new Array(this.Surround.length);
        this.x=new Array(this.Surround.length);
        this.Y=new Array(this.Surround.length);
        this.X=new Array(this.Surround.length);
        this.initSurroundAndNeedlePosition();
        
        
        //init date
        this.Date = this.initializeDate(new Date()).split('');
        this.Dsplit=360/this.Date.length;
        this.Dy=new Array();
        this.Dx=new Array();
        this.DY=new Array();
        this.DX=new Array();
        this.initDatePosition();
    
        
        this.AddClockElement(this.Surround, 'nSurround');
        this.AddClockElement(this.HourNeedle, 'nHours');
        this.AddClockElement(this.MinuteNeedle, 'nMinutes');
        this.AddClockElement(this.SecondNeedle, 'nSeconds');
        this.AddClockElement(this.Date, 'nDate');

        return self;
    }
});

var ClockDate = Object.assign(Object.create(Object.prototype), {
    initializeLabel: function initializeLabel(date) { 
        var dayName = ['DIMANCHE','LUNDI','MARDI','MERCREDI','JEUDI','VENDREDI','SAMEDI'][date.getDay()];
        var monthName = ['JANVIER','FEVRIER','MARS','AVRIL','MAI','JUIN','JUILLET','AOUT','SEPTEMBRE','OCTOBRE','NOVEMBRE','DECEMBRE'][date.getMonth()];
  
        return ' ' + dayName + ' ' + date.getDate() + ' ' + monthName + ' ' +  date.getFullYear();
    },
    initialize :  function initialize(labelArray) {
        return labelArray.map(
            (label) => HtmlPoint.create(0, 0, 
                HtmlPoint.createHtmlElement('nDate', label))
        );
    },
    getNewPosition: function getNewPosition(OriginalpositionList, previousPoint, speed, newPositionList) {
        if (OriginalpositionList.length === 0) {
            return newPositionList;
        }
        
        var currentPoint = OriginalpositionList.shift()
        var newPoint = currentPoint.addVector(previousPoint.getDistance(currentPoint).multiply(speed).round());
        newPositionList.push(newPoint);

        return getNewPosition(OriginalpositionList, newPoint, speed, newPositionList)
    }, 
    draw: function draw(currStep) {
        this.datePointList.map( (point, index) => point.updateCssPosition(
            this.ClockWidth * Math.cos(currStep + index * this.circleSplit)
            , this.ClockHeight * Math.sin(currStep + index * this.circleSplit))
        )
    }, 
    attach: function attach(htmlElement) {
        this.datePointList.map(
            (point) => htmlElement.appendChild(point.htmlElement())
        );
    },
    create: function create(ClockWidth, ClockHeight, speed ) {
        var self = Object.create(this);

        self.ClockWidth = ClockWidth * 1.5;
        self.ClockHeight = ClockHeight * 1.5;
        self.speed = speed;

        var dateArray = this.initializeLabel(new Date()).split('');
        //circle circumference = 2 * Math.PI * R 
        self.circleSplit = 2 * Math.PI / dateArray.length;
        self.datePointList = this.initialize(dateArray);
        
        return self;
    }
});

var HtmlPoint = Object.assign(Object.create(Object.prototype), {
    createHtmlElement: function createHtmlElement(className, label) {
        var element = window.document.createElement('div');
        
        element.appendChild(window.document.createTextNode(label));
        element.style.cssText = "position:absolute";
        element.classList.add(className, 'clock');
        
        return element
    },
    updateCssPosition: function updateCssPosition(left, top) {
        var element = this.htmlElement()
        element.style.left =  this.x() + left + 'px';
        element.style.top = this.y() + top + 'px';
    },
    toString: function toString() { 
        return '{x:' + this.x() + ', ' + 'y:'+ this.y() + '}'
    },
    getDistance: function getDistance(aPoint) {
        return HtmlPoint.create(
            aPoint.x() - this.x()
            , aPoint.y() - this.y()
            , this.htmlElement()
        );
    },
    addVector: function addVector(aPoint) {
        return HtmlPoint.create(
            aPoint.x() + this.x()
            , aPoint.y() + this.y()
            , this.htmlElement()
        );
    },
    multiply: function multiply(aFactor) {
        return HtmlPoint.create(
            this.x() * aFactor
            , this.y() * aFactor
            , this.htmlElement()
        );
    },
    round: function round() {
        return HtmlPoint.create(
            Math.round(this.x())
            , Math.round(this.y())
            , this.htmlElement()
        );
    },
    create: function create(x, y, htmlElement) {
        var self = Object.create(this);

        //private vars and getters
        var _x = x;
        var _y = y;
        var _htmlElement = htmlElement

        self.x = function x() {
            return _x;
        },
        self.y = function y() {
            return _y
        }
        self.htmlElement = function htmlElement() {
            return _htmlElement
        }
        return self;
    }
});