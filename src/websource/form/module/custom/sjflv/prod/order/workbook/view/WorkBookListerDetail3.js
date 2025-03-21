Ext.define('module.custom.sjflv.prod.order.workbook.view.WorkBookListerDetail3', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-sjflv-workbook-lister-detail3',
	store		: 'module.custom.sjflv.prod.order.workbook.store.WorkBookDetail3',
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
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' , itemId : 'detail3' } //엑셀버튼.
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
					},{	dataIndex: 'loss_name'		, text : Language.get('loss_name'		, '유실사유'		) , width :  90 , align : 'center'
					},{	dataIndex: 'sttm'			, text : Language.get('sttm'			, '시작시간'		) , width : 130 , align : 'center'
					},{	dataIndex: 'edtm'			, text : Language.get('edtm'			, '종료시간'		) , width : 130 , align : 'center'
					},{	dataIndex: 'loss_time'		, text : Language.get('loss_time'		, '유실시간'		) , width : 130 , align : 'center'
					},{	dataIndex: 'loss_pcnt'		, text : Language.get('loss_pcnt'		, '유실인원'		) , width : 100 , align : 'right'
					},{	dataIndex: 'loss_mnhr'		, text : Language.get('loss_mnhr'		, '유실공수'		) , width :  70 , align : 'right'
					},{ dataIndex: 'runn_dsct_yorn'	, text : Language.get('runn_dsct_yorn'	, '가동중단'		) , width :  70 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn')
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
