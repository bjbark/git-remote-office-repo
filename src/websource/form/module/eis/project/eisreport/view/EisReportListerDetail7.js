Ext.define('module.eis.project.eisreport.view.EisReportListerDetail7', { extend: 'Axt.form.Panel',
	alias		: 'widget.module-eisreport-lister-detail7',
	border		: 0,
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true,
		getRowClass:function(){
			return _global.options.work_book_tema+"cell";
		}
	},
	initComponent: function () {
		var me = this;
		me.items = me.columnItem();
		me.callParent();
	},
	columnItem : function () {
		var me = this,
			chk = Ext.dom.Query.select('.x-css-shadow'),
			hide = '1',
			api_host = _global.api_host_info,
			hq_id = _global.hq_id.toUpperCase(),
			token = _global.token_id,
			work_ordr_dvcd = '1100',
	//		ordr_degr = b.data.ordr_degr,
			search_url	= '/system/eis/project/eisreport/get/detail7.do',
	//		search_url	= '/system/eis/project/eisreport/get/getTest.do',
			url='/system/mobile/get/SeriesGantt.do?param={api_host:\''+api_host+'\',search_url:\''+search_url+'\',token:\''+token+'\',hq_id:\''+hq_id+'\',hide:\''+hide+'\',work_ordr_dvcd:\''+work_ordr_dvcd+'\'}'
	;


			item = {
				xtype:'component',
				autoEl:{
					tag:'iframe',
					style : 'height:100%;width:100%;border:none',
					src:_global.api_host_info+encodeURI(url)
				},
				width : '704',
				height : '630',
				id : 'iframe2'
			}
		;
		return item;
	}
});
