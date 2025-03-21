Ext.define('module.stock.isos.mtrlmonthlist.view.MtrlMonthListLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-mtrlmonthlist-lister',
	store		: 'module.stock.isos.mtrlmonthlist.store.MtrlMonthList',

	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' }],
//	columnLines : true,
	rowspan		: true,
	viewConfig: {
		markDirty: false,
		loadMask : false
	},

	initComponent: function () {
		var me = this;
		me.paging	= me.pagingItem();
		me.columns	= me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'toolbar', dock : 'bottom',
				items	: [
					'->', '-' ,
					{ text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex : 'item_code'	, text : Language.get('item_code'	,'품목코드'	), width : 150 , align : 'center' , rowRoot:true
					},{	dataIndex : 'item_name'	, text : Language.get('item_name'	,'품명'		), flex  :  70 , minWidth:250, align : 'left' , rowspan:true
					},{	dataIndex : 'item_spec'	, text : Language.get('item_spec'	,'규격'		), width : 120 , align : 'left' , rowspan:true
					},{	dataIndex : 'invc_dvcd'	, text : Language.get('invc_dvcd'	,'구분'		), width :  80
					},{	dataIndex : 'total'		, text : Language.get('total'	,'합계'		), width : 100 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum' , format : (_global.options.mes_system_type.toUpperCase() == 'SJFLV' ? '#,##0.###': null)
					},{	dataIndex : 'mnth_01'	, text : Language.get('mnth_01'	,'1월'		), width : 80 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum' , format : (_global.options.mes_system_type.toUpperCase() == 'SJFLV' ? '#,##0.###': null)
					},{	dataIndex : 'mnth_02'	, text : Language.get('mnth_02'	,'2월'		), width : 80 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum' , format : (_global.options.mes_system_type.toUpperCase() == 'SJFLV' ? '#,##0.###': null)
					},{	dataIndex : 'mnth_03'	, text : Language.get('mnth_03'	,'3월'		), width : 80 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum' , format : (_global.options.mes_system_type.toUpperCase() == 'SJFLV' ? '#,##0.###': null)
					},{	dataIndex : 'mnth_04'	, text : Language.get('mnth_04'	,'4월'		), width : 80 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum' , format : (_global.options.mes_system_type.toUpperCase() == 'SJFLV' ? '#,##0.###': null)
					},{	dataIndex : 'mnth_05'	, text : Language.get('mnth_05'	,'5월'		), width : 80 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum' , format : (_global.options.mes_system_type.toUpperCase() == 'SJFLV' ? '#,##0.###': null)
					},{	dataIndex : 'mnth_06'	, text : Language.get('mnth_06'	,'6월'		), width : 80 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum' , format : (_global.options.mes_system_type.toUpperCase() == 'SJFLV' ? '#,##0.###': null)
					},{	dataIndex : 'mnth_07'	, text : Language.get('mnth_07'	,'7월'		), width : 80 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum' , format : (_global.options.mes_system_type.toUpperCase() == 'SJFLV' ? '#,##0.###': null)
					},{	dataIndex : 'mnth_08'	, text : Language.get('mnth_08'	,'8월'		), width : 80 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum' , format : (_global.options.mes_system_type.toUpperCase() == 'SJFLV' ? '#,##0.###': null)
					},{	dataIndex : 'mnth_09'	, text : Language.get('mnth_09'	,'9월'		), width : 80 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum' , format : (_global.options.mes_system_type.toUpperCase() == 'SJFLV' ? '#,##0.###': null)
					},{	dataIndex : 'mnth_10'	, text : Language.get('mnth_10'	,'10월'		), width : 80 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum' , format : (_global.options.mes_system_type.toUpperCase() == 'SJFLV' ? '#,##0.###': null)
					},{	dataIndex : 'mnth_11'	, text : Language.get('mnth_11'	,'11월'		), width : 80 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum' , format : (_global.options.mes_system_type.toUpperCase() == 'SJFLV' ? '#,##0.###': null)
					},{	dataIndex : 'mnth_12'	, text : Language.get('mnth_12'	,'12월'		), width : 80 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum' , format : (_global.options.mes_system_type.toUpperCase() == 'SJFLV' ? '#,##0.###': null)
					}
				]
			}
		;
		return item;
	}
});