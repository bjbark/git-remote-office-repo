Ext.define('module.project.certmast.view.CertMastLister', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-certmast-lister',
	store: 'module.project.certmast.store.CertMast',
	columnLines: true ,// 컬럼별 라인 구분


	selModel	: { selType: 'checkboxmodel'   ,  mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	plugins		: [{ ptype  : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },

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
			item =
				{	xtype : 'grid-paging',
					items: [
						'->', '-' ,
						{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action, cls: 'button-style' } ,
						{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action, cls: 'button-style' } ,
						{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button-style' } , '-',
						{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } ,
					]
				};
		return item ;
	},
	/**
	 *
	 */
	columnItem : function () {
		var item =
			{	defaults: {style: 'text-align:center'},
				items : [
					{ text : '설치코드', dataIndex: 'cert_idcd'   , width : 100 },
					{ text : '설치암호', dataIndex: 'cert_pswd'   , width : 100 },
					{ text : '설치명칭', dataIndex: 'cert_name'   , width : 150 },
					{ text : '사용부서', dataIndex: 'dept_name'   , width : 150 },
					{ text : '사용자' , dataIndex: 'user_name'   , width : 150 },
					{ text : '설치메모', dataIndex: 'user_memo'  , width :  200   },
					{ text : '폐기'   , dataIndex: 'dsse_yorn'  , width :  60  , xtype : 'lookupcolumn' , lookupValue : resource.getList('yorn'), align : 'center' },
					{ text : '설치상태', dataIndex: 'cert_stat_dvcd'  , width :  60  , xtype : 'lookupcolumn' , lookupValue : resource.getList('cert_stat_dvcd'), align : 'center' },
					{ text : '설치횟수', dataIndex: 'cert_cont'   , width :  70  , align:'right' , xtype : 'numericcolumn' },
					{ text : '설치일자', dataIndex: 'cert_date'   , width :  80  , align:'center' },
					{ text : '숨김'   , dataIndex: 'line_stat'   , width   : 50 , xtype: 'lookupcolumn' , lookupValue : resource.lookup('line_stat'), align : 'center' }
				]
			};
		return item;
	}
});





