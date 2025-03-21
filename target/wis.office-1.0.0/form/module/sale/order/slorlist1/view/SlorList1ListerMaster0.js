Ext.define('module.sale.order.slorlist1.view.SlorList1ListerMaster0', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-slorlist1-lister-master0',
	store		: 'module.sale.order.slorlist1.store.SlorList1Master0'	,

	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],
	columnLines : true,
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
				items	: [
					'->', '-' ,
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'line_clos'		, width:  40, align : 'center'	, text: Language.get('line_clos'		, '상태'				) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_clos')
					},{	dataIndex: 'crte_name'		, width:  65, align : 'left'	, text: Language.get('crte_name'		, '수주등록자'	)
//					},{	dataIndex: 'crte_dttm'		, width:  80, align : 'center'	, text: Language.get('crte_dttm'		, '생성일자'			)
//					},{	dataIndex: 'updt_dttm'		, width:  80, align : 'center'	, text: Language.get('updt_dttm'		, '수정일자'			)
					},{	dataIndex: 'acpt_stat_dvcd'	, width:  60, align : 'center'	, text: Language.get('acpt_stat_dvcd'	, '수주상태'			) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('acpt_stat_dvcd')
					},{	dataIndex: 'invc_numb'		, width: 120, align : 'center'	, text: Language.get('acpt_numb'		, '수주번호'			)
					},{	dataIndex: 'item_count'		, width:  65, align : 'center'	, text: Language.get('item_count'		, '건별품목수'			)
					},{	dataIndex: 'line_seqn'		, width:  40, align : 'center'	, text: Language.get('line_seqn'		, '항번'				) , hidden : true
					},{	dataIndex: 'cstm_lott_numb'	, width:  80, align : 'center'	, text: Language.get('cstm_lott_numb'	, 'LOT번호'			) , hidden		: _global.options.mes_system_type.toUpperCase() == 'SJFLV',
					},{	dataIndex: 'cstm_lott_numb'	, width:  80, align : 'center'	, text: Language.get('cstm_lott_numb'	, '고객 LOT번호'			) , hidden		: _global.options.mes_system_type.toUpperCase() != 'SJFLV',
					},{	dataIndex: 'item_code'		, width: 120, align : 'center'	, text: Language.get('item_code'		, '품목코드'			)
					},{	dataIndex: 'item_name'		, width: 170, align : 'left'	, text: Language.get('item_name'		, '품명'				)
					},{	dataIndex: 'item_spec'		, width: 120, align : 'left'	, text: Language.get('item_spec'		, '규격'				)
					},{	dataIndex: 'invc_qntt'		, width:  80, align : 'right'	, text: Language.get('acpt_qntt'		, '발주수량'			) , xtype: 'numericcolumn', summaryType: 'sum', format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.##':'#,##0.###',
					},{	dataIndex: 'ostt_qntt'		, width:  80, align : 'right'	, text: Language.get('ostt_qntt'		, '납품수량'			) , xtype: 'numericcolumn', summaryType: 'sum', format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.##':'#,##0.###',
					},{	dataIndex: 'upid_qntt'		, width:  80, align : 'right'	, text: Language.get('upid_qntt'		, '미납수량'			) , xtype: 'numericcolumn', summaryType: 'sum', format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.##':'#,##0.###',
					},{	dataIndex: 'deli_date'		, width:  95, align : 'center'	, text: Language.get('deli_date'		, '납기일자'			)
					},{	dataIndex: 'cstm_offr_date'	, width:  80, align : 'center'	, text: Language.get('cstm_offr_date'	, '발주일자'			) , hidden : !(_global.hqof_idcd=='N1000DOOIN')
					},{	dataIndex: 'cstm_deli_date'	, width:  80, align : 'center'	, text: Language.get('cstm_deli_date'	, '납기일자'			) , hidden : true
					},{	dataIndex: 'drtr_name'		, width:  70, align : 'left'	, text: Language.get('sale_drtr_name'	, '영업담당'			)
					},{	dataIndex: 'remk_text'		, width: 120, align : 'left'	, text: Language.get('remk_text'		, '후공정부서 및 거래처'		) , hidden : !(_global.hqof_idcd=='N1000DOOIN')
					},{	dataIndex: 'user_memo'		, width: 120, align : 'left'	, text: Language.get('user_memo'		, '발주품목비고'			)
					},{	dataIndex: 'deli_chge_resn'	, width: 100, align : 'left'	, text: Language.get('deli_chge_resn'	, '(협력사)변경사유'		) , hidden : !(_global.hqof_idcd=='N1000DOOIN')
					},{	dataIndex: 'invc_pric'		, width:  80, align : 'right'	, text: Language.get('invc_pric'		, '단가'				) , xtype: 'numericcolumn'
					},{	dataIndex: 'sply_amnt'		, width:  80, align : 'right'	, text: Language.get('sply_amnt'		, '금액'				) , xtype: 'numericcolumn', summaryType: 'sum'
					}
				]
			}
		;
		return item;
	}
});