Ext.define('module.custom.hjsys.mtrl.po.purcordr.view.PurcOrdrListerDetail', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-purcordr-lister-detail',

	store: 'module.custom.hjsys.mtrl.po.purcordr.store.PurcOrdrDetail',

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
					{	dataIndex:	'line_seqn'		, width:  50, align : 'center'	, text: Language.get('line_seqn'	, '항번'		)
					},{	dataIndex:	'item_code'		, width:  65, align : 'center'	, text: Language.get('item_code'	, '품목코드'	)
					},{	dataIndex:	'item_name'		, width: 150, align : 'left'	, text: Language.get('item_name'	, '품명'		)
					},{	dataIndex:	'item_spec'		, width: 150, align : 'left'	, text: Language.get('item_spec'	, '규격'		)
					},{	dataIndex:	'unit_name'		, width:  60, align : 'center'	, text: Language.get('unit_name'	, '단위'		), hidden : true,
					},{	dataIndex:	'need_qntt'		, width:  70, align : 'right'	, text: Language.get('need_qntt'	, '소요량'	), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'stok_used_qntt', width:  85, align : 'right'	, text: Language.get('stok_used_qntt', '재고사용수량'), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'offr_qntt'		, width:  70, align : 'right'	, text: Language.get('offr_qntt'	, '발주수량'	), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'ordr_wigt'		, width:  70, align : 'right'	, text: Language.get('ordr_wigt'	, '발주중량'	), xtype: 'numericcolumn',hidden:!(_global.hqof_idcd.toUpperCase()=="N1000HJSYS")
					},{	dataIndex:	'offr_pric'		, width:  80, align : 'right'	, text: Language.get('offr_pric'	, '단가'		), xtype: 'numericcolumn',
					},{	dataIndex:	'offr_amnt'		, width:  80, align : 'right'	, text: Language.get('offr_amnt'	, '금액'		), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'offr_vatx'		, width:  80, align : 'right'	, text: Language.get('offr_vatx'	, '부가세'	), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'ttsm_amnt'		, width:  80, align : 'right'	, text: Language.get('ttsm_amnt'	, '합계금액'	), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'deli_date2'	, width:  80, align : 'center'	, text: Language.get('deli_date2'	, '납기일자'	),
						renderer:function(val){
							var a = null;
							if(val){
								if(val.match(/[^0-9]/)){
									var date1 = new Date(val);
										date2 = Ext.Date.format(date1,'Y-m-d'),
										a = date2
									;
								}else{
									a = val.substr(0,4)+'-'+val.substr(4,2)+'-'+val.substr(6,2);
								}
							}
							return a;
						}
					},{	dataIndex:	'user_memo'		, flex :  30, align : 'left'	, text: Language.get('user_memo'	, '비고'		)
					}
				]
			};
		return item;
	}
});
