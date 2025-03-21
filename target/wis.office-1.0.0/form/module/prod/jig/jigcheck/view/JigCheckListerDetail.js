Ext.define('module.prod.jig.jigcheck.view.JigCheckListerDetail', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-jigcheck-lister-detail',
	store		: 'module.prod.jig.jigcheck.store.JigCheckDetail',
	plugins       : [{ ptype  :'cellediting-directinput', clicksToEdit: 1 } ,{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
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
					{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action, cls: 'button-style' } ,
					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action, cls: 'button-style' } ,
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
					{	dataIndex: 'line_seqn'		, text : Language.get('line_seqn'		,'순번')		, width : 50 , align : 'center'
					},{ dataIndex: 'chek_date'		, text : Language.get('chek_date'		,'점검일자')	, width : 120, align : 'center'
					},{ dataIndex: 'chek_name'		, text : Language.get('chek_name'		,'점검명')		, flex  : 1  , minWidth : 220
					},{ dataIndex: 'chek_resn'		, text : Language.get('chek_resn'		,'점검사유')	, flex  : 1  , minWidth : 220
					},{ dataIndex: 'chek_date'		, text : Language.get('chek_date'		,'차기점검일자')	, width : 120, align : 'center'
					},{ dataIndex: 'chek_dvcd'		, text : Language.get('chek_dvcd'		,'점검구분')	, width : 70 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('chek_dvcd'), align : 'center'
					},{ dataIndex: 'repa_date'		, text : Language.get('repa_date'		,'수리일자')	, width : 120, align : 'center'
					},{ dataIndex: 'repa_entr_name'	, text : Language.get('repa_entr_name'	,'수리업체명')	, flex  : 1  , minWidth : 240
					},{ dataIndex: 'repa_sbsc_name'	, text : Language.get('repa_sbsc_name'	,'수리항목명')	, width : 100
					},{ dataIndex: 'repa_resn_dvcd'	, text : Language.get('repa_resn_dvcd'	,'수리구분')	, width : 70 , hidden: true
					},{ dataIndex: 'repa_need_time'	, text : Language.get('repa_need_time'	,'소요시간(분)'), width : 85 , align : 'right'
					},{ dataIndex: 'need_amnt'		, text : Language.get('need_amnt'		,'소요금액')	, width : 70 , align : 'right', xtype: 'numericcolumn' ,  format:  '#,###,###'
					},{ dataIndex: 'trtm_dvcd'		, text : Language.get('trtm_dvcd'		,'조치')		, width : 80 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('chek_dvcd'), align : 'center',hidden : true
					},{ dataIndex: 'dmge_regn'		, text : Language.get('dmge_regn'		,'고장부위')	, width : 120
					},{ dataIndex: 'repa_cont'		, text : Language.get('repa_cont'		,'수리내용')	, width : 240

					}
				]
			}
		;
		return item;
	}
});