<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ page import="java.net.*, java.io.*" %>

<%
	String NL = System.getProperty("line.separator");

	String sReqType = request.getParameter("req_type");
	String sUrl = request.getParameter("url");

	if( sReqType == null || sReqType.equalsIgnoreCase("null") ) {

		sReqType = "GET";
	}
	if( sUrl == null || sUrl.equalsIgnoreCase("null") ) {

		sUrl = "";
	}
	
	StringBuffer contents = new StringBuffer();
	
	if( !sUrl.equals("") ) {

		try {
			
			URL url = new URL(sUrl);
			contents.append(">> URL(" + sUrl + ") Connecting...").append(NL);
			HttpURLConnection uc = (HttpURLConnection)url.openConnection();

			uc.setDoOutput(true);
			uc.setDoInput(true);
			uc.setUseCaches(false);
			uc.setRequestMethod(sReqType);

			StringBuffer sb = new StringBuffer();

			InputStream is = uc.getInputStream();
			contents.append(">> Reading Contents...").append(NL);
			
			BufferedReader in = new BufferedReader(new InputStreamReader(is));

			int buffSize = 1024 * 8;
			char[] buff;
			int insize = 0;
			while ((insize = in.read(buff = new char[buffSize], 0, buffSize)) != -1) {
				
				sb.append((new String(buff, 0, insize)));
			}
			String receivestr = sb.toString().trim();
			
			contents.append(">> Contents").append(NL);
			contents.append("------------------------------------------").append(NL);
			contents.append(sb.toString().trim()).append(NL);
			contents.append("------------------------------------------").append(NL);
			contents.append(">> End").append(NL);
		}
		catch(FileNotFoundException fnfe){
			
			contents.append(">> FileNotFoundException").append(NL);
			contents.append("------------------------------------------").append(NL);
			contents.append(fnfe.getMessage()).append(NL);
			contents.append("------------------------------------------").append(NL);
			contents.append(">> End").append(NL);
			fnfe.printStackTrace();
		}		
		catch(Exception e){
			
			contents.append(">> Exception").append(NL);
			contents.append("------------------------------------------").append(NL);
			contents.append(e.getMessage()).append(NL);
			contents.append("------------------------------------------").append(NL);
			contents.append(">> End").append(NL);
			e.printStackTrace();
		}		
	}
		
%>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>URL 확인</title>
<style>
	body  { font-family:sans-serif, arial; font-size:9pt; }
	table { font-family:sans-serif, arial; font-size:9pt; }
</style>
<script language="JavaScript">
<!--
	function checkURL() {

		if(document.urlcheck.url.value == "") {

			alert("Please Input URL(ex : http://localhost:8080/UbiData)");
			document.urlcheck.url.focus();
			return false;
		}
		else document.urlcheck.submit();
	}
	
//-->
</script>
</head>
<body style="margin:10">
	<h2>Check URL<h2>
	<form name='urlcheck' method='post' action='./urlcheck.jsp'>
		<table width="585" border="1" cellspacing="0" cellpadding="0" bordercolor="#808080" bordercolorlight="#C0C0C0" bordercolordark="#F6F6F6">
			<tr height="20">
				<td align="center" bgcolor="#C0C0C0" width="100" style='padding:3px'>REQ TYPE</td>
				<td align="left" style='padding:3px; padding-left:6px;'' >
					<select name="req_type">
						<option value="GET" <%= sReqType.equals("GET")?"selected":"" %>>GET</option>
						<option value="POST" <%= sReqType.equals("POST")?"selected":"" %>>POST</option>
					</select>
				</td>
			</tr>
			<tr height="20">
				<td align="center" bgcolor="#C0C0C0" width="100" style='padding:3px'>URL</td>
				<td align="center" style='padding:3px'>
					<input type="text" name="url" size="70" value="<%= sUrl %>">
				</td>
			</tr>
		</table>
		<table width="585" border="0" cellspacing="0" cellpadding="0" bordercolor="#808080" bordercolorlight="#C0C0C0" bordercolordark="#F6F6F6">
			<tr height="30">
				<td align="center">
					<input type="button" value="URL CHECK" onclick="checkURL()">
				</td>
			</tr>
		</table>
	</form>
	
	Result<br>
	<textarea name="sql" rows="20" cols="84"><%= contents.toString() %></textarea>
</body>
</html>