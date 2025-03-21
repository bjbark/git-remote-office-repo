Ext.define('module.custom.sjflv.prod.order.workbook.view.WorkBookListerDetail1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-sjflv-workbook-lister-detail1',
	store		: 'module.custom.sjflv.prod.order.workbook.store.WorkBookDetail1',
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
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' , itemId : 'detail1' } //엑셀버튼.
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
					{	dataIndex: 'invc_date'		, text : Language.get('prod_date'		, '생산일자'	) , width :  90 , align : 'center'
					},{	dataIndex: 'line_seqn'		, text : Language.get('line_seqn'		, '순번'		) , width :  40 , align : 'center'
					},{	dataIndex: 'work_pcnt_dvcd'	, text : Language.get('work_pcnt_dvcd'	, '작업인원'	) , width :  90 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('work_pcnt_dvcd'), hidden : true
					},{	dataIndex: 'work_sttm'		, text : Language.get('work_sttm'		, '시작시간'	) , width : 130 , align : 'center'
					},{	dataIndex: 'work_edtm'		, text : Language.get('work_edtm'		, '종료시간'	) , width : 130 , align : 'center'
					},{	dataIndex: 'work_pcnt'		, text : Language.get('work_pcnt'		, '작업인원'	) , width :  70 , align : 'right', hidden : true
					},{	dataIndex: 'need_time'		, text : Language.get('need_time'		, '소요시간'	) , width :  70 , align : 'center'
					},{	dataIndex: 'work_mnhr'		, text : Language.get('work_mnhr'		, '작업공수'	) , width :  70 , align : 'right', hidden : true
					},{	dataIndex: 'drtr_name'		, text : Language.get('drtr_name'		, '담당자명'	) , width : 100 , align : 'left'
					},{ dataIndex: 'uper_seqn'		, text : Language.get('uper_seqn'		, '상위순번'	) , flex  :   1 , align : 'left', hidden : true
					},{ dataIndex: 'disp_seqn'		, text : Language.get('disp_seqn'		, '상위순번'	) , flex  :   1 , align : 'left', hidden : true
					},{ dataIndex: 'user_memo'		, text : Language.get('user_memo'		, '비고'		) , flex  :   1 , align : 'left'
					}
				]
			}
		;
		return item;
	 }

});
