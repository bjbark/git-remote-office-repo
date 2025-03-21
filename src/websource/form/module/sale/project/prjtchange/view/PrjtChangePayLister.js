Ext.define('module.sale.project.prjtchange.view.PrjtChangePayLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prjtchange-paylister',
	border		: 0,
//	store		: 'module.sale.project.prjtchange.store.PrjtChangeInvoice',

	region : 'center',
	border : 0,
	columnLines: true,
	selModel: {selType:'cellmodel'},
	features: [{ftype :'grid-summary'}],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent: function () {
		var me = this;
		me.dockedItems = [{xtype: 'module-prjtchange-paysearch'}];
		me.columns = me.columnItem();
		me.callParent();
	},
	getDspNo : function() {
	},
	getSeqNo : function() {

	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'colt_dvcd'		, text : Language.get('colt_dvcd'	,'결제구분'	) , width  : 200, xtype : 'lookupcolumn' , lookupValue : resource.lookup('colt_dvcd'), align : 'center'
					},{ dataIndex: 'colt_degr'		, text : Language.get('colt_degr'	,'차수'	) , width  : 80 , align : 'right'  , xtype : 'numericcolumn'
					},{ dataIndex: 'plan_date'		, text : Language.get('plan_date '	,'예정일자'	) , width  : 80
					},{ dataIndex: 'plan_amnt'		, text : Language.get('plan_amnt'	,'예정금액'	) , width  : 100, align : 'right'  , xtype : 'numericcolumn', hidden : false
					},{ dataIndex: 'user_memo'		, text : Language.get('user_memo'	,'비고'	) , flex   : 100
						, tdCls : 'editingcolumn',
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: false
						}
					}
				]
			}
		;
		return item;
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