Ext.define('module.user.laborate.view.LaboRateLister', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-laborate-lister',
	store		: 'module.user.laborate.store.LaboRate',
	columnLines	: true ,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],

	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },

	initComponent : function () {
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
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'labo_rate_idcd'		, text : Language.get('labo_rate_code'	,'임율코드'	), width :  80	, align : 'center'
					},{	dataIndex: 'labo_rate_name'		, text : Language.get('labo_rate_name'	,'임율명'		), width : 250	, align : 'left'
					},{	dataIndex: 'labo_rate_dvcd'		, text : Language.get('labo_rate_dvcd'	,'임율구분'	), width : 100	, align : 'center',xtype :'lookupcolumn', lookupValue : resource.lookup('labo_rate_dvcd')
					},{	dataIndex: 'wkrn_idcd'			, text : Language.get('rela_code'		,'관련코드'	), width : 100	, align : 'center'
					},{	dataIndex: 'wkrn_name'			, text : Language.get('rela_code_name'	,'관련코드명'	), width : 150	, align : 'left'
					},{	dataIndex: 'labo_rate_1fst'		, text : Language.get('labo_rate_1fst'	,'임율'		), width : 100	, align : 'right', xtype: 'numericcolumn' , summaryType: 'sum'
					},{	dataIndex: 'labo_rate_2snd'		, text : Language.get('labo_rate_2snd'	,'임율2'		), width : 90	, align : 'right', xtype: 'numericcolumn' , summaryType: 'sum' ,hidden : true
					},{	dataIndex: 'labo_rate_3trd'		, text : Language.get('labo_rate_3trd'	,'임율3'		), width : 90	, align : 'right', xtype: 'numericcolumn' , summaryType: 'sum' ,hidden : true
					},{	dataIndex: 'labo_rate_4frt'		, text : Language.get('labo_rate_4frt'	,'임율4'		), width : 90	, align : 'right', xtype: 'numericcolumn' , summaryType: 'sum' ,hidden : true
					},{	dataIndex: 'labo_rate_5fit'		, text : Language.get('labo_rate_5fit'	,'임율5'		), width : 90	, align : 'right', xtype: 'numericcolumn' , summaryType: 'sum' ,hidden : true
					},{	dataIndex: 'user_memo'			, text : Language.get('user_memo'		,'비고'		), flex : 100	, align : 'left'
					}
				]
			}
		;
		return item;
	}
});