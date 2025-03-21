Ext.define('module.mtrl.project.prjtpurcorderlist.view.PrjtPurcOrderListDetail', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prjtpurcorderlist-detail',
	store		: 'module.mtrl.project.prjtpurcorderlist.store.PrjtPurcOrderListDetail',
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent: function () {
		var me = this;
		me.paging	= me.pagingItem();
		me.columns	= me.columnItem();
		me.callParent();
	},

	createForm: function(){
		var me = this,
			form = {
				xtype		: 'form-layout',
				region		: 'center',
				border		: false,
				dockedItems : [ me.createLine1() ],
				items		: [ me.createGrid() ]
			}
		;
		return form;
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'->', '-' ,
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style'	}
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex: 'line_seqn'		, text : Language.get('line_seqn'		,'순번'		) , width : 80  , align : 'center'
					},{ dataIndex: 'cstm_code'		, text : Language.get('cstm_code'		,'거래처코드'	) , width : 100 , align : 'center', hidden : true
					},{ dataIndex: 'acct_bacd'		, text : Language.get('acct_bacd'		,'계정분류코드'	) , width : 130 , align : 'left', xtype : 'lookupcolumn', lookupValue : resource.lookup('acct_bacd'), hidden : true
					},{	dataIndex: 'item_code'		, text : Language.get('item_code'		,'품목코드'		) , width : 150 , align : 'center'
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명'		) , width : 180 , align : 'left'
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'규격'		) , width : 120 , align : 'left'
					},{ dataIndex: 'unit_name'		, text : Language.get('unit_name'		,'단위'		) , width : 60  , align : 'left'
					},{ dataIndex: 'istt_qntt'		, text : Language.get('istt_qntt'		,'입고수량'		) , width : 80  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'istt_pric'		, text : Language.get('istt_pric'		,'단가'		) , width : 80  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'istt_amnt'		, text : Language.get('istt_amnt'		,'금액'		) , width : 80  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'istt_vatx'		, text : Language.get('istt_vatx'		,'부가세'		) , width : 80  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'ttsm_amnt'		, text : Language.get('ttsm_amnt'		,'합계금액'		) , width : 80  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'remk_text'		, text : Language.get('remk_text'		,'비고'		) , flex  : 1   , align : 'left'
					}
				]
			}
		;
		return item;
	},

});
