Ext.define('module.custom.iypkg.eis.eisreport1.view.EisReport1Detail3', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-eisreport1-detail3'			,
	store		: 'module.custom.iypkg.eis.eisreport1.store.EisReport1Detail3',
	selModel	: { selType: 'cellmodel' },
	border		: 0,
	columnLines : true,
	features	: [{ ftype : 'grid-summary' }],
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
					'-', '->', '-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } //엑셀버튼.
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
					{	dataIndex: 'fabc_name'		, text : Language.get('fabc_name'		, '원자재명'		) , width : 160 , align : 'center'
					},{ dataIndex: 'ppln_dvcd'		, text : Language.get('ppln_dvcd'		, '평량/골'		) , width : 100 , align : 'left'
					},{ dataIndex: 'item'			, text : Language.get('item_spec'		, '규격'			) , width : 160 , align : 'center'
					},{ dataIndex: 'item_fxqt'		, text : Language.get('item_fxqt'		, '절수'			) , width :  70 , align : 'center'
					},{ dataIndex: ''		, text : Language.get(''		, '개수'			) , width :  70 , align : 'right'
					},{ dataIndex: 'istt_qntt'		, text : Language.get('istt_qntt'		, '수량'			) , width : 100 , align : 'right'
					},{ dataIndex: 'stnd_pric'		, text : Language.get('istt_pric'		, '단가'			) , width : 100 , align : 'right'
					},{ dataIndex: 'stnd_pric2'		, text : Language.get('istt_pric'		, '단가'			) , width : 100 , align : 'right',hidden:true
					},{ dataIndex: 'ttsm_amnt'		, text : Language.get('ttsm_amnt'		, '공급가'		) , width : 100 , align : 'right'
					},{ dataIndex: ''		, text : Language.get(''		, '원가율'		) , width :  80 , align : 'right'
					},{ dataIndex: 'make_cmpy_name'	, text : Language.get('make_cmpy_name'		, '매입처'		) , width : 160 , align : 'right'
					},{ dataIndex: 'remk_text'		, text : Language.get('remk_text'		, '비고'		) , flex  :   1 , align : 'left'
//					},{ dataIndex: 'invc_date'		, text : Language.get('remk_text'		, '비고'		) , flex  :   1 , align : 'left' ,hidden:true
					},{ dataIndex: 'invc_numb'		, text : Language.get('remk_text'		, '비고'		) , flex  :   1 , align : 'left',hidden:true
					}
				]
			}
		;
		return item;
	}
});