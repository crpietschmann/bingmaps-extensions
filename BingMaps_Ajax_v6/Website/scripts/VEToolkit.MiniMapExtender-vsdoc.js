/* ************************************************************************************ */
/* VEToolkit v6.2.? BETA - http://codeplex.com/VEToolkit                      */
/* Copyright (C) 2008 Chris Pietschmann (http://pietschsoft.com). All Rights Reserved.  */
/* This project is licensed under the Microsoft Public License (Ms-PL)                  */
/* This license can be found here: http://www.codeplex.com/VEToolkit/license            */
/* ************************************************************************************ */
VEToolkit.MiniMapVerticalAlignment = function() {
    /// <summary>The Vertical Alignment of the Mini Map.</summary>
    /// <field name="Top" type="number">Align to the Top edge of the VEMap.</field>
    /// <field name="Middle" type="number">Align to the Middle of the VEMap.</field>
    /// <field name="Bottom" type="number">Align to the Bottom edge of the VEMap.</field>
};
VEToolkit.MiniMapVerticalAlignment.Top = null;
VEToolkit.MiniMapVerticalAlignment.Middle = null;
VEToolkit.MiniMapVerticalAlignment.Bottom = null;

VEToolkit.MiniMapHorizontalAlignment = function() {
    /// <summary>The Horizontal Alignment of the Mini Map.</summary>
    /// <field name="Left" type="number">Align to the Left edge of the VEMap.</field>
    /// <field name="Center" type="number">Align to the Center of the VEMap.</field>
    /// <field name="Right" type="number">Align to the Right edge of the VEMap.</field>
};
VEToolkit.MiniMapHorizontalAlignment.Left = null;
VEToolkit.MiniMapHorizontalAlignment.Center = null;
VEToolkit.MiniMapHorizontalAlignment.Right = null;

VEToolkit.MiniMapExtender = function(map) {
    /// <summary>Extends Virtual Earth with easier to use functionality to manipulate/control the Mini Map.</summary>
    /// <param name="map" type="VEMap">The VEMap object instance for this MiniMapExtender object instance to connect to.</param>
};
VEToolkit.MiniMapExtender.prototype = {
    Show: function() {
        /// <summary>Shows the MiniMap</summary>
    },
    Hide: function() {
        /// <summary>Hides the MiniMap</summary>
    },
    ShowResizer: function() {
        /// <summary>Shows the MiniMap Resizer control.</summary>
    },
    HideResizer: function() {
        /// <summary>Hides the MiniMap Resizer control.</summary>
    },
    SetMiniMapSize: function(size) {
        /// <summary>Sets the MiniMap Size.</summary>
        /// <param name="size" type="VEMiniMapSize">A VEMiniMapSize Enumeration to set the MiniMap Size to.</param>
    },
    SetVerticalAlignment: function(v) {
        /// <summary>Sets the Vertical Alignment of the Mini Map.</summary>
        /// <param name="v" type="VEToolkit.MiniMapVerticalAlignment">A VEToolkit.MiniMapVerticalAlignment Enumeration to set the MiniMap's Vertical Alignment to.</param>
    },
    SetHorizontalAlignment: function(v) {
        /// <summary>Sets the Horizontal Alignment of the Mini Map.</summary>
        /// <param name="v" type="VEToolkit.MiniMapHorizontalAlignment">A VEToolkit.MiniMapHorizontalAlignment Enumeration to set the MiniMap's Vertical Alignment to.</param>
    },
    SetVerticalOffset: function(v) {
        /// <summary>Sets the Vertical Offset of the Mini Map.</summary>
        /// <param name="v" type="number">The distance (in pixels) to offset/space the Mini Map from the vertical edge of the VEMap.</param>
    },
    GetVerticalOffset: function() {
        /// <summary>Gets the Vertical Offset of the Mini Map.</summary>
    },
    SetHorizontalOffset: function(v) {
        /// <summary>Sets the Horizontal Offset of the Mini Map.</summary>
        /// <param name="v" type="number">The distance (in pixels) to offset/space the Mini Map from the horizontal edge of the VEMap.</param>
    },
    GetHorizontalOffset: function() {
        /// <summary>Gets the Horizontal Offset of the Mini Map.</summary>
    }
};