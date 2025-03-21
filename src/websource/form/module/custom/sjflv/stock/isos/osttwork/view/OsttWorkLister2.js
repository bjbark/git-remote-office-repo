Ext.define('module.custom.sjflv.stock.isos.osttwork.view.OsttWorkLister2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-osttwork-lister2'			,
	store		: 'module.custom.sjflv.stock.isos.osttwork.store.OsttWork2'	,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	border		: 0,
	columnLines : true,
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}, {ptype  :'cellediting-directinput', clicksToEdit: 1 } ],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'toolbar', dock : 'bottom',
				items	: [
					'->', '-' ,
					{text : '<span class="write-button">박스라벨발행</span>'	, action : 'boxlabelAction' , cls: 'button1-style'}
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
							{	dataIndex: 'deli_date'		, text : Language.get('deli_date','납기일자'	) , width : 80
							},{ dataIndex: 'invc_numb'		, text : Language.get('acpt_numb','주문번호'	) , width :  90 , align : 'center'
							},{ dataIndex: 'line_seqn'		, text : Language.get('line_seqn','순번'	    ) , width :  40 , align : 'center'
							},{	dataIndex: 'cstm_name'		, text : Language.get('cstm_name','거래처명'	) , width : 150 , align : 'left'
							},{ dataIndex: 'item_code'		, text : Language.get('item_code','품목코드'	) , width :  70 , align : 'center'
							},{ dataIndex: 'item_name'		, text : Language.get('item_name','품명'		) , width : 280 , align : 'left',
							},{ dataIndex: 'item_spec'		, text : Language.get('item_spec','규격'		) , width : 150 , align : 'left'
							},{	dataIndex: 'dely_cstm_name'	, text : Language.get(''		 , '배송처'	) , width : 120 , align: 'left'
							},{ dataIndex: 'dlvy_addr'		, text : Language.get(''		 ,'배송지'   	) , width : 180 , align : 'left'
							},{ dataIndex: 'invc_qntt'		, text : Language.get('invc_qntt','주문수량'	) , width :  80 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
							},{ dataIndex: 'pack_qntt'		, text : Language.get('pack_qntt','패킹단위'	) , width :  80 , xtype : 'numericcolumn', align : 'right',
								editor	: {
									xtype		:'numericfield',
									selectOnFocus: true,
									allowBlank	: false,
									enableKeyEvents : true,
									listeners:{
										focus:function(a,b,c,d){
											var grid = this.up('grid');
											var idx = grid.getSelectionModel (). getSelection ()[0];
											rowIndexNum = grid.getStore().indexOf(idx);
										},
										keydown : function(self, e) {
											if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
												var grid = self.up('grid'),
													store = me.getStore(),
													selection = me.getSelectionModel().getSelection()[0],
													row = store.indexOf(selection);
													console.log(grid.columns);
											}
										}
									}
								},
							},{	dataIndex: 'boxx_wigt'   	, text : Language.get(''         ,'박스중량'	) , width :  80 , xtype : 'lookupcolumn' , lookupValue: [['20','20'],['10','10']], align : 'center',
								tdCls	 : 'editingcolumn',
								editor	 : {
									xtype		: 'lookupfield',
									lookupValue	: [['20','20'],['10','10']],
									editable	: false,
									selectOnFocus: true,
									enableKeyEvents : true,
									value       : '20',
									listeners:{
										keydown : function(self, e) {
											var	grid = self.up('grid'),
												store = me.getStore(),
												selection = grid.view.getSelectionModel().getSelection()[0],
												row = store.indexOf(selection)
											;
										}
									}
								}
							},{ dataIndex: 'user_memo'		, text : Language.get('user_memo' ,'비고'		) , flex  : 100 , align : 'center'
							}
						]
			}
		;
		return item;
	}
});
