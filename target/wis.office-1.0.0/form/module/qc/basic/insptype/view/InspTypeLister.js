Ext.define('module.qc.basic.insptype.view.InspTypeLister', { extend: 'Axt.grid.Panel',
	 alias		: 'widget.module-insptype-lister'			,
	store		: 'module.qc.basic.insptype.store.InspType'	,
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
					{	dataIndex: 'line_stat'			, text : Language.get('line_stat'		,'사용')		, width : 50	, xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat'), align : 'center'
					},{	dataIndex: 'insp_type_code'		, text : Language.get('insp_type_code'	,'코드')		, width : 90	, align : 'center'
					},{	dataIndex: 'insp_type_name'		, text : Language.get('insp_type_name'	,'코드명')	, width : 200
					},{	dataIndex: 'insp_mthd_dvcd'		, text : Language.get('insp_mthd_dvcd'	,'검사방법')	, width : 80	, xtype :'lookupcolumn', lookupValue : resource.lookup('insp_mthd_dvcd'),align : 'center'
					},{	dataIndex: 'wkct_name'			, text : Language.get('wkct_name'		,'공정명')	, width : 120	, align : 'left'
					},{	dataIndex: 'smor_rate'			, text : Language.get('smor_rate'		,'시료(%)')	, width : 80	, align : 'right'
					},{	dataIndex: 'wkct_insp_yorn'		, text : Language.get('wkct_insp_yorn'	,'공정검사')	, width : 80	, align : 'center',xtype :'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{	dataIndex: 'rcpt_insp_yorn'		, text : Language.get('rcpt_insp_yorn'	,'인수검사')	, width : 80	, align : 'center',xtype :'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{	dataIndex: 'last_insp_yorn'		, text : Language.get('last_insp_yorn'	,'최종검사')	, width : 80	, align : 'center',xtype :'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{	dataIndex: 'shpm_insp_yorn'		, text : Language.get('shpm_insp_yorn'	,'출고검사')	, width : 80	, align : 'center',xtype :'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{	dataIndex: 'crte_dttm'			, text : Language.get('crte_dttm'		,'등록일자')	, width : 80	, align : 'center', renderer: function (crte_dttm) {return Ext.util.Format.substr(crte_dttm,0,10);}
					},{	dataIndex: 'insp_cond'			, text : Language.get('insp_cond'		,'검사조건')	, flex  : 100
					},{	dataIndex: 'insp_type_idcd'		, text : Language.get('insp_type_idcd'	,'idcd')	, flex  : 100	, hidden:true
					}
				]
			}
		;
		return item;
	}
});
