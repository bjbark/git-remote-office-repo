Ext.define('module.custom.sjflv.item.bomlist.view.BomListCstmLister3', { extend: 'Axt.grid.Panel',

	plugins		: [{ ptype:'gridcolumnconfig'  } ],

	alias		: 'widget.module-sjflv-bomlist-cstm-lister3',
	store		: 'module.custom.sjflv.item.bomlist.store.BomListCstmLister3',

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
					},{	text : Language.get('befr_splr_name'	, '전공급사'	) , dataIndex: 'befr_splr_name'	, width : 80,
					},{	text : Language.get('splr_name'			, '공급사'	) , dataIndex: 'splr_name'		, width : 80,
					},{	text : Language.get('usag_qntt_memo'	, '사용량'	) , dataIndex: 'usag_qntt_memo'	, width : 80,
					},{	text : Language.get('ecod_purp'			, '목적'		) , dataIndex: 'usag_qntt_memo'	, width : 80,
					},{	text : Language.get('drtr_name'			, '담당자'	) , dataIndex: 'drtr_name'		, width : 80,
					},{	text : Language.get('prnt_item_code'	, '상위코드'	) , dataIndex: 'item_code'		, width : 80,
					},{	text : Language.get('prnt_item_name'	, '상위품명'	) , dataIndex: 'item_name'		, width : 200,
					},{	text : Language.get('remk_text'			, '비고'			) , dataIndex: 'remk_text'		, width : 200,
					}
				]
			};
		return item;
	}

});





