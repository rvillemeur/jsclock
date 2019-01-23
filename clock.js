const Clock = Object.assign(Object.create(Object.prototype), {
    initSurroundAndNeedlePosition :  function initSurroundAndNeedlePosition() {
        for (var i=0; i < this.Surround.length; i++)
        {
            this.y[i]=0;
            this.x[i]=0;
            this.Y[i]=0;
            this.X[i]=0
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
    drawClock : function drawClock()  {
            var l_time = new Date ();
            var l_sec = -1.57 + Math.PI * l_time.getSeconds() / 30;;
            var l_min = -1.57 + Math.PI * l_time.getMinutes() /30;
            var l_hrs = -1.575 + Math.PI * l_time.getHours()/6+Math.PI*parseInt(l_time.getMinutes())/360;
            
            this.displayNeedle('nHours',this.HourNeedle,l_hrs);
            this.displayNeedle('nMinutes',this.MinuteNeedle,l_min);
            this.displayNeedle('nSeconds',this.SecondNeedle,l_sec);
    },
    move :  function move() {
        var l_xmouse = window.MousePosition.x + 75;
        var l_ymouse = window.MousePosition.y + 75;
        
        this.calculateSurroundAndNeedleMove(l_xmouse, l_ymouse);
        this.clockDate.update(Point.create(l_xmouse, l_ymouse));
        this.clockSurround.update(Point.create(l_xmouse, l_ymouse));

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

    startClock : function startClock(){
        this.stopClock();
        var l_self = this;
        l_self.timer = setInterval(function(){l_self.move()},20);
    },
    stopClock : function stopClock() {
        clearInterval(this.timer);
    },
    speed:0.5,
    timer : null,
    ClockHeight:40,
    ClockWidth:40,

    create: function create(value) {
        var self = Object.create(this);

        this.HourNeedle='...'.split('');
        this.MinuteNeedle='....'.split('');
        this.SecondNeedle='.....'.split('');
        this.Surround='1 2 3 4 5 6 7 8 9 10 11 12'.split(' ');
        
        
        this.NeedleHeight=this.ClockHeight/4.5
        this.NeedleWidth=this.ClockWidth/4.5
        this.XNeedleRelativePosition=-2.5;
        this.YNeedleRelativePosition=-7;

        this.Split=360/this.Surround.length;

        this.y=new Array(this.Surround.length);
        this.x=new Array(this.Surround.length);
        this.Y=new Array(this.Surround.length);
        this.X=new Array(this.Surround.length);
        this.initSurroundAndNeedlePosition();
    
        this.AddClockElement(this.HourNeedle, 'nHours');
        this.AddClockElement(this.MinuteNeedle, 'nMinutes');
        this.AddClockElement(this.SecondNeedle, 'nSeconds');
        this.clockDate = ClockDate.create(this.ClockWidth * 1.5, this.ClockHeight * 1.5, 0.04 );
        this.clockSurround = ClockSurround.create(this.ClockWidth, this.ClockHeight, 0.04 )
        return self;
    }
});

const ClockDate = Object.assign(Object.create(Object.prototype), {
    createHtmlElement: function createHtmlElement(label) {
        const element = window.document.createElement('div');
        
        element.appendChild(window.document.createTextNode(label));
        element.style.cssText = "position:absolute";
        element.classList.add('clock');
        
        return element
    },
    updateCssPosition: function updateCssPosition(htmlElement, x, y) {
        htmlElement.style.left =  x + 'px';
        htmlElement.style.top = y + 'px';
    },
    initializeLabel: function initializeLabel(date) { 
        var dayName = ['DIMANCHE','LUNDI','MARDI','MERCREDI','JEUDI','VENDREDI','SAMEDI'][date.getDay()];
        var monthName = ['JANVIER','FEVRIER','MARS','AVRIL','MAI','JUIN','JUILLET','AOUT','SEPTEMBRE','OCTOBRE','NOVEMBRE','DECEMBRE'][date.getMonth()];
  
        return ' ' + dayName + ' ' + date.getDate() + ' ' + monthName + ' ' +  date.getFullYear();
    },
    initializePositions :  function initializePositions(labelArray) {
        return labelArray.map((label) => this.position(label));
    },
    position: function position(label) {
        const htmlElement = this.createHtmlElement(label);
        this.attachHtmlToBody(htmlElement);
        return {point: Point.create(0, 0), html: htmlElement };
    },
    attachHtmlToBody: function attachHtmlToBody(htmlElement) {
        tagBody = window.document.getElementsByTagName('body')[0];  
        tagBody.appendChild(htmlElement);
    },
    getNewPosition: function getNewPosition(OriginalpositionList, initPoint, speed, newPositionList) {
        if (OriginalpositionList.length === 0) {
            return newPositionList;
        }
        const currentPosition = OriginalpositionList.shift();
        newPositionList.push({point:initPoint, html: currentPosition.html});

        const currentPoint = currentPosition.point
        const newPoint = currentPoint.addVector(
            initPoint.getDistance(currentPoint).multiply(speed));

        return getNewPosition(OriginalpositionList, newPoint, speed, newPositionList)
    }, 
    xOffset: function xOffset(width, currStep, index, split) {
        return width * Math.cos(currStep + index * split);
    },
    yOffset: function yOffset (heigth, currStep, index, split) {
        return heigth * Math.sin(currStep + index * split);
    },
    draw: function draw(currStep) {
        this.positionList.forEach( (position, index) => {
            this.updateCssPosition(position.html, 
                Math.round(position.point.x) + this.xOffset(this.clockWidth, currStep, index, this.circleSplit),
                Math.round(position.point.y) + this.yOffset(this.clockHeight, currStep, index, this.circleSplit))
        })
    }, 
    update: function update(point) {
        this.positionList = this.getNewPosition(this.positionList, point, this.speed, []);
        this.draw(this.currStep);
        this.currStep -= this.speed;
    },
    create: function create(clockWidth, clockHeight, speed ) {
        const self = Object.create(this);

        const dateArray = this.initializeLabel(new Date()).split(''); 
        Object.defineProperty(self, 'clockWidth', {
            value: clockWidth, 
            writable: false
        });
        Object.defineProperty(self, 'clockHeight', {
            value: clockHeight, 
            writable: false
        });
        Object.defineProperty(self, 'speed', {
            value: speed, 
            writable: false
        });
        Object.defineProperty(self, 'currStep', {
            value: 0, 
            writable: true
        });
        //circle circumference = 2 * Math.PI * R 
        Object.defineProperty(self, 'circleSplit', {
            value: 2 * Math.PI / dateArray.length, 
            writable: false
        });
        self.positionList = this.initializePositions(dateArray);
        
        return self;
    }
});

const ClockSurround = Object.assign(Object.create(Object.prototype), {
    createHtmlElement: function createHtmlElement(label) {
        const element = window.document.createElement('div');
        
        element.appendChild(window.document.createTextNode(label));
        element.style.cssText = "position:absolute";
        element.classList.add('clock');
        
        return element
    },
    updateCssPosition: function updateCssPosition(htmlElement, x, y) {
        htmlElement.style.left =  x + 'px';
        htmlElement.style.top = y + 'px';
    },
    initializePositions :  function initializePositions(labelArray) {
        return labelArray.map((label) => this.position(label));
    },
    position: function position(label) {
        const htmlElement = this.createHtmlElement(label);
        this.attachHtmlToBody(htmlElement);
        return {point: Point.create(0, 0), html: htmlElement };
    },
    attachHtmlToBody: function attachHtmlToBody(htmlElement) {
        tagBody = window.document.getElementsByTagName('body')[0];  
        tagBody.appendChild(htmlElement);
    },
    getNewPosition: function getNewPosition(OriginalpositionList, initPoint, speed, newPositionList) {
        if (OriginalpositionList.length === 0) {
            return newPositionList;
        }
        const currentPosition = OriginalpositionList.shift();
        newPositionList.push({point:initPoint, html: currentPosition.html});

        const currentPoint = currentPosition.point
        const newPoint = currentPoint.addVector(
            initPoint.getDistance(currentPoint).multiply(speed));

        return getNewPosition(OriginalpositionList, newPoint, speed, newPositionList)
    }, 
    xOffset: function xOffset(width, index, split) {
        //-60 degree = -1.0471975512 radian
        return width * Math.cos(-1.0471975512 + index * split);
    },
    yOffset: function yOffset (heigth, index, split) {
        //-60 degree = -1.0471975512 radian
        return heigth * Math.sin(-1.0471975512 + index * split);
    },
    draw: function draw() {
        this.positionList.forEach( (position, index) => {
            this.updateCssPosition(position.html, 
                Math.round(position.point.x) 
                    + this.xOffset(this.clockWidth,  index, this.circleSplit),
                Math.round(position.point.y) 
                    + this.yOffset(this.clockHeight, index, this.circleSplit))
        })
    }, 
    update: function update(point) {
        this.positionList = this.getNewPosition(this.positionList, point, this.speed, []);
        this.draw();
    },
    create: function create(clockWidth, clockHeight, speed ) {
        const self = Object.create(this);

        const surroundArray = '1 2 3 4 5 6 7 8 9 10 11 12'.split(' ');
        Object.defineProperty(self, 'clockWidth', {
            value: clockWidth, 
            writable: false
        });
        Object.defineProperty(self, 'clockHeight', {
            value: clockHeight, 
            writable: false
        });
        Object.defineProperty(self, 'speed', {
            value: speed, 
            writable: false
        });
        //circle circumference = 2 * Math.PI * R 
        Object.defineProperty(self, 'circleSplit', {
            value: 2 * Math.PI / surroundArray.length, 
            writable: false
        });
        self.positionList = this.initializePositions(surroundArray);
        
        return self;
    }
});

const Point = Object.assign(Object.create(Object.prototype), {
    toString: function toString() { 
        return '{x:' + (this.x).toFixed(2) + ', ' 
              + 'y:'+ (this.y).toFixed(2) + '}'
    },
    getDistance: function getDistance(aPoint) {
        return Point.create(aPoint.x - this.x, aPoint.y - this.y);
    },
    addVector: function addVector(aPoint) {
        return Point.create(aPoint.x + this.x, aPoint.y + this.y);
    },
    multiply: function multiply(aFactor) {
        return Point.create(this.x * aFactor, this.y * aFactor);
    },
    round: function round() {
        return Point.create(Math.round(this.x), Math.round(this.y));
    },

    create: function create(x, y) {
        const self = Object.create(this);

        Object.defineProperty(self, 'x', {value: x, writable: false});
        Object.defineProperty(self, 'y', {value: y, writable: false});

        return self;
    }
});