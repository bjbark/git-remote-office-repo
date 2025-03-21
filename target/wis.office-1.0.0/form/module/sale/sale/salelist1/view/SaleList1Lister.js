Ext.define('module.sale.sale.salelist1.view.SaleList1Lister', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-salelist1-lister',
	store		: 'module.sale.sale.salelist1.store.SaleList1',
	border		: 0,
	columnLines	: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{  ftype: 'grid-summary' } ],
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  }, { ptype:'filterbar'} ],

	initComponent: function () {
		var me     = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	viewConfig: {
		getRowClass : function ( record , index ) {
			if(record.get('rnum') == '2' || record.get('rnum') == '6' || record.get('rnum') == '7'){
				return 'text-warn';
			}else if(record.get('rnum') == '5'){
				return 'text-blue';
			}else if(record.get('rnum') == '4'){
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
					{	dataIndex:	'cstm_code'			, width:  80, align : 'center'	, text: Language.get(''		, '거래처코드')
					},{	dataIndex:	'cstm_name'			, width: 194, align : 'left'	, text: Language.get(''		, '거래처명'	)
					},{	dataIndex:	'invc_date'			, width: 100, align : 'center'	, text: Language.get(''		, '매출일자'	)
					},{	dataIndex:	'prod_name'			, width: 250, align : 'left'	, text: Language.get(''		, '품명'		)
					},{	dataIndex:	'prod_spec'			, width: 150, align : 'left'	, text: Language.get(''		, '규격'		)
					},{	dataIndex:	'ostt_qntt'			, width:  85, align : 'right'	, text: Language.get(''		, '출고수량'	), xtype: 'numericcolumn', summaryType: 'sum',
						renderer: function(val,meta,rec) {
							if(rec.data.cstm_name == '기초이월' || rec.data.cstm_name == '전월'){
								return ;
							}else{
								return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							}
						}
					},{	dataIndex:	'sale_pric'			, width: 100, align : 'right'	, text: Language.get( ''	, '단가'		), xtype: 'numericcolumn',
						renderer: function(val,meta,rec) {
							if(rec.data.cstm_name == '일계' || rec.data.cstm_name == '월계' || rec.data.cstm_name == '합계'){
								return ;
							}else{
								return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							}
						}
					},{	dataIndex:	'sale_amnt'			, width: 100, align : 'right'	, text: Language.get( ''	, '공급가액'	), xtype: 'numericcolumn', summaryType: 'sum',
						renderer: function(val,meta,rec) {
							if(rec.data.cstm_name == '기초이월' || rec.data.cstm_name == '전월'){
								return ;
							}else{
								return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							}
						}
					},{	dataIndex:	'vatx_amnt'			, width: 100, align : 'right'	, text: Language.get( ''	, '부가세액'	), xtype: 'numericcolumn', summaryType: 'sum',
						renderer: function(val,meta,rec) {
							if(rec.data.cstm_name == '기초이월'|| rec.data.cstm_name == '전월'){
								return ;
							}else{
								return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							}
						}
					},{	dataIndex:	'ttsm_amnt'			, width: 100, align : 'right'	, text: Language.get( ''	, '합계금액'	), xtype: 'numericcolumn', summaryType: 'sum',
						renderer: function(val,meta,rec) {
							if(rec.data.cstm_name == '기초이월'){
								return ;
							}else{
								return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							}
						}
					},{	dataIndex:	'sale_ttsm'			, width: 100, align : 'right'	, text: Language.get( ''	, '수금액'	), xtype: 'numericcolumn', summaryType: 'sum',
						renderer: function(val,meta,rec) {
							if(rec.data.cstm_name == '기초이월'){
								return ;
							}else{
								return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							}
						}
					},{	dataIndex:	'baln'				, width: 100, align : 'right'	, text: Language.get( ''	, '잔액'		), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'optn_item_yorn'	, flex :   1, align : 'center'	, text: Language.get( ''	, '비고'		), minWidth : 200, maxWidth : 500,
					}
				]
			};
		return item;
	}
 });