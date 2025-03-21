<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%!
	String nullToStr(String s1, String s2) {
		return ((s1 == null)?s2:s1);
	}
%>
<%
	String jrf = nullToStr(request.getParameter("jrf"), "ubi_sample.jrf");
	String arg = nullToStr(request.getParameter("arg"), "user#홍길동#");
	String resId = nullToStr(request.getParameter("resId"), "N1000WINFO");
	String tray = request.getParameter("tray");
%>

<!DOCTYPE html PUBLIC '-//W3C//DTD HTML 4.01 Transitional//EN' 'http://www.w3.org/TR/html4/loose.dtd'>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>UbiReport4 HTMLViewer</title>
<!--[if IE]><script src='./js/ubiexcanvas.js'></script><![endif]-->
<script src='/resource/js/ubi/js/ubihtml.js'></script>
<script src='/resource/js/ubi/js/msg.js'></script>
<script src='/resource/js/ubi/js/ubinonax.js'></script>
<script language='javascript'>
<!--
/*-----------------------------------------------------------------------------------
htmlViewer.setUserSaveList('Image,Pdf,Docx,Xls,Pptx,Hml,Cell');
htmlViewer.setUserPrintList('Ubi,Html,Pdf');
htmlViewer.setVisibleToolbar('INFO', false);
htmlViewer.HmlExtension='hwp';
htmlViewer.printHTML();		// HTML PrintSet
htmlViewer.printPDF();		// PDF PrintSet
htmlViewer.export('PDF');	// PDF/EXCEL/EXCEL_NO/HWP/PPTX/HML/DOCX/CELL/IMAGE
htmlViewer.print();		// Direct Print(WS VIEWER)
htmlViewer.printSet();		// PrintSet(WS VIEWER)
//htmlViewer.events.printEnd = UbiPrintEnd;
//htmlViewer.events.exportEnd = UbiExportEnd;
-----------------------------------------------------------------------------------*/
	/* URL 정보 */
	var app = '';
	var appUrl = self.location.protocol + '//' + self.location.host + (app==''?'':('/' + app));

	/* Viewer Object */
	var htmlViewer = null;

	/* Viewer Param */
	var pKey = '<%= session.getId() %>';
	var pServerUrl = appUrl + '/UbiServer';
	var pResUrl = appUrl + '/resource/js/ubi/js';
	var pDivId = 'UbiHTMLViewer';
	var pScale = 'WholePage';	//WholePage/PageWidth/60~300

	/* Modify for your environment */
	var pJrf = '${jrf}';
	var pArg = '${arg}';
	var pResId = '${resId}';
	var tray = '${tray}';

	console.log("jrf : "+pJrf);
	console.log("arg : "+pArg);
	/* Report Preview */
	function UbiLoadReport() {

		UbiResize();
		htmlViewer = new UbiViewer( {

			key : pKey,
			ubiserverurl : pServerUrl,
			resource : pResUrl,
			resid : pResId,
			divid : pDivId,
			scale : pScale,
			jrffile : pJrf,
			useplugin : true,
			arg : pArg

		});
		/* Export 프린터 트레이 설정 */
		//htmlViewer.setPluginVariable("PrintName","HPFF92CA (HP OfficeJet Pro 8710)"); // 프린터 설정
		htmlViewer.setPluginVariable("PrintName","SINDOH D410 Series PCL"); // 프린터 설정
		//htmlViewer.setPluginVariable("printerTrayName","용지함 1");    // 용지함 설정
		htmlViewer.setPluginVariable("printerTrayName",'트레이 3');    // 용지함 설정
		//htmlViewer.setPluginVariable("printerTrayName",'트레이 3');
		htmlViewer.showReport(UbiPreviewEnd);
	}

	/* Preview Callback */
	function UbiPreviewEnd() { //미리보기 완료시점
		htmlViewer.setPrintMenu('UBI'); //기본 인쇄 타입 설정
		//htmlViewer.setPluginVariable("printerTrayName",'트레이 2');    // 용지함 설정
	//	htmlViewer.setPluginVariable("printerTrayName",'트레이 3');
//	    htmlViewer.print(); //미리보기 없이 자동 print

	}


	/* Print Callback */
	function UbiPrintEnd(flag) {
	}

	/* Export Callback */
	function UbiExportEnd(flag, msg) {
	}




	/* Viewer Object Resize */
	function UbiResize() {

		/* Size Gap */
		var gap = 6;
		var w = ((self.innerWidth || (document.documentElement && document.documentElement.clientWidth) || document.body.clientWidth)) - gap;
		var h = ((self.innerHeight || (document.documentElement && document.documentElement.clientHeight) || document.body.clientHeight)) - gap;
		document.getElementById(pDivId).style.width = w + 'px';
		document.getElementById(pDivId).style.height = h + 'px';
	}

//-->
</script>
</head>
<body style='margin:1px' onload='UbiLoadReport()' onresize='UbiResize()'>
	<div id='UbiHTMLViewer' style='border:1px solid #767676; border-bottom-width:2px;'></div>
</body>
</html>