Ext.define('module.qc.anal.insplist2.view.InspList2Lister3',{ extend : 'Axt.grid.Panel',
	alias		: 'widget.module-insplist2-lister3',
	store		: 'module.qc.anal.insplist2.store.InspList2Lister3',

	width		: 500,
	minWidth	: 200,
	split		: true,
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
		//me.paging	= me.pagingItem();
		me.columns	= me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					{	xtype   : 'button',
						iconCls : 'filterIcon',
						toggleGroup:'onoff',
						listeners:{
							toggle:function(toggle){
								var filter = me.filterBar;
									filter.setVisible(toggle.pressed);
							}
						}
					},
					'->', '-' ,
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } ,
				]
			};
		return item ;
	},

	columnItem :function (){
		var me = this,
			item = {
					defaults: {style: 'text-align:center'},
					items : [
						{	dataIndex:	'wkct_name'		, width: 105, align : 'center'	, text: Language.get('wkct_name'	, '공정'	)
						},{	dataIndex:	'poor_qntt'		, width: 107, align : 'left'	, text: Language.get('poor_qntt'	, '불량수량'	)

						}
					]
				};
			return item;
		}
});