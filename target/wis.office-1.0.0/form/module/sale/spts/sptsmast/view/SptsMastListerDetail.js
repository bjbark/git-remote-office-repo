Ext.define('module.sale.spts.sptsmast.view.SptsMastListerDetail', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-sptsmast-lister-detail',

	store: 'module.sale.spts.sptsmast.store.SptsMastDetail',

	border		: 0 ,
	columnLines	: true ,
	features	: [{ ftype : 'grid-summary' }],
//	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],
	selModel	: { selType: 'cellmodel'},
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },
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

					{	fieldLabel	: Language.get('ostt_schd_date','출고예정일'),
						xtype		: 'datefield',
						name		: 'ostt_shcd_date',
						labelWidth	: 80,
						width		: 190,
						margin		: '0 0 0 2',
						root		: true,
						value		: new Date(),
						format		: Const.DATE_FORMAT_YMD_BAR,
						submitFormat: Const.DATE_FORMAT_YMD
					},
					'-',  '-',
					{	text : '<span class="write-button">건별출고지시</span>'	, action : 'orderAction'	, cls: 'button1-style'	} , '-',
					{	xtype	: 'label',
						text	: '위 그리드에서 출고의뢰 수량을 입력한 후 "건별출고지시" 버튼을 클릭하세요',
						margin	: '0 0 0 10'
					},

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
					{	dataIndex:	'line_seqn'		, width: 50 , align : 'center'	, text: Language.get('line_seqn'	, '항번'		)
					},{	dataIndex:	'item_code'		, width: 120, align : 'center'	, text: Language.get('item_code'	, '품목코드'	)
					},{	dataIndex:	'item_name'		, flex :  80, align : 'left'	, text: Language.get('item_name'	, '품명'		) , minWidth:200, maxWidth:350
					},{	dataIndex:	'item_spec'		, width: 120, align : 'left'	, text: Language.get('item_spec'	, '규격'		)
					},{	dataIndex:	'unit_name'		, width:  60, align : 'center'	, text: Language.get('unit_name'	, '단위'		)
					},{	dataIndex:	'invc_qntt'		, width:  70, align : 'right'	, text: Language.get('invc_qntt'	, '수주수량'	), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'not_trst_qntt'	, width:  70, align : 'right'	, text: Language.get('not_trst_qntt', '미출잔량'	), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'prod_qntt'		, width:  70, align : 'right'	, text: Language.get('stok_qntt'	, '재고수량'	), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'spts_qntt'		, width:  90, align : 'right'	, text: Language.get('spts_qntt'	, '의뢰수량'	), xtype: 'numericcolumn', summaryType: 'sum'
						, tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false
						},
						listeners:{
							change:function(){
								this.view.getSelectionModel().getCurrentPosition();
							}
						}
					},{	dataIndex:	'invc_pric'		, width:  80, align : 'right'	, text: Language.get('invc_pric'	, '단가'		), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'sply_amnt'		, width:  80, align : 'right'	, text: Language.get('sply_amnt'	, '금액'		), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'vatx_amnt'		, width:  80, align : 'right'	, text: Language.get('vatx_amnt'	, '부가세'	), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'invc_amnt'		, width:  80, align : 'right'	, text: Language.get('invc_amnt'	, '합계금액'	), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'deli_date'		, width:  80, align : 'center'	, text: Language.get('deli_date'	, '납기일자'	)
					},{	dataIndex:	'user_memo'		, flex :  20, align : 'left'	, text: Language.get('user_memo'	, '비고'		)
					}
				]
			};
		return item;
	},
	cellEditAfter  : function (lister2, context) {
		var me = this;
		var a = this.getSelectionModel().getSelection()[0].data.trst_qntt;		//수주량
		var c = this.getSelectionModel().getSelection()[0].data.not_trst_qntt;	//미납잔량
		var d = this.getSelectionModel().getSelection()[0].data.spts_qntt;		//출고수량
		var g = this.getSelectionModel().getSelection()[0].data.invc_pric;		//단가
		var amnt = Math.floor(g*d/10)*10;	//금액
		var v = Math.floor(amnt*Number(_global.tax_rt)/1000)*10;		//부가세
		var grid = this;
		var pos = this.view.getSelectionModel().getCurrentPosition().row;
		var models = grid.getStore().getRange();
		if( c<d){
			Ext.Msg.alert("알림", "출고수량을 다시 입력해주십시오.");
			models[pos].set('spts_qntt',0);
			return;
		}else{
			models[pos].set('new_sale_amnt',amnt);
			models[pos].set('new_vatx_amnt',v);
			models[pos].set('new_ttsm_amnt',amnt+v);
		}
		lister2.grid.view.getSelectionModel().onKeyDown();
	},

	listeners: {
		validateedit : function (lister2, context, eOpts ) {
			var me = this;
			var field = context.field;
			var value = context.value;
			return true;
		},
		edit : function(lister2, context) {
			var me = this;
			me.cellEditAfter(lister2, context);
		}
	}
});
