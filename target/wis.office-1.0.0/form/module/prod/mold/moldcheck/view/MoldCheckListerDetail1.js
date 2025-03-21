Ext.define('module.prod.mold.moldcheck.view.MoldCheckListerDetail1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-moldcheck-lister-detail1',
	store		: 'module.prod.mold.moldcheck.store.MoldCheckDetail1',
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
					{	dataIndex: 'line_seqn'		, text : Language.get('line_seqn'		,'순번')			, width : 50  , align : 'center'
					},{ dataIndex: 'repa_date'		, text : Language.get('repa_date'		,'일자')			, width : 120 , align : 'center'
					},{ dataIndex: 'repa_entr_name'	, text : Language.get('repa_entr_name'	,'수리업체명')		, flex  :   1 , minWidth : 240
					},{ dataIndex: 'repa_need_time'	, text : Language.get('repa_need_time'	,'소요시간(분)')	, width : 120 , align : 'right'
					},{ dataIndex: 'need_amnt'		, text : Language.get('need_amnt'		,'수리금액')		, width : 160 , xtype: 'numericcolumn' ,  format:  '#,###,###'
					},{ dataIndex: 'repa_resn'		, text : Language.get('repa_resn'		,'수리사유')		, width : 240
					},{ dataIndex: 'repa_cont'		, text : Language.get('repa_cont'		,'수리내용')		, width : 240 ,
					},{ dataIndex: 'totl_shot'		, text : Language.get('totl_shot'		,'누계shot')		, width : 100 , align : 'right', xtype: 'numericcolumn' ,  format:  '#,###,###'
					},{ dataIndex: 'updt_expc_shot'	, text : Language.get('updt_expc_shot'	,'수정예상shot')	, width : 120 , xtype: 'numericcolumn' ,  format:  '#,###,###'
					},{ dataIndex: 'updt_expc_date'	, text : Language.get('updt_expc_date'	,'수정예정일')		, width : 120 , align : 'center'
					}
				]
			}
		;
		return item;
	}
});