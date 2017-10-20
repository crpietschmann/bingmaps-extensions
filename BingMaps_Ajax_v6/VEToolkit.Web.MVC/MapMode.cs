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
    /// An enumeration of map modes.
    /// </summary>
    public enum MapMode : int
    {
        /// <summary>
        /// Displays the map in the traditional two dimensions
        /// </summary>
        [JavaScriptValue("VEMapMode.Mode2D")]
        Mode2D = 0,
        /// <summary>
        /// Loads the Virtual Earth 3D control, displays the map in three dimensions, and displays the 3D navigation control
        /// </summary>
        [JavaScriptValue("VEMapMode.Mode3D")]
        Mode3D = 1
    }
}
