Ext.define('module.custom.iypkg.sale.sale.rqstwork.view.RqstWorkLister2', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-rqstwork-lister2',
	store		: 'module.custom.iypkg.sale.sale.rqstwork.store.RqstWorkLister2',
	border		: 0,
	columnLines	: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  }, { ptype:'filterbar'}  ],

	initComponent: function () {
		var me     = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	viewConfig: {
		getRowClass : function ( record , index ) {
			if(record.get('rnum') == '4' || record.get('rnum') == '3'){
				return 'text-warn';
			}else if(record.get('rnum') == '2'){
				return 'text-blue';
			}
		}
	},

	pagingItem : function () {
		var  me   = this,
			item = {
				xtype : 'grid-paging',
				pagingButton : true,
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
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'lister' , cls: 'button-style', itemId : 'lister2'},
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
					{	dataIndex:	'ostt_date'			, width:  80, align : 'center'	, text: Language.get( 'ostt_date'	, '출고일자'		)
					},{	dataIndex:	'ostt_dvcd'			, width:  60, align : 'left'	, text: Language.get( 'ostt_dvcd'	, '출고구분'		), xtype	: 'lookupcolumn', lookupValue : resource.lookup('ostt_dvcd'),hidden : true
					},{	dataIndex:	'cstm_name'			, width: 193, align : 'left'	, text: Language.get( 'cstm_name'	, '거래처명'		)
					},{	dataIndex:	'acpt_numb'			, width: 124, align : 'center'	, text: Language.get( 'acpt_numb'	, '수주번호'		)
					},{	dataIndex:	'prod_name'			, width: 250, align : 'left'	, text: Language.get( 'prod_name'	, '품명'			)
					},{	dataIndex:	'prod_code'			, width:  70, align : 'center'	, text: Language.get( 'prod_code'	, '품목코드'		), hidden : false
					},{	dataIndex:	'prod_leng'			, width:  45, align : 'right'	, text: Language.get( 'prod_leng'	, '장'			), xtype: 'numericcolumn'
					},{	dataIndex:	'prod_widh'			, width:  45, align : 'right'	, text: Language.get( 'prod_widh'	, '폭'			), xtype: 'numericcolumn'
					},{	dataIndex:	'prod_hght'			, width:  45, align : 'right'	, text: Language.get( 'prod_hght'	, '고'			), xtype: 'numericcolumn'
					},{	dataIndex:	'ostt_qntt'			, width:  80, align : 'right'	, text: Language.get( 'ostt_qntt'	, '출고수량'		), xtype: 'numericcolumn'
					},{	dataIndex:	'sale_qntt'			, width:  80, align : 'right'	, text: Language.get( 'sale_qntt'	, '청구수량'		), xtype: 'numericcolumn'
					},{	dataIndex:	'unpaid'			, width:  80, align : 'right'	, text: Language.get( 'unpaid'		, '미청구수량'	), xtype: 'numericcolumn'
					},{	dataIndex:	'sale_pric'			, width:  60, align : 'right'	, text: Language.get( 'sale_pric'	, '단가/개'		), xtype: 'numericcolumn'
					},{	dataIndex:	'sale_amnt'			, width:  90, align : 'right'	, text: Language.get( 'sale_amnt'	, '공급가액'		), xtype: 'numericcolumn'
					},{	dataIndex:	'vatx_amnt'			, width:  90, align : 'right'	, text: Language.get( 'vatx_amnt'	, '부가세액'		), xtype: 'numericcolumn'
					},{	dataIndex:	'ttsm_amnt'			, width: 100, align : 'right'	, text: Language.get( 'ttsm_amnt'	, '합계금액'		), xtype: 'numericcolumn'
					},{	dataIndex:	'pcod_numb'			, width: 180, align : 'left'	, text: Language.get( 'pcod_numb'	, 'P/O No'		),
					},{	dataIndex:	'user_memo'			, flex :   1, align : 'left'	, text: Language.get( 'user_memo'	, '비고'			)
					}
				]
			};
		return item;
	}
 });