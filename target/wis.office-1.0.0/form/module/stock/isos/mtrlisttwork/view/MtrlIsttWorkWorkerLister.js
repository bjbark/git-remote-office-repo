Ext.define('module.stock.isos.mtrlisttwork.view.MtrlIsttWorkWorkerLister', { extend: 'Axt.grid.Panel',
	alias: 'widget.module-mtrlisttwork-worker-lister',

	region : 'center',
	border : 0,
	columnLines: true,
	selModel: {selType:'cellmodel'},
	features: [{ftype :'grid-summary'}],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent: function () {
		var me = this;
		me.dockedItems = [{xtype: 'module-mtrlisttwork-worker-search'}];
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
					{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action ,cls: 'button-style'},
					{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action ,cls: 'button-style'}, '-'
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
					{	dataIndex: 'disp_seqn'		, width:  50	, align:'right'	, text: '항번'		, xtype: 'numericcolumn' , format : '#,##0.##'
					},{	dataIndex: 'item_code'		, width: 110	, align:'left'	, text: '품목코드'
					},{	dataIndex: 'item_name'		, width: 200	, align:'left'	, text: '품명'		, summaryType : 'count'
					},{	dataIndex: 'item_spec'		, width: 150	, align:'left'	, text: '규격'
					},{	dataIndex: 'unit_name'		, width:  45	, align:'left'	, text: '단위'
					},{	dataIndex: 'not_dlvy_qntt'	, width:  70	, align:'right'	, text: '미납잔량'		, xtype : 'numericcolumn'
					},{	dataIndex: 'istt_qntt'		, width:  70	, align:'right'	, text: '입고수량'		, tdCls : 'editingcolumn'  , summaryType : 'sum' ,
						xtype	: 'numericcolumn'	, format : '#,##0.##',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false
						}
					},{	dataIndex: 'stnd_pric'	, width:  80	, align:'right'	, text: '단가'	, xtype: 'numericcolumn'	, format : '#,##0'
					},{	dataIndex: 'amnt'		, width:  80	, align:'right'	, text: '금액'	, xtype: 'numericcolumn'	, format : '#,##0'  , font_color : Const.COLOR.FONT.inv_amt , summaryType : 'sum'
					},{	dataIndex: 'lott_numb'	, width: 100	, align:'left'	, text: 'LOT번호'	, tdCls: 'editingcolumn'	,
						editor	: {
							maxLength		: 50,
							maxLengthText	: '50자 이내로 작성하여 주십시오.',
							selectOnFocus	: true,
							allowBlank		: true
						}
					},{	dataIndex: 'user_memo'	, flex:    1	, align:'left'	, text: '메모'	, tdCls: 'editingcolumn'	,
						editor	: {
							maxLength		: 100,
							maxLengthText	: '한글 100자 이내로 작성하여 주십시오.',
							selectOnFocus	: true,
							allowBlank		: true
						}
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

	listeners: {
		validateedit : function (editor, context, eOpts ) {
			var me = this;
			var field		= context.field;
			var value		= context.value;
			var records		= me.getSelectionModel().getSelection();
			var not_istt	= records[0].get('not_dlvy_qntt');
			//
			if(field === 'istt_qntt' && value > 999999){
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
			if(field === 'istt_qntt' && value > not_istt){
				Ext.Msg.show({ title: '수량 확인 요청', msg: '입고수량이 잔량을 초과하였습니다.  계속 진행하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no',
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
