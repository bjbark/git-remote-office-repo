Ext.define('module.custom.sjflv.prod.order.workbook.view.WorkBookListerDetail5', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-sjflv-workbook-lister-detail5',
	store		: 'module.custom.sjflv.prod.order.workbook.store.WorkBookDetail5',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],
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
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' , itemId : 'detail4' } //엑셀버튼.
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
					{	dataIndex: 'line_seqn'		, text : Language.get('line_seqn'		, '순번'			) , width :  40 , align : 'center'
					},{	dataIndex: 'remk_text'		, text : Language.get('remk_text'		, '검사항목'		) , width : 300 , align : 'left'
					},{	dataIndex: 'frst_msmt'		, text : Language.get('frst_msmt'		, '1차 값'			) , width :  60 , align : 'center'
					},{	dataIndex: 'frst_msmt_2hr'	, text : Language.get('frst_msmt_2hr'	, '2차 값'			) , width :  70 , align : 'center'
					},{	dataIndex: 'insp_sbsc_name'	, text : Language.get('insp_sbsc_name'	, '메모'			) , width : 500 , align : 'left'
					}
				]
			}
		;
		return item;
	 }

});
