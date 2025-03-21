Ext.define('module.custom.iypkg.prod.worklist3.view.WorkList3Lister2', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-worklist3-lister2',
//	store		: 'module.custom.iypkg.prod.worklist3.store.WorkList3',

	selModel: {selType: 'checkboxmodel', mode : 'SINGLE'},
//	features: [{ftype :'grid-summary'}],''

	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem() ;
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'lister' , cls: 'button-style'}
				]
			}
		;
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex:	''		, width: 100, align : 'center'	, text: Language.get(''	, '매입처코드'	)
					},{	dataIndex:	''		, width: 180, align : 'left'	, text: Language.get(''	, '매입처명'		)
					},{	dataIndex:	''		, width: 100, align : 'left'	, text: Language.get(''	, '입고량'		), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0'
					},{	dataIndex:	''		, width:  80, align : 'center'	, text: Language.get(''	, '단가'			), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0'
					},{	dataIndex:	''		, width: 100, align : 'right'	, text: Language.get(''	, '공급가액'		), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0'
					},{	dataIndex:	''		, width: 100, align : 'right'	, text: Language.get(''	, '부가세'		), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0'
					},{	dataIndex:	''		, width: 100, align : 'right'	, text: Language.get(''	, '합계금액'		), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0'
					},{	dataIndex:	''		, width: 100, align : 'right'	, text: Language.get(''	, '부가율'		), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0'
					}
				]
			}
		;
		return item;
	}

 });