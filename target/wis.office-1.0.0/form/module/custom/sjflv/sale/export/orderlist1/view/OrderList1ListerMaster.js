Ext.define('module.custom.sjflv.sale.export.orderlist1.view.OrderList1ListerMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-sjflv-orderlist1-lister-master',
	store		: 'module.custom.sjflv.sale.export.orderlist1.store.OrderList1Master',

	width		: 515,
	minWidth	: 200,
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' , remote : true }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

	viewConfig: {
		markDirty: false,
		loadMask : false
	},
	/**
	*
	*/
	initComponent: function () {
		var me = this;
		me.paging	= me.pagingItem();
		me.columns	= me.columnItem();
		me.callParent();
	},

	/**
	 *
	 */
	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'-', '->', '-',
					{	text : Const.UPDATE.text, iconCls: Const.UPDATE.icon, action : Const.UPDATE.action ,cls: 'button-style' }, '-' ,
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style' } ,
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
					{	dataIndex: 'line_clos'		, width:  50, align : 'center'	, text: Language.get('line_clos'		, '상태'				) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_clos')
					},{	dataIndex: 'stop'			, width:  50, align : 'left'	, text: Language.get('stop'				, '중단'				), xtype : 'checkcolumn'
					},{	dataIndex: 'bzpl_name'		, width: 120, align : 'left'	, text: Language.get('bzpl_name'		, '사업장'			)
					},{	dataIndex: 'invc_numb'		, width: 100, align : 'left'	, text: Language.get('ordr_numb'		, 'PO 번호'			)
					},{	dataIndex: 'invc_date'		, width: 100, align : 'left'	, text: Language.get('invc_date'		, '수주일자'			)
					},{	dataIndex: 'amnd_degr'		, width:  50, align : 'right'	, text: Language.get('amnd_degr'		, 'AMD'				) , xtype: 'numericcolumn'
					},{	dataIndex: 'expt_dvcd'		, width: 100, align : 'center'	, text: Language.get('expt_dvcd'		, '수출구분'			) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('expt_dvcd')
					},{	dataIndex: 'mngt_numb'		, width: 120, align : 'left'	, text: Language.get('mngt_numb'		, '관리번호'			)
					},{	dataIndex: 'po_date'		, width: 100, align : 'center'	, text: Language.get('po_date'			, 'PO Date'			)
					},{	dataIndex: 'buyr_name'		, width: 100, align : 'left'	, text: Language.get('buyr_name'		, 'Buyer'			)
					},{	dataIndex: 'mdtn_prsn'		, width: 100, align : 'left'	, text: Language.get('mdtn_prsn'		, '중개인'			)
					},{	dataIndex: 'drtr_name'		, width: 100, align : 'left'	, text: Language.get('drtr_name'		, '담당자'			)
					},{	dataIndex: 'pric_cond_dvcd'	, width: 100, align : 'center'	, text: Language.get('pric_cond_dvcd'	, '가격조건'			) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('pric_cond_dvcd')
					},{	dataIndex: 'trde_stot_dvcd'	, width: 100, align : 'center'	, text: Language.get('trde_stot_dvcd'	, '결제방법'			) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('pric_cond_dvcd')
					},{	dataIndex: 'stot_time_dvcd'	, width: 100, align : 'center'	, text: Language.get('stot_time_dvcd'	, '결제시기'			) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('pric_cond_dvcd')
					},{	dataIndex: 'stot_ddln'		, width: 100, align : 'left'	, text: Language.get('stot_ddln'		, '결제기한'			)
					},{	dataIndex: 'mney_unit'		, width:  60, align : 'left'	, text: Language.get('mney_unit'		, '통화'				)
					},{	dataIndex: 'exrt'			, width:  80, align : 'right'	, text: Language.get('exrt'				, '적용환율'			) , xtype: 'numericcolumn'
					}
				]
			};
		return item;
	}
});
