/* ************************************************************************************ */
/* VEToolkit v6.2.? BETA - http://codeplex.com/VEToolkit                      */
/* Copyright (C) 2008 Chris Pietschmann (http://pietschsoft.com). All Rights Reserved.  */
/* This project is licensed under the Microsoft Public License (Ms-PL)                  */
/* This license can be found here: http://www.codeplex.com/VEToolkit/license            */
/* ************************************************************************************ */
VEToolkit.ContextMenuExtender = function(map) {
    /// <summary>Extends Virtual Earth with a Context Menu.</summary>
    /// <param name="map" type="VEMap">The VEMap object instance to attach to.</param>
};
VEToolkit.ContextMenuExtender.prototype = {
    /* Public Methods */
    AddProvider: function(p) {
        /// <summary>Adds a ContextMenuProvider to the list of Providers to use.</summary>
    },
    ClearProviders: function() {
        /// <summary>Clears all ContextMenuProviders</summary>
    },
    ShowContextMenu: function(x, y, e) {
        /// <summary>Shows the ContextMenu at the given location using the given VEMapEvent arguments. This method is not meant to be called directly, unless abolutely necessary.</summary>
        /// <param name="x" type="number">The X coordinate to show the ContextMenu at.</param>
        /// <param name="y" type="number">The Y coordinate to show the ContextMenu at.</param>
        /// <param name="e" type="VEMapEvent">The VEMapEvent arguments to use when showing the ContextMenu.</param>
    },
    HideContextMenu: function() {
        /// <summary>Hides the ContextMenu</summary>
    },
    GetZIndex: function() {
        /// <summary>Gets the Z-Index value for the DOM element that displays the Context Menu.</summary>
        /// <returns type="number"></returns>
    },
    SetZIndex: function(v) {
        /// <summary>Sets the Z-Index value for the DOM element that displays the Context Menu.</summary>
        /// <param name="v" type="number">The Z-Index value to set</param>
        /// <returns type="number"></returns>
    }
};

VEToolkit.DefaultContextMenuProvider = function() {
    /// <summary>The Default ContextMenu Provider</summary>
    /// <field name="Options">The Menu Options to use.</field>
};
VEToolkit.DefaultContextMenuProvider.Options = [];
VEToolkit.DefaultContextMenuProvider.prototype = { IsMatch: function(map, e) { return true; } };

