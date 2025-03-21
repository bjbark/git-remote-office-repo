Ext.define('module.eis.report.eisreport11.view.EisReport11Lister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-eisreport11-lister'			,
	store		: 'module.eis.report.eisreport11.store.EisReport11'	,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
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
					'->', '-' ,
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' }
				]
			};
		return item ;
	},


	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex:	'acpt_numb'	, width: 180 ,	align: 'left',	text: '생산지시번호'
					},{	dataIndex:	'item_clss'	, width: 180 ,	align: 'left',	text: '품목분류'
					},{	dataIndex:	'invc_date'	, width: 120 ,	align: 'center',	text: '수주일자'
					},{	dataIndex:	'cstm_name'	, width: 200 ,	align: 'left',	text: '거래처명'
					},{	dataIndex:	'strt_date'	, width: 120 ,	align: 'center',	text: '착수일자'
					},{	dataIndex:	'endd_date'	, width: 120 ,	align: 'center',	text: '종료일자'
					},{	dataIndex:	'lead_time'	, width:  90 ,	align: 'right',	text: '리드타임'
					}
				]
			}
		;
		return item;
	}
});
