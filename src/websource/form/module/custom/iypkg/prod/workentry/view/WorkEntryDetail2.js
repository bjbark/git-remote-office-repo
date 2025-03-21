Ext.define('module.custom.iypkg.prod.workentry.view.WorkEntryDetail2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-workentry-detail2',
	store		: 'module.custom.iypkg.prod.workentry.store.WorkEntryDetail2',
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],
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
				items : [
						'->', '-',
						{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'lister' , cls: 'button-style'}
					]
			}
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'dvcd'		, text : Language.get(''	,'구분'	) , width :  50 , align : 'center'
					},{ dataIndex: 'fabc_name'	, text : Language.get(''	,'원단명') , width : 170 , align : 'left'
					},{ dataIndex: 'ppln_dvcd'	, text : Language.get(''	,'골'	) , width :  80 , align : 'center', xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_dvcd'),
					},{ dataIndex: 'item_ttln'	, text : Language.get(''	,'장'	) , width :  80 , align : 'right', xtype : 'numericcolumn' , format: '#,##0'
					},{ dataIndex: 'item_ttwd'	, text : Language.get(''	,'폭'	) , width :  80 , align : 'right', xtype : 'numericcolumn' , format: '#,##0'
					},{ dataIndex: 'item_widh'	, text : Language.get(''	,'발주폭') , width :  80 , align : 'right', xtype : 'numericcolumn' , format: '#,##0'
					},{ dataIndex: 'item_fxqt'	, text : Language.get(''	,'절수'	) , width :  80 , align : 'center'
					},{ dataIndex: 'fdat_spec'	, text : Language.get(''	,'재단규격'	) , width : 120 , align : 'right'
					},{ dataIndex: 'need_qntt'	, text : Language.get(''	,'수량'	) , width :  80 , align : 'right', xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{ dataIndex: 'cstm_name'	, text : Language.get(''	,'매입처명'	) , width : 170 , align : 'left'
					},{ dataIndex: 'invc_date'	, text : Language.get(''	,'일자'	) , width :  80 , align : 'center'
					},{ dataIndex: 'user_memo'	, text : Language.get(''	,'비고'	) , flex  :   1 , align : 'left'
					}
				]
			}
		;
		return item;
	}
});