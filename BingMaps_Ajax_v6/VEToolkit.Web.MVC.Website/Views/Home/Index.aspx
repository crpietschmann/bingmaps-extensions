<%@ Page Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage" %>

<%@ Import Namespace="VEToolkit.Web.MVC" %>

<asp:Content ID="pageHead" ContentPlaceHolderID="PageHead" runat="server">
    <script type="text/javascript" src="http://dev.virtualearth.net/mapcontrol/mapcontrol.ashx?v=6.2"></script>
    <script type="text/javascript" src="/Scripts/jquery-1.3.2.js"></script>
    <style type="text/css">
        .MapWithBorder
        {
            position:relative;
            width: 600px;
            height: 400px;
            border: solid 2px Black;
        }
    </style>
</asp:Content>

<asp:Content ID="indexTitle" ContentPlaceHolderID="TitleContent" runat="server">
    Home Page
</asp:Content>

<asp:Content ID="indexContent" ContentPlaceHolderID="MainContent" runat="server">
    <h2><%= Html.Encode(ViewData["Message"]) %></h2>
    <p>
        <%-- Create a Map and name it's global JavaScript variable "myMap" so it can be referenced from your own JavaScript code --%>
        <%=Ajax.Map("myMap")
            .SetCssClass("MapWithBorder")
            .SetCenter(new Location(44, -78))
            .SetZoom(6)
            .SetMapStyle(MapStyle.Road)
            .SetOnMapLoaded("MapLoaded")%>
            
        <%-- Wire up some of you own Map manipulations to the "myMap" object using JavaScript --%>
        <input type="button" value="Zoom In" onclick="myMap.ZoomIn();" />
        <input type="button" value="Zoom Out" onclick="myMap.ZoomOut();" />
        
        
        <script type="text/javascript">
            function MapLoaded(sender) {
                // "sender" = The Map that was Loaded
                
                //alert("Map Loaded\n\n" + sender);

                // Add a Shape to the Center of the Map now it's finished loading
                var s = new VEShape(VEShapeType.Pushpin, sender.GetCenter());
                s.SetTitle("Center Point");
                s.SetDescription("This was the original center point when the Map loaded.");
                sender.AddShape(s);
            }
        </script>
        
        
        <hr />
        
        <%-- Create a Map with a "random" ID (You can't wire up your own JavaScript to the Map this way) --%>
        <%=Ajax.Map()
            .SetZoom(2)
            .SetMapStyle(VEToolkit.Web.MVC.MapStyle.Hybrid)
            .SetFixed(false)
            .SetMapMode(MapMode.Mode2D)
            .SetShowSwitch(false)
            .SetTileBuffer(3)
            .SetMapOptions(new MapOptions() { LoadBaseTiles = false})
            .SetOnMapLoaded("MapLoaded")%>

    </p>
</asp:Content>
