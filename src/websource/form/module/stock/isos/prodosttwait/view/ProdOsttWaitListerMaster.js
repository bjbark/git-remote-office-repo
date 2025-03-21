Ext.define('module.stock.isos.prodosttwait.view.ProdOsttWaitListerMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prodosttwait-lister-master',
	store		: 'module.stock.isos.prodosttwait.store.ProdOsttWaitMaster',

	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],
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
					'-', '->', '-',
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style'	}

				]
			}
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'line_stat'	, text : Language.get('line_stat'		,'상태'		) , width :  50 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat')
					},{	dataIndex: 'invc_numb'	, text : Language.get('ostt_indn_numb'	,'출고지시번호') , width : 150 , align : 'center'
					},{ dataIndex: 'cstm_name'	, text : Language.get('cstm_name'		,'거래처명'	) , width : 200
					},{ dataIndex: 'cstm_code'	, text : Language.get('cstm_code'		,'거래처코드'	) , width : 100 , align : 'center', hidden: true
					},{ dataIndex: 'deli_date'	, text : Language.get('deli_date'		,'납기일자'	) , width :  80 , align : 'center'
					},{ dataIndex: 'ostt_date'	, text : Language.get('ostt_date'		,'출고일자'	) , width :  80 , align : 'center'
					},{ dataIndex: 'wrhs_name'	, text : Language.get('wrhs_name'		,'출고창고'	) , width : 130
					},{ dataIndex: 'user_name'	, text : Language.get('ostt_drtr'		,'출고담당'	) , width : 100
					}
				]
			}
		;
		return item;
	}
});