Ext.define('module.prod.order.prodinput.view.ProdInputListerMaster1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prodinput-lister-master1',
	store		: 'module.prod.order.prodinput.store.ProdInputMaster1'	,
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
					'->', '-' ,
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'cstm_name'	, width : 110, align : 'center', text : Language.get('cstm_name'	,'거래처명' )
					},{ dataIndex: 'item_name'	, flex  : 140, align : 'center', text : Language.get('prod_name'	,'제품명'	 )
					},{ dataIndex: 'item_spec'	, flex  : 90 , align : 'center', text : Language.get('item_spec'	,'규격'	 )
					},{ dataIndex: 'indn_qntt'	, width : 80 , align : 'right' , text : Language.get('indn_qntt'	,'투입수량' ), xtype: 'numericcolumn' , summaryType: 'sum' , format: '#,##0'
					},{ dataIndex: 'prod_qntt'	, width : 80 , align : 'right' , text : Language.get('prod_qntt'	,'완성수량' ), xtype: 'numericcolumn' , summaryType: 'sum' , format: '#,##0'
					},{ dataIndex: 'good_qntt'	, width : 80 , align : 'right' , text : Language.get('good_qntt'	,'양품수량' ), xtype: 'numericcolumn' , summaryType: 'sum' , format: '#,##0'
					},{ dataIndex: 'poor_qntt'	, width : 80 , align : 'right' , text : Language.get('poor_qntt'	,'불량수량' ), xtype: 'numericcolumn' , summaryType: 'sum' , format: '#,##0'
					},{ dataIndex: 'ttsm_amnt'	, width : 80 , align : 'right' , text : Language.get('ttsm_amnt'	,'당월매출액'), hidden : true
					},{ dataIndex: 'trst_qntt'	, width : 80 , align : 'right' , text : Language.get('trst_qntt'	,'출고대기'	 ), hidden : true
					},{ dataIndex: 'summ_qntt'	, width : 80 , align : 'right' , text : Language.get('summ_qntt'	,'합계수량' ), hidden : true
					}
				]
			}
		;
		return item;
	}
});