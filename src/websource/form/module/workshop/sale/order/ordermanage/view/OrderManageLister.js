Ext.define('module.workshop.sale.order.ordermanage.view.OrderManageLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-ordermanage-lister'			,
	store		: 'module.workshop.sale.order.ordermanage.store.OrderManage'	,
	selModel 	: { selType: 'checkboxmodel', mode : 'SINGLE' },
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
				items	: [

					'->', '-' ,
					{	text : '<span class="write-button">출고등록</span>'		, action : 'ReleaseAction'		, cls: 'button1-style'	,width:  70} , '-',
//					{	text : '<span class="write-button">출고취소</span>'		, action : 'ReleaseCancelAction', cls: 'button1-style'	,width:  70} , '-',
					{	text : '<span class="write-button">생산지시서발행</span>'	, action : 'printAction'		, cls: 'button1-style'	,width : 100 ,hidden : true} ,
//					{	text : '<span class="write-button">생산계획</span>'		, action : 'PlanAction2'		, cls: 'button1-style'	} ,
					{	text : '<span class="write-button">생산지시</span>'		, action : 'planAction'			, cls: 'button1-style'	,hidden : true},
//					{	text : '<span class="write-button">상담등록</span>'		, action : 'orderAction'		, cls: 'button1-style'	} ,
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon	, action : Const.EXPORT.action	, cls: 'button-style' 	} ,
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'regi_path_dvcd'	, text : Language.get('regi_path_dvcd'	,'경로구분'	)	, width : 70 , align : 'center', xtype:'lookupcolumn',lookupValue:resource.lookup('regi_dvcd')
					},{	dataIndex: 'acpt_stat_dvcd'	, text : Language.get('acpt_stat_dvcd'	,'견적상태'	)	, width : 80 , align : 'center', xtype:'lookupcolumn',lookupValue:resource.lookup('acpt_stat_dvcd')
					},{	dataIndex: 'invc_numb'		, text : Language.get('invc_numb'		,'견적번호'	)	, width : 100 , align : 'center'
					},{	dataIndex: 'invc_date'		, text : Language.get('invc_date'		,'견적일자'	)	, width : 90 , align : 'center'
					},{ dataIndex: 'mmbr_name'		, text : Language.get('mmbr_name'		,'회원명'		)	, width : 90
					},{ dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		,'거래처명'	)	, width : 160
					},{ dataIndex: 'mmbr_name'		, text : Language.get('mmbr_name'		,'회원명'		)	, width : 110,hidden:true
					},{ dataIndex: 'ttle'			, text : Language.get('ttle'			,'주문명'		)	, width : 260
					},{ dataIndex: 'clss_desc'		, text : Language.get('clss_desc'		,'품목분류'	)	, width : 180
					},{	dataIndex: 'deli_date'		, text : Language.get('deli_date'		,'납기일자'	)	, width : 100 , align : 'center'
					},{	dataIndex: 'dlvy_date'		, text : Language.get('dlvy_date'		,'출고일자'	)	, width : 100 , align : 'center'
					},{ dataIndex: 'esti_pric'		, text : Language.get('esti_pric'		,'견적단가'	)	, width :  90	, xtype:'numericcolumn',hidden:true
					},{ dataIndex: 'esti_amnt'		, text : Language.get('esti_amnt'		,'견적금액'	)	, width : 100 , xtype:'numericcolumn',hidden:true
					},{ dataIndex: 'esti_pric'		, text : Language.get('esti_pric'	,'표지단가'		)	, width : 100 , align : 'center', xtype:'lookupcolumn',lookupValue:resource.lookup('dlvy_mthd_dvcd'),hidden:true
					},{ dataIndex: 'esti_amnt'		, text : Language.get('esti_amnt'	,'표지금액'		)	, width : 100 , xtype:'numericcolumn',hidden:true
					},{ dataIndex: 'esti_pric'		, text : Language.get('esti_pric'	,'간지단가'		)	, width : 100 , xtype:'numericcolumn',hidden:true
					},{ dataIndex: 'sply_amnt'		, text : Language.get(''	,'공급가액'				)	, width : 120 , xtype:'numericcolumn'
					},{ dataIndex: 'vatx_amnt'		, text : Language.get(''	,'부가세액'				)	, width : 100, xtype:'numericcolumn'
					},{ dataIndex: 'ttsm_amnt'		, text : Language.get(''	,'합계금액'				)	, width : 150, xtype:'numericcolumn'
					},{ dataIndex: 'etcc_proc_amnt'	, text : Language.get('etcc_proc_amnt'	,'기타가공금액')	, width : 100 , xtype:'numericcolumn',hidden:true
					},{ dataIndex: 'refn_atcl_1fst'	, text : Language.get('refn_atcl_1fst'	,'수금액')	, width : 100 , xtype:'numericcolumn',hidden:true
					}
				]
			}
		;
		return item;
	}
});