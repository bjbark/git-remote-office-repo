Ext.define('module.custom.sjflv.mtrl.isttcalc.purccstmlist1.view.PurcCstmList1Lister', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-purccstmlist1-lister',
	store		: 'module.custom.sjflv.mtrl.isttcalc.purccstmlist1.store.PurcCstmList1',
	selModel	: { selType: 'checkboxmodel', mode : 'MULIT' },
	border		: 0,
	columnLines	: true,	
	features	: [{  ftype: 'grid-summary' } ],
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  } ],

	initComponent: function () {
		var me     = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var  me   = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'lister' , cls: 'button-style'},
				]
			};
		return item ;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me		= this,
			item	=  {
				defaults: {style: 'text-align:center'},
				items	: [
					{	dataIndex: 'cstm_code'	, text : Language.get('cstm_code'	,'거래처코드'	)	, width :  90 , align : 'center',
					},{ dataIndex: 'cstm_name'	, text : Language.get('cstm_name'	,'거래처명'		)	, width : 180 , align : 'left',
					},{ dataIndex: 'base_amnt'	, text : Language.get(''			,'기초채권'		)	, width : 110 , xtype :'numericcolumn', summaryType: 'sum', align : 'right',
					},{ dataIndex: 'puch_amnt'	, text : Language.get(''			,'매출'		)	, width : 100 , xtype :'numericcolumn', summaryType: 'sum', align : 'right',
					},{ dataIndex: 'note_amnt'	, text : Language.get(''			,'어음'		)	, width : 100 , xtype :'numericcolumn', summaryType: 'sum', align : 'right',
					},{ dataIndex: 'colt_amnt'	, text : Language.get(''			,'현금'		)	, width : 100 , xtype :'numericcolumn', summaryType: 'sum', align : 'right',
					},{ dataIndex: 'ttsm_amnt'	, text : Language.get(''			,'합계'		)	, width : 100 , xtype :'numericcolumn', summaryType: 'sum', align : 'right',
					},{ dataIndex: 'npay_amnt'	, text : Language.get(''			,'잔액'		)	, width : 100 , xtype :'numericcolumn', summaryType: 'sum', align : 'right',
					},{ dataIndex: 'drtr_name'	, text : Language.get(''			,'담당자명'		)	, width : 100
					}
				]
			};
		return item;
	}
 });