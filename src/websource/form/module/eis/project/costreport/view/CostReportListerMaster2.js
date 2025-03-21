Ext.define('module.eis.project.costreport.view.CostReportListerMaster2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-costreport-lister-master2',
	store		: 'module.eis.project.costreport.store.CostReportMaster2',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
	features	: [{ ftype : 'grid-summary' , remote : false } ],
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
					{	dataIndex: 'line_stat'		, text : Language.get('line_stat'		,'상태'		) , width : 50  , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat'), hidden: true
					},{ dataIndex: 'offr_date'		, text : Language.get('offr_date'		,'발주일자'	) , width : 80  , align : 'center'
					},{ dataIndex: 'deli_date'		, text : Language.get('deli_date'		,'납기일자'	) , width : 80  , align : 'center'
					},{ dataIndex: 'invc_date'		, text : Language.get('istt_date'		,'입고일자'	) , width : 80  , align : 'center'
					},{ dataIndex: 'wrhs_name'		, text : Language.get('wrhs_name'		,'입고창고'	) , width : 130 , align : 'left', hidden : true
					},{ dataIndex: 'cstm_code'		, text : Language.get('cstm_code'		,'거래처코드'	) , width : 100 , align : 'center', hidden : true
					},{ dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		,'거래처명'	) , width : 130 , align : 'left'
					},{ dataIndex: 'drtr_name'		, text : Language.get('drtr_name'		,'입고담당'	) , width : 100 , align : 'left', hidden : true
					},{	dataIndex: 'invc_numb'		, text : Language.get('istt_numb'		,'입고번호'	) , width : 150 , align : 'center'
					},{	dataIndex: 'item_code'		, text : Language.get('item_code'		,'품목코드'	) , width : 150 , align : 'center'
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명'		) , width : 180 , align : 'left'
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'규격'		) , width : 100 , align : 'left', hidden : true
					},{ dataIndex: 'modl_name'		, text : Language.get('modl_name'		,'모델명'	) , width : 100 , align : 'left', hidden : true
					},{ dataIndex: 'unit_name'		, text : Language.get('unit_name'		,'단위'		) , width : 60  , align : 'left', hidden : true
					},{ dataIndex: 'make_cmpy_name'	, text : Language.get('make_cmpy_name'	,'제조회사명'	) , width : 100 , align : 'left', hidden : true
					},{ dataIndex: 'make_date'		, text : Language.get('make_date'		,'제조일자'	) , width : 80  , align : 'center', hidden : true
					},{ dataIndex: 'rtil_ddln'		, text : Language.get('rtil_ddln'		,'유통기한'	) , width : 80  , align : 'left', hidden : true
					},{ dataIndex: 'istt_qntt'		, text : Language.get('istt_qntt'		,'수량'		) , width : 80  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum', hidden : true
					},{ dataIndex: 'istt_pric'		, text : Language.get('istt_pric'		,'단가'		) , width : 80  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum', hidden : true
					},{ dataIndex: 'istt_amnt'		, text : Language.get('istt_amnt'		,'금액'		) , width : 80  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'istt_vatx'		, text : Language.get('istt_vatx'		,'부가세'	) , width : 80  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum', hidden : true
					},{ dataIndex: 'ttsm_amnt'		, text : Language.get('ttsm_amnt'		,'매입금액'	) , width : 80  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum', hidden : true
					},{ dataIndex: 'orig_invc_numb'	, text : Language.get('offr_numb'		,'발주번호'	) , width : 120 , align : 'center'
					},{ dataIndex: 'remk_text'		, text : Language.get('remk_text'		,'비고'		) , width :  80 , align : 'left'
					}
				]
			}
		;
		return item;
	}
});
