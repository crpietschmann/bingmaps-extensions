using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace VEToolkit.Web.MVC.Website.Controllers
{
    [HandleError]
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewData["Message"] = "Welcome to VEToolkit.Web.MVC!";

            return View();
        }

        public ActionResult About()
        {
            return View();
        }
    }
}
