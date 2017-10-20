/* ************************************************************************************ */
/* VEToolkit v6.2.? BETA - http://codeplex.com/VEToolkit                      */
/* Copyright (C) 2008 Chris Pietschmann (http://pietschsoft.com). All Rights Reserved.  */
/* This project is licensed under the Microsoft Public License (Ms-PL)                  */
/* This license can be found here: http://www.codeplex.com/VEToolkit/license            */
/* ************************************************************************************ */
var VEToolkit = {};

VEToolkit.importScript = function(script) {
    /// <summary>Imports/Loads a JavaScript file to the page on-demand.</summary>
    /// <param name="script" type="String">The URL of the JavaScript file to load.</param>
};
VEToolkit.LoadAPI = function(callbackMethod, useSSL) {
    /// <summary>Loads the Virtual Earth JavaScript API on-demand.</summary>
    /// <param name="callbackMethodName" type="String">The name of the JavaScript method to call when the API is loaded.</param>
    /// <param name="useSSL" type="String">A boolean value determining whether the Script is to be loaded using SSL.</param>
};

VEToolkit.Drawing = {};

VEToolkit.Drawing.DrawCircle = VEToolkit.Drawing.DrawCircle = function(centerPoint, circleRadius, units) {
    /// <summary>Returns an Array of VELatLong objects representing the border of a circle with the given radius surrounding the given Center Point.</summary>
    /// <param name="centerPoint" type="VELatLong">A VELatLong object representing the center point of the circle to draw.</param>
    /// <param name="circleRadius" type="number">The radius of the circle to draw.</param>
    /// <param name="units" type="VEToolkit.Math.EarthRadius">A VEToolkit.Math.EarthRadius enumeration value specifying the unit of measurement to use.</param>
    /// <returns type="Array[VELatLong]"></returns>
};

VEToolkit.Map = {};

VEToolkit.Map.GetShapeLayerByTitle = function(map, title) {
    /// <summary>Gets the first ShapeLayer found that has it's Title set to the given value.</summary>
    /// <param name="map" type="VEMap">The VEMap object to search.</param>
    /// <param name="title" type="string">The Title to look for.</param>
    /// <returns type="VEShapeLayer"></returns>
};
VEToolkit.Map.GetCenter = function(map) {
    /// <summary>Returns the center VELatLong coordinate of the given VEMap. This also works when in Birdseye mode.</summary>
    /// <param name="map" type="VEMap">The VEMap to get the MapView for.</param>
    /// <returns type="VELatLong"></returns>
};
VEToolkit.Map.IsShapeInLayers = function(shapeid, layerarray) {
    /// <summary>
    /// checks if supplied shape id is in one of the layers in supplied layerarray
    /// </summary>
    /// <param name="shapeid">the id of the shape to find</param>
    /// <param name="layers">array of layers to search</param>
};
VEToolkit.Map.IsShapeInLayer = function(shapeid, layer) {
    /// <summary>
    /// checks if supplied shape id is in the supplied layer
    /// </summary>
    /// <param name="shapeid">the id of the shape to find</param>
    /// <param name="layer">the VEShapeLayer to search</param>
};

VEToolkit.Math = {};

VEToolkit.Math.CalculateBearing = function(latlng1, latlng2) {
    /// <summary>Calculates the bearing in degrees between two VELatLong coordinates. This can be used to calculate the direction an object is pointing or traveling.
    /// <param name="latlng1">The first VELatLong coordinate.</param>
    /// <param name="latlng2">The second VELatLong coordinate.</param>
    /// <returns type="Number"></returns>
};

VEToolkit.Math.CalculateCoordinate = function(origin, bearing, distance, units) {
    /// <summary>Returns a VELatLong object that represents the coordinate that is the specified distance from the origin VELatLong coordinate at the specified bearing in degrees.</summary>
    /// <param name="origin" type="VELatLong">The origin VELatLong to calculate from.</param>
    /// <param name="bearing" type="Number">The bearing in degrees from the origin VELatLong coordinate to calculate.</param>
    /// <param name="distance" type="Number">The distance from the origin VELatLong coordinate to calculate.</param>
    /// <param name="units" type="VEToolkit.Math.EarthRadius">A VEToolkit.Math.EarthRadius enumeration value specifying the unit of measurement to use.</param>
    /// <returns type="VELatLong"></returns>
};
VEToolkit.Math.CalculateDistance = function(point1, point2, m) {
    /// <summary>Calculates the distance of two VELatLong points using the given measurement scale.</summary>
    /// <param name="point1" type="VELatLong">A VELatLong object representing the first point.</param>
    /// <param name="point2" type="VELatLong">A VELatLong object representing the second point.</param>
    /// <param name="m" type="VEToolkit.Math.EarthRadius">A VEToolkit.Math.EarthRadius enumeration value representing the measurement scale to use.</param>
};
VEToolkit.Math.CalculateInverseCoordinate = function(latlong) {
    /// <summary>Calculated the Inverse of the given VELatLong coordinate.(Or opposition position on the globe)</summary>
    /// <param name="latlong" type="VELatLong">The VELatLong object that represents the coordinate to invert.</param>
    /// <returns type="VELatLong"></returns>
};
VEToolkit.Math.CalculateMidPoint = function(latlng1, latlng2) {
    /// <summary>Calculates the Mid Point (or Center Point) in between two VELatLong coordinates</summary>
    /// <param name="latlng1" type="VELatLong">The first VELatLong coordinate.</param>
    /// <param name="letlng2" type="VELatLong">The second VELatLong coordinate.</param>
    /// <returns type="VELatLong"></returns>
};
VEToolkit.Math.DiffRadian = function(r1, r2) {
    /// <summary>Gets the difference between two Radians</summary>
    /// <param name="r1" value="number">The first Radian</param>
    /// <param name="r2" value="number">The second Radian</param>
    /// <returns type="number"></returns>
};
VEToolkit.Math.EarthRadius = function() {
    /// <summary>An Enumeration representing the distance of the earth radius.</summary>
    /// <field name="Miles">The Earths Radius in Miles.</field>
    /// <field name="Kilometers">The Earths Radius in Kilometers</field>
};
VEToolkit.Math.EarthRadius.Miles = null;
VEToolkit.Math.EarthRadius.Kilometers = null;
VEToolkit.Math.GetPolygonCentroid = function(points) {
    /// <summary>Gets the approximate Centroid (or center point) of a Polygon.</summary>
    /// <param name="points" type="Array[VELatLong]">Array of VELatLong objects that represent the Polygon.</param>
    /// <returns type="VELatLong"></returns>
};
VEToolkit.Math.IsInPolygon = function(latlong, points) {
    /// <summary>Check whether a given point exists within a given polygon.</summary>
    /// <param name="latlong" type="VELatLong">A VELatLong object representing the point to check.</param>
    /// <param name="points" type="Array[VELatLong]">An Array of VELatLong objects representing the Polygon to check against.</param>
    /// <returns type="boolean"></returns>
};
VEToolkit.Math.ToRadian = function(degree) {
    /// <summary>Converts a Degree value to a Radian.</summary>
    /// <param name="degree" type="number">The Degree to convert.</param>
    /// <returns type="number"></returns>
};
VEToolkit.Math.ToDegrees = function(radians) {
    /// <summary>Converts a Radian value to a Degree.</summary>
    /// <param name="radians" type="number">The Radian to convert.</param>
    /// <returns type="number"></returns>
};