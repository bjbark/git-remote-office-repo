Ext.define('module.custom.iypkg.stock.isos.isttlist1.view.IsttList1Lister3', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-isttlist1-lister3',
	store		: 'module.custom.iypkg.stock.isos.isttlist1.store.IsttList1Lister3',
	border		: 0 ,
	columnLines : true ,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
//	features	: [{ ftype : 'grid-summary'} ],
	plugins		: [{ ptype  : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],

	initComponent : function() {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function() {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->',
					{ text : Const.EXPORT.text, iconCls : Const.EXPORT.icon, action : Const.EXPORT.action, button : 'part2detail' ,cls: 'button-style'},
				],
				pagingButton : false
			}
		;
		return item;
	},

	viewConfig: {
		getRowClass : function ( record , index ) {
			if(record.get('invc_date') == '합계' || record.get('invc_date').length < 8){
				return 'text-warn';
			}else if(record.get('asmt_name') == '일계'){
				return 'text-blue';
			}else if(record.get('asmt_name') == '소계'){
				return 'text-green';
			}
		}
	},

	columnItem : function () {
		var me = this,
			item = {
			defaults: {style: 'text-align:center'},
			items : [
				{	dataIndex: 'invc_date'		, width:  80, text: Language.get('invc_date',		'입고일자'	), align : 'center'
				},{	dataIndex: 'cstm_name'		, width: 150, text: Language.get('cstm_name',		'거래처명'	)
				},{	dataIndex: 'asmt_code'		, width: 120, text: Language.get('asmt_code',		'품목코드'	)
				},{	dataIndex: 'asmt_name'		, width: 230, text: Language.get('asmt_name',		'품목명'	)
				},{	dataIndex: 'asmt_spec'		, width: 120, text: Language.get('asmt_spec',		'규격'	) , hidden : true
				},{	dataIndex: 'asmt_dvcd'		, width:  50, text: Language.get('asmt_dvcd',		'구분'	) , xtype: 'lookupcolumn', lookupValue : resource.lookup('asmt_dvcd'), align : 'center'
				},{	dataIndex: 'offr_qntt'		, width:  80, text: Language.get('offr_qntt',		'발주수량'	) , xtype: 'numericcolumn', summaryType: 'sum', format: '#,##0', align : 'right'
				},{	dataIndex: 'unit_name'		, width:  60, text: Language.get('unit_name',		'단위'	)
				},{	dataIndex: 'istt_pric'		, width:  60, text: Language.get('istt_pric',		'단가'	) , xtype: 'numericcolumn', summaryType: 'sum', format: '#,##0', align : 'right'
				},{	dataIndex: 'vatx_incl_yorn'	, width:  60, text: Language.get('vatx_incl_yorn',	'자료구분'	) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn'), align : 'center'
				},{	dataIndex: 'istt_amnt'		, width:  80, text: Language.get('istt_amnt',		'공급가'	) , xtype: 'numericcolumn', summaryType: 'sum', format: '#,##0', align : 'right'
				},{	dataIndex: 'istt_vatx'		, width:  80, text: Language.get('istt_vatx',		'부가세'	) , xtype: 'numericcolumn', summaryType: 'sum', format: '#,##0', align : 'right'
				},{	dataIndex: 'ttsm_amnt'		, width: 100, text: Language.get('ttsm_amnt',		'합계'	) , xtype: 'numericcolumn', summaryType: 'sum', format: '#,##0', align : 'right'
				},{	dataIndex: 'acpt_cstm_name'	, width: 150, text: Language.get('acpt_cstm_name',	'매출처명'	)
				}
			]
		};
		return item;
	}
});
