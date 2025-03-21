Ext.define('module.stock.lot.lotchange.view.LotChangeListerDetail', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-lotchange-lister-detail',
	store		: 'module.stock.lot.lotchange.store.LotChangeDetail',
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
					'-', '->', '-',
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
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'invc_date'		, text : Language.get(''	,'수불일자'	)	, width :  90, align : 'center'
					},{ dataIndex: 'line_seqn'		, text : Language.get(''	,'순번'	)	, width :  60, hidden : true
					},{ dataIndex: 'isos_dvcd'		, text : Language.get(''	,'수불구분'	)	, width :  60, xtype : 'lookupcolumn', lookupValue : resource.lookup('isos_dvcd'),  align : 'center'
					},{ dataIndex: 'full_invc_numb'	, text : Language.get(''	,'수불근거'	)	, width : 200, align : 'left'
					},{ dataIndex: 'qntt'			, text : Language.get(''	,'수량'	)	, width : 100, align : 'right', xtype: 'numericcolumn' , summaryType: 'sum' , format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0':'#,##0.##9',
					},{ dataIndex: 'user_memo'		, text : Language.get(''	,'비고'	)	, width : 170, align : 'left'	, flex  : 100, hidden : true
					}
				]
			}
		;
		return item;
	}
});