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

namespace VEToolkit.Web.MVC
{
    /// <summary>
    /// Contains the options to set when loading the map.
    /// </summary>
    public class MapOptions
    {
        public MapOptions()
        {
            // Set Defaults
            this.BirdseyeOrientation = Orientation.North;
            this.EnableBirdseye = true;
            this.EnableDashboardLabels = true;
            this.LoadBaseTiles = true;
        }

        /// <summary>
        /// A Orientation Enumeration value indicating the orientation of the bird's eye map. The default value is Orientation.North.
        /// </summary>
        public Orientation BirdseyeOrientation { get; set; }
        
        /// <summary>
        /// A Boolean value specifying whether or not to enable the Birdseye map style in the map control. The default value is true.
        /// </summary>
        public bool EnableBirdseye { get; set; }
        
        /// <summary>
        /// A Boolean value that specifies whether or not labels appear on the map when a user clicks the Aerial or Birdseye map style buttons on the map control dashboard. The default value is true.
        /// </summary>
        public bool EnableDashboardLabels { get; set; }

        /// <summary>
        /// A Boolean value indicating whether or not to load the base map tiles. The default value is true.
        /// </summary>
        public bool LoadBaseTiles { get; set; }

        public override string ToString()
        {
            var sb = new StringBuilder();

            sb.Append("(function(){");
            sb.Append("var mo = new VEMapOptions();");

            sb.Append("mo.BirdseyeOrientation=");
            sb.Append(this.BirdseyeOrientation.ToJavaScriptValue());
            sb.Append(";");

            sb.Append("mo.EnableBirdseye=");
            sb.Append(this.EnableBirdseye.ToString().ToLower());
            sb.Append(";");

            sb.Append("mo.EnableDashboardLabeld=");
            sb.Append(this.EnableDashboardLabels.ToString().ToLower());
            sb.Append(";");

            sb.Append("mo.LoadBaseTiles=");
            sb.Append(this.LoadBaseTiles.ToString().ToLower());
            sb.Append(";");

            sb.Append("return mo;");

            sb.Append("})()");

            return sb.ToString();
        }
    }
}
