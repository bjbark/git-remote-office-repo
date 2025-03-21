Ext.define('module.sale.sale.salelist2.view.SaleList2Lister', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-salelist2-lister',
	store		: 'module.sale.sale.salelist2.store.SaleList2',
	border		: 0,
	columnLines	: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  } , { ptype:'filterbar'} ],

	initComponent: function () {
		var me     = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	viewConfig: {
		getRowClass : function ( record , index ) {
			console.log(record);
			if(record.get('cstm_code') == '합계'){
				return 'text-warn';
			}else if(record.get('cstm_code') == '소계'){
				return 'text-green';
			}
		}
	},

	pagingItem : function () {
		var  me   = this,
			item = {
				xtype : 'grid-paging',
				pagingButton : false,
				items : [
					{	xtype   : 'button',
						iconCls : 'filterIcon',
						toggleGroup:'detail',
						listeners:{
							toggle:function(toggle){
								var filter = me.filterBar;
									filter.setVisible(toggle.pressed);
							}
						},
					},
					'-','->','->','->','->','-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'lister' , cls: 'button-style'},
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
				items   : [
					{	dataIndex:	'cstm_code'		, width:  80, align : 'center'	, text: Language.get('cstm_code'	, '거래처코드'	)
					},{	dataIndex:	'cstm_name'		, width: 150, align : 'left'	, text: Language.get('cstm_name'	, '거래처명'	)
					},{	dataIndex:	'cstm_amnt'		, width: 130, align : 'right'	, text: Language.get( 'cstm_amnt'	, '기초이월'	), xtype: 'numericcolumn',
					},{	dataIndex:	'ostd_amnt'		, width: 130, align : 'right'	, text: Language.get( ''	, '전월미수'	), xtype: 'numericcolumn',
					},{	dataIndex:	'sale_amnt'		, width: 130, align : 'right'	, text: Language.get( 'sale_amnt'	, '공급가액'	), xtype: 'numericcolumn',
					},{	dataIndex:	'vatx_amnt'		, width: 130, align : 'right'	, text: Language.get( 'vatx_amnt'	, '부가세액'	), xtype: 'numericcolumn',
					},{	dataIndex:	'ttsm_amnt'		, width: 130, align : 'right'	, text: Language.get( 'ttsm_amnt'	, '합계금액'	), xtype: 'numericcolumn',
					},{	dataIndex:	'sale_ttsm'		, width: 100, align : 'right'	, text: Language.get( 'sale_ttsm'	, '수금액'		), xtype: 'numericcolumn',
					},{	dataIndex:	'baln'			, width: 100, align : 'right'	, text: Language.get( ''	, '잔액'		), xtype: 'numericcolumn',
					},{	dataIndex:	'user_name'		, width: 100, align : 'left'	, text: Language.get( 'user_name'	, '담당자'		)
					},{	dataIndex:	'user_memo'		, flex :   1, align : 'center'	, text: Language.get( 'user_memo'	, '비고'		), minWidth : 130, maxWidth : 500
					},{	dataIndex:	'hdph_numb'		, width: 130, align : 'center'	, text: Language.get( 'hdph_numb'	, '전화번호'	)
					}
				]
			};
		return item;
	}
 });