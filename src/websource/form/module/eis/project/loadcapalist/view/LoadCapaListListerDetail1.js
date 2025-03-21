Ext.define('module.eis.project.loadcapalist.view.LoadCapaListListerDetail1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-loadcapalist-lister-detail1',
	store		: 'module.eis.project.loadcapalist.store.LoadCapaListDetail1',
	plugins		: [{ ptype  :'cellediting-directinput', clicksToEdit: 1 } ,{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	width		: 600,
	columnLines : true,
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
				itemId : 'sub',
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'line_seqn'		, text : Language.get('line_seqn'	,'순번')			, width :  50 ,align : 'center'
					},{ dataIndex: 'cstm_name'		, text : Language.get('cstm_name'	,'거래처명')		, width : 130 , align : 'center'
					},{ dataIndex: 'ar_amnt'		, text : Language.get('ar_amnt'		,'미수총액')		, width :  80 , align : 'right', xtype : 'numericcolumn'
					},{ dataIndex: 'ar_amnt1'		, text : Language.get('ar_amnt'		,'1개월')			, width :  80 , align : 'right', xtype : 'numericcolumn'
					},{ dataIndex: 'ar_amnt2'		, text : Language.get('ar_amnt'		,'2개월')			, width :  80 , align : 'right', xtype : 'numericcolumn'
					},{ dataIndex: 'ar_amnt3'		, text : Language.get('ar_amnt'		,'3개월')			, width :  80 , align : 'right', xtype : 'numericcolumn'
					},{ dataIndex: 'ar_amnt4'		, text : Language.get('ar_amnt'		,'3개월이상')		, width :  80 , align : 'right', xtype : 'numericcolumn'
					}
				]
			}
		;
		return item;
	}
});