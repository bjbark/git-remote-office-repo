Ext.define('module.sale.sale.bondinit.view.BondInitLister', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-bondinit-lister',
	store		: 'module.sale.sale.bondinit.store.BondInit',
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
					{	text : '<span class="write-button">엑셀 업로드</span>', action : 'uploadAction', cls: 'button-style'  ,width:80 },
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
					{	dataIndex:	'cstm_code'		, width: 80		, align : 'center'	,	text: Language.get( 'cstm_code'		, '거래처코드'	)
					},{	dataIndex:	'cstm_name'		, width: 230	, align : 'left'	,	text: Language.get( 'cstm_name'		, '거래처명'	)
					},{	dataIndex:	'buss_numb'		, width: 100	, align : 'center'	,	text: Language.get( 'buss_numb'		, '사업자등록번호'	)
					},{	dataIndex:	'mail_addr'		, width: 180	, align : 'left'	,	text: Language.get( 'mail_addr'		, '이메일'	)
					},{	dataIndex:	'user_name'		, width: 100	, align : 'left'	,	text: Language.get( ''		, '담당자'	)
					}
//					,{	xtype	: 'actioncolumn',
//						header	: '',
//						width	: 20,
//						align	: 'center',
//						items	: [
//							{	iconCls	: Const.SELECT.icon,
//								tooltip	: '담당자 찾기',
//								handler	: function (grid, rowIndex, colIndex, item, e, record) {
//									check = '1'
//									;
//									resource.loadPopup({
//										select	: 'SINGLE',
//										widget	: 'lookup-user-popup',
//										params:{  line_stat : '0'},
//										result	: function(records) {
//											var	parent = records[0];
//											var grid = me.up('grid'),
//												store = me.getStore(),
//												selection = me.getSelectionModel().getSelection()[0]
//												row = store.indexOf(selection);
//												record.set('user_name',parent.data.user_name);
//												record.set('sale_drtr_idcd',parent.data.user_idcd);
//												me.plugins[0].startEdit(row, 6);
//											},
//									})
//								},
//								scope : me
//							}
//						]
//					}
					,{	dataIndex:	'txbl_amnt'	, width: 180, align : 'right'		,	text: Language.get( '', '이월금액'), xtype: 'numericcolumn', summaryType: 'sum'
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