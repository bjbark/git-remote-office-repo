<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<html>
<head>
    <meta charset="UTF-8">
	<meta http-equiv="Expires" content="-1">
	<meta http-equiv="Pragma" content="no-cache">
	<meta http-equiv="Cache-Control" content="no-cache">
	<meta http-equiv="X-UA-Compatible" content="IE=Edge">
	<title>WIS MES System</title>
	<script>
		_access = {
		};
		<c:forEach var="argument" items="${param}">
			_access.<c:out value='${argument.key}' /> = "<e:out value='${argument.value}' />";
      	</c:forEach>
	</script>
	<script type="text/javascript" src="loader.js"></script>

svn
<form >
</form>
<script type="text/javascript">
	/* function checkMobileDevice() {
		var mobileKeyWords = new Array('Android', 'iPhone', 'iPod', 'BlackBerry', 'Windows CE', 'SAMSUNG', 'LG', 'MOT', 'SonyEricsson','Redmi');
		for (var info in mobileKeyWords) {
			if (navigator.userAgent.match(mobileKeyWords[info]) != null) {
				return true;

			}
		}
		return false;
	}
	if(checkMobileDevice()){
			var form = document.createElement('form');
			var objs;
			objs = document.createElement('input');
			objs.setAttribute('type', 'hidden');
			objs.setAttribute('name', 'param');
			objs.setAttribute('value', "{'mobile':'login'}");
			form.appendChild(objs);
			form.setAttribute('method', 'post');
			form.setAttribute('action', _global.api_http+"/mobile/login.do");
			document.body.appendChild(form);
			form.submit();
	} */
	/* if (location.protocol === 'http:') {
		  location.href = 'https://' + location.host;
		  // location.href = 'https' + location.href.substring(4); // query 유지
	} */
</script>
</head>
<body>
</body>
</html>