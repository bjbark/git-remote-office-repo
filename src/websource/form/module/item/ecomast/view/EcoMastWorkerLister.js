Ext.define('module.item.ecomast.view.EcoMastWorkerLister', { extend: 'Axt.grid.Panel',
	alias: 'widget.module-ecomast-worker-lister',

	region : 'center',
	border : 0,
	columnLines: true,
	selModel: {selType:'cellmodel'},
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
					{	text : '순번'		, dataIndex: 'bomt_seqn'		, width :  40	, align : 'center',hidden:true
					},{ text : '순번'		, dataIndex: 'disp_seqn'		, width : 40, align : 'center'
					},{ text : '품목코드'	, dataIndex: 'item_code'		, width : 160, align : 'center'
					},{ text : '품명'		, dataIndex: 'item_name'		, width : 300,
						renderer: function(value) {
							return '<span data-qwidth="200" '+
							'data-qtip="'+value+'">'+
							value+'</span>';
						}
					},{ text : '규격'		, dataIndex: 'item_spec'		, width : 270,
						renderer: function(value) {
							return '<span data-qwidth="200" '+
							'data-qtip="'+value+'">'+
							value+'</span>';
						}
					},{ text : '투입단위'	, dataIndex: 'unit_name'		, width : 80 ,  align : 'center'
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								tooltip	: '투입단위 찾기',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									resource.loadPopup({
										select	: 'SINGLE',
										widget	: 'lookup-unit-popup',
										params:{
										},
										result	: function(records) {
											var	parent = records[0];
											record.set('unit_name',parent.data.unit_name);
											record.set('unit_idcd',parent.data.unit_idcd);
										},
									})
								},
								scope : me
							}
						]
					},{ text : '투입공정'	, dataIndex: 'wkct_name'		, width : 130
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								tooltip	: '투입공정 찾기',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									resource.loadPopup({
										select	: 'SINGLE',
										widget	: 'lookup-wkct-popup',
										params:{ tema:''},
										result	: function(records) {
											var	parent = records[0];
											record.set('wkct_name',parent.data.wkct_name);
											record.set('ivst_wkct_idcd',parent.data.wkct_idcd);
										},
									})
								},
								scope : me
							}
						]
					},{ text : '투입(분자)'	, dataIndex: 'ndqt_nmrt'		, width :  85	, xtype : 'numericcolumn',
						tdCls : 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: true
						},
					},{ text : '투입(분모)'	, dataIndex: 'ndqt_dnmn'		, width :  85	, xtype : 'numericcolumn',
						tdCls : 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: true
						},
					},{ text : 'LOSS율'		, dataIndex: 'incm_loss_rate'	, width :  80	, xtype : 'numericcolumn',
						tdCls : 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: true
						},
					},{ text : '외주LOSS율'	, dataIndex: 'otcm_loss_rate'	, width :  80	, xtype : 'numericcolumn', hidden:true
					},{ text : '변경일자'	, dataIndex: 'updt_dttm'		, width :  120, renderer:function(value){return value.substr(0,10);},align : 'center',hidden:true
					},{	text : '상태'		, dataIndex: 'line_stat'		, width : 80  , xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_stat'), align : 'center', hidden : true
					},{	text : '품목id'		, dataIndex: 'item_idcd'		, width : 80  , hidden:true
					},{	text : '비고'		, dataIndex: 'user_memo'		, width : 80
					},
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

	listeners: {
		validateedit : function (editor, context, eOpts ) {
			var me = this;
			var field = context.field;
			var value = context.value;
			//
			if(field === 'invc_qntt' && value > 999999){
				Ext.Msg.show({ title: '수량 확인 요청', msg: '입력한 수량을 점검해 보시기 바랍니다.  계속 진행하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no',
					fn : function (button) {
						if (button==='yes') {
							context.record.set(field, context.value);
							me.cellEditAfter(editor, context);
						}
					}
				});
				return false;
			}

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
					/* Ctrl + Delete */
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
	}
});
