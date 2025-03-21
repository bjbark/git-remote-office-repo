Ext.define('module.custom.sjflv.mtrl.imp.ordermast2.view.OrderMast2ListerMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-ordermast2-lister-master',
	store		: 'module.custom.sjflv.mtrl.imp.ordermast2.store.OrderMast2Master',

	width		: 515,
	minWidth	: 200,
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' , remote : true }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],
	rowspan		: true,
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
					{	text : '마감/해지',
						menu : [
							{	text : '마감', action : 'closeAction'		},
							{	text : '해지', action : 'closeCancelAction'	}
						]
					},
					'-',
					{	text : '확정/취소',
						menu : [
							{	text : 'Order 확정', action : 'confirmAction'		},
							{	text : 'Order 취소', action : 'confirmCancelAction'	}
						]
					},
					'-',
//					{	text : '<span class="write-button">Order 확정</span>'		, action : 'confirmAction'	, cls: 'button-style', width: 100	} ,
					{	text : '<span class="write-button">Amend 추가</span>'		, action : 'amendAction'	, cls: 'button-style', width: 100	} ,
					{	text : '<span class="write-button">Invoice 등록</span>'	, action : 'invoiceAction'	, cls: 'button-style', width: 100	} ,
					{	text : '<span class="write-button">Payment 등록</span>'	, action : 'paymentAction'	, cls: 'button-style', width: 100	} ,
					{	text : '<span class="write-button">공급가 등록</span>'		, action : 'splyinsertAction'	, cls: 'button-style', width: 100,hidden :_global.hq_id.toUpperCase()!='N1000SJUNG' ? true : false } ,
					{	text : '<span class="write-button">선적일정 등록</span>'		, action : 'dateAction'		, cls: 'button-style', width: 100},
					'-', '->', '-',
					{	text : '<span class="write-button">Order Sheet 출력</span>'	, action : 'sheetPrint'		, cls: 'button-style' ,width:  110,	} , '-',
					{	text : '<span class="write-button">Firm Offer 출력</span>'	, action : 'offerPrint'		, cls: 'button-style' ,width:  110	} , '-',
					'->',
					{	text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action ,cls: 'button-style',hidden :_global.hq_id.toUpperCase()!='N1000SJUNG' ? true : false } ,
					{	text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action ,cls: 'button-style' } ,
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style' } , '-' ,
					{	text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action ,cls: 'button-style' }
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
					{	dataIndex: 'line_clos'		, text: Language.get('line_clos'		, '마감'			), width:  40 , align : 'center'	 , xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_clos')
					},{	dataIndex: 'line_stat'		, text: Language.get('line_stat'		, '상태'			), width:  40 , align : 'center'	 , xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_stat')
					},{	dataIndex: 'bzpl_name'		, text: Language.get('bzpl_name'		, '사업장'			), width:  80 , rowspan:true
					},{	dataIndex: 'incm_dvcd'		, text: Language.get('incm_dvcd'		, '수입구분'		), width:  80 , align : 'center'	 , xtype : 'lookupcolumn' , lookupValue : resource.lookup('incm_dvcd'), rowspan:true
					},{	dataIndex: 'ordr_date'		, text: Language.get('ordr_date'		, 'Order Date'	), width: 100 , align : 'center', rowspan:true
					},{	dataIndex: 'ordr_numb'		, text: Language.get('ordr_numb'		, 'Order No'	), width: 120 , align : 'center', rowRoot:true
					},{	dataIndex: 'amnd_degr'		, text: Language.get('amnd_degr'		, 'Amend'		), width: 60 , align : 'center', rowspan:true
					},{	dataIndex: 'item_name'		, text: Language.get('item_name'		, '품목'			), flex : 1 ,minWidth: 200, rowspan:true
					},{	dataIndex: 'buyr'			, text: Language.get(''					, 'Supplier'	), width: 120, rowspan:true
					},{	dataIndex: 'reqt_cstm_name'	, text: Language.get(''					, 'Customer'	), width: 120,hidden :_global.hq_id.toUpperCase()!='N1000SJUNG' ? true : false ,
					},{	dataIndex: 'each_qntt'		, text: Language.get('each_qntt'		, 'Each'		), width: 60  , xtype:'numericcolumn'
					},{	dataIndex: 'pckg_size'		, text: Language.get('pckg_size'		, 'Pack Size'	), width: 80  , xtype:'numericcolumn', format	: '#,##0.##',
					},{	dataIndex: 'qntt'			, text: Language.get('qntt'				, '수량'			), width: 80  , xtype:'numericcolumn', format	: '#,##0.##',
					},{	dataIndex: 'exch_pric'		, text: Language.get(''					, '판매단가'		), width: 100 , xtype:'numericcolumn', format	: '#,##0.##',
					},{	dataIndex: 'exch_amnt'		, text: Language.get(''					, '판매금액'		), width: 120 , xtype:'numericcolumn'
					},{	dataIndex: 'cmis_pric'		, text: Language.get(''		, 'Commission'				), width: 100 , align : 'right',hidden :_global.hq_id.toUpperCase()!='N1000SJUNG' ? true : false , xtype:'numericcolumn',format	: '#,##0.##',
					},{	dataIndex: 'cmis_amnt'		, text: Language.get(''		, 'Commission Total'		), width: 120 , align : 'right',hidden :_global.hq_id.toUpperCase()!='N1000SJUNG' ? true : false , xtype:'numericcolumn',format	: '#,##0.##',
					},{	dataIndex: 'pfit_pric'		, text: Language.get(''		, 'Net Price'				), width: 100 , align : 'right',hidden :_global.hq_id.toUpperCase()!='N1000SJUNG' ? true : false , xtype:'numericcolumn',format	: '#,##0.##',
					},{	dataIndex: 'pfit_amnt'		, text: Language.get(''		, 'Net Total Price'			), width: 100 , align : 'right',hidden :_global.hq_id.toUpperCase()!='N1000SJUNG' ? true : false , xtype:'numericcolumn',format	: '#,##0.##',
					},{	dataIndex: 'paym_date'		, text: Language.get(''		, 'Payment Date'			), width: 100 , align : 'center'
					},{	dataIndex: 'cofm_date'		, text: Language.get(''		, 'Order Confirm'			), width: 100 , align : 'center'
					},{	dataIndex: 'mdtn_name'		, text: Language.get(''					, 'Forwarder'		), width: 100
					},{	dataIndex: 'trde_trnt_dvcd'	, text: Language.get(''					, '운송수단'			), width: 100, align : 'center'	 , xtype : 'lookupcolumn' , lookupValue : resource.lookup('trde_trnt_dvcd')
					},{	dataIndex: 'trns_exps'		, text: Language.get('trns_exps'		, '운송비'				), width: 80 , align : 'right' ,hidden :_global.hq_id.toUpperCase()!='N1000SJUNG' ? false : true , xtype:'numericcolumn',format	: '#,##0.##',
					},{	dataIndex: 'insu_amnt'		, text: Language.get('insu_amnt'		, '보험비'				), width: 80 , align : 'right' ,hidden :_global.hq_id.toUpperCase()!='N1000SJUNG' ? false : true , xtype:'numericcolumn',format	: '#,##0.##',
					},{	dataIndex: 'etdd'			, text: Language.get('etdd'				, 'ETD'				), width: 80 , align : 'center'
					},{	dataIndex: 'etaa'			, text: Language.get('etaa'				, 'ETA'				), width: 80 , align : 'center'
					},{	dataIndex: 'ecdd'			, text: Language.get('ecdd'				, 'ECD'				), width: 80 , align : 'center'
					},{	dataIndex: 'invc_numb'		, text: Language.get('invc_numb'		, 'Invoice No'		), width: 120 , align : 'center'
					},{	dataIndex: 'invc_date'		, text: Language.get('invc_date'		, 'Invoice Date'	), width: 100 , align : 'center'
					},{	dataIndex: 'user_memo'		, text: Language.get('user_memo'		, 'Remark'			), width: 160
					}
				]
			};
		return item;
	}
});
