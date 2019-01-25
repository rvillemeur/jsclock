
const MousePoint = {
    getPosition : function getPosition(evt) 
    {
        MousePoint.x = evt.clientX;
        MousePoint.y = evt.clientY;
    },
    x:0,
    y:0
}

export {MousePoint as default};