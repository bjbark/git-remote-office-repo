Ext.define('module.mtrl.po.poplan.view.PoPlanListerMaster2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-poplan-lister-master2',
	store		: 'module.mtrl.po.poplan.store.PoPlanMaster2'	,

	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	plugins : [{ptype  :'cellediting-directinput', clicksToEdit: 1 }],

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
					'->', '-' ,
					{	text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action ,cls: 'button-style' },
					{	text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action ,cls: 'button-style' },
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'item_code'	, text : Language.get('item_code' ,'품목코드'	) , width : 90 , align : 'center'
					},{	dataIndex: 'item_name'	, text : Language.get('item_name' ,'품명'		) , width : 300 , align : 'left'
					},{	dataIndex: 'item_spec'	, text : Language.get('item_spec' ,'규격'		) , width : 200 , align : 'left'
					},{	dataIndex: 'unit_name'	, text : Language.get('unit_name' ,'단위'		) , width : 70 , align : 'left'
					},{ dataIndex: 'need_qntt'	, text : Language.get('need_qntt','소요량'		) , width : 100 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: ''			, text : Language.get('','현재고'		) , width : 100 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: ''			, text : Language.get('','발주잔량'	) , width : 100 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: ''			, text : Language.get('','과부족수량'	) , width : 100 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: ''			, text : Language.get('','재고사용량'	) , width : 100 , xtype : 'numericcolumn', align : 'right',
					},{ dataIndex: 'offr_qntt'	, text : Language.get('','발주수량'	) , width : 100 , xtype : 'numericcolumn', align : 'right',
						tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
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
										grid.plugins[0].startEdit(row, grid.columns[13]);
									}
								}
							}
						},
					},{ dataIndex: 'cstm_name'	, text : Language.get('','거래처'		) , width : 250
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								tooltip	: '거래처 찾기',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									resource.loadPopup({
									select	: 'SINGLE',
									widget	: 'lookup-cstm-popup',
									params:{
										stor_grp : _global.stor_grp, line_stat : '0'
									},
									result	: function(records) {
										var	parent = records[0];
										var grid = me.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0]
										row = store.indexOf(selection);
											record.set('cstm_name',parent.data.cstm_name);
											record.set('cstm_idcd',parent.data.cstm_idcd);
											me.plugins[0].startEdit(row, 3);
										},
									})
								},
								scope : me
							}
						]
					},{	dataIndex: 'cstm_idcd'	, hidden	: true,
					},{ dataIndex: 'deli_date'	, text : Language.get('','납기일자'		) , width  :  100, align : 'center',
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
										grid.plugins[0].startEdit(row, grid.columns[13]);
									}
								}
							}
						},
					}
				]
			}
		;
		return item;
	}
});