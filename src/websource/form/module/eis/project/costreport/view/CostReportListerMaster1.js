Ext.define('module.eis.project.costreport.view.CostReportListerMaster1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-costreport-lister-master1',
	store		: 'module.eis.project.costreport.store.CostReportMaster1',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],
	border		: 0,
	columnLines : true,
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
					'->', '-' ,
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,

			item = {
				itemId : 'sub',
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'item_code'		, text : Language.get('item_code'		,'부품코드'	) , width : 100 , align : 'center'
					},{ dataIndex: 'prnt_item_name'	, text : Language.get('prnt_item_name'	,'중분류'	) , width : 150 , align : 'left'
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명'	) , width : 150 , align : 'left'
					},{ dataIndex: 'wkct_name'		, text : Language.get('wkct_name'		,'공정명'	) , width :  80 , align : 'left'
					},{ dataIndex: 'cvic_name'		, text : Language.get('cvic_name'		,'설비명'	) , width :  80 , align : 'left'
					},{ dataIndex: 'work_cont'		, text : Language.get('work_cont'		,'가공내역'	) , width : 180 , align : 'left'
					},{ dataIndex: 'work_sttm'		, text : Language.get('work_sttm'		,'시작시간'	) , width : 100 , align : 'center'
					},{ dataIndex: 'work_edtm'		, text : Language.get('work_edtm'		,'마침시간'	) , width : 100 , align : 'center',
					},{ dataIndex: 'need_time'		, text : Language.get('need_time'		,'작업시간'	) , width : 100 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum',
					},{ dataIndex: 'wker_1fst_name'	, text : Language.get('wker_1fst_name'	,'작업자'	) , width : 100 , align : 'left',
					},{ dataIndex: 'wker_2snd_name'	, text : Language.get('wker_2snd_name'	,'작업자'	) , width : 100 , align : 'left',
					},{ dataIndex: 'wker_3trd_name'	, text : Language.get('wker_3trd_name'	,'작업자'	) , width : 100 , align : 'left'
					}
				]
			}
		;
		return item;
	}
});