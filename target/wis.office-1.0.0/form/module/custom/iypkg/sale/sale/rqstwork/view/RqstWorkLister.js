Ext.define('module.custom.iypkg.sale.sale.rqstwork.view.RqstWorkLister', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-rqstwork-lister',
	store		: 'module.custom.iypkg.sale.sale.rqstwork.store.RqstWork',
	border		: 0,
	columnLines	: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  }, { ptype:'filterbar'}  ],

	initComponent: function () {
		var me     = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	viewConfig: {
		getRowClass : function ( record , index ) {
			if(record.get('rnum') == '3' || record.get('rnum') == '4'){
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
					'-','->','->','->','->',
					{text : '<span class="write-button">발행</span>', action : 'printAction'  , cls: 'button1-style', width:80},
					{text : '<span class="write-button">업로드 양식발행</span>', action : 'uploadExcelAction'  , cls: 'button1-style', width:90},
					,'-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'lister' , cls: 'button-style', itemId : 'lister'},
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
					{	dataIndex:	'sale_date'			, width:  80, align : 'center'	, text: Language.get( 'invc_numb'	, '청구일자'		)
					},{	dataIndex:	'cstm_name'			, width: 193, align : 'left'	, text: Language.get( 'cstm_name'	, '거래처명'		)
					},{	dataIndex:	'cstm_idcd'			, width: 193, align : 'left'	, text: Language.get( 'cstm_idcd'	, '거래처명'		), hidden : true
					},{	dataIndex:	'invc_numb'			, width: 70, align : 'center'	, text: Language.get( 'invc_numb'	, '청구번호'		)
					},{	dataIndex:	'acpt_numb'			, width: 110, align : 'center'	, text: Language.get( 'acpt_numb'	, '수주번호'		)
					},{	dataIndex:	'prod_name'			, width: 250, align : 'left'	, text: Language.get( 'prod_name'	, '품명'			)
					},{	dataIndex:	'prod_code'			, width:  70, align : 'center'	, text: Language.get( 'prod_code'	, '품목코드'		), hidden : false
					},{	dataIndex:	'prod_leng'			, width:  45, align : 'right'	, text: Language.get( 'prod_leng'	, '장'			)
					},{	dataIndex:	'prod_widh'			, width:  45, align : 'right'	, text: Language.get( 'prod_widh'	, '폭'			)
					},{	dataIndex:	'prod_hght'			, width:  45, align : 'right'	, text: Language.get( 'prod_hght'	, '고'			)
					},{	dataIndex:	'ostt_qntt'			, width:  80, align : 'right'	, text: Language.get( 'ostt_qntt'	, '출고수량'		), xtype: 'numericcolumn'
					},{	dataIndex:	'sale_qntt'			, width:  80, align : 'right'	, text: Language.get( 'sale_qntt'	, '청구수량'		), xtype: 'numericcolumn'
					},{	dataIndex:	'porm_qntt'			, width:  80, align : 'right'	, text: Language.get( 'porm_qntt'	, '가감'			), xtype: 'numericcolumn'
					},{	dataIndex:	'sale_pric'			, width:  60, align : 'right'	, text: Language.get( 'sale_pric'	, '단가/개'		), xtype: 'numericcolumn',
						renderer: function(val,meta,rec) {
							if(rec.data.prod_name == '일계' || rec.data.prod_name == '월계' || rec.data.prod_name == '합계'){
								return ;
							}else{
								return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							}
						}
					},{	dataIndex:	'sale_amnt'			, width:  90, align : 'right'	, text: Language.get( 'sale_amnt'	, '공급가액'		), xtype: 'numericcolumn'
					},{	dataIndex:	'vatx_amnt'			, width:  90, align : 'right'	, text: Language.get( 'vatx_amnt'	, '부가세액'		), xtype: 'numericcolumn'
					},{	dataIndex:	'ttsm_amnt'			, width: 100, align : 'right'	, text: Language.get( 'ttsm_amnt'	, '합계금액'		), xtype: 'numericcolumn'
					},{	dataIndex:	'user_memo'			, flex :   1, align : 'left'	, text: Language.get( 'user_memo'	, '비고'			)
					}
				]
			};
		return item;
	}
 });