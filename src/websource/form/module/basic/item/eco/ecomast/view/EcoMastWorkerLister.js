Ext.define('module.basic.item.eco.ecomast.view.EcoMastWorkerLister', { extend: 'Axt.grid.Panel',
	alias: 'widget.module-ecomast-worker-lister',
//	store: 'module.basic.item.eco.ecomast.store.EcoMastPopup',

	region : 'center',
	border : 0,
	columnLines: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features: [{ftype :'grid-summary'}],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent: function () {
		var me = this;
		me.dockedItems = [{xtype: 'module-ecomast-worker-search'}];
		me.paging  = me.pagingItem() ;
		me.columns = me.columnItem();
		me.callParent();
	},
	getDspNo : function() {
	},
	getSeqNo : function() {

	},
	pagingItem : function () {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
					{	text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action ,cls: 'button-style' },
					{	text: Const.DELETE.text , iconCls: Const.DELETE.icon , action : Const.DELETE.action ,cls: 'button-style' },
					{	text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action ,cls: 'button-style' }, '-'
				], pagingButton : false
			}
		;
		return item ;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	text : '순번'			, dataIndex: 'bomt_seqn'		, width : 40	, align : 'center',hidden:true
					},{ text : '순번'			, dataIndex: 'disp_seqn'		, width : 40	, align : 'center'
					},{ text : 'prnt'			, dataIndex: 'prnt_item_idcd'	, width : 40	, align : 'center',hidden:true
					},{ text : 'Rev.'			, dataIndex: 'disp_seqn'		, width : 40	, align : 'center',hidden:true
					},{ text : '품목코드'		, dataIndex: 'item_code'		, width : 140	, align : 'center'
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								tooltip	: '품목코드',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									resource.loadPopup({
										select	: 'MULTI',
										widget	: 'lookup-item-popup',
										params:{
										},
										result	: function(records) {
											var	parent = records[0];
											record.set('item_code',parent.data.item_code);
											record.set('item_name',parent.data.item_name);
											record.set('srfc_proc',parent.data.srfc_proc);
											record.set('colr_bacd_name2',parent.data.colr_bacd_name2);
											record.set('mtrl_bacd',parent.data.mtrl_bacd);
											record.set('msll_valu',parent.data.msll_valu);
											record.set('item_mtrl',parent.data.item_mtrl);
											record.set('flat_drwg_numb',parent.data.flat_drwg_numb);
											record.set('sold_drwg_numb',parent.data.sold_drwg_numb);
											record.set('crty_bacd_name',parent.data.crty_bacd_name);
										},
									})
								},
								scope : me
							}
						]
					},{ text : '품명'			, dataIndex: 'item_name'		, width : 120	,
					},{ text : '규격'		, dataIndex: 'item_spec'		, width : 120,
					},{ text : '고객품번'	, dataIndex: 'dely_cstm_itid'		, width : 80 ,  align : 'center'
					},{	dataIndex:	'ndqt_dnmn'	, width: 100, align : 'right'   , text: Language.get( 'ndqt_dnmn'	, '투입수량'	), xtype: 'numericcolumn', sortable:true,filter:true,
						tdCls		: 'editingcolumn',
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
					},{ text : '공정흐름명'		, dataIndex: 'wkfw_name'		, width : 80	, align : 'center'
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								tooltip	: '공정코드',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									resource.loadPopup({
										select	: 'MULTI',
										widget	: 'lookup-wkfw-popup',
										params:{
										},
										result	: function(records) {
											var	parent = records[0];
											record.set('wkfw_idcd',parent.data.wkfw_idcd);
											record.set('wkfw_name',parent.data.wkfw_name);
										},
									})
								},
								scope : me
							}
						]
					},{ text : '표면처리'		, dataIndex: 'srfc_proc'		, width : 130
					},{	dataIndex:	'colr_bacd_name2'	, width:  120, align : 'left'	, text: Language.get('colr_bacd_name2'	, '색상'	),
					},{	dataIndex:	'item_mtrl'			, width:  120, align : 'left'	, text: Language.get('item_mtrl'		, '재질'	),
					},{	dataIndex:	'msll_valu'			, width:  120, align : 'left'	, text: Language.get('msll_valu'		, 'MSL'	),
					},{	dataIndex:	'mker_name'			, width:  120, align : 'left'	, text: Language.get('mker_name'		, '제조사명'	),
					},{	dataIndex:	'flat_drwg_numb'	, width:  120, align : 'left'	, text: Language.get('flat_drwg_numb'	, '2D도면번호'	),
					},{	dataIndex:	'sold_drwg_numb'	, width:  120, align : 'left'	, text: Language.get('sold_drwg_numb'	, '3D도면번호'	),
					},{	dataIndex:	'crty_bacd_name'	, width:  120, align : 'left'	, text: Language.get('crty_bacd_name'	, '차종'	)
					},{	dataIndex:	'crty_bacd'			, width:  120, align : 'left'	, text: Language.get('crty_bacd'		, ''	),hidden : true
					},{	dataIndex:	'colr_bacd2'		, width:  120, align : 'left'	, text: Language.get('colr_bacd2'		, ''	),hidden : true
					}
				]
			}
		;
		return item;
	},

	cellEditAfter : function (editor, context) {
		var me = this;
		context.record.recalculation( me.editor.getRecord() );
		editor.grid.view.getSelectionModel().onKeyDown();
	},

//	listeners: {
//		validateedit : function (editor, context, eOpts ) {
//			var me = this;
//			var field = context.field;
//			var value = context.value;
//			//
//			if(field === 'ndqt_dnmn' && value > 999999){
//				Ext.Msg.show({ title: '수량 확인 요청', msg: '입력한 수량을 점검해 보시기 바랍니다.  계속 진행하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no',
//					fn : function (button) {
//						if (button==='yes') {
//							context.record.set(field, context.value);
//							me.cellEditAfter(editor, context);
//						}
//					}
//				});
//				return false;
//			}
//
//			return true;
//		},
//
//		edit: function(editor, context) {
//			var me = this;
//			me.cellEditAfter(editor, context);
//		},
//
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
//					/* Ctrl + Delete */
//					{	ctrl:true, key: 46,
//						fn: function(key,e){
//							var records = me.getSelectionModel().getSelection();
//
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
//	}
});
