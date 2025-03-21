Ext.define('module.custom.sjflv.haccp.docmmast.view.DocmMastLister3', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-sjflv-docmmast-lister3',
	
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
				items	: [
					'->',
					{ text: Const.ROWDELETE.text, iconCls: Const.ROWDELETE.icon	, action: Const.ROWDELETE.action, cls: 'button-style'},
					'->',
					{ text: Const.UPDATE.text	, iconCls: Const.UPDATE.icon	, action: Const.UPDATE.action	, cls: 'button-style'},
					{ text: Const.CANCEL.text	, iconCls: Const.CANCEL.icon	, action: Const.CANCEL.action	, cls: 'button-style'},
				],
				pagingButton : false
			}
		;
		return item ;
	},
	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	text: Language.get(''	, '작성담당명'	) , dataIndex: 'apvl_name_1fst'		, width: 100	, align: 'center'
					},{	text: Language.get(''	, '작성담당자'	) , dataIndex: 'apvl_drtr_name_1fst', width: 90		, align: 'center'
					},{	text: Language.get(''	, '결재명#2'	) , dataIndex: 'apvl_name_2snd'		, width: 90		, align: 'center'
					},{	text: Language.get(''	, '결재담당자#2') , dataIndex: 'apvl_drtr_name_2snd', width: 90		, align: 'center'
					},{	text: Language.get(''	, '결재명#3'	) , dataIndex: 'apvl_name_3trd'		, width: 180	, align: 'center'
					},{	text: Language.get(''	, '결재담당자#3') , dataIndex: 'apvl_drtr_name_3trd', width: 130	, align: 'center'
					},{	text: Language.get(''	, '작성주기'	) , dataIndex: ''					, width: 80		, align: 'center'
					},
				]
			};
			
		return item;
	},
});

