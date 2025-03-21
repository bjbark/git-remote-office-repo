Ext.define('module.prod.order.workbook.view.WorkBookListerDetail4', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-workbook-lister-detail4',
	store		: 'module.prod.order.workbook.store.WorkBookDetail4',
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
					},{	dataIndex: 'item_name'		, text : Language.get('item_name'		, '품명'			) , width : 300 , align : 'left'
					},{	dataIndex: 'unit_name'		, text : Language.get('unit_name'		, '단위명'			) , width :  60 , align : 'center'
					},{	dataIndex: 'need_qntt'		, text : Language.get('need_qntt'		, '소요수량'		) , width :  70 , align : 'right'
					},{	dataIndex: 'ivst_qntt'		, text : Language.get('ivst_qntt'		, '투입수량'		) , width :  70 , align : 'right'
					},{	dataIndex: 'stnd_unit_qntt'	, text : Language.get('stnd_unit_qntt'	, '기준단위수량'		) , width :  90 , align : 'right'
					},{	dataIndex: 'lott_numb'		, text : Language.get('lott_numb'		, 'LOT번호'		) , width : 100 , align : 'left'
					},{	dataIndex: 'lott_mngt_yorn'	, text : Language.get('lott_mngt_yorn'	, 'LOT관리'		) , width :  60 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{ dataIndex: 'uper_seqn'		, text : Language.get('uper_seqn'		, '상위순번'		) , width :  70 , align : 'right', hidden : true
					},{ dataIndex: 'disp_seqn'		, text : Language.get('disp_seqn'		, '표시순번'		) , width : 130 , align : 'right', hidden : true
					},{ dataIndex: 'remk_text'		, text : Language.get('remk_text'		, '비고'			) , flex  :   1 , align : 'left'
					}
				]
			}
		;
		return item;
	 }

});
