Ext.define('module.prod.cvic.cvicchecktypeitem.view.CvicCheckTypeItemListerMaster', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-cvicchecktypeitem-lister-master',

	store		: 'module.prod.cvic.cvicchecktypeitem.store.CvicCheckTypeItemMaster',

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
					'-', '->', '-',
					{	text : Const.MODIFY.text, iconCls: Const.MODIFY.icon  , action : Const.MODIFY.action, cls: 'button-style'	} ,
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon  , action : Const.EXPORT.action ,cls: 'button-style'	} , '-' ,
					{	text : Const.DELETE.text, iconCls: Const.DELETE.icon  , action : Const.DELETE.action ,cls: 'button-style'	}
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
					{	dataIndex:'line_stat'		, width:  50, align : 'center'	, text: Language.get('line_stat'		, '사용'		), width : 50	, xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat'), align : 'center'
					},{	dataIndex:'chek_type_code'	, width: 150, align : 'center'	, text: Language.get('chek_type_code'	, '코드'		)
					},{	dataIndex:'chek_type_name'	, width: 350, align : 'left'	, text: Language.get('chek_type_name'	, '코드명'	)
					},{	dataIndex:'chek_mthd_dvcd'	, width: 110, align : 'center'	, text: Language.get('chek_mthd_dvcd'	, '점검방법'	), xtype : 'lookupcolumn', lookupValue : resource.lookup('chek_mthd_dvcd'), align : 'center'
					},{	dataIndex:'chek_cond'		, flex : 100, align : 'left'	, text: Language.get('chek_cond'		, '점검조건'	)
					}
				]
			};
		return item;
	}
});
