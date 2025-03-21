<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Java Environment 확인</title>
<style>
body {
	font-size:10pt;
	font-family: Arial;
	color: #000000;
	line-height:18px;
}
</style>
<body>
<%
	java.util.Enumeration e = System.getProperties().propertyNames(); 
	while(e.hasMoreElements()) {
	
		String key = (String)e.nextElement();
		if( key.indexOf("class.path") != -1 || key.indexOf("loader") != -1 ) out.print("<li><font color='red'>" + key + " : " + System.getProperty(key) + "</font></li>");
		else out.print("<li>" + key + " : " + System.getProperty(key) + "<br>");
	}
%>
</body>
</html>