Ext.define('module.workshop.mtrl.purchase.pordermast.view.PorderMastListerMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-pordermast-lister-master',
	store		: 'module.workshop.mtrl.purchase.pordermast.store.PorderMastMaster',

	width		: 515,
	minWidth	: 200,
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' },{
        ptype: 'bufferedrenderer',			// 데이터가 많을 경우 처리
        trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
        leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll
    }],
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
					{	text : '마감/해지',
						menu : [
							{	text : '마감', action : 'closeAction'		},
							{	text : '해지', action : 'closeCancelAction'	}
						]
					},
					'-',
					'-', '->', '-',
					{	text : '<span class="write-button">발주서발행</span>'	, action : 'copyAction'		, cls: 'button1-style'},
					{	text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action ,cls: 'button-style' },
					{	text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action ,cls: 'button-style' },
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style' } , '-' ,
					{	text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action ,cls: 'button-style' ,}
				]
			}
		;
		return item ;
	},

	/**
	 *
	 */
	columnItem : function (hidden) {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex: 'line_clos'		, width:  40, align: 'center'	, text: Language.get('line_clos'		, '상태'			) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_clos')
					},{	dataIndex: 'acpt_stat_dvcd'	, width:  60, align: 'center'	, text: Language.get('acpt_stat_dvcd'	, '마감'		) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('acpt_stat_dvcd')
					},{	dataIndex: 'invc_numb'		, width: 120, align: 'center'	, text: Language.get('acpt_numb'		, '발주번호'		)
					},{	dataIndex: 'cstm_name'		, width: 150, align: 'left'		, text: Language.get('cstm_name'		, '거래처명'		)
					},{	dataIndex: 'cstm_code'		, width:  80, align: 'center'	, text: Language.get('cstm_code'		, '거래처코드'		),hidden:true
					},{	dataIndex: 'invc_date'		, width:  80, align: 'center'	, text: Language.get('acpt_date'		, '발주일자'		)
					},{	dataIndex: 'expt_dvcd'		, width:  80, align: 'center'	, text: Language.get('expt_dvcd'		, '구매담당'		)
					},{	dataIndex: ''				, width:  80, align: 'center'	, text: Language.get(''					, '발주항번'		)
					},{	dataIndex: 'item_code'		, width: 100, align: 'center'	, text: Language.get('item_code'		, '품목코드'		)
					},{	dataIndex: 'item_name'		, width: 240, align: 'left'		, text: Language.get('item'				, '품목명'			)
					},{	dataIndex: 'item_spec'		, width: 150, align: 'left'		, text: Language.get('item_spec'		, '품목규격'		)
					},{	dataIndex: 'unit_name'		, width: 90, align: 'left'		, text: Language.get('unit_name'		, '단위'			)
					},{	dataIndex: 'invc_qntt'		, width:  80, align: 'right'	, text: Language.get('acpt_qntt'		, '발주수량'		), xtype : 'numericcolumn', format	: '#,##0.##'
					},{	dataIndex: 'invc_pric'		, width: 110, align: 'right'	, text: Language.get('invc_pric'		, '발주단가'		), xtype : 'numericcolumn', format	: '#,##0.##'
					},{	dataIndex: 'invc_amnt'		, width: 130, align: 'right'	, text: Language.get('amnt'				, '발주금액'		), xtype : 'numericcolumn', format	: '#,##0.##'
					},{	dataIndex: 'vatx_amnt'		, width: 130, align: 'right'	, text: Language.get('vatx'				, '부가세액'		), xtype : 'numericcolumn', format	: '#,##0.##'
					},{	dataIndex: 'totl_cost'		, width: 150, align: 'right'	, text: Language.get('totl_cost'		, '합계금액'		), xtype : 'numericcolumn', format	: '#,##0.##'
					},{	dataIndex: 'deli_date'		, width:  80, align: 'center'	, text: Language.get('deli_date'		, '납기일자'		)
					}
				]
			};
		return item;
	}
});
