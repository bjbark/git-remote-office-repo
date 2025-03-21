Ext.define('module.design.project.stndbomwork.view.StndBomWorkTree2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-stndbomwork-tree2',
	store		: 'module.design.project.stndbomwork.store.StndBomWorkTree2',
	plugins		: [{ ptype  :'cellediting-directinput', clicksToEdit: 1 } ,{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
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
					{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action, cls: 'button-style' },
					{ text : Const.DELETE.text, iconCls: Const.DELETE.icon , action : Const.DELETE.action, cls: 'button-style' },
					'-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } ,
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
		item = {
				defaults	: {style: 'text-align:center'/*, sortable: false, menuDisabled: true */},
				items		: [
					{	text	: '품명'		, dataIndex: 'item_name'	, width : 300	,
					},{	text : '순서'		, dataIndex: 'line_seqn'		, width :  40	, align : 'center', xtype : 'numericcolumn', hidden : true
					},{ text : '품목코드'	, dataIndex: 'item_idcd'		, width : 100	, hidden : false,align:'center',
						renderer:function(value){
							var str = value.split('-');
							var result = str[2];
							for(var i = 3 ; i < str.length;i++){
								result += '-'+str[i];
							}

							return result;
						}
					},{ text : '재질'		, dataIndex: 'item_mtrl'		, width : 80	, hidden : false
					},{ text : '규격'		, dataIndex: 'item_spec'		, width : 100	, hidden : false
					},{ text : '소요량'		, dataIndex: 'need_qntt'		, width :  85	, xtype  : 'numericcolumn',
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
										grid.plugins[0].startEdit(row, grid.columns[6]);
									}
								}
							}
						}
					},{	text : '등록일자'	, dataIndex: 'strt_date'		, width :  80	, hidden : true
					},{ text : '메모'		, dataIndex: 'user_memo'		, flex  : 1		, hidden : true
					},{ text : '이미지'		, dataIndex: 'imge_1fst'		, width : 100	, hidden : true
					}
				]
		};
		;
		return item;
	}
});