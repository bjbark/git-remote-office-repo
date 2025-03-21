Ext.define('module.custom.iypkg.mtrl.purc.purccstmlist1.view.PurcCstmList1Lister', { extend: 'Axt.grid.Panel',
	alias	: 'widget.module-purccstmlist1-lister',
	store	: 'module.custom.iypkg.mtrl.purc.purccstmlist1.store.PurcCstmList1Lister',

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
					{	dataIndex:	'invc_date'		, width: 100, align : 'center'	, text: Language.get('invc_date'	, '입고일자'	)
					},{	dataIndex:	'cstm_name'		, width: 150, align : 'left'	, text: Language.get('cstm_name'	, '입고처명'	)
					},{	dataIndex:	'fabc_name'		, width: 230, align : 'left'	, text: Language.get('fabc_name'	, '원단명'		)
					},{	dataIndex:	'ppln_dvcd'		, width:  70, align : 'center'	, text: Language.get('ppln_dvcd'	, '골'		), xtype: 'lookupcolumn', lookupValue : resource.lookup('line_dvcd')
					},{	dataIndex:	'fdat_spec'		, width: 100, align : 'left'	, text: Language.get('fdat_spec'	, '재단규격'	)
					},{	dataIndex:	'item_fxqt'		, width:  60, align : 'right'	, text: Language.get('item_fxqt'	, '절수'		)
					},{	dataIndex:	'istt_qntt'		, width:  80, align : 'right'	, text: Language.get('istt_qntt'	, '입고량'		), xtype: 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	'mxm2_pric'		, width:  80, align : 'right'	, text: Language.get('mxm2_pric'	, '단가/m2'	), xtype: 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	'pqty_pric'		, width:  80, align : 'right'	, text: Language.get('pqty_pric'	, '단가/개'	), xtype: 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	'istt_amnt'		, width: 100, align : 'right'	, text: Language.get('istt_amnt'	, '공급가액'	), xtype: 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	'istt_vatx'		, width:  80, align : 'right'	, text: Language.get('istt_vatx'	, '부가세'		), xtype: 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	'ttsm_amnt'		, width: 100, align : 'right'	, text: Language.get('ttsm_amnt'	, '합계금액'	), xtype: 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	'txbl_amnt'		, width: 100, align : 'right'	, text: Language.get(''				, '지급액'		), xtype: 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	'unpay'			, width: 100, align : 'right'	, text: Language.get(''				, '잔액'		), xtype: 'numericcolumn' , format: '#,##0'
					}
				]
			}
		;
		return item;
	}

});
