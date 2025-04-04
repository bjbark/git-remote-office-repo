Ext.define('module.custom.hantop.item.itemcam.view.ItemCamListerMaster6', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-itemcam-lister-master6',
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
							},{	dataIndex	:	'proc_item_name'		, width:  190, align : 'center'    , text: Language.get( 'proc_item_name'	, '가공자재명'		), sortable:true,filter:true,
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
							},{	dataIndex	:	'open_widh'		, width:  60, align : 'right'    , text: Language.get( 'open_widh'	, '개공폭'		), xtype: 'numericcolumn', sortable:true,filter:true,
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
							},{	dataIndex	:	'dbwd_yorn'		, width:  60, align : 'center'    , text: Language.get( 'dbwd_yorn'	, '이중창'		), xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn'), sortable:true,filter:true,
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
							},{	dataIndex	:	'cmbf_yorn'		, width:  60, align : 'center'    , text: Language.get( 'cmbf_yorn'	, '공들'		), xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn'), sortable:true,filter:true,
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
							}
						]
					},{	text: Language.get(''	,'바코드 프린팅</br>　'		), dataIndex : 'barcode'	, align : 'center',
						columns: [
							{	dataIndex	:	'brcd_hght'		, width:  60, align : 'right'    , text: Language.get( 'brcd_hght'	, '높이'		), xtype: 'numericcolumn', sortable:true,filter:true,
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
							},{	dataIndex	:	'brcd_plac'		, width:  60, align : 'right'    , text: Language.get( 'brcd_plac'	, '위치(Y)'		), xtype: 'numericcolumn', sortable:true,filter:true,
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
							},{	dataIndex	:	'assa_yorn'		, width:  60, align : 'center'    , text: Language.get( 'assa_yorn'	, '아사</br>여부'		), xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn'), sortable:true,filter:true,
								tdCls		: 'editingcolumn',
								editor		: {
									selectOnFocus	: true,
									allowBlank		: true,
									enableKeyEvents	: true,
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
							}
						]
					},{	text: Language.get(''	,'핸드홀</br>　'		), dataIndex : 'handhole'	, align : 'center',
						columns: [
							{	dataIndex	:	'hdho_type_dvcd'		, width:  60, align : 'center'    , text: Language.get( 'hdho_type_dvcd'	, '타입'		), xtype : 'lookupcolumn' , lookupValue : resource.lookup('hdho_type_dvcd'), sortable:true,filter:true,
								tdCls		: 'editingcolumn',
								editor		: {
									selectOnFocus	: true,
									allowBlank		: true,
									enableKeyEvents : true,
									xtype			: 'lookupfield',
									lookupValue		: resource.lookup('hdho_type_dvcd'),
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
							},{	dataIndex	:	'hdho_1pcs_hght'		, width:  65, align : 'right'    , text: Language.get( 'hdho_1pcs_hght'	, '높이(1P)'		), xtype: 'numericcolumn', sortable:true,filter:true,
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
							},{	dataIndex	:	'hdho_2pcs_hght'		, width:  65, align : 'right'    , text: Language.get( 'hdho_2pcs_hght'	, '높이(2P)'		), xtype: 'numericcolumn', sortable:true,filter:true,
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
							},{	dataIndex	:	'hdho_hght_grip_1fst'		, width:  60, align : 'right'    , text: Language.get( 'hdho_hght_grip_1fst'	, '<center style="margin-top:5px;">높이그립</br>(1번창)</center>'		), xtype: 'numericcolumn', sortable:true,filter:true,
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
							},{	dataIndex	:	'hdho_hght_grip_2snd'		, width:  60, align : 'right'    , text: Language.get( 'hdho_hght_grip_2snd'	, '<center style="margin-top:5px;">높이그립</br>(1번창외)</center>'		), xtype: 'numericcolumn', sortable:true,filter:true,
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
							},{	dataIndex	:	'hdho_qntt'		, width:  60, align : 'right'    , text: Language.get( 'hdho_qntt'	, '<center style="margin-top:12px;">홀수</center>'		), xtype: 'numericcolumn', sortable:true,filter:true,
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
							},{	dataIndex	:	'hdho_itvl'		, width:  60, align : 'right'    , text: Language.get( 'hdho_itvl'	, '간격'		), xtype: 'numericcolumn', sortable:true,filter:true,
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
							},{	dataIndex	:	'hdho_pass_yorn'		, width:  60, align : 'center'    , text: Language.get( 'hdho_pass_yorn'	, '관통</br>여부'		), xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn'), sortable:true,filter:true,
								tdCls		: 'editingcolumn',
								editor		: {
									selectOnFocus	: true,
									allowBlank		: true,
									enableKeyEvents : true,
									xtype : 'lookupfield',
									lookupValue : resource.lookup('yorn'),
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
					},{	text: Language.get(''	,'락킹홀</br>1번창에 그립핸들 사용시 락킹홀 개공'	), dataIndex : 'lockingHole'	, align : 'center',
						columns: [
							{	dataIndex	:	'lkho_incl_yorn'		, width:  60, align : 'center'    , text: Language.get( 'lkho_incl_yorn'	, '락킹홀</br>포함'		), xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn'), sortable:true,filter:true,
								tdCls		: 'editingcolumn',
								editor		: {
									selectOnFocus	: true,
									allowBlank		: true,
									enableKeyEvents : true,
									xtype : 'lookupfield',
									lookupValue : resource.lookup('yorn'),
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
							},{	dataIndex	:	'lkho_1pcs_widh'		, width:  60, align : 'right'    , text: Language.get( 'lkho_1pcs_widh'	, '<center style="margin-top:5px;">1P</br>폭</center>'		), xtype: 'numericcolumn', sortable:true,filter:true,
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
							},{	dataIndex	:	'lkho_1pcs_leng'		, width:  60, align : 'right'    , text: Language.get( 'lkho_1pcs_leng'	, '<center style="margin-top:5px;">1P</br>길이</center>'		), xtype: 'numericcolumn', sortable:true,filter:true,
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
							},{	dataIndex	:	'lkho_2pcs_widh'		, width:  60, align : 'right'    , text: Language.get( 'lkho_2pcs_widh'	, '<center style="margin-top:5px;">2P</br>폭</center>'		), xtype: 'numericcolumn', sortable:true,filter:true,
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
							},{	dataIndex	:	'lkho_2pcs_leng'		, width:  60, align : 'right'    , text: Language.get( 'lkho_2pcs_leng'	, '<center style="margin-top:5px;">2P</br>길이</center>'		), xtype: 'numericcolumn', sortable:true,filter:true,
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
							},{	dataIndex	:	'lkho_plac_cpsn'		, width:  60, align : 'right'    , text: Language.get( 'lkho_plac_cpsn'	, '<center style="margin-top:5px;">위치</br>조정</center>'		), xtype: 'numericcolumn', sortable:true,filter:true,
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
							},{	dataIndex	:	'lkho_grip_leng_1fst'		, width:  60, align : 'right'    , text: Language.get( 'lkho_grip_leng_1fst'	, '<center style="margin-top:5px;">그립1번</br>길이</center>'		), xtype: 'numericcolumn', sortable:true,filter:true,
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
							},
						]
					},{	text: Language.get(''	,'고리펀칭</br>　'		), dataIndex : 'punch'	, align : 'center',
						columns: [
							{	dataIndex	:	'rnpc_widh_1fst'		, width:  60, align : 'right'    , text: Language.get( 'rnpc_widh_1fst'	, '폭1'		), xtype: 'numericcolumn', sortable:true,filter:true,
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
							},{	dataIndex	:	'rnpc_widh_2snd'		, width:  60, align : 'right'    , text: Language.get( 'rnpc_widh_2snd'	, '폭2'		), xtype: 'numericcolumn', sortable:true,filter:true,
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
							},
						]
					},{	text: Language.get(''	,'오목손잡이</br>　'		), dataIndex : 'handle'	, align : 'center',
						columns: [
							{	dataIndex	:	'omhd_widh'		, width:  60, align : 'right'    , text: Language.get( 'omhd_widh'	, '폭'		), xtype: 'numericcolumn', sortable:true,filter:true,
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
							},{	dataIndex	:	'omhd_leng'		, width:  60, align : 'right'    , text: Language.get( 'omhd_leng'	, '길이'		), xtype: 'numericcolumn', sortable:true,filter:true,
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
							},{	dataIndex	:	'omhd_hght'		, width:  60, align : 'right'    , text: Language.get( 'omhd_hght'	, '높이'		), xtype: 'numericcolumn', sortable:true,filter:true,
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
							},
						]
					},{	text: Language.get(''	,'롤러 홈</br>　'		), dataIndex : 'roller'	, align : 'center',
						columns: [
							{	dataIndex	:	'rlho_incl_yorn'		, width:  60, align : 'center'    , text: Language.get( 'rlho_incl_yorn'	, '포함'		), xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn'), sortable:true,filter:true,
								tdCls		: 'editingcolumn',
								editor		: {
									selectOnFocus	: true,
									allowBlank		: true,
									enableKeyEvents : true,
									xtype : 'lookupfield',
									lookupValue : resource.lookup('yorn'),
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
							},{	dataIndex	:	'rolr_name'		, width:  120, align : 'left'    , text: Language.get( 'rolr_name'	, '<center style="margin-top:12px;">롤러명</center>'		), sortable:true,filter:true,
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
							},{	dataIndex	:	'midl_rolr_name'		, width:  140, align : 'left'    , text: Language.get( 'midl_rolr_name'	, '<center style="margin-top:5px;">중간<br>롤러명</center>'		), sortable:true,filter:true,
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
							},{	dataIndex	:	'rlho_strt_plac'		, width:  60, align : 'right'    , text: Language.get( 'rlho_strt_plac'	, '시작점'		), xtype: 'numericcolumn', sortable:true,filter:true,
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
							},{	dataIndex	:	'rlho_1pcs_widh'		, width:  60, align : 'right'    , text: Language.get( 'rlho_1pcs_widh'	, '<center style="margin-top:5px;">1P</br>폭</center>'		), xtype: 'numericcolumn', sortable:true,filter:true,
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
							},{	dataIndex	:	'rlho_1pcs_leng'		, width:  60, align : 'right'    , text: Language.get( 'rlho_1pcs_leng'	, '<center style="margin-top:5px;">1P</br>길이</center>'		), xtype: 'numericcolumn', sortable:true,filter:true,
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
							},{	dataIndex	:	'rlho_2pcs_widh'		, width:  60, align : 'right'    , text: Language.get( 'rlho_2pcs_widh'	, '<center style="margin-top:5px;">2P</br>폭</center>'		), xtype: 'numericcolumn', sortable:true,filter:true,
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
							},{	dataIndex	:	'rlho_2pcs_leng'		, width:  60, align : 'right'    , text: Language.get( 'rlho_2pcs_leng'	, '<center style="margin-top:5px;">2P</br>길이</center>'		), xtype: 'numericcolumn', sortable:true,filter:true,
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
							},{	dataIndex	:	'rlho_3pcs_widh'		, width:  60, align : 'right'    , text: Language.get( 'rlho_3pcs_widh'	, '<center style="margin-top:5px;">3P</br>폭</center>'		), xtype: 'numericcolumn', sortable:true,filter:true,
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
							},{	dataIndex	:	'rlho_3pcs_leng'		, width:  60, align : 'right'    , text: Language.get( 'rlho_3pcs_leng'	, '<center style="margin-top:5px;">3P</br>길이</center>'		), xtype: 'numericcolumn', sortable:true,filter:true,
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
							},{	dataIndex	:	'midl_rolr_leng'		, width:  60, align : 'right'    , text: Language.get( 'midl_rolr_leng'	, '<center style="margin-top:5px;">중간롤러</br>길이</center>'		), xtype: 'numericcolumn', sortable:true,filter:true,
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
							},
						]
					},{	text: Language.get(''	,'보강재'		), dataIndex : 'stuff'	, align : 'center',
						columns: [
							{	text: Language.get(''	,'SF/BF내부'		), dataIndex : 'inside'	, align : 'center',
								columns: [
									{	dataIndex	:	'rein_spps_cncs_yorn'		, width:  70, align : 'center'    , text: Language.get( 'rein_spps_cncs_yorn'	, '상부</br>체결'		), xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn'), sortable:true,filter:true, hidden : true,
										tdCls		: 'editingcolumn',
										editor		: {
											selectOnFocus	: true,
											allowBlank		: true,
											enableKeyEvents : true,
											hidden	: true,
											xtype : 'lookupfield',
											lookupValue : resource.lookup('yorn'),
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
									},{	dataIndex	:	'rein_plac_1fst'		, width:  70, align : 'right'    , text: Language.get( 'rein_plac_1fst'	, '위치1'		), xtype: 'numericcolumn', sortable:true,filter:true,
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
									},
								]
							},{	text: Language.get(''	,'BF외부'		), dataIndex : 'outside'	, align : 'center',
								columns: [
									{	dataIndex	:	'rein_plac_2snd'		, width:  60, align : 'right'    , text: Language.get( 'rein_plac_2snd'	, '위치2'		), xtype: 'numericcolumn', sortable:true,filter:true,
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
									},{	dataIndex	:	'rein_plac_3trd'		, width:  60, align : 'right'    , text: Language.get( 'rein_plac_3trd'	, '위치3'		), xtype: 'numericcolumn', sortable:true,filter:true,
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
									},
								]
							}
						]
					},{	text: Language.get(''	,'레일유무</br>　'		), dataIndex : 'rail'	, align : 'center',
						columns: [
							{	dataIndex	:	'wthl_yorn'		, width:  50, align : 'center'    , text: Language.get( 'wthl_yorn'	, '물구멍</br>개공'		), xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn'), sortable:true,filter:true,
								tdCls		: 'editingcolumn',
								editor		: {
									selectOnFocus	: true,
									allowBlank		: true,
									enableKeyEvents : true,
									xtype : 'lookupfield',
									lookupValue : resource.lookup('yorn'),
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
							},{	dataIndex	:	'rail_zero_yorn'		, width:  60, align : 'center'    , text: Language.get( 'rail_zero_yorn'	, '<center style="margin-top:5px;">0번<br>(망)</center>'		), xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn'), sortable:true,filter:true,
								tdCls		: 'editingcolumn',
								editor		: {
									selectOnFocus	: true,
									allowBlank		: true,
									enableKeyEvents : true,
									xtype		:'lookupfield',
									lookupValue : resource.lookup('yorn'),
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
							},{	dataIndex	:	'rail_1fst_yorn'		, width:  60, align : 'center'    , text: Language.get( 'rail_1fst_yorn'	, '1번'		), xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn'), sortable:true,filter:true,
								tdCls		: 'editingcolumn',
								editor		: {
									selectOnFocus	: true,
									allowBlank		: true,
									enableKeyEvents : true,
									xtype		:'lookupfield',
									lookupValue : resource.lookup('yorn'),
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
							},{	dataIndex	:	'rail_midl_yorn'		, width:  60, align : 'center'    , text: Language.get( 'rail_midl_yorn'	, '<center style="margin-top:5px;">M<br>중간</center>'		), xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn'), sortable:true,filter:true,
								tdCls		: 'editingcolumn',
								editor		: {
									selectOnFocus	: true,
									allowBlank		: true,
									enableKeyEvents : true,
									xtype		:'lookupfield',
									lookupValue : resource.lookup('yorn'),
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
							},{	dataIndex	:	'rail_2snd_yorn'		, width:  60, align : 'center'    , text: Language.get( 'rail_2snd_yorn'	, '2번'		), xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn'), sortable:true,filter:true,
								tdCls		: 'editingcolumn',
								editor		: {
									selectOnFocus	: true,
									allowBlank		: true,
									enableKeyEvents : true,
									xtype		:'lookupfield',
									lookupValue : resource.lookup('yorn'),
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
							},{	dataIndex	:	'rail_3trd_yorn'		, width:  60, align : 'center'    , text: Language.get( 'rail_3trd_yorn'	, '3번'		), xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn'), sortable:true,filter:true,
								tdCls		: 'editingcolumn',
								editor		: {
									selectOnFocus	: true,
									allowBlank		: true,
									enableKeyEvents : true,
									xtype		:'lookupfield',
									lookupValue : resource.lookup('yorn'),
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
							},{	dataIndex	:	'rail_4frt_yorn'		, width:  60, align : 'center'    , text: Language.get( 'rail_4frt_yorn'	, '4번'		),  xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn'), sortable:true,filter:true,
								tdCls		: 'editingcolumn',
								editor		: {
									selectOnFocus	: true,
									allowBlank		: true,
									enableKeyEvents : true,
									xtype		:'lookupfield',
									lookupValue : resource.lookup('yorn'),
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
							},{	dataIndex	:	'scrn_wthl_yorn'		, width:  70, align : 'center'    , text: Language.get( 'scrn_wthl_yorn'	, '스크린자리</br>물구멍 개공'		), xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn'), sortable:true,filter:true,
								tdCls		: 'editingcolumn',
								editor		: {
									selectOnFocus	: true,
									allowBlank		: true,
									enableKeyEvents : true,
									xtype : 'lookupfield',
									lookupValue : resource.lookup('yorn'),
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
					},{	text: Language.get(''	,'앙카홀</br>　'		), dataIndex : 'ank'	, align : 'center',
						columns: [
							{	dataIndex	:	'akho_widh_1fst'		, width:  50, align : 'right'    , text: Language.get( 'akho_widh_1fst'	, '폭1'		), xtype: 'numericcolumn', sortable:true,filter:true,
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
							},{	dataIndex	:	'akho_widh_2snd'		, width:  50, align : 'right'    , text: Language.get( 'akho_widh_2snd'	, '폭2'		), xtype: 'numericcolumn', sortable:true,filter:true,
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
