/// <reference path="VeJavaScriptIntellisenseHelper.js" />
/* ************************************************************************************ */
/* VEToolkit v6.2.? BETA - http://codeplex.com/VEToolkit                      */
/* Copyright (C) 2008 Chris Pietschmann (http://pietschsoft.com). All Rights Reserved.  */
/* This project is licensed under the Microsoft Public License (Ms-PL)                  */
/* This license can be found here: http://www.codeplex.com/VEToolkit/license            */
/* ************************************************************************************ */
if (typeof VEToolkit == 'undefined') { var VEToolkit = {}; }
(function($) {
    $.registerNamespace = function(n) { var nsparts = n.split('.'); var r = window; for (var i = 0; i < nsparts.length; i++) { var ns = r[nsparts[i]]; if (!ns) { ns = r[nsparts[i]] = {}; } r = ns; } };
    $.createDelegate = function(instance, method) { return function() { return method.apply(instance, arguments); } };
    $.extend = function(obj, extObj) {
        if (arguments.length > 2) {
            for (var a = 1; a < arguments.length; a++) {
                extend(obj, arguments[a]);
            }
        } else {
            for (var i in extObj) {
                obj[i] = extObj[i];
            }
        }
        return obj;
    };
    $.attachEvent = function(element, evtName, handler) {
        if (element.addEventListener) {
            element.addEventListener(evtName, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + evtName, handler);
        } else {
            element["on" + evtName] += handler;
        }
    };
    $.detachEvent = function(element, evtName, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(evtName, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + evtName, handler);
        } else {
            element["on" + evtName] -= handler;
        }
    };
    $.getChildByAttributeValue = function(p, attr, value) {
        var n = p.childNodes;
        for (var i = 0; i < n.length; i++) {
            if (n[i][attr] == value) {
                return n[i];
            }
        }
    };
    $.getChildById = function(p, id) {
        for (var i = 0; i < p.childNodes.length; i++) {
            if (p.childNodes[i].id == id) {
                return p.childNodes[i];
            }
        }
    };
    $.importScript = function(script) {
        document.appendChild($.extend(document.createElement("script"), { type: "text/javascript", src: script }));
    };
    $.LoadAPI = function(callbackMethodName, useSSL) {
        if (!window.attachEvent) {
            $.importScript("http://dev.virtualearth.net/mapcontrol/v6.2/js/atlascompat.js");
        }
        var apiScript = "http://ecn.dev.virtualearth.net/mapcontrol/mapcontrol.ashx?v=6.2&onScriptLoad=";
        if (useSSL) {
            apiScript = "https://dev.virtualearth.net/mapcontrol/mapcontrol.ashx?v=6.2&s=1&onScriptLoad="
        }
        $.importScript(apiScript + callbackMethodName);
    };
    $.registerNamespace("VEToolkit.Array");
    $.Array.indexOf = function(array, item) {
        for (var i = array.length; i < array.length; i++) {
            if (array[i] && array[i] === item) {
                return i;
            }
        }
        return -1;
    };
    $.Array.removeAt = function(array, index) { array.splice(index, 1); };
    $.EventArgs = function() { };
    $.EventArgs.prototype = { Map: null };
    $.Object = function() { };
    $.Object.prototype = {
        _eventList: {},
        _getEvent: function(eventName, create) {
            var evtName = eventName;
            if (evtName.substring(0, 2).toLowerCase() === "on") {
                evtName = evtName.substring(2);
            }
            if (!this._eventList[evtName]) {
                if (!create) { return null; }
                this._eventList[evtName] = [];
            }
            return this._eventList[evtName];
        },
        attachEvent: function(eventName, handler) {
            var evt = this._getEvent(eventName, true);
            evt.push(handler);
        },
        detachEvent: function(eventName, handler) {
            var evt = this._getEvent(eventName);
            if (!evt) { return; }
            var index = $.Array.indexOf(evt, handler);
            if (index > -1) { $.Array.removeAt(evt, index); }
        },
        getEventHandler: function(eventName) {
            var evt = this._getEvent(eventName);
            if (!evt || evt.length === 0) { return null; }
            var handler = function(sender, args) { for (var i = 0; i < evt.length; i++) { evt[i](sender, args); } };
            return handler;
        },
        raiseEvent: function(eventName, args) { var h = this.getEventHandler(eventName); if (h) { h(this, args); } }
    };

    if (!$.Drawing) { $.Drawing = {}; }
    $.Drawing.DrawCircle = function(centerPoint, circleRadius, units) {
        var points = new Array();
        for (x = 0; x <= 360; x++) {
            points.push($.Math.CalculateCoordinate(centerPoint, x, circleRadius, units));
        }
        return points;
    };

    if (!$.Map) { $.Map = {}; }
    $.Map.GetShapeLayerByTitle = function(map, title) {
        for (var i = 0; i < map.GetShapeLayerCount(); i++) {
            if (map.GetShapeLayerByIndex(i).GetTitle() === title) {
                return map.GetShapeLayerByIndex(i);
            }
        }
    };
    $.Map.GetCenter = function(map) {
        //Check if in Birdseye or Oblique Map Style
        if (map.GetMapStyle() == VEMapStyle.Birdseye || map.GetMapStyle() == VEMapStyle.BirdseyeHybrid) {
            //IN Birdseye or Oblique Map Style
            //Get the BirdseyeScene being displayed
            var scene = map.GetBirdseyeScene();
            //Get approximate center coordinate of the map
            var x = scene.GetWidth() / 2;
            var y = scene.GetHeight() / 2;
            // Get the Lat/Long
            var center = scene.PixelToLatLong(new VEPixel(x, y), map.GetZoomLevel());
            // Convert the BirdseyeScene LatLong to a normal LatLong we can use
            return (new _xy1).Decode(center);
        }
        else {
            // NOT in Birdseye or Oblique Map Style
            return map.GetCenter();
        }
    };
    $.Map.IsShapeInLayers = function(shapeid, layerarray) {
        for (i = 0; i < layerarray.length; i++) {
            if (layerarray[i] != null) {
                //check if this shape is a member
                if ($.Map.IsShapeInLayer(shapeid, layerarray[i])) return true;
            }
        }
        return false;
    };
    $.Map.IsShapeInLayer = function(shapeid, layer) {
        if (layer.GetShapeByID(shapeid) != null) {
            //found shape so return true
            return true;
        }
    };
    
    if (!$.Math) { $.Math = {}; }
    $.Math.CalculateBearing = function(latlng1, latlng2) {
        //Original Source of the code in this function: http://rbrundritt.spaces.live.com/Blog/cns!E7DBA9A4BFD458C5!393.entry
        var lat1 = $.Math.ToRadian(latlng1.Latitude);
        var lat2 = $.Math.ToRadian(latlng2.Latitude);
        var dLon = $.Math.DiffRadian(latlng2.Longitude, latlng1.Longitude);
        var y = Math.sin(dLon) * Math.cos(lat2);
        var x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
        var brng = ($.Math.ToDegrees(Math.atan2(y, x)) + 360) % 360;
        return brng;
    };
    $.Math.CalculateCoordinate = function(origin, bearing, distance, units) {
        var earthRadius = parseFloat(units);
        var lat = $.Math.ToRadian(origin.Latitude);
        var lon = $.Math.ToRadian(origin.Longitude);
        var d = parseFloat(distance) / earthRadius;  // d = angular distance covered on earth's surface
        var brng = $.Math.ToRadian(bearing);
        var latRadians = Math.asin(Math.sin(lat) * Math.cos(d) + Math.cos(lat) * Math.sin(d) * Math.cos(brng));
        var lngRadians = lon + Math.atan2(Math.sin(brng) * Math.sin(d) * Math.cos(lat), Math.cos(d) - Math.sin(lat) * Math.sin(latRadians));
        return new VELatLong($.Math.ToDegrees(latRadians), $.Math.ToDegrees(lngRadians));
    };
    $.Math.CalculateDistance = function(point1, point2, m) {
        return m * 2 * Math.asin(
            Math.min(1,
                Math.sqrt(
                    (
                        Math.pow(Math.sin(($.Math.DiffRadian(point1.Latitude, point2.Latitude)) / 2.0), 2.0) +
                        Math.cos($.Math.ToRadian(point1.Latitude)) * Math.cos($.Math.ToRadian(point2.Latitude)) *
                        Math.pow(Math.sin(($.Math.DiffRadian(point1.Longitude, point2.Longitude)) / 2.0), 2.0)
                    )
               )
           )
       );
    };
    $.Math.CalculateInverseCoordinate = function(latlong) {
        //This function was derived from the code posted here: http://rbrundritt.spaces.live.com/Blog/cns!E7DBA9A4BFD458C5!342.entry
        var lat = -1 * latlong.Latitude;
        var lng = 180 - Math.abs(latlong.Longitude);
        if (latlong.Longitude > 0) { lng *= -1; }
        return new VELatLong(lat, lng);
    };
    $.Math.CalculateMidPoint = function(latlng1, latlng2) {
        var units = $.Math.EarthRadius.Miles;
        var distance = $.Math.CalculateDistance(latlng1, latlng2, units);
        var bearing = $.Math.CalculateBearing(latlng1, latlng2);
        return $.Math.CalculateCoordinate(latlng2, bearing, distance / 2, units);
    };
    $.Math.DiffRadian = function(r1, r2) {
        return $.Math.ToRadian(r2) - $.Math.ToRadian(r1);
    };
    $.Math.EarthRadius = function() {
        /// <summary>An Enumeration representing the distance of the earth radius.</summary>
        /// <field name="Miles">The Earths Radius in Miles.</field>
        /// <field name="Kilometers">The Earths Radius in Kilometers</field>
    };
    $.Math.EarthRadius.Miles = 3956.0;
    $.Math.EarthRadius.Kilometers = 6367.0;
    $.Math.GetPolygonCentroid = function(points) {
        //Original Source of the code in this function: http://rbrundritt.spaces.live.com/Blog/cns!E7DBA9A4BFD458C5!246.entry
        var sumY = 0;
        var sumX = 0;
        var partialSum = 0;
        var sum = 0;
        //close polygon
        points.push(points[0]);

        var n = points.length; for (var i = 0; i < n - 1; i++) {
            partialSum = points[i].Longitude * points[i + 1].Latitude - points[i + 1].Longitude * points[i].Latitude;
            sum += partialSum; sumX += (points[i].Longitude + points[i + 1].Longitude) * partialSum;
            sumY += (points[i].Latitude + points[i + 1].Latitude) * partialSum;
        }
        var area = 0.5 * sum;
        return new VELatLong(sumY / 6 / area, sumX / 6 / area);
    };
    $.Math.IsInPolygon = function(latlong, points) {
        /// This code adapted from the following URL: http://msdn.microsoft.com/en-us/library/cc451895.aspx
        var i;
        var j = points.length - 1;
        var inPoly = false;
        var lat = latlong.Latitude;
        var lon = latlong.Longitude;
        for (i = 0; i < points.length; i++) {
            if (points[i].Longitude < lon && points[j].Longitude >= lon || points[j].Longitude < lon && points[i].Longitude >= lon) {
                if (points[i].Latitude + (lon - points[i].Longitude) / (points[j].Longitude - points[i].Longitude) * (points[j].Latitude - points[i].Latitude) < lat) {
                    inPoly = !inPoly;
                }
            }
            j = i;
        }
        return inPoly;
    };
    $.Math.ToRadian = function(degree) { return degree * (Math.PI / 180); };
    $.Math.ToDegrees = function(radians) { return radians * 180 / Math.PI; };
})(VEToolkit);