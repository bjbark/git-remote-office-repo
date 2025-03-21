Ext.define('module.custom.hantop.item.itemmast.view.ItemMastDetail4', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-itemmast-detail4',
	store		: 'module.custom.hantop.item.itemmast.store.ItemMastDetail4',
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
					},'-',
					{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action, cls: 'button-style' },
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
					},
					{	dataIndex:	'line_seqn'		, width:  50, align : 'center'	, text : Language.get('line_seqn'	, '순번'		) ,hidden : true
					},{	dataIndex:	'stnd_abar'				, width: 160, align : 'right'   , text: Language.get( ''	, '표준바'		), xtype: 'numericcolumn', sortable:true,filter:true,
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
					},{	dataIndex:	'hqof_yorn'				, width:  80, align : 'center'   , text: Language.get( ''	, '본사'		), xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn'), sortable:true,filter:true,
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
					},{	dataIndex:	'oslf_yorn'				, width:  80, align : 'center'   , text: Language.get( ''	, '자체'		), xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn'), sortable:true,filter:true,
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
					},{	dataIndex:	'remk_text'				, flex :   1, align : 'left'   , text: Language.get( ''	, '비고'			),
						tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: false
						}
					}
				]
			};
		return item;
	},

	cellEditAfter : function (listerdetail4, context) {
		var me = this;

		var grid		= this;
		var pos			= this.view.getSelectionModel().getCurrentPosition().row;
		var models		= grid.getStore().getRange();
	},

	listeners: {

		edit: function(editor, context) {
			var me = this;
			me.cellEditAfter(editor, context);
		},

//		keypress: {
//			element: 'el',
//			fn: function(e, iElement ) {
//				key = e.getKey();
//				if (key != undefined && key != e.LEFT && key != e.RIGHT && key != e.UP && key != e.DOWN && key != e.ENTER && key != e.ESC) {
//					var grid = Ext.getCmp(this.id),
//						pos  = grid.getView().selModel.getCurrentPosition()
//					;
//				}
//			}
//		},
//		render: function(){
//			var me = this;
//			new Ext.util.KeyMap({
//				target: me.getEl().dom,
//				binding: [
//					/* Ctrl + Insert */
//					{	ctrl:true, key: 45,
//						fn: function(key,e){
//							me.lineInsert({});
//						}
//					},
//					{	ctrl:true, key: 46,
//						fn: function(key,e){
//							var records = me.getSelectionModel().getSelection();
//							Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
//								fn : function (button) {
//									if (button==='yes') {
//										me.getStore().remove (records);
//									}
//								}
//							});
//						}
//					}
//				]
//			});
//		}
	},

	/**
	 * 새로운 Line을 추가한다....(자료 입력은 그리드에서 직접 입력한다.)
	 */
	lineInsert : function (config) {
		var me			= this,
			myform		= Ext.ComponentQuery.query('module-itemmast-detail4')[0],
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
		myform		= Ext.ComponentQuery.query('module-itemmast-detail4')[0],
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





