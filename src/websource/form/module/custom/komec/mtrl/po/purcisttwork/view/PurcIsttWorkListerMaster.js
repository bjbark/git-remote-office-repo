Ext.define('module.custom.komec.mtrl.po.purcisttwork.view.PurcIsttWorkListerMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-purcisttwork-lister-master',
	store		: 'module.custom.komec.mtrl.po.purcisttwork.store.PurcIsttWorkMaster',

	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
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
					'->','-' ,
					{	text : '<span class="write-button">라벨 출력</span>', action : 'labelAction',cls: 'button1-style', width: 70	, hidden : (_global.hq_id.toUpperCase() !='N1000komec'? false:true)},
					{	text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button-style'	},
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style'	}
				]
			}
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	xtype: 'rownumberer'		, width:  40, text: 'NO', align : 'center'
					},{	dataIndex: 'line_stat'		, text : Language.get('line_stat'		,'상태'		) , width : 50  , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat'), hidden : (_global.options.mes_system_type !='Frame'? false:true)
					},{ dataIndex: 'orig_invc_numb'	, text : Language.get('offr_numb'		,'발주번호'		) , width : 110 , align : 'center'
					},{ dataIndex: 'acpt_numb'		, text : Language.get('acpt_numb'		,'수주번호'		) , width : 110 , align : 'center'
					},{ dataIndex: 'invc_date'		, text : Language.get('istt_date'		,'입고일자'		) , width : 100 , align : 'center'
					},{ dataIndex: 'istt_wrhs_name'	, text : Language.get('istt_wrhs_name'	,'입고창고'		) , width : 120 , align : 'left', hidden : (_global.options.mes_system_type !='Frame'? false:true)
					},{ dataIndex: 'cstm_code'		, text : Language.get('cstm_code'		,'거래처코드'	) , width : 100 , align : 'center', hidden : true
					},{ dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		,'거래처명'		) , width : 130 , align : 'left'
					},{ dataIndex: 'drtr_name'		, text : Language.get('drtr_name'		,'입고담당'		) , width : 80  , align : 'left'
					},{	dataIndex: 'invc_numb'		, text : Language.get('istt_numb'		,'입고번호'		) , width : 120 , align : 'center'
					},{	dataIndex: 'item_code'		, text : Language.get('item_code'		,'품목코드'		) , width : 100 , align : 'center'
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명'		) , width : 150 , align : 'left'
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'규격'		) , width : 180 , align : 'left'
					},{ dataIndex: 'acpt_case_name'	, text : Language.get('modl_name'		,'모델명'		) , width : 180 , align : 'left'
					},{ dataIndex: 'unit_name'		, text : Language.get('unit_name'		,'단위'		) , width : 60  , align : 'left', hidden : (_global.options.mes_system_type !='Frame'? false:true)
					},{ dataIndex: 'lott_numb'		, text : Language.get('lott_numb'		,'LOT 번호'	) , width : 100  , align : 'left',	hidden	: (_global.options.haccp_item_yorn == 0),
//					},{ dataIndex: 'cstm_lott_numb'	, text : Language.get(''				,'Supplier No'	) , width : 100  , align : 'left',	hidden	: (_global.options.haccp_item_yorn == 0),
//					},{ dataIndex: 'make_cmpy_name'	, text : Language.get('make_cmpy_name'	,'제조회사명'	) , width : 100 , align : 'left',	hidden	: (_global.options.haccp_item_yorn == 0)/*||  _global.options.mes_system_type.toUpperCase() == 'SJFLV' ? true:false */,
//					},{ dataIndex: 'make_natn'		, text : Language.get('make_natn'		,'제조국'		) , width : 100 , align : 'left',	hidden	: (_global.options.haccp_item_yorn == 0),
//					},{ dataIndex: 'make_date'		, text : Language.get('make_date'		,'제조일자'		) , width : 80  , align : 'center',	hidden	: (_global.options.haccp_item_yorn == 0),
//					},{ dataIndex: 'rtil_ddln'		, text : Language.get('rtil_ddln'		,'유통기한'		) , width : 80  , align : 'left',	hidden	: (_global.options.haccp_item_yorn == 0)||  _global.options.mes_system_type.toUpperCase() == 'SJFLV' ? true:false ,
//					},{ dataIndex: 'rtil_ddln_date'	, text : Language.get('rtil_ddln_date'	,'유통기한'		) , width : 80  , align : 'center',	hidden	: (_global.options.haccp_item_yorn == 0)||  _global.options.mes_system_type.toUpperCase() == 'SJFLV' ? false:true,
					},{ dataIndex: 'istt_qntt'		, text : Language.get('istt_qntt'		,'수량'		) , width : 60  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum', format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.##':'#,##0.##0',
					},{ dataIndex: 'ordr_wigt'		, text : Language.get('ordr_wigt'		,'중량'		) , width : 80  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum', hidden :  (_global.options.mes_system_type !='Frame'? true:false)
					},{ dataIndex: 'istt_pric'		, text : Language.get('istt_pric'		,'단가'		) , width : 80  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum', format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.##':'#,##0.##0',
					},{ dataIndex: 'istt_amnt'		, text : Language.get('istt_amnt'		,'금액'		) , width : 80  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum', format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.##':'#,##0.###',
					},{ dataIndex: 'istt_vatx'		, text : Language.get('istt_vatx'		,'부가세'		) , width : 80  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum', format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.##':'#,##0.###',
					},{ dataIndex: 'ttsm_amnt'		, text : Language.get('ttsm_amnt'		,'합계금액'		) , width : 80  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum', format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.##':'#,##0.###',
					},{ dataIndex: 'remk_text'		, text : Language.get('remk_text'		,'비고'		) , width : 80  , align : 'left', hidden : (_global.options.mes_system_type !='Frame'? false:true)
					}
				]
			}
		;
		return item;
	}
});