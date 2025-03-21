<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ page import="java.awt.*" %>

<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Font 정보</title>
<style>
	body  { font-family:sans-serif, arial; font-size:9pt; }
	table { font-family:sans-serif, arial; font-size:9pt; }
</style>
<body>
<%    
	//System.setProperty("sun.java2d.fontpath", "font_location_path");		
	//System.setProperty("java.awt.headless", "true");
	String[] fontNames = GraphicsEnvironment.getLocalGraphicsEnvironment().getAvailableFontFamilyNames(); 
	for (int i=0; i<fontNames.length; i++) 
	{ 
		out.println(fontNames[i]+"<br>"); 
	}
%>
</body>
</html>
