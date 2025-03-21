Ext.define('module.item.colormix.view.ColorMixListerMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-colormix-lister-master',
	store		: 'module.item.colormix.store.ColorMixMaster',
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	border		: 0,
	columnLines : true,
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
				xtype	: 'grid-paging',
				items	: [
					'->', '-' ,
					{text : '<span class="write-button">착색정보 발행</span>', action : 'printAction', cls: 'button1-style'   }, '-',
					{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action, cls: 'button-style' } ,
					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action, cls: 'button-style' } ,
					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button-style' } , '-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items	: [
					{	dataIndex: 'chge_degr'		, text : Language.get('chge_degr'		,'차수'		) , width : 100 , align : 'center'
					},{ dataIndex: 'prnt_item_idcd'	, text : Language.get('prnt_item_idcd'	,'등록품목코드'	) , width : 100 , align : 'center'
					},{ dataIndex: 'prnt_item_code'	, text : Language.get('prnt_item_code'	,'품목코드'		) , width : 100 , align : 'center'
					},{ dataIndex: 'prnt_item_name'	, text : Language.get('prnt_item_name'	,'품명'		) , width : 250 , align : 'left'
					},{ dataIndex: 'colr_name'		, text : Language.get('colr_name'		,'컬러명'		) , width : 80  , align : 'left'
					},{ dataIndex: 'dwup_date'		, text : Language.get('dwup_date'		,'작성일자'		) , width : 80  , align : 'center'
					},{ dataIndex: 'item_name'		, text : Language.get('bsmt_name'		,'원료명'		) , width : 180 , align : 'left'
					},{ dataIndex: 'unit_perc_wigt'	, text : Language.get('unit_perc_wigt'	,'단위당 중량'	) , width : 80  , align : 'right'
					},{ dataIndex: 'wigt_unit'		, text : Language.get('wigt_unit'		,'중량단위'		) , width : 80  , align : 'left'
					},{ dataIndex: 'need_time'		, text : Language.get('need_time'		,'소요시간(분)'	) , width : 85  , align : 'right'
					},{ dataIndex: 'user_memo'		, text : Language.get('user_memo'		,'비고사항'		) , width : 250 , align : 'left'
					}
				]
			}
		;
		return item;
	}
});
