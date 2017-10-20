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

namespace VEToolkit.Web.MVC.Extensions
{
    public static class EnumExtensions
    {
        public static string ToJavaScriptValue(this Enum val)
        {
            JavaScriptValueAttribute[] attributes =
                (JavaScriptValueAttribute[])val.GetType().GetField(val.ToString()).GetCustomAttributes(typeof(JavaScriptValueAttribute), false);
            return attributes.Length > 0 ? attributes[0].JavaScriptValue : string.Empty;
        }
    }
}
