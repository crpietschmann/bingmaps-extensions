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

namespace VEToolkit.Web.MVC
{
    /// <summary>
    /// Contains the Latitude and Longitude of a single point on the globe
    /// </summary>
    public class Location
    {
        /// <summary>
        /// Creates a new instance of the Location class.
        /// </summary>
        public Location() { }

        /// <summary>
        /// Creates a new instance of the Location class.
        /// </summary>
        /// <param name="lat">The Latitude of the Location.</param>
        /// <param name="lng">The Longitude of the Location.</param>
        public Location(double lat, double lng)
        {
            this.Latitude = lat;
            this.Longitude = lng;
        }

        public double Latitude { get; set; }
        public double Longitude { get; set; }

        public override string ToString()
        {
            return this.Latitude.ToString() + ", " + this.Longitude.ToString();
        }
    }
}
