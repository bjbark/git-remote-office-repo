Ext.define('module.mtrl.isttcalc.npayinit.view.NpayInitLister', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-npayinit-lister',
	store		: 'module.mtrl.isttcalc.npayinit.store.NpayInit',
	border		: 0,
	columnLines	: true,
	features	: [{ ftype : 'grid-summary' }],
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent: function () {
		var me     = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var  me   = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'-', '->',
					{text : Const.UPDATE.text , iconCls: Const.UPDATE.icon, action : Const.UPDATE.action , cls: 'button-style'},
					{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action, cls: 'button-style' },
					{text : Const.EXPORT.text , iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'lister' , cls: 'button-style'},
				], pagingButton : false
			};
		return item ;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me		= this,
			item	=  {
				defaults: {style: 'text-align:center'},
				items	: [
					{	dataIndex:	'cstm_code', width: 100, align : 'center',	text: Language.get( 'cstm_code'		, '거래처코드'	)
					},{	dataIndex:	'cstm_name', width: 250, align : 'left'	 ,	text: Language.get( 'cstm_name'		, '거래처명'	)
					},{	dataIndex:	'txbl_amnt', width: 180, align : 'right' ,	text: Language.get( '', '이월금액'), xtype: 'numericcolumn', summaryType: 'sum'
						, tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: false,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										grid.plugins[0].startEdit(row, grid.columns[3]);
									}
								}
							}
						}
					},{	dataIndex:	'remk_text'			, flex : 1 , align : 'left',	text: Language.get( 'remk_text'		, '비고'		)
						, tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: false,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										grid.plugins[0].startEdit(row+1, grid.columns[4]);
									}
								}
							}
						}
					}
				]
			};
		return item;
	},

 });