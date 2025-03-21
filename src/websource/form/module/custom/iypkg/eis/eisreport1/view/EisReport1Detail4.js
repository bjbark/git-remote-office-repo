Ext.define('module.custom.iypkg.eis.eisreport1.view.EisReport1Detail4', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-eisreport1-detail4'			,
	store		: 'module.custom.iypkg.eis.eisreport1.store.EisReport1Detail4',
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
					{	dataIndex: 'wkct_idcd'		, text : Language.get(''		,'작업공정'		) , width : 100 , align : 'center'
					},{ dataIndex: 'wkun_dvcd'		, text : Language.get(''		,'작업단위'		) , width :  80 , align :'left'
					},{ dataIndex: 'plan_qntt'		, text : Language.get(''		,'수량'			) , width : 100 , align : 'center'
					},{ dataIndex: 'qntt_unit_idcd'	, text : Language.get(''		,'단위'			) , width :  50 , align : 'center'
					},{ dataIndex: 'stnd_pric'		, text : Language.get(''		,'단가'			) , width : 100 , align : 'right'
					},{ dataIndex: 'stnd_pric2'		, text : Language.get(''		,'단가'			) , width : 100 , align : 'right',hidden:true
					},{ dataIndex: 'ttsm_amnt'		, text : Language.get(''		,'공급가'		) , width : 100 , align : 'center'
					},{ dataIndex: 'remk_text'		, text : Language.get(''		,'비고'			) , flex  :   1 , align : 'center'
					},{ dataIndex: 'invc_numb'		, text : Language.get(''		,'비고'			) , flex  :   1 , align : 'center',hidden:true
					}
				]
			}
		;
		return item;
	}
});