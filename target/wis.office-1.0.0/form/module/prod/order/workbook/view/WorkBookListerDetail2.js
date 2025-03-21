Ext.define('module.prod.order.workbook.view.WorkBookListerDetail2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-workbook-lister-detail2',
	store		: 'module.prod.order.workbook.store.WorkBookDetail2',
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
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' , itemId : 'detail2' } //엑셀버튼.
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
					{	dataIndex: 'line_seqn'		, text : Language.get('line_seqn'		, '순번'		) , width :  40 , align : 'center'
					},{	dataIndex: 'poor_bacd_name'	, text : Language.get('poor_bacd_name'	, '불량구분'	) , width :  90 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('poor_bacd')
					},{	dataIndex: 'sttm'			, text : Language.get('sttm'			, '시작시간'	) , width : 130 , align : 'center', hidden : true
					},{	dataIndex: 'edtm'			, text : Language.get('edtm'			, '종료시간'	) , width : 130 , align : 'center', hidden : true
					},{	dataIndex: 'drtr_name'		, text : Language.get('drtr_name'		, '작업자명'	) , width : 100 , align : 'left'
					},{	dataIndex: 'occr_qntt'		, text : Language.get('occr_qntt'		, '발생수량'	) , width :  90 , align : 'right', hidden : true
					},{	dataIndex: 'good_qntt'		, text : Language.get('good_qntt'		, '양품수량'	) , width :  90 , align : 'right', hidden : true
					},{	dataIndex: 'poor_qntt'		, text : Language.get('poor_qntt'		, '불량수량'	) , width :  90 , align : 'right'
					},{ dataIndex: 'poor_proc_dvcd'	, text : Language.get('poor_proc_dvcd'	, '불량처리'	) , width :  80 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('poor_proc_dvcd'), hidden : true
					},{ dataIndex: 'uper_seqn'		, text : Language.get('uper_seqn'		, '상위순번'	) , width : 130 , align : 'right', hidden : true
					},{ dataIndex: 'disp_seqn'		, text : Language.get('disp_seqn'		, '표시순번'	) , width :  70 , align : 'right', hidden : true
					},{ dataIndex: 'remk_text'		, text : Language.get('remk_text'		, '비고'		) , flex  :   1 , align : 'left'
					}
				]
			}
		;
		return item;
	 }

});
