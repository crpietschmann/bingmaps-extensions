/// <reference path="VeJavaScriptIntellisenseHelper.js" />
/* ************************************************************************************ */
/* VEToolkit v6.2.? BETA - http://codeplex.com/VEToolkit                      */
/* Copyright (C) 2008 Chris Pietschmann (http://pietschsoft.com). All Rights Reserved.  */
/* This project is licensed under the Microsoft Public License (Ms-PL)                  */
/* This license can be found here: http://www.codeplex.com/VEToolkit/license            */
/* ************************************************************************************ */
(function($) {
    $.MiniMapVerticalAlignment = function() {};
    $.MiniMapVerticalAlignment.Top = 1;
    $.MiniMapVerticalAlignment.Middle = 2;
    $.MiniMapVerticalAlignment.Bottom = 3;

    $.MiniMapHorizontalAlignment = function() {};
    $.MiniMapHorizontalAlignment.Left = 1;
    $.MiniMapHorizontalAlignment.Center = 2;
    $.MiniMapHorizontalAlignment.Right = 3;

    $.MiniMapExtender = function(map) {
        this._map = map;
        this._ShowMiniMap = true;
        this._ShowMiniMapResizer = true;
        this._miniMapSize = VEMiniMapSize.Small;
        this._verticalAlignment = $.MiniMapVerticalAlignment.Top;
        this._horizontalAlignment = $.MiniMapHorizontalAlignment.Right;
        this._verticalOffset = 0;
        this._horizontalOffset = 0;
        this._minimap_resizer_onclick$delegate = null;
        this._map_resize$delegate = $.createDelegate(this, this._map_resize);
        this._map.AttachEvent("onresize", this._map_resize$delegate);
    };
    $.MiniMapExtender.prototype = {
        Show: function() {
            this._ShowMiniMap = true;
            this._realignMiniMap();
        },
        Hide: function() {
            this._ShowMiniMap = false;
            this._realignMiniMap();
        },
        ShowResizer: function() {
            this._ShowMiniMapResizer = true;
            this._realignMiniMap();
        },
        HideResizer: function() {
            this._ShowMiniMapResizer = false;
            this._realignMiniMap();
        },
        SetMiniMapSize: function(size) {
            this._miniMapSize = size;
            this._realignMiniMap();
        },
        SetVerticalAlignment: function(v) {
            this._verticalAlignment = v;
            this._realignMiniMap();
        },
        SetHorizontalAlignment: function(v) {
            this._horizontalAlignment = v;
            this._realignMiniMap();
        },
        SetVerticalOffset: function(v) {
            this._verticalOffset = v;
            this._realignMiniMap();
        },
        GetVerticalOffset: function() {
            return this._verticalOffset;
        },
        SetHorizontalOffset: function(v) {
            this._horizontalOffset = v;
            this._realignMiniMap();
        },
        GetHorizontalOffset: function() {
            return this._horizontalOffset;
        },
        _getMapElement: function() { return this._map.mapelement; },
        _realignMiniMap: function() {
            if (this._map != null) {
                if (!this._ShowMiniMap) {
                    this._map.HideMiniMap();
                } else {
                    this._map.ShowMiniMap(0, 0, this._miniMapSize);
                    /// Show the MiniMap in the aligned location we want it
                    var minimap = $.getChildById(this._getMapElement(), "MSVE_minimap");
                    var xoffset = 0;
                    var yoffset = 0;

                    if (this._verticalAlignment == $.MiniMapVerticalAlignment.Top) {
                        yoffset = 0;
                        yoffset += this._verticalOffset;
                    } else if (this._verticalAlignment == $.MiniMapVerticalAlignment.Middle) {
                        yoffset = (this._getMapElement().offsetHeight / 2) - (minimap.offsetHeight / 2);
                    } else {
                        yoffset = this._getMapElement().offsetHeight - minimap.offsetHeight;
                        yoffset -= this._verticalOffset;
                    }
                    if (this._horizontalAlignment == $.MiniMapHorizontalAlignment.Left) {
                        xoffset = 0;
                        xoffset += this._horizontalOffset;
                    } else if (this._horizontalAlignment == $.MiniMapHorizontalAlignment.Center) {
                        xoffset = (this._getMapElement().offsetWidth / 2) - (minimap.offsetHeight / 2);
                    } else {
                        xoffset = this._getMapElement().offsetWidth - minimap.offsetWidth;
                        xoffset -= this._horizontalOffset;
                    }

                    this._map.ShowMiniMap(xoffset, yoffset, this._miniMapSize);

                    var resizer = $.getChildById(minimap, "MSVE_minimap_resize");
                    if (this._ShowMiniMapResizer) {
                        /// Show the Mini Map resizer so the Mini Map can be resized
                        resizer.style.display = "";
                        if (this._minimap_resizer_onclick$delegate == null) {
                            this._minimap_resizer_onclick$delegate = $.createDelegate(this, this._minimap_resizer_onclick);
                            $.attachEvent(resizer, "click", this._minimap_resizer_onclick$delegate);
                        }
                    } else {
                        /// Hide the Mini Map resizer so the Mini Map cannot be resized
                        resizer.style.display = "none";
                    }
                }
            }
        },
        _minimap_resizer_onclick: function() {
            this._miniMapSize = (this._miniMapSize == VEMiniMapSize.Small ? VEMiniMapSize.Large : VEMiniMapSize.Small);
            var me = this;
            window.setTimeout(function() { me._realignMiniMap(); }, 100);
        },
        _map_resize: function() { this._realignMiniMap(); }
    };
})(VEToolkit);