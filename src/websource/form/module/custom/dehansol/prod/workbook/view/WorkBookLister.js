Ext.define('module.custom.dehansol.prod.workbook.view.WorkBookLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-dehansol-workbook-lister',
	store		: 'module.custom.dehansol.prod.workbook.store.WorkBook',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },


	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],
	columnLines : true,
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
					{text : '<span class="write-button">작업일지발행</span>'	, action : 'PrintAction', cls: 'button1-style'	,width:  80} , '-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } //엑셀버튼.
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
					{	dataIndex: 'invc_date'	, text : Language.get('prod_date'	,'생산일자'	) , width : 90 , align : 'center'
					},{	dataIndex: 'dayn_dvcd'	, text : Language.get('dayn_dvcd'	,'주/야'		) , width : 70 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('dayn_dvcd')
					},{	dataIndex: 'wkct_name'	, text : Language.get('wkct_name'	,'공정'		) , width : 50 , align : 'left'
					},{	dataIndex: 'cvic_idcd'	, text : Language.get('cvic_idcd'	,'설비ID'	) , width : 200, align : 'left' ,hidden : true
					},{	dataIndex: 'cvic_name'	, text : Language.get('cvic_name'	,'설비명'	) , width : 55 , align : 'left' ,hidden : true
					},{	dataIndex: 'mold_idcd'	, text : Language.get('pjod_idcd'	,'금형번호'	) , width : 70 , align : 'left' , hidden : true
					},{ dataIndex: 'item_code'	, text : Language.get('item_code'	,'품목코드'	) , width : 100, align : 'center'
					},{ dataIndex: 'item_mtrl'	, text : Language.get('item_mtrl'	,'품목재질'	) , width : 150, align : 'left' ,hidden : true
					},{ dataIndex: 'item_name'	, text : Language.get('item_name'	,'품명'	) , width : 300, align : 'left'
					},{ dataIndex: 'item_spec'	, text : Language.get('item_spec'	,'품목규격'	) , width : 250, align : 'left' ,hidden : true
					},{ dataIndex: 'cavity'		, text : Language.get('cavity'		,'CAVITY'	) , width : 55 , align : 'center',hidden : true
					},{ dataIndex: 'need_time'	, text : Language.get('need_time'	,'소요시간'	) , width : 70 , align : 'center',hidden : true
					},{ dataIndex: 'theo_qntt'	, text : Language.get('theo_qntt'	,'이론수량'	) , width : 65 , align : 'right' , hidden : true
					},{ dataIndex: 'good_prgs'	, text : Language.get('good_prgs'	,'양품율'	) , width : 70 , align : 'right' , xtype: 'numericcolumn',hidden : true
					},{ dataIndex: 'invc_pric'	, text : Language.get('invc_pric'	,'단가'		) , width : 70 , align : 'right' , xtype: 'numericcolumn', summaryType : 'sum',hidden : true
					},{ dataIndex: 'sply_amnt'	, text : Language.get('sply_amnt'	,'금액'		) , width : 130, align : 'right' , xtype: 'numericcolumn', summaryType : 'sum',hidden : true
					},{ dataIndex: 'prod_qntt'	, text : Language.get('prod_qntt'	,'생산수량'	) , width : 70 , align : 'right' , xtype: 'numericcolumn', summaryType : 'sum'
					},{	dataIndex: 'ostt_qntt'	, text : Language.get( 'ostt_qntt'	,'출고수량'	) , width : 100, align : 'right' , xtype: 'numericcolumn', summaryType : 'sum'
					},{	dataIndex: 'stok_qntt'	, text : Language.get( 'stok_qntt'	,'재고수량'	) , width : 100, align : 'right' , xtype: 'numericcolumn', summaryType : 'sum'
					},{	dataIndex: 'succ_qntt'	, text : Language.get( 'succ_qntt'	,'인계수량'	) , width : 100, align : 'right' , xtype: 'numericcolumn', summaryType : 'sum'
					},{	dataIndex: 'poor_qntt'	, text : Language.get( 'poor_qntt'	,'불량수량'	) , width : 100, align : 'right' , xtype: 'numericcolumn', summaryType : 'sum'
					},{ dataIndex: 'user_memo'	, text : Language.get('user_memo'	,'메모사항'	) , flex  :   1, align : 'left'
					}
				]
			}
		;
		return item;
	 }

});
