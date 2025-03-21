Ext.define('module.prod.project.prjtprodplan2.view.PrjtProdPlan2ListerDetail3', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prjtprodplan2-lister-detail3',
	store		: 'module.prod.project.prjtprodplan2.store.PrjtProdPlan2Detail3',
	plugins		: [{ ptype  :'cellediting-directinput', clicksToEdit: 1 } ,{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'->', '-' ,
					{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action, cls: 'button-style' , itemId : 'update'} ,
					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action, cls: 'button-style' , itemId : 'modify'} ,
					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button-style' } , '-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,

			item = {
				itemId : 'sub',
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'prog_stat_dvcd'	, text : Language.get('prog_stat_dvcd'	,'상태')		, width	:60	, xtype : 'lookupcolumn', lookupValue : resource.lookup('prog_stat_dvcd'), align : 'center',hidden:false
					},{ dataIndex: 'invc_date'		, text : Language.get('indn_date'		,'지시일자')	, flex	: 2		, align:'center',hidden:true
					},{ dataIndex: 'invc_date'		, text : Language.get('strt_date'		,'시작일')	, width	: 110	, align : 'center',
					},{ dataIndex: 'work_sttm'		, text : Language.get('strt_time'		,'시작시간')	, width	: 80	, align : 'center',
					},{ dataIndex: 'work_endd_date'	, text : Language.get('endd_date'		,'종료일')	, width	: 110	, align : 'center'
					},{ dataIndex: 'work_edtm'		, text : Language.get('endd_time'		,'종료시간')	, width	: 80	, align : 'center'
//					},{ dataIndex: 'ivst_pcnt'	, text : Language.get('ivst_pcnt'	,'투입인원')	, width :  80 , xtype : 'numericcolumn'
//					},{ dataIndex: 'mold_name'		, text : Language.get('acpt_case_name'	,'금형명')	, width : 300		, minWidth:200
					},{ dataIndex: 'work_cont'		, text : Language.get('work_cont'		,'품명')	, width : 150		, minWidth:200
					},{ dataIndex: 'user_name'		, text : Language.get('wker'			,'작업자')	, width	: 100
					}
				]
			}
		;
		return item;
	}
});