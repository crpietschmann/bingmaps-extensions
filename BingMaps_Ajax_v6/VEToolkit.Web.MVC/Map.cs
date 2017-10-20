/* ************************************************************************************ */
/* VEToolkit.Web.MVC - http://vetoolkit.codeplex.com                                    */
/* Copyright (C) 2009 Chris Pietschmann (http://pietschsoft.com). All Rights Reserved.  */
/* This project is licensed under the Microsoft Public License (Ms-PL)                  */
/* This license can be found here: http://vetoolkit.codeplex.com/license                */
/* ************************************************************************************ */

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using VEToolkit.Web.MVC.Extensions;


// Links to look at:
// http://msdn.microsoft.com/en-us/library/bb412546.aspx
// http://mikehadlow.blogspot.com/2008/10/using-google-maps-with-mvc-framework.html

namespace VEToolkit.Web.MVC
{
    /// <summary>
    /// Defines a MS Virtual Earth Map to be rendered.
    /// </summary>
    public class Map
    {
        #region "Constructors"

        /// <summary>
        /// Creates a new instance of the Map class.
        /// </summary>
        public Map()
        {
            // Auto Generate a Unique MapID
            // This allows for multiple maps to be place on a page without requiring
            // the developer to give each one a unique ID for the JavaScript variable.
            this.MapID = "map" + Guid.NewGuid().ToString().Replace("-", "");

            // Set some "Default" values
            this.ZoomLevel = 4;
            this.Fixed = false;
            this.MapStyle = MapStyle.Road;
            this.MapMode = MapMode.Mode2D;
            this.ShowSwitch = true;
            this.TileBuffer = 0;
        }

        #endregion

        #region "Properties"

        /// <summary>
        /// The Unique ID within the Page that's used to name the VEMap JavaScript Variable.
        /// </summary>
        public string MapID { get; set; }

        /// <summary>
        /// A Location Class object that represents the center of the map. Optional.
        /// </summary>
        public Location Center { get; set; }

        /// <summary>
        /// The Map Style to use.
        /// </summary>
        public MapStyle MapStyle { get; set; }

        /// <summary>
        /// The zoom level to display. Valid values range from 1 through 19. Optional. Default is 4.
        /// </summary>
        public int ZoomLevel { get; set; }

        /// <summary>
        /// A Boolean value that specifies whether the map view is displayed as a fixed map that the user cannot change. Optional. Default is false.
        /// </summary>
        public bool Fixed { get; set; }

        
        /// <summary>
        /// A MapMode Enumeration value that specifies whether to load the map in 2D or 3D mode. Optional. Default is MapMode.Mode2D.
        /// </summary>
        public MapMode MapMode { get; set; }

        /// <summary>
        /// A Boolean value that specifies whether to show the map mode switch on the dashboard control. Optional. Default is true (the switch is displayed).
        /// </summary>
        public bool ShowSwitch { get; set; }

        /// <summary>
        /// How much tile buffer to use when loading map. Default is 0 (do not load an extra boundary of tiles). This parameter is ignored in 3D mode.
        /// </summary>
        public int TileBuffer { get; set; }

        /// <summary>
        /// A MapOptions Class that specifies other map options to set. 
        /// </summary>
        public MapOptions MapOptions { get; set; }

        /// <summary>
        /// The CSS Class for the Maps Container DIV to use.
        /// </summary>
        public string CssClass { get; set; }

        /// <summary>
        /// The JavaScript Function to call when the Map has completed loading.
        /// </summary>
        public string MapOnLoaded { get; set; }

        #endregion

        #region "Fluent Methods"

        public Map SetCenter(Location location)
        {
            this.Center = location;
            return this;
        }

        public Map SetCssClass(string cssClass)
        {
            this.CssClass = cssClass;
            return this;
        }

        public Map SetFixed(bool fixedValue){
            this.Fixed = fixedValue;
            return this;
        }

        public Map SetMapMode(MapMode mapMode)
        {
            this.MapMode = mapMode;
            return this;
        }

        public Map SetMapOptions(MapOptions mapOptions)
        {
            this.MapOptions = mapOptions;
            return this;
        }

        public Map SetMapStyle(MapStyle mapStyle)
        {
            this.MapStyle = mapStyle;
            return this;
        }

        public Map SetShowSwitch(bool showSwitch)
        {
            this.ShowSwitch = showSwitch;
            return this;
        }

        public Map SetTileBuffer(int tileBuffer)
        {
            this.TileBuffer = tileBuffer;
            return this;
        }

        public Map SetZoom(int zoomLevel)
        {
            this.ZoomLevel = zoomLevel;
            return this;
        }

        /// <summary>
        /// Sets the JavaScript Function to call when the Map has completed loading.
        /// </summary>
        /// <param name="javascriptFunction">The Client-Side JavaScript Function to Call</param>
        /// <returns></returns>
        public Map SetOnMapLoaded(string javascriptFunction)
        {
            this.MapOnLoaded = javascriptFunction;
            return this;
        }

        #endregion

        public override string ToString()
        {
            var sb = new StringBuilder();

            sb.Append("<div id='div" + this.MapID + "'");
            if (!string.IsNullOrEmpty(this.CssClass))
            {
                sb.Append(" class='" + this.CssClass + "'");
            }
            else
            {
                sb.Append(" style='position:relative;'");
            }
            sb.Append("></div>");


            sb.Append("<script type='text/javascript'>");
            sb.Append("var " + this.MapID + "=null;");
            sb.Append("$(document).ready(function(){");
            sb.Append("" + this.MapID + "=new VEMap('div" + this.MapID + "');");

            renderOnLoadMapMethod(ref sb);

            sb.Append("" + this.MapID + ".LoadMap(");
            if (this.Center != null)
            {
                sb.Append("new VELatLong(" + this.Center.ToString() + ")");
            }
            else
            {
                sb.Append("null");
            }
            sb.Append(",");
            sb.Append(this.ZoomLevel.ToString());
            sb.Append(",");
            sb.Append(this.MapStyle.ToJavaScriptValue());
            sb.Append(",");
            sb.Append(this.Fixed.ToString().ToLower());
            sb.Append(",");
            sb.Append(this.MapMode.ToJavaScriptValue());
            sb.Append(",");
            sb.Append(this.ShowSwitch.ToString().ToLower());
            sb.Append(",");
            sb.Append(this.TileBuffer.ToString());
            sb.Append(",");
            if (this.MapOptions != null)
            {
                sb.Append(this.MapOptions.ToString());
            }
            else
            {
                sb.Append("null");
            }
            sb.Append(");");
            
            sb.Append("});");
            sb.Append("</script>");

            return sb.ToString();
        }

        private void renderOnLoadMapMethod(ref StringBuilder sb)
        {
            sb.Append("var maploaded=");
            sb.Append(this.MapOnLoaded);
            sb.Append(";" + this.MapID + ".onLoadMap=function(){maploaded(" + this.MapID + ");};");
        }
    }
}
