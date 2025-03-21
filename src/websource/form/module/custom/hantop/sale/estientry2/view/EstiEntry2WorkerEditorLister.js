Ext.define('module.hantop.sale.estientry2.view.EstiEntry2WorkerEditorLister', { extend: 'Axt.grid.Panel',
	alias: 'widget.module-estimast2-worker-editor-lister',
	store: 'module.custom.hantop.sale.estientry2.store.EstiEntry2EditorLister',

	region : 'center',
	width  : 300,
	border : 0,
	columnLines: true,
	features: [{ftype :'grid-summary'}],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent: function () {
		var me = this;
		me.columns = me.columnItem();
		me.callParent();
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex :	'base_name'		, width: 100 , align : 'center'	, text: Language.get(''	, '브랜드명'		)
					},{	dataIndex : 'brnd_amnt'		, width: 150 , align : 'right'	, text: Language.get(''	, '견적금액'		), xtype : 'numericcolumn' , format: '#,##0'
					}
				]
			}
		;
		return item;
	},

});
