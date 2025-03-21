Ext.define('module.custom.iypkg.stock.isos.saleostt2.view.SaleOstt2Lister', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-saleostt2-lister',
	store		: 'module.custom.iypkg.stock.isos.saleostt2.store.SaleOstt2Lister',
	border		: 0,
	columnLines	: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{  ftype: 'grid-summary' } ],
	plugins		: [{ ptype  :'cellediting-directinput' , clicksToEdit: 1 },{ ptype: 'gridcolumnconfig'},{
        ptype: 'bufferedrenderer',			// 데이터가 많을 경우 처리
        trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll.
        leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll.
    }],
	initComponent: function () {
		var me     = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	viewConfig: {
		loadMask	: false,
		getRowClass : function ( record , index ) {
			if(record.get('acpt_dvcd')=='2000'){
				return 'line-plan';
			}else if(record.get('acpt_dvcd')=='3000'){
				return 'line-prod2';
			}else if(record.get('acpt_dvcd')=='4000'){
				return 'line-goods2';
			}else if(record.get('acpt_dvcd')=='5000'){
				return 'line-stock';
			}
		}
	},

	pagingItem : function () {
		var  me   = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->',
					{	text : '<span class="write-button">거래명세서 출력</span>', width : 100, action : 'printAction'	, cls: 'button1-style'	} , '-',
					{	text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action ,cls: 'button-style' },
					{	text: Const.DELETE.text , iconCls: Const.DELETE.icon , action : Const.DELETE.action ,cls: 'button-style' },
					{	text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action ,cls: 'button-style' },
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'lister' , cls: 'button-style'},
				]
			};
		return item ;
	},

	columnItem : function () {
		var me   = this,
			item =  {
				defaults: {style: 'text-align:center'},
				items   : [
					{	dataIndex:	'invc_date', width:  80, align : 'center'	, text: Language.get('deli_date2', '출고일자'	),
						tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'datefield',
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										var val = this.getValue()
										var a = "";
										if(val != null){
											if((typeof val) == "object"){
												var date1 = new Date(val);
												date2 = Ext.Date.format(date1,'Y-m-d'),
												a = date2;
											}else{
												if(val.match(/[0-9]/)){
													a = val.substr(0,4)+'-'+val.substr(4,2)+'-'+val.substr(6,2);
												}
											}
										}
										if(a!="" && a != null){
											this.setValue(a);
										}else{
											this.setValue(val);
										}
										grid.plugins[0].startEdit(row,  grid.columns[1]);
									}
								}
							}
						},
						renderer:function(val){
							var a = null;
							if(val){
								if(val.match(/[^0-9]/)){
									var date1 = new Date(val);
									date2 = Ext.Date.format(date1,'Y-m-d'),
									a = date2
									;
								}else{
									a = val.substr(0,4)+'-'+val.substr(4,2)+'-'+val.substr(6,2);
								}
							}
						return a;
						},
					},{	dataIndex:	'invc_numb'			, width:  80, align : 'center'	, text: Language.get( 'invc_numb'		, '출고번호'	), summaryType : 'count'
					},{	dataIndex:	'cstm_name'			, width: 194, align : 'left'	, text: Language.get( 'cstm_name'		, '거래처명'	)
					},{	dataIndex:	'acpt_numb'			, width: 123, align : 'center'	, text: Language.get( 'acpt_numb'		, '수주번호'	), summaryType : 'count'
					},{	dataIndex:	'dlvy_drtr_name'	, width: 180, align : 'left'	, text: Language.get( 'dlvy_drtr_name'	, '납품처명'	)
					},{	dataIndex:	'prod_name'			, width: 250, align : 'left'	, text: Language.get( 'prod_name'		, '품명'		)
					},{	dataIndex:	'prod_leng'			, width:  60, align : 'right'	, text: Language.get( 'prod_leng'		, '장'		), xtype: 'numericcolumn'
					},{	dataIndex:	'prod_widh'			, width:  60, align : 'right'	, text: Language.get( 'prod_widh'		, '폭'		), xtype: 'numericcolumn'
					},{	dataIndex:	'prod_hght'			, width:  60, align : 'right'	, text: Language.get( 'prod_hght'		, '고'		), xtype: 'numericcolumn'
					},{	dataIndex:	'ostt_qntt'			, width: 100, align : 'right'	, text: Language.get( 'ostt_qntt'		, '출고수량'	), xtype: 'numericcolumn'
						, tdCls : 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										grid.plugins[0].startEdit(row+1, grid.columns[10]);
									}
								}
							}
						}
					},{	dataIndex:	'porm_qntt'			, width:  50, align : 'right'	, text: Language.get( 'porm_qntt'		, '가감'		), xtype: 'numericcolumn'
						, tdCls : 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										grid.plugins[0].startEdit(row+1, grid.columns[11]);
									}
								}
							}
						}
					},{	dataIndex:	'sale_pric'			, width:  80, align : 'right'	, text: Language.get( 'sale_pric'		, '단가/개'	), xtype: 'numericcolumn'
					},{	dataIndex:	'vatx_incl_yorn'	, width:  80, align : 'center'	, text: Language.get( 'vatx_incl_yorn'	, '자료구분'	), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' ),
					},{	dataIndex:	'sale_amnt'			, width: 100, align : 'right'	, text: Language.get( 'sply_amnt'		, '공급가액'	), xtype: 'numericcolumn', summaryType : 'sum'
					},{	dataIndex:	'vatx_amnt'			, width: 100, align : 'right'	, text: Language.get( 'vatx_amnt'		, '부가세액'	), xtype: 'numericcolumn', summaryType : 'sum'
					},{	dataIndex:	'ttsm_amnt'			, width: 120, align : 'right'	, text: Language.get( 'ttsm_amnt'		, '합계금액'	), xtype: 'numericcolumn', summaryType : 'sum'
					},{	dataIndex:	'drtr_name'			, width:  80, align : 'left'	, text: Language.get( ''	, '담당자명'		)
					},{	dataIndex:	'cars_alis'			, width: 100, align : 'left'	, text: Language.get( ''	, '차량명'			)
					},{	dataIndex:	'nwek_name'			, width: 100, align : 'left'	, text: Language.get( ''	, '기사명'			)
					},{	dataIndex:	'user_memo'			, flex :   1, align : 'left'	, text: Language.get( 'user_memo'		, '비고'		)
					}
				]
			};
		return item;
	},
	cellEditAfter  : function (editor, context) {
		var	grid = this,
			pos = grid.view.getSelectionModel().getCurrentPosition().row,
			select = grid.getSelectionModel().getSelection()[0],
			models = grid.getStore().getRange(),
			store = grid.getStore()
		;
		var total = select.get('ostt_qntt') * select.get('sale_pric'),
			vatx  = Math.floor(total/10)*10
		;
		models[pos].set('sale_amnt',total);
		models[pos].set('vatx_amnt',vatx);
		models[pos].set('ttsm_amnt',total+vatx);
	},

	listeners: {
		validateedit : function (editor, context, eOpts ) {
			var me = this;
			var field = context.field;
			var value = context.value;
			return true;
		},
		edit : function(editor, context) {
			var me = this;
			me.cellEditAfter(editor, context);
		}
	},
 });