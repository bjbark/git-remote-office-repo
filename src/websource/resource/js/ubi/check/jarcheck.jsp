<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ page import="java.util.jar.*, java.io.File" %>
<%

	String appPath = "";
	try { appPath = request.getRealPath("/"); } catch(Exception e) {}
	if( appPath == null || appPath.equals("") )
		try { appPath = this.getClass().getResource("/").getPath(); } catch(Exception e) {}

	boolean checkFlag = false;
	String jar = request.getParameter("jar");
	String version = "";

	if( jar == null || jar.equalsIgnoreCase("null") || jar.equals("") ) {

		checkFlag = false;
		jar = appPath + "WEB-INF" + File.separator + "lib" + File.separator + "UbiServer.jar";
	}
	else {

		try {
			
			JarFile fJar = new JarFile(jar);
			Manifest manifest = fJar.getManifest();
			Attributes attrs = manifest.getMainAttributes();
			version = attrs.getValue("version");
		}
		catch(Exception e) {
			
			version = e.getMessage();
		}
		finally {
			checkFlag = true;
		}
	}


%>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Jar 버전 확인</title>
<style>
	body  { font-family:sans-serif, arial; font-size:9pt; }
	table { font-family:sans-serif, arial; font-size:9pt; }
</style>
<script language="JavaScript">
<!--
	function checkVersion() {

		if(document.jarcheck.jar.value == "") {

			alert("Please Input URL(ex : /webapp/myapp/WEB-INF/lib/UbiServer.jar)");
			document.jarcheck.jar.focus();
			return false;
		}
		else document.jarcheck.submit();
	}
	
//-->
</script>
</head>
<body style="margin:10">

	<h2>Jar Version Check</h2>
	<form name='jarcheck' method='post' action='./jarcheck.jsp'>
		<table width="585" border="1" cellspacing="0" cellpadding="0" bordercolor="#808080" bordercolorlight="#C0C0C0" bordercolordark="#F6F6F6">
			<tr height="30">
				<td align="center" bgcolor="#C0C0C0" width="120px" style='padding:3px'>App Home</td>
				<td align="left" style='padding:3px'><%= appPath %></td>
			</tr>
			<tr height="30">
				<td align="center" bgcolor="#C0C0C0" width="120px" style='padding:3px'>Jar File</td>
				<td align="left" style='padding:3px'>
					<input type="text" name="jar" size="55" value="<%= jar %>">
				</td>
			</tr>
<%
	if( checkFlag ) {
%>
			<tr height="30">
				<td align="center" style='padding:3px' colspan='2'><%= version %></td>
			</tr>
<%
	}
%>
		</table>

		<table width="585" border="0" cellspacing="0" cellpadding="0" bordercolor="#808080" bordercolorlight="#C0C0C0" bordercolordark="#F6F6F6">
			<tr height="30">
				<td align="center">
					<input type="button" value="Version CHECK" onclick="checkVersion()">
				</td>
			</tr>
		</table>
	</form>
</body>
</html>
