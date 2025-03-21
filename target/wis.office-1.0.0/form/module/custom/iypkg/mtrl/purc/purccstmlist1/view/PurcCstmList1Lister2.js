Ext.define('module.custom.iypkg.mtrl.purc.purccstmlist1.view.PurcCstmList1Lister2', { extend: 'Axt.grid.Panel',
	alias	: 'widget.module-purccstmlist1-lister2',
	store	: 'module.custom.iypkg.mtrl.purc.purccstmlist1.store.PurcCstmList1Lister2',

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
					},{	dataIndex:	'cstm_name'		, width: 150, align : 'left'	, text: Language.get('cstm_name'	, '거래처명'	)
					},{	dataIndex:	'prod_name'		, width: 230, align : 'left'	, text: Language.get('prod_name'	, '제품명'		)
					},{	dataIndex:	'prod_spec'		, width: 100, align : 'left'	, text: Language.get('prod_spec'	, '규격'		)
					},{	dataIndex:	'istt_qntt'		, width:  80, align : 'right'	, text: Language.get('istt_qntt'	, '입고량'		), xtype: 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	'istt_pric'		, width:  80, align : 'right'	, text: Language.get('istt_pric'	, '단가'		), xtype: 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	'istt_amnt'		, width: 100, align : 'right'	, text: Language.get('istt_amnt'	, '공급가액'	), xtype: 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	'istt_vatx'		, width:  80, align : 'right'	, text: Language.get('istt_vatx'	, '부가세'		), xtype: 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	'ttsm_amnt'		, width: 100, align : 'right'	, text: Language.get('ttsm_amnt'	, '합계금액'	), xtype: 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	''		, width: 100, align : 'right'	, text: Language.get(''	, '지급액'		), xtype: 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	''		, width: 100, align : 'right'	, text: Language.get(''	, '잔액'		), xtype: 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	'wkct_name'		, width: 120, align : 'left'	, text: Language.get('wkct_name'	, '공정명'		)
					},{	dataIndex:	'wkun_dvcd'		, width: 120, align : 'left'	, text: Language.get('wkun_dvcd'	, '작업단위'	), xtype: 'lookupcolumn', lookupValue : resource.lookup('wkun_dvcd')
					},{	dataIndex:	'unit_name'		, width: 120, align : 'left'	, text: Language.get('unit_name'	, '수량단위'	)
					}
				]
			}
		;
		return item;
	}

});
