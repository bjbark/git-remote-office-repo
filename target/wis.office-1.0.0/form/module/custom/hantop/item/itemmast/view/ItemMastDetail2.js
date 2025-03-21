Ext.define('module.custom.hantop.item.itemmast.view.ItemMastDetail2', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-itemmast-detail2',
	store		: 'module.custom.hantop.item.itemmast.store.ItemMastDetail2',
	border		: 0,
	columnLines	: true,
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },

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
					'->', '-',
					{text : Const.ROWINSERT.text, iconCls: Const.INSERT.icon ,
						listeners: {
	 			 			click:function(self,e){
								me.lineInsert({});
							}
						}
					},
					'-',
					{text : Const.ROWDELETE.text, iconCls: Const.DELETE.icon,
						listeners: {
							click:function(self,e){
								me.lineDelete({});
							}
						}
					},
					'-',
					{	text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action ,cls: 'button-style' },
					'-',
					{	text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action ,cls: 'button-style' },
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
					{	dataIndex:	''				, width:  50, align : 'left'   , text: Language.get( ''	, '사용'		),hidden : true,
						editor	: {
							maxLength		: 20,
							selectOnFocus	: true,
							allowBlank		: true
						}
					},{	dataIndex:	'line_seqn'		, width:  50, align : 'center'	, text : Language.get('line_seqn'	, '순번'		) ,hidden : true
					},{	dataIndex:	'base_yorn'		, width:  60, align : 'center'   , text: Language.get( 'base_yorn'	, '기본'		), xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'), sortable:true,filter:true,
						tdCls		: 'editingcolumn',
						editor		: {
							selectOnFocus	: true,
							allowBlank		: true,
							enableKeyEvents : true,
							xtype			: 'lookupfield',
							lookupValue		: resource.lookup('yorn'),
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
									var grid = self.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection);
									var gridDataIndices = Ext.Array.pluck(grid.columns, 'dataIndex'),
										index = Ext.Array.indexOf(gridDataIndices,this.name)+1;
									 	grid.plugins[0].startEdit(row,grid.columns[index]);
									}
								}
							}
						}
					},{	dataIndex:	'vrbl_idcd'				, width:  160, align : 'left'   , text: Language.get( ''	, '변수'			),
						editor		: {
							selectOnFocus	: true,
							allowBlank		: true,
							enableKeyEvents	: true,
							listeners		:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
									var grid = self.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection);
									var gridDataIndices = Ext.Array.pluck(grid.columns, 'dataIndex'),
										index = Ext.Array.indexOf(gridDataIndices,this.name)+1;
									 	grid.plugins[0].startEdit(row,grid.columns[index]);
									}
								}
							}
						}
					},{	dataIndex:	'atth_idcd'				, width:  160, align : 'left'   , text: Language.get( ''	, '부속코드'	),
						editor		: {
							selectOnFocus	: true,
							allowBlank		: true,
							enableKeyEvents	: true,
							listeners		:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
									var grid = self.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection);
									var gridDataIndices = Ext.Array.pluck(grid.columns, 'dataIndex'),
										index = Ext.Array.indexOf(gridDataIndices,this.name)+1;
									 	grid.plugins[0].startEdit(row,grid.columns[index]);
									}
								}
							}
						}
					},{	dataIndex:	''				, width:  160, align : 'left'   , text: Language.get( ''	, '부속자재명'	),
						editor		: {
							selectOnFocus	: true,
							allowBlank		: true,
							enableKeyEvents	: true,
							listeners		:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
									var grid = self.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection);
									var gridDataIndices = Ext.Array.pluck(grid.columns, 'dataIndex'),
										index = Ext.Array.indexOf(gridDataIndices,this.name)+1;
									 	grid.plugins[0].startEdit(row,grid.columns[index]);
									}
								}
							}
						}
					},{	dataIndex:	'prod_lcls_idcd'				, width:  160, align : 'left'   , text: Language.get( ''	, '제품대분류'	),
						editor		: {
							selectOnFocus	: true,
							allowBlank		: true,
							enableKeyEvents	: true,
							listeners		:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
									var grid = self.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection);
									var gridDataIndices = Ext.Array.pluck(grid.columns, 'dataIndex'),
										index = Ext.Array.indexOf(gridDataIndices,this.name)+1;
									 	grid.plugins[0].startEdit(row,grid.columns[index]);
									}
								}
							}
						}
					},{	dataIndex:	'cate_dvcd'		, width:  100, align : 'center'   , text: Language.get( ''	, '범주'		), xtype : 'lookupcolumn', lookupValue : resource.lookup('cate_dvcd'), sortable:true,filter:true,
						tdCls		: 'editingcolumn',
						editor		: {
							selectOnFocus	: true,
							allowBlank		: true,
							enableKeyEvents : true,
							xtype			: 'lookupfield',
							lookupValue		: resource.lookup('cate_dvcd'),
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
									var grid = self.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection);
									var gridDataIndices = Ext.Array.pluck(grid.columns, 'dataIndex'),
										index = Ext.Array.indexOf(gridDataIndices,this.name)+1;
									 	grid.plugins[0].startEdit(row,grid.columns[index]);
									}
								}
							}
						}
					},{	dataIndex:	'rela_item_idcd', width:  130, align : 'left'   , text: Language.get( ''	, '연관자재'	),
						editor		: {
							selectOnFocus	: true,
							allowBlank		: true,
							enableKeyEvents	: true,
							listeners		:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
									var grid = self.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection);
									var gridDataIndices = Ext.Array.pluck(grid.columns, 'dataIndex'),
										index = Ext.Array.indexOf(gridDataIndices,this.name)+1;
									 	grid.plugins[0].startEdit(row,grid.columns[index]);
									}
								}
							}
						}
					},{	dataIndex:	'minm_widh'		, width:  80, align : 'right'   , text: Language.get( 'minm_widh'	, '최소W'	), xtype: 'numericcolumn', sortable:true,filter:true,
						editor		: {
							xtype		:'numericfield',
							selectOnFocus	: true,
							allowBlank		: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
									var grid = self.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection);
									var gridDataIndices = Ext.Array.pluck(grid.columns, 'dataIndex'),
										index = Ext.Array.indexOf(gridDataIndices,this.name)+1;
									 	grid.plugins[0].startEdit(row,grid.columns[index]);
									}
								}
							}
						}
					},{	dataIndex:	'maxm_widh'		, width:  80, align : 'right'   , text: Language.get( 'maxm_widh'	, '최대W'	), xtype: 'numericcolumn', sortable:true,filter:true,
						editor		: {
							xtype		:'numericfield',
							selectOnFocus	: true,
							allowBlank		: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
									var grid = self.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection);
									var gridDataIndices = Ext.Array.pluck(grid.columns, 'dataIndex'),
										index = Ext.Array.indexOf(gridDataIndices,this.name)+1;
									 	grid.plugins[0].startEdit(row,grid.columns[index]);
									}
								}
							}
						}
					},{	dataIndex:	'minm_hght'		, width:  80, align : 'right'   , text: Language.get( 'minm_hght'	, '최소H'	), xtype: 'numericcolumn', sortable:true,filter:true,
						editor		: {
							xtype		:'numericfield',
							selectOnFocus	: true,
							allowBlank		: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
									var grid = self.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection);
									var gridDataIndices = Ext.Array.pluck(grid.columns, 'dataIndex'),
										index = Ext.Array.indexOf(gridDataIndices,this.name)+1;
									 	grid.plugins[0].startEdit(row,grid.columns[index]);
									}
								}
							}
						}
					},{	dataIndex:	'maxm_hght'		, width:  80, align : 'right'   , text: Language.get( 'maxm_hght'	, '최대H'	), xtype: 'numericcolumn', sortable:true,filter:true,
						editor		: {
							xtype		:'numericfield',
							selectOnFocus	: true,
							allowBlank		: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
									var grid = self.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection);
									var gridDataIndices = Ext.Array.pluck(grid.columns, 'dataIndex'),
										index = Ext.Array.indexOf(gridDataIndices,this.name)+1;
									 	grid.plugins[0].startEdit(row,grid.columns[index]);
									}
								}
							}
						}
					},{	dataIndex:	'cond_dvcd'		, width:  100, align : 'left'   , text: Language.get( 'cond_dvcd'	, '조건'	), xtype : 'lookupcolumn', lookupValue : resource.lookup('cond_dvcd'), sortable:true,filter:true,
						tdCls		: 'editingcolumn',
						editor		: {
							selectOnFocus	: true,
							allowBlank		: true,
							enableKeyEvents : true,
							xtype			: 'lookupfield',
							lookupValue		: resource.lookup('cond_dvcd'),
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
									var grid = self.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection);
									var gridDataIndices = Ext.Array.pluck(grid.columns, 'dataIndex'),
										index = Ext.Array.indexOf(gridDataIndices,this.name)+1;
									 	grid.plugins[0].startEdit(row,grid.columns[index]);
									}
								}
							}
						}
					}
				]
			};
		return item;
	},

	cellEditAfter : function (editor, context) {
		var me = this;
	},

	listeners: {

		edit: function(editor, context) {
			var me = this;
			Ext.ComponentQuery.query('module-itemmast-editor')[0].down('[name=change]').setValue('Y');
			me.cellEditAfter(editor, context);
		},

	},

	/**
	 * 새로운 Line을 추가한다....(자료 입력은 그리드에서 직접 입력한다.)
	 */
	lineInsert : function (config) {
		var me			= this,
			myform		= Ext.ComponentQuery.query('module-itemmast-detail2')[0],
			store		= me.getStore(),
			record		= undefined,
			max_seq		= 0,
			lastidx		= store.count(),
			mlister		= Ext.ComponentQuery.query('module-itemmast-lister')[0],
			selectMaster = mlister.getSelectionModel().getSelection()[0],
			selectDetail= myform.getSelectionModel().getSelection()[0],
			mrecord		= record ? record[0] : mlister.getSelectionModel().getSelection()[0],
			grid		= me.down('grid')
		;

		if(!selectMaster && !selectDetail ){
			Ext.Msg.alert("알림", '자재코드목록을 선택해주세요' );
			return;
		}

		store.each(function(findrecord) {
			if (findrecord.get('line_seqn') > max_seq) {
				max_seq	= findrecord.get('line_seqn');   // 최종으로 사용한 항번을 찾는다....
			}
		});
		max_seq = max_seq + 1;

		record = Ext.create( store.model.modelName , {
			item_idcd	: mrecord.get('item_idcd'),
			line_seqn	: max_seq,			//
			modify		: 'Y',
		});
		store.add(record);
		myform.plugins[0].startEdit(lastidx , 1);
	},

	/**
	 * 선택한 라인을 삭제처리 한다.
	 */
	lineDelete : function (config) {
		var me = this;
		var records = me.getSelectionModel().getSelection();
		myform		= Ext.ComponentQuery.query('module-itemmast-detail2')[0],
		mlister		= Ext.ComponentQuery.query('module-itemmast-lister')[0],
		selectMaster = mlister.getSelectionModel().getSelection()[0],
		selectDetail= myform.getSelectionModel().getSelection()[0]

		if( !selectDetail ){
			Ext.Msg.alert("알림", '선택된 자료가없습니다.' );
			return;
		}

		Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
			fn : function (button) {
				if (button==='yes') {
					me.getStore().remove (records);
				}
			}
		});
		Ext.ComponentQuery.query('module-itemmast-editor')[0].down('[name=change]').setValue('Y');
	},
 });





