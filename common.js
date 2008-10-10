/* ce fichier contient du code permettant de faire fonctionner du javascript 
    à l'identique entre firefox et internet explorer
*/

if (typeof (common) == "undefined")
    window.common = new Object();

common.addEvent = function(obj, evType, fn)
{
    if (obj.addEventListener)
    {
        obj.addEventListener(evType, fn, false);
        return true;
    } 
    else if (obj.attachEvent)
    {
        var r = obj.attachEvent("on"+evType, fn);
        return r;
    } 
    else 
    {
        return false;
    }
}