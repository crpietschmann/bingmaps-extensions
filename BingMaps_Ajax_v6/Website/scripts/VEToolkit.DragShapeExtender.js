/// <reference path="VeJavaScriptIntellisenseHelper.js" />
/// <reference path="VEToolkit.Core.js" />
/* ************************************************************************************ */
/* VEToolkit v6.2.? BETA - http://codeplex.com/VEToolkit                      */
/* Copyright (C) 2008 Chris Pietschmann (http://pietschsoft.com). All Rights Reserved.  */
/* This project is licensed under the Microsoft Public License (Ms-PL)                  */
/* This license can be found here: http://www.codeplex.com/VEToolkit/license            */
/* ************************************************************************************ */
// Special thanks to Mike Garza for his articles used as the initial reference for this extender: http://garzilla.net/vemaps/MovePushPin.aspx
VEToolkit.DragShapeExtender = function(map) {
    /// <summary>Extends Virtual Earth with functionality that allows the user to click and drag VEShape objects around.</summary>
    /// <param name="map" type="VEMap">The VEMap object instance for this MiniMapExtender object instance to connect to.</param>
    /// <field name="DragRightMouseButton">Determines whether Shapes are draggable when the Right Mouse Button is pressed.</field>
    /// <field name="DragLeftMouseButton">Determines whether Shapes are draggable when the Left Mouse Button is pressed.</field>
    this._map = map;
    this._marker = null;
    this._prevLatLong = new VELatLong(0, 0);
    
    this.DragRightMouseButton = true;
    this.DragLeftMouseButton = false;
    
    this._onmousemove$delegate = VEToolkit.createDelegate(this, this._onmousemove);
    this._onmousedown$delegate = VEToolkit.createDelegate(this, this._onmousedown);
    this._onmouseup$delegate = VEToolkit.createDelegate(this, this._onmouseup);
    map.AttachEvent("onmousemove", this._onmousemove$delegate);
    map.AttachEvent("onmousedown", this._onmousedown$delegate);
    map.AttachEvent("onmouseup", this._onmouseup$delegate);
};
VEToolkit.DragShapeExtender.prototype = new VEToolkit.Object;
VEToolkit.DragShapeExtender.prototype.IsDraggable = function(e) { return true; };
VEToolkit.DragShapeExtender.prototype._onmousedown = function(e) {
    if (e.elementID && this._allowDrag(e) && this.IsDraggable(this._map, e)) {
        this._marker = this._map.GetShapeByID(e.elementID);
        this._prevLatLong = this._map.PixelToLatLong(new VEPixel(e.mapX, e.mapY));
        this._map.mapelement.style.cursor = "move";
        this.raiseEvent("dragstart", new VEToolkit.DragShapeExtenderEventArgs(this._map, this._marker));
    }
};
VEToolkit.DragShapeExtender.prototype._onmousemove = function(e) {
    var latlong = this._map.PixelToLatLong(new VEPixel(e.mapX, e.mapY));
    var latVariance = 0;
    var lngVariance = 0;

    if (this._marker != null) {
        this._map.HideInfoBox(this._marker);
        if (this._marker.GetShapeType() == VEShapeType.Pushpin) {
            this._marker.SetPoints(latlong)
        } else {
            // determine offset
            latVariance = latlong.Latitude - this._prevLatLong.Latitude;
            lngVariance = latlong.Longitude - this._prevLatLong.Longitude;

            //adjust points in current Shape
            var points = this._marker.GetPoints();
            for (var i = 0; i < points.length; i++) {
                points[i].Latitude += latVariance;
                points[i].Longitude += lngVariance;
            }

            this._marker.SetPoints(points);
            this._prevLatLong = latlong;
        }
        return true;
    }
};
VEToolkit.DragShapeExtender.prototype._onmouseup = function(e) {
    if (this._marker != null) {
        var shape = this._marker;
        this._marker = null;
        this._map.mapelement.style.cursor = "";
        this.raiseEvent("dragend", new VEToolkit.DragShapeExtenderEventArgs(this._map, shape));
    }
};
VEToolkit.DragShapeExtender.prototype._allowDrag = function(e) {
    if (e.rightMouseButton && this.DragRightMouseButton)
        return true;
    else if (e.leftMouseButton && this.DragLeftMouseButton)
        return true;
    else
        return false;
};

VEToolkit.DragShapeExtenderEventArgs = function(map, shape) {
    this.Map = map;
    this.Shape = shape;
};
VEToolkit.DragShapeExtenderEventArgs.prototype = new VEToolkit.EventArgs;