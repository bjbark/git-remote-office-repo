Ext.define('module.custom.sjflv.haccp.docmmast.view.DocmMastLister2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-sjflv-docmmast-lister2',
	
	store		: 'module.custom.sjflv.haccp.docmmast.store.DocmDetailStore1',
	border		: 0,
	columnLines	: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	
	initComponent: function () {
		var me = this;
		me.columns = me.columnItem();
		me.callParent();
	},
	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	text: Language.get(''	, '결재명#1'	) , dataIndex: 'apvl_name_1fst'		, width: 100	, align: 'center'
					},{	text: Language.get(''	, '결재담당자#1') , dataIndex: 'apvl_drtr_name_1fst', width: 90		, align: 'center'
					},{	text: Language.get(''	, '결재명#2'	) , dataIndex: 'apvl_name_2snd'		, width: 90		, align: 'center'
					},{	text: Language.get(''	, '결재담당자#2') , dataIndex: 'apvl_drtr_name_2snd', width: 90		, align: 'center'
					},{	text: Language.get(''	, '결재명#3'	) , dataIndex: 'apvl_name_3trd'		, width: 180	, align: 'center'
					},{	text: Language.get(''	, '결재담당자#3') , dataIndex: 'apvl_drtr_name_3trd', width: 130	, align: 'center'
					},
				]
			};
			
		return item;
	},
});

