Ext.define('module.custom.sjflv.mtrl.isttcalc.purcrettmast.view.PurcRettMastListerDetail', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-purcrettmast-lister-detail',
	store		: 'module.custom.sjflv.mtrl.isttcalc.purcrettmast.store.PurcRettMastDetail',

	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ,{ptype  :'cellediting-directinput', clicksToEdit: 1 }],
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
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style',itemId : 'detail'}
				]
			}
		return item ;
	},

	columnItem : function () {
//		console.log(sply_amnt);
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'line_seqn'		, text : Language.get('line_seqn'		,'순번'		) , width :  40	, align : 'center'
					},{	dataIndex: 'item_code'		, text : Language.get('item_code'		,'품목코드'	) , width : 80	, align : 'center'
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명'		) , width : 230
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'규격'		) , width : 160
					},{ dataIndex: 'wrhs_name'		, text : Language.get('wrhs_name'		,'창고'		) , width : 70
					},{ dataIndex: 'rett_qntt'		, text : Language.get('rett_qntt'		,'반품수량'	) , width :  70	, xtype : 'numericcolumn', align : 'right', summaryType: 'sum', format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.##':'#,##0.####',
					},{ dataIndex: 'istt_pric'		, text : Language.get('sale_pric'		,'단가'		) , width :  70	, xtype : 'numericcolumn', align : 'right'
					},{ dataIndex: 'sply_amnt'		, text : Language.get('sply_amnt'		,'금액'		) , width :  80	, xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'vatx_amnt'		, text : Language.get('vatx_amnt'		,'부가세'		) , width :  70	, xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'ttsm_amnt'		, text : Language.get('ttsm_amnt'		,'합계금액'	) , width :  90	, xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'lott_numb'		, text : Language.get('lott_numb'		,'LOT번호'	) , width : 120	, align : 'center'
					},{ dataIndex: 'rett_resn_dvcd'	, text : Language.get('rett_resn_dvcd'	,'반품사유'	) , width : 100	, align : 'center', xtype : 'lookupcolumn',lookupValue : resource.lookup('rett_resn_dvcd')
					},{ dataIndex: 'rett_proc_dvcd'	, text : Language.get('rett_proc_dvcd'	,'반품처리'	) , width : 100	, align : 'center', xtype : 'lookupcolumn',lookupValue : resource.lookup('rett_proc_dvcd')
					},{ dataIndex: 'rett_memo'		, text : Language.get('rett_memo'		,'반품메모'	) , width : 120
					},{ dataIndex: 'istt_invc_date'	, text : Language.get('istt_invc_date'	,'입고일자'	) , width : 90	, align : 'center'
					},{ dataIndex: 'istt_invc_numb'	, text : Language.get('istt_invc_numb'	,'입고번호'	) , width : 100	, align : 'center'
					},{ dataIndex: 'purc_invc_date'	, text : Language.get('purc_invc_date'	,'발주일자'	) , width : 90	, align : 'center', xtype : 'lookupcolumn',lookupValue : resource.lookup('acpt_dvcd')
					},{ dataIndex: 'purc_invc_numb'	, text : Language.get('prod_trst_dvcd'	,'발주번호'	) , width : 100	, align : 'center', xtype : 'lookupcolumn',lookupValue : resource.lookup('prod_trst_dvcd')
//					},{ dataIndex: 'invc_numb'		, text : Language.get('invc_numb'		,'invc_numb'	) ,hidden:true
//					},{ dataIndex: 'orig_invc_numb'	, text : Language.get('orig_invc_numb'	,'orig_invc_numb'),hidden:true
					}
				]
			}


		;
		return item;
	}
});