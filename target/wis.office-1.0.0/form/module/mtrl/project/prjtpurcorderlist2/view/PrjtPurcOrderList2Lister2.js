Ext.define('module.mtrl.project.prjtpurcorderlist2.view.PrjtPurcOrderList2Lister2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prjtpurcorderlist2-lister2',
	store		: 'module.mtrl.project.prjtpurcorderlist2.store.PrjtPurcOrderList2Lister2',
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: {ptype  :'cellediting-directinput', clicksToEdit: 1 },
	columnLines : true,

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
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style',itemId:'lister2'	}
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		,'거래처명'	) , width : 100
					},{ dataIndex: 'istt_amnt'		, text : Language.get('istt_amnt'		,'매입금액'	) , width : 100 , xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'istt_vatx'		, text : Language.get('istt_vatx'		,'부가세'	) , width : 100 , xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'ttsm_amnt'		, text : Language.get('ttsm_amnt'		,'합계금액'	) , width : 100 , xtype : 'numericcolumn', summaryType: 'sum'
					}
				]
			}
		;
		return item;
	},


});
