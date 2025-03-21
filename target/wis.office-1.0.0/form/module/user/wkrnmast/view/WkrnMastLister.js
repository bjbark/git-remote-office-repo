Ext.define('module.user.wkrnmast.view.RankInfoLister', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-wkrnmast-lister',
	store		: 'module.user.wkrnmast.store.WkrnMast',
	border		: 0 ,
	columnLines	: true,
	selModel	: { selType: 'checkboxmodel'   ,  mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	plugins		: [{ ptype  : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },

	/**
	 * 콤포넌트 초기화 이벤트
	 */
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem() ;
		me.columns = me.columnItem();
		me.callParent();
	},
	/**
	 * 그리드 하단의 페이징 툴바 및 액션버튼을 등록한다.
	 */
	pagingItem : function () {
		var  me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'->', '-' ,
					{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action,cls: 'button-style' },
					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action,cls: 'button-style' },
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action,cls: 'button-style' },
					'-' ,
					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action,cls: 'button-style' }
				]
			}
		;
		return item ;
	},

	/**
	 * 그리드 컬럼 내용 등록
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex: 'line_stat' , text : '숨김'									, width :  45 , xtype: 'lookupcolumn' , lookupValue : resource.lookup('line_stat'), align : 'center' },
					{	dataIndex: 'wkrn_code' , text : Language.get( 'wkrn_code' ,  '직급코드'	)	, width :  90 , align : 'center'	},
					{	dataIndex: 'wkrn_name' , text : Language.get( 'wkrn_name' ,  '직급명'	)	, width :  150 },
					{	dataIndex: 'user_memo' , text : '메모사항'									, flex  :    1 },
				]
			}
		;
		return item;
	}
});