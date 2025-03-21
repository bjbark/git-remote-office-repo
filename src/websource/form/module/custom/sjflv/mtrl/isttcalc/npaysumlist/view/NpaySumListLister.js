Ext.define('module.custom.sjflv.mtrl.isttcalc.npaysumlist.view.NpaySumListLister', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-npaysumlist-lister',
	store		: 'module.custom.sjflv.mtrl.isttcalc.npaysumlist.store.NpaySumList',
	border		: 0,
	columnLines	: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
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
				    {	dataIndex:	'cstm_code'	, text: Language.get( 'cstm_code'	, '거래처코드'	)	, width : 80 ,  align : 'center',	
				    },{	dataIndex:	'cstm_name'	, text: Language.get( 'cstm_name'	, '거래처명'	)	, width : 100 , align : 'left'  ,	
				    },{ dataIndex:	'base_amnt'	, text : Language.get(''			, '기초채권'	)	, width :  90 , align : 'right', xtype :'numericcolumn', summaryType: 'sum'
					},{ dataIndex:	'puch_amnt'	, text : Language.get(''			, '매입'		)	, width :  95 , align : 'right', xtype :'numericcolumn', summaryType: 'sum'
					},{ dataIndex:	'ttsm_amnt'	, text : Language.get(''			, '지금'		)	, width :  95 , align : 'right', xtype :'numericcolumn', summaryType: 'sum'
					},{ dataIndex:	'npay_amnt'	, text : Language.get(''			, '잔액'		)	, width :  95 , align : 'right', xtype :'numericcolumn', summaryType: 'sum'
					},{ dataIndex:	'drtr_name'	, text : Language.get(''			, '담당자명'	)	, width :  75	
					}
				]
			};
		return item;
	}
 });