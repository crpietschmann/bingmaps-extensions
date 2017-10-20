/// <reference path="VeJavaScriptIntellisenseHelper.js" />
/* ************************************************************************************ */
/* VEToolkit v6.2.? BETA - http://codeplex.com/VEToolkit                      */
/* Copyright (C) 2008 Chris Pietschmann (http://pietschsoft.com). All Rights Reserved.  */
/* This project is licensed under the Microsoft Public License (Ms-PL)                  */
/* This license can be found here: http://www.codeplex.com/VEToolkit/license            */
/* ************************************************************************************ */
VEToolkit.ContextMenuExtender = function(map) {
    /// <summary>Extends Virtual Earth with a Context Menu.</summary>
    /// <param name="map" type="VEMap">The VEMap object instance to attach to.</param>
    this._map = map;
    this._element = VEToolkit.extend(document.createElement("ul"), { className: "VEToolkit_ContextMenu" });
    this._element.style.position = "absolute";
    this._element.style.display = "none";
    this._element.style.zIndex = 1000;
    document.body.appendChild(this._element);

    this._providers = new Array();
    this._providers[this._providers.length] = new VEToolkit.DefaultContextMenuProvider();

    this._contextMenu_IsMouseOver = false;
    this._contextMenu_timeoutID = null;

    this._onclick$delegate = VEToolkit.createDelegate(this, this._onclick);
    this._onmousedown$delegate = VEToolkit.createDelegate(this, this._onmousedown);
    this._onmousemove$delegate = VEToolkit.createDelegate(this, this._onmousemove);
    this._contextMenu_onmousemove$delegate = VEToolkit.createDelegate(this, this._contextMenu_onmousemove);

    this._map.AttachEvent("onclick", this._onclick$delegate);
    this._map.AttachEvent("onmousedown", this._onmousedown$delegate);
    this._map.AttachEvent("onmousemove", this._onmousemove$delegate);
    VEToolkit.attachEvent(this._element, "mousemove", this._contextMenu_onmousemove$delegate);
};
VEToolkit.ContextMenuExtender.prototype = {
    /* Event Handlers */
    _onclick: function(e) {
        if (e.rightMouseButton) {
            // Show ContextMenu when Right Mouse Button is Clicked
            this.ShowContextMenu((e.clientX - 5), (e.clientY - 5), e);
        }
    },
    _onmousedown: function(e) {
        if (!e.rightMouseButton) {
            window.clearTimeout(this._ContextMenu_timeoutID);
            this.HideContextMenu();
        }
    },
    _onmousemove: function(e) {
        this._contextMenu_IsMouseOver = false;
        if (this._ContextMenu_timeoutID == null && this._element.style.display != "none") {
            var me = this;
            this._ContextMenu_timeoutID = window.setTimeout(function() { me.HideContextMenu(); }, 500);
        }
    },
    _contextMenu_onmousemove: function(e) {
        this._contextMenu_IsMouseOver = true;
    },

    /* Public Methods */
    AddProvider: function(p) {
        /// <summary>Adds a ContextMenuProvider to the list of Providers to use.</summary>
        this._providers.push(p);
    },
    ClearProviders: function() {
        /// <summary>Clears all ContextMenuProviders</summary>
        this._providers = new Array();
    },
    ShowContextMenu: function(x, y, e) {
        /// <summary>Shows the ContextMenu at the given location using the given VEMapEvent arguments. This method is not meant to be called directly, unless abolutely necessary.</summary>
        /// <param name="x" type="number">The X coordinate to show the ContextMenu at.</param>
        /// <param name="y" type="number">The Y coordinate to show the ContextMenu at.</param>
        /// <param name="e" type="VEMapEvent">The VEMapEvent arguments to use when showing the ContextMenu.</param>
        var menuProvider = null;

        if (this._providers.length == 1) {
            menuProvider = this._providers[0];
        } else {
            for (var i = 0; i < this._providers.length; i++) {
                if (this._providers[i].IsMatch(this._map, e)) {
                    menuProvider = this._providers[i];
                    break;
                }
            }
        }
        if (menuProvider != null) {
            window.clearTimeout(this._ContextMenu_timeoutID);
            this._ContextMenu_timeoutID = null;

            this._element.style.top = "" + y + "px";
            this._element.style.left = "" + x + "px";
            this._element.style.display = "";
            this._setMenuHTML(menuProvider, this._element, this._map, e)
        }
    },
    HideContextMenu: function() {
        /// <summary>Hides the ContextMenu</summary>
        this._element.style.display = "none";
    },
    GetZIndex: function() {
        /// <summary>Gets the Z-Index value for the DOM element that displays the Context Menu.</summary>
        /// <returns type="number"></returns>
        return this._element.style.zIndex;
    },
    SetZIndex: function(v) {
        /// <summary>Sets the Z-Index value for the DOM element that displays the Context Menu.</summary>
        /// <param name="v" type="number">The Z-Index value to set</param>
        /// <returns type="number"></returns>
        this._element.style.zIndex = v;
    },

    /* Private Methods */
    _setMenuHTML: function(menuProvider, element, map, e) {
        element.innerHTML = "";
        for (var i = 0; i < menuProvider.Options.length; i++) {
            var lielem = document.createElement("li");
            if (menuProvider.Options[i].Text === "-") {
                /* Separator Menu Item */
                lielem.className = "VEToolkit_ContextMenu_Seperator";
            }
            else {
                /* Action Menu Item */
                var elem;
                if (menuProvider.Options[i].Action != null) {
                    elem = document.createElement("a");
                } else {
                    elem = document.createElement("span");
                }

                if (typeof (menuProvider.Options[i].Text) == "function") {
                    elem.innerHTML = menuProvider.Options[i].Text(map, e);
                } else {
                    elem.innerHTML = menuProvider.Options[i].Text;
                }

                if (menuProvider.Options[i].Action != null) {
                    elem.setAttribute("href", "javascript:void(null);");
                    this._attachOnClick(elem, menuProvider.Options[i].Action, map, e);
                }

                lielem.appendChild(elem);
            }
            element.appendChild(lielem);
        }
    },
    _attachOnClick: function(elem, f, map, e) {
        var me = this;
        var func = f;
        var senderMap = map; var senderEventArgs = e;
        elem.attachEvent("onclick", function() { me.HideContextMenu(); func(senderMap, senderEventArgs); });
    }
};

VEToolkit.DefaultContextMenuProvider = function() {
    /// <summary>The Default ContextMenu Provider</summary>
    /// <field name="Options">The Menu Options to use.</field>
    this.Options = [
              { Text: "Zoom In", Action: function(map, e) { map.ZoomIn(); } },
              { Text: "Zoom Out", Action: function(map, e) { map.ZoomOut(); } },
              { Text: "-" }, // Separator Bar
              {Text: function(map, e) {
                  var latitude = ((e.latlong == null) ? map.PixelToLatLong(new VEPixel(e.mapX, e.mapY)).Latitude : e.latlong.Latitude);
                  return "Lat: " + latitude;
              }, Action: null },
              { Text: function(map, e) {
                  var longitude = ((e.latlong == null) ? map.PixelToLatLong(new VEPixel(e.mapX, e.mapY)).Longitude : e.latlong.Longitude);
                  return "Lng: " + longitude;
              }, Action: null }
        ];
};
VEToolkit.DefaultContextMenuProvider.prototype = { IsMatch: function(map, e) { return true; } };

