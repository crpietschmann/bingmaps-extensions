/// <reference path="VeJavaScriptIntellisenseHelper.js" />
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
    this._map = map;
    this._div = document.getElementById(divId);

    this._map_mouseEvent$delegate = VEToolkit.createDelegate(this, this._map_mouseEvent);
    map.AttachEvent("onclick", this._map_mouseEvent$delegate);
    map.AttachEvent("onmouseover", this._map_mouseEvent$delegate);
    map.AttachEvent("onmouseout", this._map_mouseEvent$delegate);
    
    this.Refresh();
};
VEToolkit.ShapeListControl.prototype = new VEToolkit.Object;
VEToolkit.ShapeListControl.prototype.Refresh = function() {
    /// <summary>Refreshes the list with the Shape that are currently plotted.</summary>
    var that = this;

    this._div.innerHTML = "";

    var sl = this._map.GetShapeLayerByIndex(0);

    for (var i = 0; i < sl.GetShapeCount(); i++) {
        var shape = sl.GetShapeByIndex(i);
        var elem = document.createElement("div");
        elem.VEShapeID = shape.GetID();
        elem.className = "VEToolkit_ShapeListControl_Shape";
        VEToolkit.attachEvent(elem, "click", VEToolkit.createDelegate(elem, function() { that._listItem_Click(that, this); }));
        VEToolkit.attachEvent(elem, "mouseover", VEToolkit.createDelegate(elem, function() { that._listItem_MouseOver(that, this); }));
        VEToolkit.attachEvent(elem, "mouseout", VEToolkit.createDelegate(elem, function() { that._listItem_MouseOut(that, this); }));

        var titleElem = document.createElement("div");
        titleElem.className = "VEToolkit_ShapeListControl_ShapeTitle";
        titleElem.innerHTML = shape.GetTitle();
        elem.appendChild(titleElem);

        var descElem = document.createElement("div");
        descElem.className = "VEToolkit_ShapeListControl_ShapeDesc";
        descElem.innerHTML = shape.GetDescription();
        elem.appendChild(descElem);

        this._div.appendChild(elem);
    }
};
VEToolkit.ShapeListControl.prototype._listItem_Click = function(sender, elem) {
    /// sender is the ShapeListControl
    /// elem is the div element
    //This is called when the user clicks on a Div in the list
    var evtArgs = new VEToolkit.ShapeListControlEventArgs(elem, sender._map, sender._map.GetShapeByID(elem.VEShapeID));
    this.raiseEvent("click", evtArgs);
};

VEToolkit.ShapeListControl.prototype._listItem_MouseOver = function(sender, elem) {
    var evtArgs = new VEToolkit.ShapeListControlEventArgs(elem, sender._map, sender._map.GetShapeByID(elem.VEShapeID));
    this.raiseEvent("mouseover", evtArgs);
};

VEToolkit.ShapeListControl.prototype._listItem_MouseOut = function(sender, elem) {
    var evtArgs = new VEToolkit.ShapeListControlEventArgs(elem, sender._map, sender._map.GetShapeByID(elem.VEShapeID));
    this.raiseEvent("mouseout", evtArgs);
};

VEToolkit.ShapeListControl.prototype._map_mouseEvent = function(e) {
    var shape = null;
    var div = null;
    if (e.elementID != null) {
        shape = this._map.GetShapeByID(e.elementID);
        div = VEToolkit.getChildByAttributeValue(this._div, "VEShapeID", shape.GetID());

        var evtArgs = new VEToolkit.ShapeListControlEventArgs(div, this._map, shape);
        evtArgs.MapEvent = e;
        this.raiseEvent(e.eventName, evtArgs);
    }
};


VEToolkit.ShapeListControlEventArgs = function(element, map, shape) {
    this.Element = element;
    this.Map = map;
    this.Shape = shape;
    this.MapEvent = null;
};
VEToolkit.ShapeListControlEventArgs.prototype = new VEToolkit.EventArgs;
