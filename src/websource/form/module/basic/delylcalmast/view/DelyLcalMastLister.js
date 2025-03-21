Ext.define('module.basic.delylcalmast.view.DelyLcalMastLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-delylcalmast-lister',
	store		: 'module.basic.delylcalmast.store.DelyLcalMast',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
	features	: [ { ftype : 'grid-summary' , remote : true } ],
	plugins		: [ { ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'} ],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },
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
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } ,
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults	: {style: 'text-align: center'},
				items		: [
					{	dataIndex:	'line_stat'			, width:  50, text: Language.get( 'line_stat'		, '사용'		), xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat'), align : 'center', hidden : true
					},{	dataIndex:	'lcal_code'			, width: 150, text: Language.get( 'lcal_code'		, '지역코드'	), align : 'center'
					},{	dataIndex:	'lcal_name'			, width: 250, text: Language.get( 'lcal_name'		, '지역명'		), align : 'left'
					},{	dataIndex:	'trnt_cost_1fst'	, width: 100, text: Language.get( 'trnt_cost_1fst'	, '운송비#1'	), align : 'right' , xtype: 'numericcolumn', format: '#,##0'
					},{	dataIndex:	'trnt_cost_2snd'	, width: 100, text: Language.get( 'trnt_cost_2snd'	, '운송비#2'	), align : 'right' , xtype: 'numericcolumn', format: '#,##0', hidden : true
					},{	dataIndex:	'trnt_cost_3trd'	, width: 100, text: Language.get( 'trnt_cost_3trd'	, '운송비#3'	), align : 'right' , xtype: 'numericcolumn', format: '#,##0', hidden : true
					}
				]
			}
		;
		return item;
	}
});