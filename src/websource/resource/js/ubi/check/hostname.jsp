<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ page import="java.net.*" %>

<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Hostname 확인</title>
<style>
	body  { font-family:sans-serif, arial; font-size:9pt; }
</style>
</head>
<body style="margin:10">
	<h2>Hostname Check</h2>

	Hostname : [<%= InetAddress.getLocalHost().getHostName() %>]<br>
	AppPath  : [<%= getServletContext().getRealPath("/") %>]
</body>
</html>
