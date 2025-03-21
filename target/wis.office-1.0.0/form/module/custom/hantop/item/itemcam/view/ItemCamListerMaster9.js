Ext.define('module.custom.hantop.item.itemcam.view.ItemCamListerMaster9', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-itemcam-lister-master9',
	store		: 'module.custom.hantop.item.itemcam.store.ItemCamMaster',
	border		: 0,
	columnLines	: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ftype :'grid-summary'}],
	plugins 	: [{ptype  :'cellediting-directinput', clicksToEdit: 1 }, { ptype:'filterbar'}],

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
					{	xtype   : 'button',
						iconCls : 'filterIcon',
						toggleGroup:'cammaster',
						listeners:{
							toggle:function(toggle){
								var filter = me.filterBar;
									filter.setVisible(toggle.pressed);
							}
						}
					},
					'->',
					{text : '<span class="write-button">자재복사</span>'	, action : 'copyAction'		, cls: 'button1-style'	} , '-',
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
					},'-',
					{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action, cls: 'button-style' },
					{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action, cls: 'button-style' }, '-',
					{ text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style' }
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
					{	text: Language.get(''	,'자재</br>　'		), dataIndex : 'mtrl'	, align : 'center',
						columns: [
							{	dataIndex	: 'brnd_name'		, width:  95, align : 'left'    , text: Language.get( 'brnd_name'	, '<center style="margin-top:12px;">브랜드</center>'			), sortable:true,filter:true,
							},{	xtype	: 'actioncolumn', filter:'disabled',
								header	: '',
								width	: 20,
								align	: 'center',
								tdCls	: 'editingcolumn',
								items	: [
									{	iconCls	: Const.SELECT.icon,
										tooltip	: '브랜드 찾기',
										handler	: function (grid, rowIndex, colIndex, item, e, record) {
											resource.loadPopup({
											select	: 'SINGLE',
											widget	: 'lookup-base-popup',
											params:{
												prnt_idcd : '4000'
											},
											result	: function(records) {
												var	parent = records[0];
												var grid = me.up('grid'),
												store = me.getStore(),
												selection = me.getSelectionModel().getSelection()[0]
												row = store.indexOf(selection);
													record.set('brnd_bacd',parent.data.base_code);
													record.set('brnd_name',parent.data.base_name);
													me.plugins[0].startEdit(row, 2);
												},
											})
										},
										scope : me
									}
								]
							},{	dataIndex	:	'item_code'				, width:  140, align : 'left'    , text: Language.get( 'item_code'	, '<center style="margin-top:12px;">자재코드</center>'			), sortable:true,filter:true,
							},{	xtype	: 'actioncolumn', filter:'disabled',
								header	: '',
								width	: 20,
								align	: 'center',
								tdCls	: 'editingcolumn',
								items	: [
									{	iconCls	: Const.SELECT.icon,
										tooltip	: '자재 찾기',
										handler	: function (grid, rowIndex, colIndex, item, e, record) {
											resource.loadPopup({
											select	: 'SINGLE',
											widget	: 'lookup-hntopitem-popup',
											params:{
												acct_bacd : '1001',
												line_stat : '0',
											},
											result	: function(records) {
												var	parent = records[0];
												var grid = me.up('grid'),
												store = me.getStore(),
												selection = me.getSelectionModel().getSelection()[0]
												row = store.indexOf(selection);
													record.set('item_idcd',parent.data.item_idcd);
													record.set('item_code',parent.data.item_code);
													record.set('item_name',parent.data.item_name);
													me.plugins[0].startEdit(row, 4);
												},
											})
										},
										scope : me
									}
								]
							},{	dataIndex	:	'item_name'		, width:  190, align : 'left'    , text: Language.get( 'item_name'	, '<center style="margin-top:12px;">자재명</center>'			), sortable:true,filter:true,
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
							},{	dataIndex	:	'cstm_item_code'		, width:  140, align : 'left'    , text: Language.get( 'cstm_item_code'	, '<center style="margin-top:5px;">거래처</br>품목코드</center>'), sortable:true,filter:true,
								tdCls		: 'editingcolumn',
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
							},{	dataIndex	: 'item_widh'		, width:  60, align : 'right'    , text: Language.get( 'item_widh'	, '폭(W)'		), xtype: 'numericcolumn', sortable:true,filter:true,
								tdCls		: 'editingcolumn',
								editor		: {
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
							},{	dataIndex	:	'item_hght'		, width:  60, align : 'right'    , text: Language.get( 'item_hght'	, '높이(H)'		), xtype: 'numericcolumn', sortable:true,filter:true,
								tdCls		: 'editingcolumn',
								editor		: {
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
							},{	dataIndex	:	'item_dpth'		, width:  60, align : 'right'    , text: Language.get( 'item_dpth'	, '깊이(D)'		), xtype: 'numericcolumn', sortable:true,filter:true,
								tdCls		: 'editingcolumn',
								editor		: {
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
							},{	dataIndex	:	'bsmt_leng'		, width:  60, align : 'right'    , text: Language.get( 'bsmt_leng'	, '길이(L)'		), xtype: 'numericcolumn', sortable:true,filter:true,
								tdCls		: 'editingcolumn',
								editor		: {
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
							}
						]
					}
				]
			};
		return item;
	},

	cellEditAfter : function (editor, context) {
		var me = this;
	},

	listeners: {
		validateedit : function (editor, context, eOpts ) {
			var me = this;
			var field = context.field;
			var value = context.value;

			return true;
		},

		edit: function(editor, context) {
			var me = this;
			me.cellEditAfter(editor, context);
		},

		keypress: {
			element: 'el',
			fn: function(e, iElement ) {
				key = e.getKey();
				if (key != undefined && key != e.LEFT && key != e.RIGHT && key != e.UP && key != e.DOWN && key != e.ENTER && key != e.ESC) {
					var grid = Ext.getCmp(this.id),
						pos  = grid.getView().selModel.getCurrentPosition()
					;
				}
			}
		},
		render: function(){
			var me = this;
			new Ext.util.KeyMap({
				target: me.getEl().dom,
				binding: [
					/* Ctrl + Insert */
					{	ctrl:true, key: 45,
						fn: function(key,e){
							me.lineInsert({});
						}
					},
					{	ctrl:true, key: 46,
						fn: function(key,e){
							var records = me.getSelectionModel().getSelection();
							Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
								fn : function (button) {
									if (button==='yes') {
										me.getStore().remove (records);
									}
								}
							});
						}
					}
				]
			});
		}
	},

	/**
	 * 새로운 Line을 추가한다....(자료 입력은 그리드에서 직접 입력한다.)
	 */
	lineInsert : function (config) {
		var me			= this,
			store		= me.getStore(),
			record		= undefined,
			search		= Ext.ComponentQuery.query('module-itemcam-search')[0],
			param		= search.getValues(),
			grid		= me.down('grid')
		;
		record = Ext.create( store.model.modelName , {
			brnd_bacd : param.brnd_bacd,
			brnd_name : param.brnd_name,
			bfsf_dvcd : 'MFRN'
		});
		store.add(record);
		me.getSelectionModel().select(store.data.items.length-1);

	},
	/**
	 * 선택한 라인을 삭제처리 한다.
	 */
	lineDelete : function (config) {
		var me = this;
		var records = me.getSelectionModel().getSelection();
		if(records[0]){
			Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn : function (button) {
					if (button==='yes') {
						me.getStore().remove (records);
					}
				}
			});
		}else{
			Ext.Msg.alert('알림','삭제하려는 원자재 가공정보를 선택해주세요.');
		}
	},

 });
