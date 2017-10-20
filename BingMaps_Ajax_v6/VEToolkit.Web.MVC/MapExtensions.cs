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
using System.Web.Mvc;

namespace VEToolkit.Web.MVC
{
    public static class MapExtensions
    {
        /// <summary>
        /// Creates a new instance of the VEToolkit.Web.MVC.Map class.
        /// </summary>
        /// <param name="helper"></param>
        /// <returns></returns>
        public static Map Map(this AjaxHelper helper)
        {
            //return new Map(helper.ViewContext);
            return new Map();
        }

        /// <summary>
        /// Creates a new instance of the VEToolkit.Web.MVC.Map class.
        /// </summary>
        /// <param name="helper"></param>
        /// <param name="mapID"></param>
        /// <returns></returns>
        public static Map Map(this AjaxHelper helper, string mapID)
        {
            return new Map() { MapID = mapID };
        }
    }
}
