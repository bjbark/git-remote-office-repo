Ext.define('module.item.ecomast.view.EcoMastListerMaster', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-ecomast-lister-master',

	store		: 'module.item.ecomast.store.EcoMastMaster',

	width		: 515,
	minWidth	: 200,
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' , remote : true }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

	viewConfig: {
		markDirty: false,
		loadMask : false
	},
	/**
	*
	*/
	initComponent: function () {
		var me = this;
		me.paging	= me.pagingItem();
		me.columns	= me.columnItem();
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
					{	text : '승인/승인취소',
						menu : [
							{	text : '승인', action : 'okAction'		},
							{	text : '승인취소', action : 'okCancelAction'	}
						]
					},
					'-', '->','-',
					{	text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action ,cls: 'button-style' } ,
					{	text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action ,cls: 'button-style' } ,
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style' } , '-' ,
					{	text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action ,cls: 'button-style' }
				]
			}
		;
		return item ;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex: 'ecod_idcd'		, text : Language.get('ecod_idcd'		,'관리번호'	)	, width : 120 , align : 'center'
					},{	dataIndex: 'cofm_yorn'		, text : Language.get('cofm_yorn'		,'확정여부'	)	, width : 80  , xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'), align : 'center'
					},{	dataIndex: 'cofm_degr'		, text : Language.get('cofm_degr'		,'확정차수'	)	, width : 70  , align : 'center'
					},{	dataIndex: 'mngt_docm_numb'	, text : Language.get('mngt_docm_numb'	,'관리문서번호')	, width : 120 , align : 'center',hidden:true
					},{	dataIndex: 'item_code'		, text : Language.get('item_code'		,'품목코드'	)	, width : 150 , align : 'center'
					},{	dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명'	)	, width : 180
					},{	dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'규격'		)	, width : 150
					},{	dataIndex: 'ecod_date'		, text : Language.get('ecod_date'		,'변경일자'	)	, width :  80 , align : 'center'
					},{	dataIndex: 'strt_date'		, text : Language.get('strt_date'		,'적용일자'	)	, width :  80 , align : 'center'
					},{	dataIndex: 'chge_resn'		, text : Language.get('chge_resn'		,'변경사유'	)	, flex : 1    , minWidth:250
					},{	dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명'		)	, width : 80  , hidden:true
					},{	dataIndex: 'prnt_item_idcd'	, text : Language.get('prnt_item_idcd'	,'품목id'	)	, width : 80  , hidden:true
					}
				]
			};
		return item;
	}
});
