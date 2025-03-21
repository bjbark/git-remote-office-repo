Ext.define('module.prod.order.workbook.view.WorkBookLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-workbook-lister',
	store		: 'module.prod.order.workbook.store.WorkBook',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },

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
					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action  : Const.MODIFY.action , cls: 'button-style' }, //저장
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style', itemId : 'lister' } //엑셀버튼.
				]
			}
		;
		return item ;
	},


	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'wkod_numb'		, text : Language.get('wkod_numb'		, '주문번호'		) , width :  90 , align : 'center', hidden : _global.hq_id.toUpperCase() == 'N1000KOMEC' ? false : true,
					},{	dataIndex: 'invc_date'		, text : Language.get('prod_date'		, '생산일자'		) , width :  90 , align : 'center'
					},{	dataIndex: 'prog_stat_dvcd'	, text : Language.get('prog_stat_dvcd'	, '진행상태구분'		) , width :  80 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('prog_stat_dvcd')
					},{	dataIndex: 'lott_numb'		, text : Language.get('lott_numb'		, 'Lot NO'		) , width : 120 , align : 'center', hidden : _global.hq_id.toUpperCase() == 'N1000KOMEC' ? false : true,
					},{	dataIndex: 'dayn_dvcd'		, text : Language.get('dayn_dvcd'		, '주/야'			) , width :  60 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('dayn_dvcd')
					},{ dataIndex: 'item_code'		, text : Language.get('item_code'		, '품목코드'		) , width : 110 , align : 'center'
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		, '품명'			) , width : 300 , align : 'left'
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'		, '품목규격'		) , width : 250 , align : 'left'
					},{	dataIndex: 'wkct_name'		, text : Language.get('wkct_name'		, '공정'			) , width :  90 , align : 'left'
					},{	dataIndex: 'cvic_name'		, text : Language.get('cvic'			, '설비'			) , width : 100 , align : 'left'
					},{ dataIndex: 'wker_name'		, text : Language.get('wker_name'		, '작업자'			) , width :  70 , align : 'left'
					},{ dataIndex: 'lott_numb'		, text : Language.get('lott_numb'		, 'LOT번호'		) , width : 100 , align : 'left', hidden : true
					},{	dataIndex: 'work_strt_dttm'	, text : Language.get('work_strt_dttm'	, '시작일시'		) , width : 130 , align : 'center'
					},{	dataIndex: 'work_endd_dttm'	, text : Language.get('work_endd_dttm'	, '종료일시'		) , width : 130 , align : 'center'
					},{	dataIndex: 'need_time'		, text : Language.get('need_time'		, '소요시간'		) , width :  85 , align : 'center'
					},{ dataIndex: 'indn_qntt'		, text : Language.get('indn_qntt'		, '지시수량'		) , width :  70 , align : 'right' , xtype: 'numericcolumn', summaryType : 'sum',hidden	:true
					},{ dataIndex: 'prod_qntt'		, text : Language.get('prod_qntt'		, '생산수량'		) , width :  70 , align : 'right' , xtype: 'numericcolumn', summaryType : 'sum'
					},{ dataIndex: 'good_qntt'		, text : Language.get('good_qntt'		, '양품수량'		) , width :  70 , align : 'right' , xtype: 'numericcolumn', summaryType : 'sum'
					},{ dataIndex: 'invc_pric'		, text : Language.get('invc_pric'		, '단가'			) , width :  70 , align : 'right' , xtype: 'numericcolumn', summaryType : 'sum',hidden : true
					},{ dataIndex: 'sply_amnt'		, text : Language.get('sply_amnt'		, '금액'			) , width : 130 , align : 'right' , xtype: 'numericcolumn', summaryType : 'sum',hidden : true
					},{	dataIndex: 'wkct_insp_yorn'	, text : Language.get('wkct_insp_yorn'	, '공정검사'		) , width :  90 , align : 'left'  , xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'), hidden : true
					},{	dataIndex: 'last_wkct_yorn'	, text : Language.get('last_wkct_yorn'	, '최종공정'		) , width :  90 , align : 'left'  , xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'), hidden : true
					},{ dataIndex: 'user_memo'		, text : Language.get('user_memo'		, '메모사항'		) , flex  :   1 , align : 'left' , hidden : true
					},{ dataIndex: 'wkct_idcd'		, text : Language.get('wkct_idcd'		, '공정번호'		) , width : 100 , align : 'left' , hidden : true
					}
				]
			}
		;
		return item;
	 }
});
