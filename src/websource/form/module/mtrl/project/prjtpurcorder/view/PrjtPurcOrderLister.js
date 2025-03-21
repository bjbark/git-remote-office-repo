Ext.define('module.mtrl.project.prjtpurcorder.view.PrjtPurcOrderLister', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-prjtpurcorder-lister',

	store: 'module.mtrl.project.prjtpurcorder.store.PrjtPurcOrderLister',

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
					{	dataIndex:	'line_seqn'		, width: 50 , align : 'center'	, text: Language.get('line_seqn'		, '항번'		)
					},{	dataIndex:	'pjod_idcd'		, width: 160, align : 'center'	, text: Language.get('pjod_idcd'		, '프로젝트수주id'),hidden : true
					},{	dataIndex:	'item_idcd'		, width:  70, align : 'left'	, text: Language.get('item_idcd'		, '품목id'	),hidden : true
					},{	dataIndex:	'item_name'		, width: 150, align : 'left'	, text: Language.get('item_name'		, '품명'	)
					},{	dataIndex:	'item_spec'		, width:  80, align : 'left'	, text: Language.get('item_spce'		, '품목규격'	)
					},{	dataIndex:	'item_mtrl'		, width:  80, align : 'center'	, text: Language.get('item_mtrl'		, '품목재질'	)
					},{	dataIndex:	'ivst_wkct_idcd', width:  80, align : 'right'	, text: Language.get('ivst_wkct_idcd'	, '투입공정id'	),hidden : true
					},{	dataIndex:	'unit_idcd'		, width:  80, align : 'right'	, text: Language.get('unit_idcd'		, '단위id'	),hidden : true
					},{	dataIndex:	'supl_dvcd'		, width:  60, align : 'center'	, text: Language.get('supl_dvcd'		, '조달구분'	), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'supl_dvcd' )
					},{	dataIndex:	'cstm_idcd'		, width:  80, align : 'right'	, text: Language.get('cstm_idcd'		, '거래처id'	),hidden : true
					},{	dataIndex:	'cstm_name'		, width:  150, align : 'left'	, text: Language.get('cstm_name'		, '거래처명'	)
					},{	dataIndex:	'need_qntt'		, width:  80, align : 'right'	, text: Language.get('need_qntt'		, '소요수량'	), xtype: 'numericcolumn'  , summaryType: 'sum'
					},{	dataIndex:	'used_schd_date', width:  80, align : 'center'	, text: Language.get('used_schd_date'	, '사용예정일자'	)
					},{	dataIndex:	'incm_loss_rate', width:  80, align : 'right'	, text: Language.get('incm_loss_rate'	, '사내LOSS율'	), xtype: 'numericcolumn' , summaryType: 'sum' , format:  '#,##0.00'
					},{	dataIndex:	'otcm_loss_rate', width:  80, align : 'right'	, text: Language.get('otcm_loss_rate'	, '사외LOSS율'	), xtype: 'numericcolumn' , summaryType: 'sum' , format:  '#,##0.00'
					},{	dataIndex:	'stok_unit_idcd', width:  80, align : 'center'	, text: Language.get('stok_unit_idcd'	, '재고단위id'	),hidden : true
					},{	dataIndex:	'last_yorn'		, width:  60, align : 'center'	, text: Language.get('last_yorn'		, '최종여부'	), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' )
					},{	dataIndex:	'user_memo'		, flex :  30, align : 'left'	, text: Language.get('user_memo'		, '비고'		)
					}
				]
			};
		return item;
	}
});
