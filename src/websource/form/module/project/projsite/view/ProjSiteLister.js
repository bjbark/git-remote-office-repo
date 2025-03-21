Ext.define('module.project.projsite.view.ProjSiteLister', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-projsite-lister',
	store: 'module.project.projsite.store.ProjSite',

	columnLines: true ,


	selModel: {	selType: 'checkboxmodel', mode : 'SINGLE'},
	features    : [{ ftype : 'grid-summary' , remote : true } ],
	plugins :[{ ptype  : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig 	: { markDirty: false , loadMask : false, enableTextSelection: true },


//	selModel: {	selType: 'checkboxmodel', mode : 'SINGLE'},
//    features    : [{ ftype : 'grid-summary' , remote : true } ],

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
		var me = this, item =
		{
			xtype : 'grid-paging',
			items:
			[
				'->', '-' ,
				{text : 'Upload'     , iconCls: Const.UPLOAD.icon, action : Const.UPLOAD.action  , cls: 'button-style'} ,
				{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action , cls: 'button-style'} ,
				{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action , cls: 'button-style'} ,
				{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , cls: 'button-style'}
			]
		};
		return item ;
	},
	/**
	 *
	 */
	columnItem : function () {
		var item = {
			defaults: {style: 'text-align:center'},
			items : [
				{ text : 'Head Office CD'	, dataIndex: 'hq_id'  , width : 100 },
				{ text : 'Head Office Name'	, dataIndex: 'hq_nm'  , width : 150 , summaryType : 'count' }, //, editor: { allowBlank: false}
				{ text : 'state'			, dataIndex: 'hq_sts' , width :  60  , xtype : 'lookupcolumn' , lookupValue : resource.getList('hq_sts'), align : 'center'},
				{ text : 'Flag'				, dataIndex: 'hq_gb'  , width :  70  , xtype : 'lookupcolumn' , lookupValue : resource.getList('hq_gb' )},
				{ text : 'Project'			, dataIndex: 'pjt_nm'   , width :  150 } ,
				{ text : 'Memo'				, dataIndex: 'usr_memo'    , flex : 1 },
				{ text : 'Reg. Date'		, dataIndex: 'hq_reg_dt'   , width :  110 } ,
				{ text : 'Data Base'		, dataIndex: 'pos_hostname'   , width :  110 } ,
				{ text : 'Shopping Mall'	, dataIndex: 'web_hostname'   , width :  110 } ,
				{ text : 'Image'			, dataIndex: 'img_hostname'   , width :  110 } ,
				{ text : 'Hidden'			, dataIndex: 'row_sts' , width : 45 , xtype: 'lookupcolumn' , lookupValue : resource.getList('row_sts'), align : 'center' },
				{ text : 'Delete'			, dataIndex: 'del_yn'  , width : 45 , xtype: 'lookupcolumn' , lookupValue : resource.getList('del_yn'), align : 'center' }
			]
		};
		return item;
	}
});

