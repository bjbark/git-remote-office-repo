Ext.define('module.cust.cstmlist.view.CstmListOrderLister', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-cstmlist-order-lister',
	store		: 'module.cust.cstmlist.store.CstmListOrder',
	border		: 0,
	columnLines	: true,
	features: [{ftype :'grid-summary'}],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent: function () {
		var me     = this;
		me.dockedItems = [{xtype: 'module-cstmlist-worker-search2'}];
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'->', '-' ,
					{ text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' }
				]
			};
		return item ;
	},
	/**
	 *
	 */
	columnItem : function () {
		var me   = this,
			item =  {
				defaults: {style: 'text-align:center'},
				items	: [
					{	dataIndex:	'line_seqn'		, width:  40, align : 'center' , text: Language.get( 'line_seqn'	, '순번'		), hidden:false
					},{	dataIndex:	'invc_date'		, width: 100, align : 'center' , text: Language.get( 'invc_date'	, '주문일자'	),
					},{	dataIndex:	'invc_numb'		, width: 110, align : 'center' , text: Language.get( 'invc_numb'	, '주문번호'	),
					},{	dataIndex:	'item_clss_bacd_name', width: 200, align : 'left'	, text: Language.get( 'item_clss_bacd_name'	, '품목군'	), hidden : (_global.hq_id.toUpperCase() =='N1000NBOLT'?false:true)
					},{	dataIndex:	'item_name'		, flex :   1, align : 'left'   , text: Language.get( 'item_name'	, '품명'		),
					},{	dataIndex:	'item_spec'		, width: 100, align : 'left'   , text: Language.get( 'item_spec'	, '규격'		),
					},{	dataIndex:	'tick_valu'		, width:  50, align : 'left'   , text: Language.get( 'tick_valu'	, '두께'		),
					},{	dataIndex:	'user_memo'		, width:  80, align : 'left'   , text: Language.get( ''				, '기타사양'	),
					},{	dataIndex:	'invc_qntt'		, width:  70, align : 'right'  , text: Language.get( 'invc_qntt'	, '수량'		), xtype: 'numericcolumn'
					},{	dataIndex:	'unit_idcd'		, width:  50, align : 'center' , text: Language.get( 'unit_name'	, '단위'		),
					},{	dataIndex:	'invc_pric'		, width:  80, align : 'right'  , text: Language.get( 'invc_pric'	, '견적단가'	), xtype: 'numericcolumn'
					},{	dataIndex:	'ostt_date'		, width: 100, align : 'center' , text: Language.get( 'ostt_date'	, '출고일자'	),
					},{	dataIndex:	'ostt_qntt'		, width:  80, align : 'right'  , text: Language.get( 'ostt_qntt'	, '출고량'		), xtype: 'numericcolumn'
					},{	dataIndex:	'ttsm_amnt'		, width:  80, align : 'right'  , text: Language.get( 'ttsm_amnt'	, '출고금액'	), xtype: 'numericcolumn'
					},{	dataIndex:	'remk_text'		, width: 120, align : 'left'   , text: Language.get( 'remk_text'	, '비고'		),
					}
				]
			};
		return item;
	}
 });





