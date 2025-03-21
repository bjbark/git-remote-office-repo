Ext.define('module.custom.iypkg.eis.eisreport1.view.EisReport1Detail5', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-eisreport1-detail5'			,
	store		: 'module.custom.iypkg.eis.eisreport1.store.EisReport1Detail5',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
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
					{	dataIndex: 'sttm'			, text : Language.get(''		,'수량'			) , width : 100 , align : 'right'
					},{ dataIndex: 'edtm'			, text : Language.get(''		,'단위'			) , width :  50 , align : 'center'
					},{ dataIndex: 'loss_time'		, text : Language.get(''		,'단가'			) , width : 100 , align : 'right'
					},{ dataIndex: 'loss_name'		, text : Language.get(''		,'작업단위'		) , width :  80 , align : 'left'
					},{ dataIndex: 'crte_dttm'		, text : Language.get(''		,'공급가'		) , width : 100 , align : 'center'
					},{ dataIndex: 'loss_resn_dvcd'	, text : Language.get(''		,'비율'			) , width :  80 , align : 'right'
					},{ dataIndex: 'crte_dttm'		, text : Language.get(''		,'구분'			) , width :  80 , align : 'left'
					}
				]
			}
		;
		return item;
	}
});