/* Bing Maps Extensions v7 Alpha - http://bingmapsextensions.codeplex.com
 * Copyright (c) 2011 Chris Pietschmann (http://pietschsoft.com). All Rights Reserved.
 * This project is licensed under the Microsoft Public License (Ms-PL)
 * This license can be found here: http://bingmapsextensions.codeplex.com/license
*/
(function (window, $maps) {
    var $ = window.BingMapsExt = {
        EarthRadius: {
            Miles: 3956.0,
            Kilometers: 6367.0
        },

        /// <summary>Calculates the distance between two points</summary>
        Distance: function(point1, point2, earthRadius) {
            return earthRadius * 2 * Math.asin(
                Math.min(1,
                    Math.sqrt(
                        (
                            Math.pow(Math.sin((priv.DiffRadian(point1.latitude, point2.latitude)) / 2.0), 2.0) +
                            Math.cos(priv.ToRadian(point1.latitude)) * Math.cos(priv.ToRadian(point2.latitude)) *
                            Math.pow(Math.sin((priv.DiffRadian(point1.longitude, point2.longitude)) / 2.0), 2.0)
                        )
                   )
               )
           );
        },

        /// <summary>Determines whether the givein Point is within the specified Polygon</summary>
        IsInPolygon: function (point, polygonPoints) {
            /// This code adapted from the following URL: http://msdn.microsoft.com/en-us/library/cc451895.aspx
            var i;
            var j = polygonPoints.length - 1;
            var inPoly = false;
            var lat = point.latitude;
            var lon = point.longitude;
            for (i = 0; i < polygonPoints.length; i++) {
                if (polygonPoints[i].longitude < lon && polygonPoints[j].longitude >= lon || polygonPoints[j].longitude < lon && polygonPoints[i].longitude >= lon) {
                    if (polygonPoints[i].latitude + (lon - polygonPoints[i].longitude) / (polygonPoints[j].longitude - polygonPoints[i].longitude) * (polygonPoints[j].latitude - polygonPoints[i].latitude) < lat) {
                        inPoly = !inPoly;
                    }
                }
                j = i;
            }
            return inPoly;
        },

        /// <summary>Calculate the points that will draw a circle</summary>
        Circle: function (centerPoint, circleRadius, earthRadius) {
            var points = [];
            for (var i = 0; i <= 360; i++) {
                points.push(priv.CalcCirclePoint(centerPoint, i, circleRadius, earthRadius));
            }
            return points;
        }
    };

    /* ******************************** */
    /* *** Private/Internal Methods *** */
    /* ******************************** */
    var priv = {
        /// <summary>Converts Degrees to Radians</summary>
        ToRadian: function (degree) { return degree * (Math.PI / 180); },
        /// <summary>Converts Radians to Degrees</summary>
        ToDegrees: function (radians) { return radians * 180 / Math.PI; },
        /// <summary>Calculates the difference between two degrees in Radians</summary>
        DiffRadian: function(r1, r2){ return priv.ToRadian(r2) - priv.ToRadian(r1); },

        CalcCirclePoint: function (origin, bearing, distance, earthRadius) {
            var lat = priv.ToRadian(origin.latitude),
                lon = priv.ToRadian(origin.longitude),
                d = parseFloat(distance) / earthRadius,  // d = angular distance covered on earth's surface
                brng = priv.ToRadian(bearing),
                latRadians = Math.asin(Math.sin(lat) * Math.cos(d) + Math.cos(lat) * Math.sin(d) * Math.cos(brng)),
                lngRadians = lon + Math.atan2(Math.sin(brng) * Math.sin(d) * Math.cos(lat), Math.cos(d) - Math.sin(lat) * Math.sin(latRadians));
            return new $maps.Location(priv.ToDegrees(latRadians), priv.ToDegrees(lngRadians));
        }
    };

})(window, Microsoft.Maps);