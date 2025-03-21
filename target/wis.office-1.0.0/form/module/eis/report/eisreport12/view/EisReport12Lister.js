Ext.define('module.eis.report.eisreport12.view.EisReport12Lister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-eisreport12-lister'			,
	store		: 'module.eis.report.eisreport12.store.EisReport12'	,
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
					{	dataIndex:	'acpt_numb'      ,width: 160, align: 'left', text : '수주번호'
					},{	dataIndex:	'cstm_idcd'      ,width:  90, align: 'left', text : '거래처코드'
					},{	dataIndex:	'cstm_name'      ,width: 250, align: 'left', text : '거래처명'
					},{	dataIndex:	'item_clss'      ,width: 160, align: 'left', text : '품목분류'
					},{	dataIndex:	'invc_date'      ,width: 100, align: 'center', text : '수주일자'
					},{	dataIndex:	'org_deli_date'  ,width: 100, align: 'center', text : '납기일자'
					},{	dataIndex:	'deli_date'      ,width: 100, align: 'center', text : '납품일자'
					}
				]
			}
		;
		return item;
	}
});
