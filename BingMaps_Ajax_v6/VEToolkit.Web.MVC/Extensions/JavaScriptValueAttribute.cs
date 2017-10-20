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
    public class JavaScriptValueAttribute : Attribute
    {
        public JavaScriptValueAttribute(string javascriptValue)
        {
            this.JavaScriptValue = javascriptValue;
        }

        public string JavaScriptValue { get; set; }
    }
}
