Ext.define('module.prod.cvic.cvicchecktype.view.CvicCheckTypeLister', { extend: 'Axt.grid.Panel',
	 alias		: 'widget.module-cvicchecktype-lister'			,
	store		: 'module.prod.cvic.cvicchecktype.store.CvicCheckType'	,
	selModel 	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' , remote : true } ],
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
					{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action, cls: 'button-style' } ,
					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action, cls: 'button-style' } ,
					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button-style' } , '-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } ,
				]
			};
		return item ;
	},


	columnItem : function () {
		var me = this
			,item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'line_stat'			, text : Language.get('line_stat'		,'사용'			) , width :  50 , xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat'), align : 'center'
					},{	dataIndex: 'chek_type_code'		, text : Language.get('chek_type_code'	,'점검유형코드'	) , width : 150 , align : 'center'
					},{	dataIndex: 'chek_type_name'		, text : Language.get('chek_type_name'	,'점검유형명'		) , width : 200
					},{	dataIndex: 'chek_mthd_dvcd'		, text : Language.get('chek_mthd_dvcd'	,'점검방법'		) , width : 100 , xtype : 'lookupcolumn', lookupValue : resource.lookup('chek_mthd_dvcd'), align : 'center'
					},{	dataIndex: 'chek_cond'			, text : Language.get('chek_cond'		,'점검조건'		) , flex  :   1
					}
				]
			}
		;
		return item;
	}
});
