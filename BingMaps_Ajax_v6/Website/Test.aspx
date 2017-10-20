<%@ Page Language="C#" %>
<!-- This is a test page for testing the Visual Studio 2008 SP1 JavaScript Intellisense -->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<script runat="server">
</script>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <asp:ScriptManager runat="server" ID="sm1">
            <Scripts>
                <asp:ScriptReference Path="~/scripts/VEToolkit.Core.js" />
                <asp:ScriptReference Path="~/scripts/VEToolkit.ContextMenuExtender.js" />
                <asp:ScriptReference Path="~/scripts/VEToolkit.DragShapeExtender.js" />
                <asp:ScriptReference Path="~/scripts/VEToolkit.MiniMapExtender.js" />
                <asp:ScriptReference Path="~/scripts/VEToolkit.ShapeListControl.js" />
            </Scripts>
        </asp:ScriptManager>
    
        <script type="text/javascript">
        </script>
    
    </div>
    </form>
</body>
</html>
