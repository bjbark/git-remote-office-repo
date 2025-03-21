Ext.define('module.basic.cust.cstmcredit.view.CstmCreditListerMaster', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-cstmcredit-lister-master',
	store		: 'module.basic.cust.cstmcredit.store.CstmCreditMaster',

	width		: 515,
	minWidth	: 200,
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' , remote : true }],
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  } ],

	viewConfig: {
		markDirty: false, loadMask : false,
		getRowClass : function ( record , index ) {
			if(record.get('trns_stop_yorn') == '1' ){
				return 'text-warn';
			}
		}
	},
	/**
	*
	*/
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem() ;
		me.columns = me.columnItem();
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
					{text : '<span class="write-button">거래정지 초기화</span>', action : 'trnsStopInitAction' ,cls: 'button-style', width:  90} ,
					{text : '<span class="write-button">거래정지</span>', action : 'trnsStopAction' ,cls: 'button-style'} ,
					{text : '<span class="write-button">거래정지취소</span>', action : 'trnsStopCancelAction' ,cls: 'button-style'}, '-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style'}
				],
				pagingButton : false
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
					{	dataIndex:	'trns_stop_yorn'	, width:  60, align : 'center' , text: '상태'    , xtype : 'lookupcolumn' , lookupValue : [["0","정상"],["1","정지"]]
					},{	dataIndex:	'cstm_code'			, width: 70, align : 'center'   , text: Language.get( 'cstm_code'      , '거래처코드'  )
					},{	dataIndex:	'cstm_name'			, width: 300, align : 'left'   , text: Language.get( 'cstm_name'      , '거래처명'   )
					},{	dataIndex:	'sale_drtr_name'	, width: 150, align : 'left'   , text: Language.get( 'sale_drtr_name' , '영업담당자'  )
					},{	dataIndex:	'pryr_trns_amnt'	, width: 150, align : 'right'  , text: Language.get( 'pryr_trns_amnt' , '년간 거래금액'), xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'totl_urcp_amnt'	, width: 150, align : 'right'  , text: Language.get( 'totl_urcp_amnt' , '미수총액'   ), xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'last_ostt_date'	, width: 90, align : 'center' , text: Language.get( 'last_ostt_date' , '최근 출고일' )
					},{	dataIndex:	'last_iamt_date'	, width: 90, align : 'center' , text: Language.get( 'last_iamt_date' , '최근 입금일' )
					},{	dataIndex:	'npay_term'			, width: 150, align : 'right'  , text: Language.get( 'npay_term'      , '미수기간'   )
					}
				]
			};
		return item;
	}
 });
