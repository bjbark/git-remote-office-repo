Ext.define('module.basic.csscdmast.view.CSscdMastLister', { extend: 'Axt.grid.Panel',
	required : ['Ext.grid.plugin.CellEditing'],

	alias: 'widget.module-csscdmast-lister',
	store: 'module.basic.csscdmast.store.CSscdMast',
	columnLines: true ,// 컬럼별 라인 구분
	selModel: {	selType: 'checkboxmodel', mode : 'SINGLE'},//mode : 'SINGLE' MULTI
    //plugins: [{ptype :'cellediting' , clicksToEdit: 1 }],
	/**
	 *
	 */
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem() ;
		me.columns = me.columnItem();
		me.callParent();
	},
	/**
	 *
	 */
	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					{	xtype	: 'button',
						action	: 'code_ini',
						iconCls	: 'icon-user' ,
						text 	: '공통코드 초기화',
					},
					'->', '-' ,
					{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action, cls: 'button-style' } ,
					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action, cls: 'button-style' } ,
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } , '-' ,
					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button-style' }
				]
			};
		return item ;
	},
	/**
	 *
	 */
	columnItem : function () {
		var me = this
			,item = {
				defaults: {style: 'text-align:center'},
				items : [
					{ 	dataIndex: 'sscd_code'  , text : Language.get('sscd_code'	,'코드')		, width : 120, align : 'center'
					},{	dataIndex: 'lang_dvcd'  , text : Language.get('lang_dvcd'	,'언어')		, width :  80,  xtype : 'lookupcolumn', lookupValue : resource.lookup('lang_dvcd') , align : 'center'
					},{ dataIndex: 'sscd_name'  , text : Language.get('sscd_name'	,'코드명')		, width : 200
					},{	dataIndex: 'lkup_valu'  , text : Language.get('lkup_valu'	,'코드항목')	, flex  :   5,
						renderer : function(value, meta, record, rowIndex, colIndex, store) {
							return value.replace(/["']/g, "");
						}
					},{ dataIndex: 'user_memo'   , text : Language.get('user_memo'	,'메모사항')	, flex  :   5
					},{	dataIndex: 'line_stat'	, text : Language.get('line_stat'	,'숨김')		, width :  50, xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat') , align : 'center'
					}
				]
			}
		;
		return item;
	}

});

