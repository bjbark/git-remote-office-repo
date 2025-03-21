Ext.define('module.custom.iypkg.etc.trsfwork.view.TrsfWorkWorkerLister1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-trsfwork-worker-lister1',
	store		: 'module.custom.iypkg.etc.trsfwork.store.TrsfWorkWorkerLister1',

	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype :'cellediting-directinput', clicksToEdit: 1 } ],

	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'->','-' ,
				]
			}
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'invc_date'		, text : Language.get('ostt_date'		,'출고일자'		) , width : 80  , align : 'center'
					},{ dataIndex: 'cars_numb'		, text : Language.get('cars_numb'		,'차량번호'		) , width : 100 , align : 'left'
					},{ dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		,'거래처명'		) , width : 200 , align : 'left'
					},{ dataIndex: 'trnt_exps'		, text : Language.get('trnt_exps'		,'운송비'		) , width : 100 , align : 'right', xtype : 'numericcolumn',
						tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: true,
							listeners : {
								change : function(){
									var e = Ext.ComponentQuery.query('module-trsfwork-worker-editor')[0];
									e.down('[name=trnt_exps]').setValue(this.value);
								}
							}
						}
					},{ dataIndex: 'sum_qntt'		, text : Language.get('ostt_qntt'		,'수량'		) , width :  80 , align : 'right', xtype: 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'sum_m2'			, text : Language.get('m2'				,'총m2'		) , width :  80 , align : 'right', xtype : 'numericcolumn', hidden : true
					},{ dataIndex: ''				, text : Language.get(''				,'비고'		) , flex  :   1 , align : 'left'
					}
				]
			}
		;
		return item;
	}
});