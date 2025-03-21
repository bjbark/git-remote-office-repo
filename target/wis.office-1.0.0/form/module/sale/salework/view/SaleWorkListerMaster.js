Ext.define('module.sale.salework.view.SaleWorkListerMaster', { extend: 'Axt.grid.Panel',

	alias       : 'widget.module-salework-lister-master',
	store       : 'module.sale.salework.store.SaleWorkMaster',

	//width       : 450,
	//height       : 600,
	minWidth    : 200,
	split 		: true,
	selModel 	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features    : [{ ftype : 'grid-summary' , remote : true } ],
	plugins		: [{ ptype:'gridcolumnmenu'  } ,{ ptype: 'gridcolumnconfig'} ],



	viewConfig 	: {
		markDirty: false,
		loadMask : false,
		enableTextSelection: true
	},

    /**
    *
    */
    initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
    	me.callParent();
	},

	/**
	 *
	 */
	pagingItem : function () {
		var me = this, item =
		{
			xtype : 'grid-paging',
			items :
			[
			 	{
			 		text : '마감/해지',
			 		menu :
			 		[
				 	 	{ text : '마감', action : 'closeActiveAction' , action_value : '1' },
				 	 	{ text : '해지', action : 'closeCancelAction' , action_value : '0' }
			 		],
				 	action : 'closeAction'
			 	},
			 	{	xtype: 'tbseparator' },
			 	{   xtype: 'tbfill'      },  // '->',
			 	{	xtype: 'tbseparator' },  // '-' ,
			 	{	text : '거래명세서'		, iconCls : Const.REPORT.icon, action : 'invPrintAction' 	  } , '-',
			 	{   text : Const.INSERT.text, iconCls : Const.INSERT.icon, action : Const.INSERT.action   ,cls: 'button-style'} ,
			 	{   text : Const.MODIFY.text, iconCls : Const.MODIFY.icon, action : Const.MODIFY.action  ,cls: 'button-style' } ,
			 	{   text : Const.EXPORT.text, iconCls : Const.EXPORT.icon, action : Const.EXPORT.action  ,cls: 'button-style' } , '-' ,
			 	{   text : Const.DELETE.text, iconCls : Const.DELETE.icon, action : Const.DELETE.action  ,cls: 'button-style' }
			]
		};
		return item ;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item =
				{	defaults : {   style: 'text-align:center'   },
					items    : [
	    	 	   		{	dataIndex : 'row_clos'	   , width:   40, text : Language.get('close_gb',      '마감' ) , xtype : 'lookupcolumn', lookupValue : resource.lookup('row_clos') , align : 'center' },
	        			{   dataIndex : 'stor_nm'     , width:  120, text : Language.get('stor_nm',     '매출사업장') },
	    	 	   		{	dataIndex : 'inv_inpt_path',  width:  70, text: Language.get(''         ,     '작업위치'), xtype : 'lookupcolumn', lookupValue : resource.lookup('inv_inpt_path')    },
	        			{   dataIndex : 'chnl'      , width:   60, text : Language.get('','관리채널'), xtype : 'lookupcolumn' , lookupValue : resource.lookup('sale_ch') },
	        			{   dataIndex : 'invc_numb'       , width:  135, text : Language.get('sale_numb',    '매출번호') , summaryType : 'count'  },
	        			{   dataIndex : 'inv_dt'       , width:   80, text : Language.get('',    '매출일자') , align : 'center'  },
	           			{   dataIndex : 'cust_idcd'      , width:   90, text : Language.get('',    '고객코드'), hidden : true   }  ,
	           			{   dataIndex : 'retn_gb'       , width:   90, text : Language.get('',    '반품여부'), hidden : true   }  ,
	           	        {   dataIndex : 'cust_name'      , width:  150, text : Language.get('cust_name',      '거래처명')    }  ,
	        			//{   dataIndex : 'cust_sts'     , width:   60, text : Language.get('',             '고객상태'), xtype : 'lookupcolumn' , lookupValue : resource.lookup('cust_sts') },
	        			{   dataIndex : 'inv_amt'       , width:   80, text : Language.get('inv_amt',  '매출금액'), align : 'right' , xtype : 'numericcolumn' , font_color : 'blue' ,  summaryType : 'sum'  },
	    			 	{   dataIndex : 'payment'     , width:  80, text: Language.get('',			 '결제금액')	 , align: 'right'  , xtype : 'numericcolumn' , summaryType : 'sum', format : '#,##0' , font_color : Const.COLOR.FONT.payment },
	    			 	{   dataIndex : 'npay_amt'     , width:  80, text: Language.get('',			 '미수금액')	 , align: 'right'  , xtype : 'numericcolumn' , summaryType : 'sum', format : '#,##0' , font_color : Const.COLOR.FONT.npay_amt },

						{	dataIndex : 'tax_dt'	   , width:  80, text : Language.get(''		, '계산서</br> 발행일자')	 },
						{	dataIndex : 'issue_dt'	   , width:  80, text : Language.get(''		, '계산서</br> 작성일자')	 },
	    			 	{   dataIndex : 'salesman_nm'  , width:  90, text : Language.get('',    '영업담당')   },
	        			{   dataIndex : 'user_memo'    , width: 130, text : Language.get('',    '작업메모')   },
	        			{   dataIndex : 'retn_gb'       , width:  60, text : Language.get(''              , '반품상태') , xtype : 'lookupcolumn', lookupValue : resource.lookup('pay_ret_gb') },
	        			{   dataIndex : 'org_invc_numb'       , width: 120, text : Language.get('',    '주문번호') }
	        		]
				};
		return item;
	}
 });
