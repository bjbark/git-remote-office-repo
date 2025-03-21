Ext.define('module.prod.cvic.cvicchecktypeitem.view.CvicCheckTypeItemWorkerLister', { extend: 'Axt.grid.Panel',
	alias: 'widget.module-cvicchecktypeitem-worker-lister',

	region : 'center',
	border : 0,
	columnLines: true,
	selModel: {selType:'cellmodel'},
	features: [{ftype :'grid-summary'}],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent: function () {
		var me = this;
		me.dockedItems = [{xtype: 'module-cvicchecktypeitem-worker-search'}];
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
					{	dataIndex:	'line_seqn'		, width:  50, align : 'center'	, text: Language.get('line_seqn'		, '순번'			)
					},{	dataIndex:	'chek_sbsc_name', width: 130, align : 'left'	, text: Language.get('chek_sbsc_name'	, '점검항목명'	)
					},{	dataIndex:	'chek_cond'		, width: 200, align : 'left'	, text: Language.get('chek_cond'		, '점검조건'		)
					},{	dataIndex:	'msmt_mthd_dvcd', width:  90, align : 'center'	, text: Language.get('msmt_mthd_dvcd'	, '측정방법'		) ,xtype :'lookupcolumn', lookupValue : resource.lookup('msmt_mthd_dvcd')
					},{	dataIndex:	'rslt_iput_dvcd', width:  80, align : 'center'	, text: Language.get('rslt_iput_dvcd'	, '입력구분'		) , xtype :'lookupcolumn', lookupValue : resource.lookup('rslt_iput_dvcd')
					},{	dataIndex:	'goal_levl'		, width:  70, align : 'right'	, text: Language.get('goal_levl'		, '목표수준'		) , xtype: 'numericcolumn'
					},{	dataIndex:	'uppr_valu'		, width:  70, align : 'right'	, text: Language.get('uppr_valu'		, '상한값'		) , xtype: 'numericcolumn'
					},{	dataIndex:	'lwlt_valu'		, width:  70, align : 'right'	, text: Language.get('lwlt_valu'		, '하한값'		) , xtype: 'numericcolumn'
					},{	dataIndex:	'remk_text'		, flex :  70, align : 'left'	, text: Language.get('remk_text'		, '참고사항'		)
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
