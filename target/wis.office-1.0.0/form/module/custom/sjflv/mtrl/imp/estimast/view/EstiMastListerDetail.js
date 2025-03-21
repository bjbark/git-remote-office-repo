Ext.define('module.custom.sjflv.mtrl.imp.estimast.view.EstiMastListerDetail', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-estimast-lister-detail',

	store: 'module.custom.sjflv.mtrl.imp.estimast.store.EstiMastDetail',

	border		: 0 ,
	columnLines	: true ,
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

	/**
	 *
	 */
	initComponent : function() {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	/**
	 *
	 */
	pagingItem : function() {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
					{ text : Const.EXPORT.text, iconCls : Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style' }
				],
				pagingButton : false
			}
		;
		return item;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex:	'dum'			, width:  50 , align : 'center'	, text: Language.get('line_seqn'	, '항번'		)
					},{	dataIndex:	'item_code'		, width:  100, align : 'center'	, text: Language.get('item_code'	, '품목코드'	)
					},{	dataIndex:	'item_name'		, width:  180, align : 'left'	, text: Language.get('item_name'	, '품명'		)
					},{	dataIndex:	'item_spec'		, width:  150, align : 'left'	, text: Language.get('item_spec'	, '규격'		)
					},{	dataIndex:	'unit_name'		, width:  60, align : 'center'	, text: Language.get('unit_name'	, '단위'		)
					},{	dataIndex:	'mold_idcd'		, width:  100, align : 'center'	, text: Language.get('acpt_numb'	, '금형코드'	), hidden: true
					},{	dataIndex:	'qntt'			, width:  80, align : 'right'	, text: Language.get('esti_qntt'	, '수량'		), xtype: 'numericcolumn', summaryType: 'sum', format: '#,##0.##'
					},{	dataIndex:	'pric'			, width:  80, align : 'right'	, text: Language.get('esti_pric'	, '단가'		), xtype: 'numericcolumn', format: '#,##0.##'
					},{	dataIndex:	'amnt'			, width:  80, align : 'right'	, text: Language.get('sply_amnt'	, '금액'		), xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
//					},{	dataIndex:	'vatx_amnt'		, width:  80, align : 'right'	, text: Language.get('vatx_amnt'	, '부가세'	), xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
//					},{	dataIndex:	'ttsm_amnt'		, width:  80, align : 'right'	, text: Language.get('ttsm_amnt'	, '합계금액'	), xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
//					},{	dataIndex:	'deli_date2'	, width:  80, align : 'center'	, text: Language.get('deli_date2'	, '납기일자'	),
//						renderer:function(val){
//							var value = val.substr(0,4)+'-'+val.substr(4,2)+'-'+val.substr(6,2);
//							return value;
//						}
					},{	dataIndex:	'user_memo'		, flex :  40, align : 'left'	, text: Language.get('user_memo'	, '비고'		)
					}
				]
			};
		return item;
	}
});
