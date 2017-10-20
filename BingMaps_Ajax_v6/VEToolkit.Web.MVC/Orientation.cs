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
    /// An enumeration of available directional views for a bird's eye image.
    /// </summary>
    public enum Orientation : int
    {
        /// <summary>
        /// The image was taken looking toward the north.
        /// </summary>
        [JavaScriptValue("VEOrientation.North")]
        North = 0,

        /// <summary>
        /// The image was taken looking toward the south.
        /// </summary>
        [JavaScriptValue("VEOrientation.South")]
        South = 1,

        /// <summary>
        /// The image was taken looking toward the east.
        /// </summary>
        [JavaScriptValue("VEOrientation.East")]
        East = 2,

        /// <summary>
        /// The image was taken looking toward the west.
        /// </summary>
        [JavaScriptValue("VEOrientation.West")]
        West = 3
    }
}
