Ext.define('module.project.codeinfo.view.CodeInfoLister', { extend: 'Axt.grid.Panel',

	required : ['Ext.grid.plugin.CellEditing'],

	alias: 'widget.module-codeinfo-lister',
	store: 'module.project.codeinfo.store.CodeInfo',
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
		var me = this, item = {
			xtype	: 'grid-paging',
			items	: [
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
					{ 	dataIndex: 'code_cd'    , text : '코드'      ,  width : 120
					},{	dataIndex: 'lang_gbcd'  , text : '언어'      , width:  50,  xtype : 'lookupcolumn', lookupValue : resource.lookup('lang_gbcd') , align : 'center'
					},{ dataIndex: 'code_nm'    , text : '이름'      ,  width : 200
					},{ dataIndex: 'usr_memo'   , text : '메모사항'   ,  flex  :   5
					},{	dataIndex: 'lookup_val' , text : '코드항목'   , flex      :   5,
						renderer : function(value, meta, record, rowIndex, colIndex, store) {
							return value.replace(/["']/g, "");
						}
					},{	dataIndex: 'row_sts', width:  50, text  :  '숨김', xtype : 'lookupcolumn', lookupValue : resource.lookup('row_sts') , align : 'center'
					}
				]
			}
		;
		return item;
	}

});





