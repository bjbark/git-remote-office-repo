Ext.define('module.custom.sjflv.prod.prodbomlist.view.ProdBomListLister1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-sjflv-prodbomlist-lister1',
	store		: 'module.custom.sjflv.prod.prodbomlist.store.ProdBomListLister1',
	border		: 0,
	title		: Language.get('item','제품'),
	columnLines	: true,

	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{  ftype: 'grid-summary' , remote : true } ],
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
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},
	/**
	 *
	 */
	pagingItem : function () {
		var me = this,
		item = {
			xtype	: 'toolbar',
			dock	: 'bottom',
			items	: [
				'->'

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
							{	dataIndex: 'acpt_dvcd'		, width:  60, align: 'center'	, text: Language.get('acpt_dvcd'		, '수주구분'		) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('acpt_dvcd')
							},{	dataIndex: 'invc_numb'		, width: 100, align: 'center'	, text: Language.get('acpt_numb'		, '수주번호'		)
							},{	dataIndex: 'line_seqn'		, width:  40, align: 'center'	, text: Language.get('line_seqn'		, '순번'			)
							},{	dataIndex: 'item_code'		, width: 100, align: 'center'	, text: Language.get('item_code'		, '품목코드'		)
							},{	dataIndex: 'item_name'		, width: 200, align: 'left'		, text: Language.get('item'				, '품목명'			)
							},{	dataIndex: 'item_spec'		, width: 100, align: 'left'		, text: Language.get('item_spec'		, '품목규격'		)
							},{	dataIndex: 'invc_date'		, width:  80, align: 'center'	, text: Language.get('acpt_date'		, '수주일자'		)
							},{	dataIndex: 'deli_date'		, width:  80, align: 'center'	, text: Language.get('deli_date'		, '납기일자'		)
							},{	dataIndex: 'cstm_name'		, width: 200, align: 'left'		, text: Language.get('cstm_name'		, '거래처명'		)
							}
						]
			};
		return item;
	}

});

