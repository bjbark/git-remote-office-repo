Ext.define('module.custom.komec.mtrl.po.purcwait.view.PurcWaitLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-komec-purcwait-lister',
	store		: 'module.custom.komec.mtrl.po.purcwait.store.PurcWait'	,

	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' },{ptype  :'cellediting-directinput', clicksToEdit: 1 } ],
//	border		: 0,
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
				    '->',
				    	{	text : '<span class="write-button">라벨 출력</span>', action : 'labelAction',cls: 'button1-style', width: 70	},
					'->', '-' ,
					{	text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action ,cls: 'button-style' },
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'line_clos'		, text : Language.get('line_clos'		,'마감'		) , width : 50  , xtype : 'lookupcolumn', lookupValue : resource.lookup('line_clos'), align : 'center'
					},{ dataIndex: 'deli_date'		, text : Language.get('deli_date'		,'납기일자'		) , width : 80 , align : 'center'
					},{ dataIndex: 'invc_date'		, text : Language.get('offr_date'		,'발주일자'		) , width : 80  , align : 'center'
					},{ dataIndex: 'invc_numb'		, text : Language.get('offr_numb'		,'발주번호'		) , width : 120 , align : 'center'
					},{ dataIndex: 'line_seqn'		, text : Language.get('pcod_seqn'		,'발주항번'		) , width : 60  , align : 'center'
					},{ dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		,'거래처명'		) , width : 150 , align : 'left'
					},{ dataIndex: 'item_code'		, text : Language.get('item_code'		,'품목코드'		) , width : 90  , align : 'center'
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명'			) , width : 160 , align : 'left'
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'규격'			) , width : 160 , align : 'left'
					},{ dataIndex: 'offr_qntt'		, text : Language.get('offr_qntt'		,'발주수량'		) , width : 80  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'istt_qntt'		, text : Language.get('istt_qntt'		,'입고수량'		) , width : 80  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'upid_baln_qntt'	, text : Language.get('upid_baln_qntt'	,'미입고수량'	) , width : 80  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'qntt'			, text : Language.get('qntt'			,'수량'			) , width : 80  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
						, tdCls : 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = me,
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										setTimeout(function(){
											grid.plugins[2].startEdit(row, grid.columns[13]);
										},100)
									}
								},
							}
						}
					},{ dataIndex: 'divs_qntt'		, text : Language.get('divs_qntt'		,'라벨수량'		) , width : 80  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
						, tdCls : 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = me,
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										setTimeout(function(){
											grid.plugins[2].startEdit(row, grid.columns[14]);
										},100)
									}
								},
							}
						}
					},
					{ dataIndex: 'lott_numb'		, text : Language.get('lott_numb'		,'LOT번호'	) , width : 160
						, tdCls : 'editingcolumn',
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = me,
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										setTimeout(function(){
											grid.plugins[2].startEdit(row+1, grid.columns[12]);
										},100)
									}
								},
							}
						}
					},{ dataIndex: 'user_memo'		, text : Language.get('user_memo'		,'비고'		) , flex  : 100
					}
				]
			}
		;
		return item;
	}
});