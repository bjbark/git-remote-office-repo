Ext.define('module.prod.mold.moldlist.view.MoldListMoveLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-moldlist-movelister',
	border		: 0,
//	store	: 'module.prod.mold.moldlist.store.MoldListMove',
//	store	: 'module.prod.mold.moldlist.store.MoldListInvoice',

	region : 'center',
	border : 0,
	columnLines: true,
	selModel: {selType:'cellmodel'},
	features: [{ftype :'grid-summary'}],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent: function () {
		var me = this;
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
					{	dataIndex: 'move_date'		, text : Language.get('move_date'		, '일자'	)	, width  : 100 , align : 'center',
					},{ dataIndex: 'move_loct_name'	, text : Language.get('move_loct_name'	, '이동장소')	, width  : 280 ,
					},{ dataIndex: 'move_purp_dvcd'	, text : Language.get('move_purp_dvcd '	, '이동구분')	, width  : 220 , xtype : 'lookupcolumn' , lookupValue : resource.lookup('move_purp_dvcd'), align : 'center'
					},{ dataIndex: 'move_memo'		, text : Language.get('move_memo'		, '이동목적')	, width  : 300 ,
					},{ dataIndex: 'wrhs_idcd'		, text : Language.get('wrhs_idcd'		, '보관장소')	, flex   : 100 ,
					}
				],
			}
		;
		return item;
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
										console.log(me.getStore());
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