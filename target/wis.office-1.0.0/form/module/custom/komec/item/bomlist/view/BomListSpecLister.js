Ext.define('module.custom.komec.item.bomlist.view.BomListSpecLister', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-komec-bomlist-spec-lister',
	store		: 'module.custom.komec.item.bomlist.store.BomListSpecLister',
	border		: 0,
	columnLines	: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{  ftype: 'grid-summary' , remote : true } ],
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  },{
        ptype: 'bufferedrenderer',			// 데이터가 많을 경우 처리
        trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
        leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll
    } ],

	initComponent: function () {
		var me     = this;
		me.columns = me.columnItem();
		me.callParent();
	},

	/**
	 *
	 */
	columnItem : function () {
		var me   = this,
			item =  {
				defaults: {style: 'text-align:center'},
				items   : [
					{	dataIndex:	'item_code'		, width: 60, align : 'left',	text: Language.get( 'item_code'		, '제품코드'	),align : 'center'
					},{	dataIndex:	'item_name'		, width: 250, align : 'left',	text: Language.get( 'item_name'		, '제품명'		),align : 'left'
					}
				]
			};
		return item;
	}
 });