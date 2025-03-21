Ext.define('module.stock.isos.goodsrettwork.view.GoodsRettWorkListerMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-goodsrettwork-lister-master',
	store		: 'module.stock.isos.goodsrettwork.store.GoodsRettWorkMaster',

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
					{	dataIndex: 'line_stat'		, text : Language.get('line_stat'		,'상태'		) , width :  50	, align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat')
					},{ dataIndex: 'invc_date'		, text : Language.get('rett_date'		,'반품일자'	) , width :  80	, align : 'center'
					},{	dataIndex: 'invc_numb'		, text : Language.get('rett_numb'		,'반품번호'	) , width : 110	, align : 'center'
					},{ dataIndex: 'cstm_code'		, text : Language.get('cstm_code'		,'거래처코드'	) , width : 100	, align : 'center', hidden: true
					},{ dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		,'거래처명'	) , width : 200
					},{ dataIndex: 'drtr_name'		, text : Language.get('drtr_name'		,'담당자'		) , width : 100
					},{ dataIndex: 'remk_text'		, text : Language.get('remk_text'		,'비고'		) , flex  : 100
					}
				]
			}
		;
		return item;
	}
});