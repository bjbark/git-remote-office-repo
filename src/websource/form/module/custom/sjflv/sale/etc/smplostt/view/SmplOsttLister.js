Ext.define('module.custom.sjflv.sale.etc.smplostt.view.SmplOsttLister', { extend: 'Axt.grid.Panel',
	 alias		: 'widget.module-smplostt-lister'			,
	store		: 'module.custom.sjflv.sale.etc.smplostt.store.SmplOstt'	,
	selModel 	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary'} ],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
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
					{	text : '마감/해지',
						menu : [
							{	text : '마감', action : 'closeAction'		},
							{	text : '해지', action : 'closeCancelAction'	}
						]
					},
					'->',
					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action, cls: 'button-style' } ,
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } ,
				]
			};
		return item ;
	},


	columnItem : function () {
		var me = this
			,item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'line_clos'		, text : Language.get(''	,'상태'		)	, width : 50	, xtype : 'lookupcolumn', lookupValue : resource.lookup('line_clos'), align : 'center'
					},{	dataIndex: 'smpl_stat_dvcd'	, text : Language.get(''	,'진행상태'	)	, width : 70	, align : 'center',xtype :'lookupcolumn', lookupValue : resource.lookup('smpl_stat_dvcd')
					},{	dataIndex: 'invc_date'		, text : Language.get(''	,'접수일자'	)	, width : 90	, align : 'center'
					},{	dataIndex: 'invc_numb'		, text : Language.get(''	,'접수번호'	)	, width : 80	, align : 'center'
					},{	dataIndex: 'ostt_date'		, text : Language.get(''	,'출고일자'	)	, width : 80	, align : 'center'
					},{	dataIndex: 'ostt_drtr_name'	, text : Language.get(''	,'출고담당'	)	, width : 80	, align : 'left'
					},{	dataIndex: 'ostt_qntt'		, text : Language.get(''	,'출고수량'	)	, width : 80	, align : 'right', xtype : 'numericcolumn', summaryType: 'sum', format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.##':'#,##0.###',
					},{	dataIndex: 'npay_yorn'		, text : Language.get(''	,'과세'		)	, width : 60	, align : 'center',xtype :'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{	dataIndex: 'ostt_amnt'		, text : Language.get(''	,'출고금액'	)	, width : 90	, align : 'right', xtype : 'numericcolumn', summaryType: 'sum',
					},{	dataIndex: 'ostt_vatx'		, text : Language.get(''	,'출고부가세'	)	, width : 90	, align : 'right', xtype : 'numericcolumn', summaryType: 'sum',
					},{	dataIndex: 'ostt_smam'		, text : Language.get(''	,'출고합계금액')	, width : 100	, align : 'right', xtype : 'numericcolumn', summaryType: 'sum',
					},{	dataIndex: 'cstm_code'		, text : Language.get(''	,'거래처코드'	)	, width : 70	, align : 'center'
					},{	dataIndex: 'cstm_name'		, text : Language.get(''	,'거래처명'	)	, width : 140	, align : 'left'
					},{	dataIndex: 'deli_date'		, text : Language.get(''	,'요청납기일'	)	, width : 90	, align : 'center'
					},{	dataIndex: 'cstm_drtr_name'	, text : Language.get(''	,'업체담당자'	)	, width : 80	, align : 'left'
					},{	dataIndex: 'tele_numb'		, text : Language.get(''	,'업체연락처'	)	, width : 100	, align : 'left'
					},{	dataIndex: 'drtr_name'		, text : Language.get(''	,'담당자명'	)	, width : 80	, align : 'left'
					},{	dataIndex: 'labr_drtr_name'	, text : Language.get(''	,'실험담당자명')	, width : 80	, align : 'left'
					},{	dataIndex: 'item_code'		, text : Language.get(''	,'품목코드'	)	, width : 80	, align : 'center'
					},{	dataIndex: 'item_name'		, text : Language.get(''	,'품명'		)	, width : 200	, align : 'left'
					},{	dataIndex: 'item_spec'		, text : Language.get(''	,'규격'		)	, width : 150	, align : 'left'
					},{	dataIndex: 'item_memo'		, text : Language.get(''	,'품목메모'	)	, width : 80	, align : 'left'
					},{	dataIndex: 'reqt_qntt'		, text : Language.get(''	,'요청수량'	)	, width : 80	, align : 'right', xtype : 'numericcolumn', summaryType: 'sum', format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.##':'#,##0.###',
					},{	dataIndex: 'sply_amnt'		, text : Language.get(''	,'공급가'		)	, width : 80	, align : 'right' , xtype : 'numericcolumn', summaryType: 'sum',
					},{	dataIndex: 'vatx_amnt'		, text : Language.get(''	,'부가세'		)	, width : 80	, align : 'right' , xtype : 'numericcolumn', summaryType: 'sum',
					},{	dataIndex: 'ttsm_amnt'		, text : Language.get(''	,'합격금액'	)	, width : 80	, align : 'right' , xtype : 'numericcolumn', summaryType: 'sum',
					},{	dataIndex: 'reqt_memo'		, text : Language.get(''	,'요청메모'	)	, width : 200	, align : 'left'
					}
				]
			}
		;
		return item;
	}
});
