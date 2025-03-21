Ext.define('module.custom.komec.item.bomlist.view.BomListLister2', { extend: 'Axt.grid.Panel',

	plugins		: [{ ptype:'gridcolumnconfig'  } ],
	alias		: 'widget.module-komec-bomlist-lister2',
	store		: 'module.custom.komec.item.bomlist.store.BomListLister2',

	border		: 0  ,
	title		: Language.get('','리비전'),
	//selModel: {	selType: 'checkboxmodel', mode : 'SINGLE'},
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  },{
        ptype: 'bufferedrenderer',			// 데이터가 많을 경우 처리
        trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
        leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll
    } ],
	/**
	 *
	 */
	initComponent: function () {
		var me = this;
		me.columns = me.columnItem();
		me.callParent();
	},
	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items  : [
					{	text : Language.get('revs_numb'			, '리비전'	) , dataIndex: 'revs_numb'		, width : 55
					},{	text : Language.get('adpt_date'			, '적용일자'	) , dataIndex: 'adpt_date'		, width : 80, align : 'center'
					},{	text : Language.get('remk_text'			, '비고'			) , dataIndex: 'remk_text'		, width : 200,
					}
				]
			};
		return item;
	}

});





