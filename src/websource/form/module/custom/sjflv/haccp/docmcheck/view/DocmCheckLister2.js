Ext.define('module.custom.sjflv.haccp.docmcheck.view.DocmCheckLister2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-sjflv-docmcheck-lister2',
	
	store		: 'module.custom.sjflv.haccp.docmcheck.store.DocmCheckStore2',
	border		: 0,
	columnLines	: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	
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
				dock	: 'bottom',
				items	: [
					'->',
					{ text: Const.MODIFY.text	, iconCls: Const.MODIFY.icon	, action: Const.MODIFY.action	, cls: 'button-style' },
					{ text: Const.DELETE.text	, iconCls: Const.DELETE.icon	, action: Const.DELETE.action	, cls: 'button-style' },
				]
			}
		;
		return item ;
	},
	
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	text: Language.get(''	, '작성일자'	) , dataIndex: 'invc_date'			, width: 80		, align: 'center'
					},{	text: Language.get(''	, '결재명#1'	) , dataIndex: 'apvl_name_1fst'		, width: 100	, align: 'center'
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

