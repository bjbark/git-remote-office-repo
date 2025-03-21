Ext.define('module.sale.salework.view.SaleWorkListerPayment', { extend: 'Axt.grid.Panel',
	alias :'widget.module-salework-lister-payment',
	store :'module.sale.salework.store.SaleWorkPayment',

	border 		: 0 ,
	columnLines : true ,

	features    : [{ ftype : 'grid-summary'    , remote : false } ],
	plugins     : [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig 	: { markDirty: false , loadMask : false, enableTextSelection: true },


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
				items :
				[
			 		'->', '-',
				 	//{text : '입금처리',         iconCls : Const.FINISH.icon, action : 'paymentAction'       } , '-' ,
			 		{ text : Const.EXPORT.text, iconCls : Const.EXPORT.icon, action : Const.EXPORT.action, button : 'paymentExcel' ,cls: 'button-style'}
			 	], pagingButton : false
			}
		;
		return item;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me = this, item =
		{
			defaults: {style: 'text-align:center'},
			items :
			[
	 	   		{   dataIndex: 'retn_gb'	    , width:  50, text: '구분'   , xtype : 'lookupcolumn'  , lookupValue : resource.lookup('pay_ret_gb' ) , align:'center'  },
	        	{   dataIndex: 'pay_dt'     , width: 80, text: Language.get(''   , '수금일자'  ) , align : 'center' },
	        	{   dataIndex: 'pay_no'     , width: 120, text: Language.get(''   , '수금번호'  )  , summaryType : 'count'},
	 	   		{   dataIndex: 'pay_gb'     , width: 120, text: Language.get(''   ,	'수금방법' ) , xtype : 'lookupcolumn'  , lookupValue : resource.lookup('pay_gb') },
	        	{   dataIndex: 'payment'	, width:  70, text: Language.get(''   , '수금금액'  ) , align:'right' , xtype : 'numericcolumn' , font_color : Const.COLOR.FONT.payment   , summaryType : 'sum', format : '#,##0' },
	        	{	dataIndex: 'user_memo'  , width: 200, text: Language.get(''	  , '수금메모'  ) }
	        	//{   dataIndex: 'cat_id'	    , width:  100, text: Language.get(''  , '승인계정'  ) },
	        	//{   dataIndex: 'app_no'	    , width:  90, text: Language.get(''   , '승인번호'  ) },
	        	//{   dataIndex: 'app_id'	    , width:  280, text: Language.get(''  , '거래번호'  ) },
	        	//{   dataIndex: 'deli_qty'	, width:  70, text: Language.get('', '배송수량') , align:'right' , xtype : 'numericcolumn' , summaryType : 'sum' },
	        	//{   dataIndex: 'rest_qty'	, width:  70, text: Language.get('', '미출잔량') , align:'right' , xtype : 'numericcolumn' , summaryType : 'sum' },
	        	//{   dataIndex: 'scm_nm'     , width: 120, text: Language.get(''   , '직납사'   ) }
	       ]
		};
		return item;
	}
 });
