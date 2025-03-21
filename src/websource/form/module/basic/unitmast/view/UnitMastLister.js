Ext.define('module.basic.unitmast.view.UnitMastLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-unitmast-lister',
	store		: 'module.basic.unitmast.store.UnitMast',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
	features	: [ { ftype : 'grid-summary' , remote : true } ],
	plugins		: [ { ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'} ],
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
					{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action, cls: 'button-style' } ,
					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action, cls: 'button-style' } ,
					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button-style' } , '-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } ,
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults	: {style: 'text-align: center'},
				items		: [
//					{	text: Language.get('line_stat' , '상태'    )	, dataIndex: 'line_stat', width: 40, align : 'center', xtype :'lookupcolumn', lookupValue : resource.lookup('line_stat')
					{	text: Language.get('unit_code' , '단위코드' )	, dataIndex: 'unit_code', width: 70
					},{	text: Language.get('unit_name' , '단위명'  )	, dataIndex: 'unit_name', width: 80
					},{ dataIndex: 'widh_yorn'		, text : Language.get('widh_yorn'		,'폭여부')		, width : 60 , align : 'center', xtype :'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{ dataIndex: 'leng_yorn'		, text : Language.get('leng_yorn'		,'길이여부')		, width : 60 , align : 'center', xtype :'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{ dataIndex: 'tick_yorn'		, text : Language.get('tick_yorn'		,'두께여부')		, width : 60 , align : 'center', xtype :'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{ dataIndex: 'evlt_unit_yorn'	, text : Language.get('evlt_unit_yorn'	,'평가여부')		, width : 60 , align : 'center', xtype :'lookupcolumn', lookupValue : resource.lookup('yorn')
//					},{ dataIndex: 'actv_unit_yorn'	, text : Language.get('actv_unit_yorn'	,'액티비티단위여부'), width : 100 , align : 'center', xtype :'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{ dataIndex: 'dcml_calc_mthd'	, text : Language.get('dcml_calc_mthd'	,'소수점계산방식'), width : 100 , align : 'center', xtype :'lookupcolumn', lookupValue : resource.lookup('dcml_calc_mthd')
					},{ dataIndex: 'user_memo'		, text : Language.get(''				,'비고')			, flex  : 100
					}
				]
			}
		;
		return item;
	}
});