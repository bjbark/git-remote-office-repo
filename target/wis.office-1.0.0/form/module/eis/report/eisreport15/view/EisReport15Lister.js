Ext.define('module.eis.report.eisreport15.view.EisReport15Lister', { extend: 'Axt.form.Panel',
	alias		: 'widget.module-eisreport15-lister'			,
	initComponent: function () {
		var me = this;
		me.items = me.columnItem();
		me.callParent();
	},
	columnItem : function () {
		var me = this,
			chk = Ext.dom.Query.select('.x-css-shadow'),
			hq_id = _global.hq_id.toUpperCase(),
			api_host = _global.api_host_info,
			url='/system/eis/report/eisreport15/get/calendar.do?param={"hq_id":"'+hq_id+'","api_host":"'+api_host+'"}'
		;
			item = {
				xtype:'component',
				autoEl:{
					tag:'iframe',
					style : 'height:100%;width:100%;border:none',
					src:_global.api_host_info+encodeURI(url)
//					src:src="https://app.powerbi.com/view?r=eyJrIjoiODZlNmJiMTgtM2U0NC00NzhjLWI4OGUtNmY0NWRjMjNjZDFmIiwidCI6IjUyNmU1Mjk5LTk3YTYtNDE0Yi1iYmM3LWFmMzAxNzUzNWZhMyJ9&pageName=ReportSection"
				},
				width : '704',
				height : '630',
				id : 'iframe'
			}
		;
		return item;
	}
});
