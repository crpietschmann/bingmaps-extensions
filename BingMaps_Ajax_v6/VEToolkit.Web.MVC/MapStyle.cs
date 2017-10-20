/* ************************************************************************************ */
/* VEToolkit.Web.MVC - http://vetoolkit.codeplex.com                                    */
/* Copyright (C) 2009 Chris Pietschmann (http://pietschsoft.com). All Rights Reserved.  */
/* This project is licensed under the Microsoft Public License (Ms-PL)                  */
/* This license can be found here: http://vetoolkit.codeplex.com/license                */
/* ************************************************************************************ */

using VEToolkit.Web.MVC.Extensions;

namespace VEToolkit.Web.MVC
{
    /// <summary>
    /// An enumeration of map styles
    /// </summary>
    public enum MapStyle : int
    {
        /// <summary>
        /// The road map style
        /// </summary>
        [JavaScriptValue("VEMapStyle.Road")]
        Road = 0,
        /// <summary>
        /// The shaded map style, which is a road map with shaded contours
        /// </summary>
        [JavaScriptValue("VEMapStyle.Shaded")]
        Shaded = 1,
        /// <summary>
        /// The aerial map style
        /// </summary>
        [JavaScriptValue("VEMapStyle.Aerial")]
        Aerial = 2,
        /// <summary>
        /// The hybrid map style, which is an aerial map with a label overlay
        /// </summary>
        [JavaScriptValue("VEMapStyle.Hybrid")]
        Hybrid = 3,
        /// <summary>
        /// The bird's eye (oblique) imagery map style
        /// </summary>
        [JavaScriptValue("VEMapStyle.Birdseye")]
        Birdseye = 4,
        /// <summary>
        /// The bird's eye hybrid map style, which is a bird's eye map with a label overlay
        /// </summary>
        [JavaScriptValue("VEMapStyle.BirdseyeHybrid")]
        BirdseyeHybrid = 5
    }
}
