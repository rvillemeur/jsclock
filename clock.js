import MousePosition from './mousemove.js';
import addEvent from './common.js'
import Point from './point.js'

const Clock = Object.assign({}, {
    move :  function move() {
        const clockPosition = Point.create(MousePosition.x + 75,                                            MousePosition.y + 75)
        this.clockDate.update(clockPosition);
        this.clockSurround.update(clockPosition);
        this.ClockNeedles.update(clockPosition);

    },
    startClock : function startClock(){
        this.stopClock();
        var self = this;
        self.timer = setInterval(function(){self.move()},20);
    },
    stopClock : function stopClock() {
        clearInterval(this.timer);
    },

    create: function create(clockHeight = 40, clockWidth = 40, speed= 0.04) {
        var self = Object.create(this);
            self.clockDate = ClockDate.create(clockWidth * 1.5,                                                   clockHeight * 1.5, speed);
            self.clockSurround = ClockSurround.create(clockWidth,                                                         clockHeight, speed);
            self.ClockNeedles = ClockNeedles.create(clockWidth / 4.5,                                                   clockHeight / 4.5, speed);
            //self.mousePosition = MousePosition.create()
            addEvent(document,"mousemove", MousePosition.getPosition);
        return self;
    }
});

const ClockCommonTraits = {
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
        const tagBody = window.document.getElementsByTagName('body')[0];  
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
}

const ClockDate = Object.assign({}, ClockCommonTraits, {
    initializeLabel: function initializeLabel(date) { 
        var dayName = ['DIMANCHE','LUNDI','MARDI','MERCREDI','JEUDI','VENDREDI','SAMEDI'][date.getDay()];
        var monthName = ['JANVIER','FEVRIER','MARS','AVRIL','MAI','JUIN','JUILLET','AOUT','SEPTEMBRE','OCTOBRE','NOVEMBRE','DECEMBRE'][date.getMonth()];
  
        return ' ' + dayName + ' ' + date.getDate() + ' ' + monthName + ' ' +  date.getFullYear();
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

const ClockSurround = Object.assign({}, ClockCommonTraits, {
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

const ClockNeedles = Object.assign({}, ClockCommonTraits, {
    xNeedleRelativePosition: function xNeedleRelativePosition() {
        return -2.5;
    },
    yNeedleRelativePosition: function yNeedleRelativePosition() {
        return -7;
    },
    secondAngle: function secondAngle(date) {
        return (-Math.PI / 2) + (Math.PI * date.getSeconds() / 30);
    },
    minuteAngle: function minuteAngle(date) {
        return  (-Math.PI / 2) + (Math.PI * date.getMinutes() / 30);
    },
    hourAngle: function hourAngle(date) {
        const minuteOffset = Math.PI * parseInt(date.getMinutes()) / 360
        return (-Math.PI / 2) + (Math.PI * date.getHours() / 6) + minuteOffset;
    },
    xOffset: function xOffset(index, date, needleAngle) {
        return this.xNeedleRelativePosition() 
            + (index * this.clockWidth) * Math.cos(needleAngle(date))
    },
    yOffset: function yOffset (index, date, needleAngle) {
        return this.yNeedleRelativePosition() 
            + (index * this.clockHeight) * Math.sin(needleAngle(date))
    },
    draw: function draw(date) {
        this.hourPosition.forEach( (position, index) => {
            this.updateCssPosition(position.html, 
                                   Math.round(position.point.x) 
                                   + this.xOffset(index, date, this.hourAngle),
                                   Math.round(position.point.y) + this.yOffset(index, date, this.hourAngle)
        )});
        this.minutePosition.forEach( (position, index) => {
            this.updateCssPosition(position.html, 
                Math.round(position.point.x) + this.xOffset(index, date, this.minuteAngle),
                Math.round(position.point.y) + this.yOffset(index, date, this.minuteAngle)
        )});
        this.secondPosition.forEach( (position, index) => {
            this.updateCssPosition(position.html, 
                Math.round(position.point.x) + this.xOffset(index, date, this.secondAngle),
                Math.round(position.point.y) + this.yOffset(index, date, this.secondAngle)
        )});
    }, 
    update: function update(point) {
        this.hourPosition = this.getNewPosition(this.hourPosition, 
                                                point,                          this.speed, []);
        this.minutePosition = this.getNewPosition(this.minutePosition, 
                                                point,                          this.speed, []); 
       this.secondPosition = this.getNewPosition(this.secondPosition, 
                                                point,                          this.speed, []);
        this.draw(new Date ());
    },
    create: function create(clockWidth, clockHeight, speed ) {
        const self = Object.create(this);

        const HourNeedle = '...'.split('');
        const MinuteNeedle ='....'.split('');
        const SecondNeedle ='.....'.split('');

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

        self.hourPosition = this.initializePositions(HourNeedle);
        self.minutePosition = this.initializePositions(MinuteNeedle);
        self.secondPosition = this.initializePositions(SecondNeedle);
        
        return self;
    }
});




export {Clock as default, ClockDate as ClockDate, ClockSurround as ClockSurround, ClockNeedles as ClockNeedles, ClockCommonTraits as ClockCommonTraits};