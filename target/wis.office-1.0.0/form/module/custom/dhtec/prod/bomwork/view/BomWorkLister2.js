Ext.define('module.custom.dhtec.prod.bomwork.view.BomWorkLister2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-bomwork-lister2',
	store		: 'module.custom.dhtec.prod.bomwork.store.BomWorkStore2',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	plugins		: [
		{	ptype: 'gridcolumnmenu'
		},{	ptype: 'gridcolumnconfig'
		},{	ptype: 'cellediting-directinput',
			clicksToEdit: 1
		}
	],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },
	initComponent: function () {
		var me = this;
		me.dockedItems = me.dockedItems();
		me.columns = me.columnItem();
		me.callParent();
	},

	dockedItems : function () {
		var me = this,
			item = {
				xtype: 'toolbar',
				dock: 'bottom',
				items: [
					'-',
					{	text: '<span class="write-button">▲</span>'		, handler: me.upAction		, cls: 'button1-style', width:30 },
					'-',
					{	text: '<span class="write-button">▼</span>'		, handler: me.downAction	, cls: 'button1-style', width:30 },
					'->',
					{	text: '<span class="write-button">행추가</span>', handler: me.addRow		, cls: 'button-style'} ,
					'-',
					{	text: '<span class="write-button">행삭제</span>', handler: me.removeRow		, cls: 'button1-style'} ,
					'->',
					{	text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action , cls: 'button-style'	},
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items	: [
					{	dataIndex: 'line_ordr'		, text: Language.get('line_seqn'	, '순번'	)	, width: 45	, align: 'center'
					},{ dataIndex: 'acct_name'		, text: Language.get('acct_name'	, '계정구분')	, width: 90	, align: 'center'
					},{ dataIndex: 'item_code'		, text: Language.get('item_code'	, '품목코드')	, width: 90
					},{ dataIndex: 'item_name'		, text: Language.get('item_name'	, '품명'	)	, width: 180
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								tooltip	: '품목코드 찾기',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									resource.loadPopup({
										select	: 'SINGLE',
										widget	: 'lookup-item-popup-v4',
										params:{
											stor_grp	: _global.stor_grp,
											line_stat	: '0',
											acct_bacd	: '2002'
										},
										onwer : this,
										result	: function(records) {
											var value = records[0];
											record.set('ivst_item_idcd',value.get('item_idcd'));
											record.set('item_code',value.get('item_code'));
											record.set('item_name',value.get('item_name'));
											record.set('item_spec',value.get('item_spec'));
											record.set('acct_bacd',value.get('acct_bacd'));
											record.set('acct_name',value.get('acct_bacd_name'));
										}
									});
								}
							}
						]
					},{ dataIndex: 'item_spec'		, text: Language.get('item_spec'	, '규격'	)	, width: 90
					},{ dataIndex: 'need_qntt'		, text: Language.get('need_qntt'	, '소요량')	, width: 90	, xtype: 'numericcolumn', format: '#,##0.###'
						, tdCls : 'editingcolumn'
						, editor: {
							xtype			:'numericfield',
							selectOnFocus	: true,
							allowBlank		: false,
							enableKeyEvents	: true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER) {
									}
								}
							}
						}
					},{ dataIndex: ''				, text: Language.get(''				, '등록일시')	, width: 90
					},{ dataIndex: 'wkct_name'		, text: Language.get(''				, '투입공정')	, width: 90
					},{	xtype	: 'actioncolumn',
						tdCls	: 'editingcolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.CANCEL.icon,
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									record.set('wkct_name', '');  // 'wkct_name' 값을 초기화
									record.set('wkct_idcd', '');  // 'wkct_idcd' 값을 초기화
								}
							}
						]
					},{	xtype	: 'actioncolumn',
						tdCls	: 'editingcolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									resource.loadPopup({
										select	: 'SINGLE',
										widget	: 'lookup-wkct-popup',
										params	: { stor_grp : _global.stor_grp, line_stat : '0' },
										onwer	: this,
										result	: function(records) {
											var value = records[0];
											record.set('wkct_name',value.data.wkct_name);
											record.set('wkct_idcd',value.data.wkct_idcd);
										}
									});
								}
							}
						]
					}
				]
			}
		;
		return item;
	},
	
	addRow: function(){
		var me = this.up('grid'),
			store = me.getStore(),
			lastOrdr = store.count() + 1;
			
		store.add({line_ordr: lastOrdr});
	},
	
	removeRow: function() {
		var me =  this.up('grid'),
			store = me.getStore(),
			selection = me.getSelectionModel().getSelection()[0];
			
			if (selection) {
				store.remove(selection);
				me.refreshSeqn();
			}
	},
	
	upAction: function() {
		var me = this.up('grid'),
			store = me.getStore(),
			record = me.getSelectionModel().getSelection()[0],
			currentIdx = store.indexOf(record);
			
			if (currentIdx === 0) {
				return false;
			}
			store.removeAt(currentIdx);
			store.insert(currentIdx-1, record);
			me.getSelectionModel().select(record);
			me.refreshSeqn();
	},
	
	downAction: function() {
		var me = this.up('grid'),
			store = me.getStore(),
			record = me.getSelectionModel().getSelection()[0],
			currentIdx = store.indexOf(record)
			lastIdx = store.count() - 1;
			
			if (currentIdx === lastIdx) {
				return false;
			}
			store.removeAt(currentIdx);
			store.insert(currentIdx+1, record);
			me.getSelectionModel().select(record);
			me.refreshSeqn();
	},
	
	refreshSeqn: function() {
		var store = this.getStore(),
			ordr = 1;
			
		store.each(function(rec) {
			rec.set('line_ordr', ordr++);
		})
	}
});
