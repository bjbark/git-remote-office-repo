Ext.define('module.stock.isos.goodsosttwork.view.GoodsOsttWorkListerMaster1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-goodsosttwork-lister-master1',
	store		: 'module.stock.isos.goodsosttwork.store.GoodsOsttWorkMaster1',

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
					{	text : '<span class="write-button">거래명세서 출력</span>', action : 'printAction',cls: 'button1-style', width: 100	},
					{	text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action ,cls: 'button-style'} ,
					{	text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action ,cls: 'button-style'} ,'-' ,
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style', itemId : 'master'	}

				]
			}
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'line_stat'		, text : Language.get('line_stat'		,'상태'		) , width : 50  , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat')
					},{	dataIndex: 'invc_numb'		, text : Language.get('shpm_numb'		,'출고번호'		) , width : 150 , align : 'center'
					},{ dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		,'거래처명'		) , width : 130
					},{ dataIndex: 'cstm_code'		, text : Language.get('cstm_code'		,'거래처코드'	) , width : 100 , align : 'center', hidden: true
					},{ dataIndex: 'deli_date'		, text : Language.get('deli_date'		,'납기일자'		) , width : 80  , align : 'center'
					},{ dataIndex: 'invc_date'		, text : Language.get('shpm_date'		,'출고일자'		) , width : 80  , align : 'center'
					},{ dataIndex: 'drtr_name'		, text : Language.get('drtr_name'		,'출고담당'		) , width : 100
					},{ dataIndex: 'user_memo'		, text : Language.get('user_memo'		,'비고'		) , flex  : 100
					}
				]
			}
		;
		return item;
	}
});