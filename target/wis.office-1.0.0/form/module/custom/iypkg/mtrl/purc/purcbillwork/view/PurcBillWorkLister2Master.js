Ext.define('module.custom.iypkg.mtrl.purc.purcbillwork.view.PurcBillWorkLister2Master', { extend: 'Axt.grid.Panel',
	alias	: 'widget.module-purcbillwork-lister2-master',
	store	: 'module.custom.iypkg.mtrl.purc.purcbillwork.store.PurcBillWorkMaster',

	region : 'center',
	border : 0,
	columnLines: true,
	selModel: { selType: 'checkboxmodel', mode : 'MULTI' },
	features: [{ftype :'grid-summary'}],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent: function () {
		var me = this;
		me.dockedItems = [{xtype: 'module-purcbillwork-worker-lister2-search'}];
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
					{	text : '<span class="write-button">지 급</span>', action : 'payAction'	, cls: 'button1-style', style : 'width : 70px'	}
				]
			}
		;
		return item ;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex:	'publ_date'		, width:  85, align : 'center'	, text: Language.get('publ_date'	, '발행일자'	)
					},{	dataIndex:	'txbl_volm'		, width:  35, align : 'right'	, text: Language.get('txbl_volm'	, '권'		)
					},{	dataIndex:	'txbl_honm'		, width:  35, align : 'right'	, text: Language.get('txbl_honm'	, '호'		)
					},{	dataIndex:	'cstm_name'		, flex :   1, align : 'left'	, text: Language.get('cstm_name'	, '매입처명'	)
					},{	dataIndex:	'sply_amnt'		, width:  80, align : 'right'	, text: Language.get('sply_amnt'	, '공급가액'	), xtype: 'numericcolumn' , format: '#,##0',
					},{	dataIndex:	'vatx_amnt'		, width:  70, align : 'right'	, text: Language.get('vatx_amnt'	, '부가세액'	), xtype: 'numericcolumn' , format: '#,##0',
					},{	dataIndex:	'ttsm_amnt'		, width:  80, align : 'right'	, text: Language.get('ttsm_amnt'	, '합계금액'	), xtype: 'numericcolumn' , format: '#,##0',
					},{	dataIndex:	'paym_yorn'		, width:  70, align : 'center'	, text: Language.get('paym_yorn'	, '지급여부'	), xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{	dataIndex:	'paym_date'		, width:  85, align : 'center'	, text: Language.get('paym_yorn'	, '지급일자'	)
					}
				]
			}
		;
		return item;
	}

});
