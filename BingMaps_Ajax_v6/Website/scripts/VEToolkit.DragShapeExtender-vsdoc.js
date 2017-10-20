/// <reference path="VEToolkit.Core.js" />
/* ************************************************************************************ */
/* VEToolkit v6.2.? BETA - http://codeplex.com/VEToolkit                      */
/* Copyright (C) 2008 Chris Pietschmann (http://pietschsoft.com). All Rights Reserved.  */
/* This project is licensed under the Microsoft Public License (Ms-PL)                  */
/* This license can be found here: http://www.codeplex.com/VEToolkit/license            */
/* ************************************************************************************ */
VEToolkit.DragShapeExtender = function(map) {
    /// <summary>Extends Virtual Earth with functionality that allows the user to click and drag VEShape objects around.</summary>
    /// <param name="map" type="VEMap">The VEMap object instance for this MiniMapExtender object instance to connect to.</param>
    /// <field name="DragRightMouseButton">Determines whether Shapes are draggable when the Right Mouse Button is pressed.</field>
    /// <field name="DragLeftMouseButton">Determines whether Shapes are draggable when the Left Mouse Button is pressed.</field>
};
VEToolkit.DragShapeExtender.prototype = new VEToolkit.Object;
VEToolkit.DragShapeExtender.prototype.IsDraggable = function(e) { return true; };

VEToolkit.DragShapeExtenderEventArgs = function(map, shape) {
    this.Map = map;
    this.Shape = shape;
};
VEToolkit.DragShapeExtenderEventArgs.prototype = new VEToolkit.EventArgs;