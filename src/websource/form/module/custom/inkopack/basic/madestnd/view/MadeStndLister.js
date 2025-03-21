Ext.define('module.custom.inkopack.basic.madestnd.view.MadeStndLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-madestnd-lister',
	store		: 'module.custom.inkopack.basic.madestnd.store.MadeStnd',

	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			jig = {
				xtype	: 'grid-paging',
				items	: [
					'->', '-',
					{text : Const.UPDATE.text, iconCls: Const.UPDATE.icon, action : Const.UPDATE.action, cls: 'button-style' },
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' },
				]
			};
		return jig ;
	},


	columnItem : function () {
		var me = this,
			jig = {
				defaults: {style: 'text-align: center'},
				items	: [
					{	dataIndex: 'line_stat'		, text : Language.get('line_stat'		,'상태')			, width : 50  , xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat'), align : 'center'
					},{ dataIndex: 'item_idcd'		, text : Language.get('item_idcd'		,'품목코드')		, width : 140 , align : 'left', hidden : true
					},{ dataIndex: 'item_code'		, text : Language.get('item_code'		,'품목코드')		, width : 140 , align : 'left'
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명')			, width : 350 , align : 'left'
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'규격')			, width : 200 , align : 'left'
					},{ dataIndex: 'spec_horz'		, text : Language.get('spec_horz'		,'규격(가로)')		, width : 80  , align : 'right',
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
					},{ dataIndex: 'spec_vrtl'		, text : Language.get('spec_vrtl'		,'규격(세로)')		, width : 80  , align : 'right',
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

										grid.plugins[0].startEdit(row, grid.columns[7]);
									}
								}
							}
						}
					},{ dataIndex: 'spec_tick'		, text : Language.get('spec_tick'		,'규격(두께)')		, width : 80  , align : 'right',
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

										grid.plugins[0].startEdit(row, grid.columns[8]);
									}
								}
							}
						}
					},{ dataIndex: 'bath_qntt'		, text : Language.get('bath_qntt'		,'batch 수량')	, width : 80  , align : 'right',
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

										grid.plugins[0].startEdit(row, grid.columns[9]);
									}
								}
							}
						}
					},{ dataIndex: 'colr_ccnt'		, text : Language.get('colr_ccnt'		,'컬러도수')		, width : 80  , align : 'right',
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

										grid.plugins[0].startEdit(row, grid.columns[10]);
									}
								}
							}
						}
					},{ dataIndex: 'liqu_type'		, text : Language.get('liqu_type'		,'액형')			, width : 150 , align : 'left',
						tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'textfield',
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

										grid.plugins[0].startEdit(row, grid.columns[11]);
									}
								}
							}
						}
					},{ dataIndex: 'fabc_widh'		, text : Language.get('fabc_widh'		,'원단폭')			, width : 80  , align : 'right',
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

										grid.plugins[0].startEdit(row, grid.columns[12]);
									}
								}
							}
						}
					},{ dataIndex: 'proc_name'		, text : Language.get('proc_name'		,'가공분류')		, width : 100 , align : 'left',
						tdCls	: 'editingcolumn',
						editor	: {
							selectOnFocus: true,
							allowBlank	: false,
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							name		: 'proc_name',
							clearable	: false ,
							width		: 300,
							popup: {
								select : 'SINGLE',
								widget : 'lookup-base-popup',
								params : { stor_grp : _global.stor_grp , row_sts : '0', prnt_idcd : '8001' },
								result	: function(records, nameField) {
									if( records.length > 0){
										var grid      = nameField.up('grid'),
											store     = me.getStore(),
											selection = grid.view.getSelectionModel().getSelection()[0],
											index     = store.indexOf(selection),
											name   = records[0]
											;
											console.log(name);
											grid.view.getSelectionModel().selected.items[0].set('proc_name',name.data.base_name);
											grid.view.getSelectionModel().selected.items[0].set('proc_bacd',name.data.base_code);
									}
								}
							}
						}
					},{ dataIndex: 'proc_bacd'	, name : 'proc_bacd', hidden : true
					},{ dataIndex: 'roll_perc_poch'	, text : Language.get('roll_perc_poch'	,'Roll당파우치')	, width : 100 , align : 'right',
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

										grid.plugins[0].startEdit(row, grid.columns[14]);
									}
								}
							}
						}
					},{ dataIndex: 'ygls_tick'		, text : Language.get('ygls_tick'		,'유광두께')		, width : 80  , align : 'right',
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

										grid.plugins[0].startEdit(row, grid.columns[15]);
									}
								}
							}
						}
					},{ dataIndex: 'ngls_tick'		, text : Language.get('ngls_tick'		,'무광두께')		, width : 80  , align : 'right',
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

										grid.plugins[0].startEdit(row, grid.columns[16]);
									}
								}
							}
						}
					},{ dataIndex: 'nutc_valu'		, text : Language.get('nutc_valu'		,'넛찌값')			, width : 70  , align : 'center',
						tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'textfield',
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

										grid.plugins[0].startEdit(row, grid.columns[26]);
									}
								}
							}
						}
					},{ dataIndex: 'sgsp_sccs_yorn'	, text : Language.get('sgsp_sccs_yorn'	,'분리배출여부')		, width : 80  , xtype : 'checkcolumn'
					},{ dataIndex: 'rond_yorn'		, text : Language.get('rond_yorn'		,'라운드여부')		, width : 70  , xtype : 'checkcolumn',
					},{ dataIndex: 'zipr_yorn'		, text : Language.get('zipr_yorn'		,'지퍼여부')		, width : 70  , xtype : 'checkcolumn',
					},{ dataIndex: 'hole_yorn'		, text : Language.get('hole_yorn'		,'타공여부')		, width : 70  , xtype : 'checkcolumn'
					},{ dataIndex: 'stnd_yorn'		, text : Language.get('stnd_yorn'		,'스텐드여부')		, width : 70  , xtype : 'checkcolumn'
					},{ dataIndex: 'uppr_open_yorn'	, text : Language.get('uppr_open_yorn'	,'상단오픈여부')		, width : 80  , xtype : 'checkcolumn'
					},{ dataIndex: 'lwrp_open_yorn'	, text : Language.get('lwrp_open_yorn'	,'하단오픈여부')		, width : 80  , xtype : 'checkcolumn'
					},{ dataIndex: 'left_open_yorn'	, text : Language.get('left_open_yorn'	,'좌측오픈여부')		, width : 80  , xtype : 'checkcolumn'
					},{ dataIndex: 'righ_open_yorn'	, text : Language.get('righ_open_yorn'	,'우측오픈여부')		, width : 80  , xtype : 'checkcolumn'
					},{ dataIndex: 'poch_wdth'		, text : Language.get('poch_wdth'		,'파우치(가로)')	, width : 85  , align : 'right',
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

										grid.plugins[0].startEdit(row, grid.columns[27]);
									}
								}
							}
						}
					},{ dataIndex: 'poch_hght'		, text : Language.get('poch_hght'		,'파우치(세로)')	, width : 85  , align : 'right',
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

										grid.plugins[0].startEdit(row, grid.columns[28]);
									}
								}
							}
						}
					},{ dataIndex: 'poch_tick'		, text : Language.get('poch_tick'		,'파우치(두께)')	, width : 85  , align : 'right',
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

										grid.plugins[0].startEdit(row, grid.columns[29]);
									}
								}
							}
						}
					},{ dataIndex: 'item_tick'		, text : Language.get('item_tick'		,'품목두께')		, width : 80  , align : 'right',
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

										grid.plugins[0].startEdit(row, grid.columns[30]);
									}
								}
							}
						}
					},{ dataIndex: 'real_item_tick'	, text : Language.get('real_item_tick'	,'실품목두께')		, width : 80  , align : 'right',
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

										grid.plugins[0].startEdit(row+1, grid.columns[5]);
									}
								}
							}
						}
					}
				]
			}
		;
		return jig;
	},

	cellEditAfter : function (editor, context) {
		var me = this;
		context.record.recalculation( me.editor.getRecord() );
		editor.grid.view.getSelectionModel().onKeyDown();
	},

	listeners: {

		edit: function(editor, context) {
			var me = this;
			me.cellEditAfter(editor, context);
		},

	}


});
