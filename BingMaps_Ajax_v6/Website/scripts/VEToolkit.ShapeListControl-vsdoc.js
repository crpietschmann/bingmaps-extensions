/// <reference path="VEToolkit.Core.js" />
/* ************************************************************************************ */
/* VEToolkit v6.2.? BETA - http://codeplex.com/VEToolkit                      */
/* Copyright (C) 2008 Chris Pietschmann (http://pietschsoft.com). All Rights Reserved.  */
/* This project is licensed under the Microsoft Public License (Ms-PL)                  */
/* This license can be found here: http://www.codeplex.com/VEToolkit/license            */
/* ************************************************************************************ */
VEToolkit.ShapeListControl = function(map, divId) {
    /// <summary>A Control that displays a list of Shapes plotted on the map.</summary>
    /// <param name="map" type="VEMap">The VEMap object instance to attach to.</param>
    /// <param name="divId" type="string">The Id of the Div Element that will contain the list</param>
};
VEToolkit.ShapeListControl.prototype = new VEToolkit.Object;
VEToolkit.ShapeListControl.prototype.Refresh = function() {
    /// <summary>Refreshes the list with the Shape that are currently plotted.</summary>
};
VEToolkit.ShapeListControlEventArgs = function(element, map, shape) {
    this.Element = element;
    this.Map = map;
    this.Shape = shape;
    this.MapEvent = null;
};
VEToolkit.ShapeListControlEventArgs.prototype = new VEToolkit.EventArgs;
