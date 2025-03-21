Ext.define('module.custom.iypkg.mtrl.purc.purccstmlist1.view.PurcCstmList1Lister3', { extend: 'Axt.grid.Panel',
	alias	: 'widget.module-purccstmlist1-lister3',
	store	: 'module.custom.iypkg.mtrl.purc.purccstmlist1.store.PurcCstmList1Lister3',

	region : 'center',
	border : 0,
	columnLines: true,
	selModel: {selType: 'checkboxmodel', mode : 'MULTI'},
	features: [{ftype :'grid-summary'}],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem() ;
		me.columns = me.columnItem();
		me.callParent();
	},

	viewConfig: {
		getRowClass : function ( record , index ) {
			if(record.get('invc_date') == '합계' || record.get('cstm_name') == '월계'){
				return 'text-warn';
			}else if(record.get('cstm_name') == '일계'){
				return 'text-blue';
			}else if(record.get('rnum') == '2'){
				return 'text-green';
			}
		}
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
					{	dataIndex:	''		, width: 120, align : 'center'	, text: Language.get(''	, '입고일자'	)
					},{	dataIndex:	''		, width: 170, align : 'left'	, text: Language.get(''	, '거래처명'	)
					},{	dataIndex:	''		, width: 230, align : 'left'	, text: Language.get(''	, '제품명'		)
					},{	dataIndex:	''		, width: 100, align : 'left'	, text: Language.get(''	, '규격'		)
					},{	dataIndex:	''		, width:  80, align : 'right'	, text: Language.get(''	, '입고량'		), xtype: 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	''		, width:  80, align : 'right'	, text: Language.get(''	, '단가'		), xtype: 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	''		, width: 100, align : 'right'	, text: Language.get(''	, '공급가액'	), xtype: 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	''		, width: 120, align : 'right'	, text: Language.get(''	, '부가세'		), xtype: 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	''		, width: 120, align : 'right'	, text: Language.get(''	, '합계금액'	), xtype: 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	''		, width: 120, align : 'right'	, text: Language.get(''	, '지급액'		), xtype: 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	''		, width: 120, align : 'right'	, text: Language.get(''	, '잔액'		), xtype: 'numericcolumn' , format: '#,##0'
					}
				]
			}
		;
		return item;
	}

});
