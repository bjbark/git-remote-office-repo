Ext.define('module.prod.order.prodinput.view.ProdInputListerMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prodinput-lister-master',
	store		: 'module.prod.order.prodinput.store.ProdInputMaster',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },
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

					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style'} , '-' , //엑셀버튼.
				]
			}
		;
		return item ;
	},


	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'cstm_name'	, width : 130 , align : 'center', text : Language.get('cstm_name'	,'거래처명')
					},{ dataIndex: 'item_name'	, flex  : 190 , align : 'center', text : Language.get('prod_name'	,'제품명'	)
					},{ dataIndex: 'item_spec'	, flex  : 100 , align : 'center', text : Language.get('item_spec'	,'규격'	)
					},{ dataIndex: 'indn_qntt'	, width : 80  , align : 'right' , text : Language.get('indn_qntt'	,'투입수량'), xtype: 'numericcolumn' , summaryType: 'sum' , format: '#,##0'
					}
				]
			}
		;
		return item;
	 }

});
