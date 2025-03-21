Ext.define('module.custom.komec.qc.insp.inspentry3.view.InspEntry3Master', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-komec-inspentry3-lister'			,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	store		: 'module.custom.komec.qc.insp.inspentry3.store.InspEntry3Master',
	border		: 0,
	columnLines : true,
	features	: [{ ftype : 'grid-summary'} ],
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
					{	fieldLabel	: Language.get('work_date','입고일자'),
						labelWidth	: 50,
						itemId		: 'work_date',
						xtype		: 'datefield',
						name		: '',
						margin		: '0 10 0 0',
						width		: 150,
						hidden		: true,
						labelSeparator : '',
						format		: Const.DATE_FORMAT_YMD_BAR,
						submitFormat: Const.DATE_FORMAT_YMD,
						value		: new Date(),
					},{text : "<span style='color:white'>입고확정</span>", action : 'prodInsert', cls: 'button1-style' ,hidden		: true} ,
					'->', '-' ,
					{	text : '<span class="write-button">검사성적서 발행</span>', action : 'printAction', cls: 'button1-style', width : 90,
						hidden	: (_global.stor_id.toUpperCase() != 'N1000NBOLT1000'?true:false)},
					{	text : '<span class="write-button">납품검사성적서 발행</span>', action : 'printAction2', cls: 'button1-style', width : 110,
						hidden	: (_global.stor_id.toUpperCase() != 'N1000NBOLT1000'?true:false)},
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style', itemId:'master' } ,
				]
			};
		return item ;
	},


	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'line_stat'		, text : Language.get('line_stat'		,'상태'			) , width : 50  , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat')
					},{	dataIndex: 'invc_numb'		, text : Language.get('istt_numb'		,'입고번호'			) , width : 120 , align : 'center'
					},{ dataIndex: 'invc_date'		, text : Language.get('istt_date'		,'입고일자'			) , width : 100 , align : 'center'
					},{ dataIndex: 'istt_wrhs_name'	, text : Language.get('istt_wrhs_name'	,'입고창고'			) , width : 120 , align : 'left'	, hidden : (_global.options.mes_system_type !='Frame'? false:true)
					},{ dataIndex: 'cstm_code'		, text : Language.get('cstm_code'		,'거래처코드'		) , width : 100 , align : 'center'	, hidden : true
					},{ dataIndex: 'cstm_idcd'		, text : Language.get('cstm_idcd'		,'거래처ID'		) , width : 100 , align : 'center'	, hidden : true
					},{ dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		,'거래처명'			) , width : 130 , align : 'left'
					},{ dataIndex: 'drtr_name'		, text : Language.get('drtr_name'		,'입고담당'			) , width : 80  , align : 'left'
					},{	dataIndex: 'item_code'		, text : Language.get('item_code'		,'품목코드'			) , flex  :   1 , align : 'center'
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명'			) , flex  :   1 , align : 'left'
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'규격'			) , width : 180 , align : 'left'
					},{ dataIndex: 'acpt_case_name'	, text : Language.get('modl_name'		,'모델명'			) , width : 180 , align : 'left'
					},{ dataIndex: 'unit_name'		, text : Language.get('unit_name'		,'단위'			) , width : 60  , align : 'left'	, hidden : (_global.options.mes_system_type !='Frame'? false:true)
					},{ dataIndex: 'lott_numb'		, text : Language.get('lott_numb'		,'Batch No'		) , width : 100 , align : 'left'	, hidden	: (_global.options.haccp_item_yorn == 0),
					},{ dataIndex: 'cstm_lott_numb'	, text : Language.get(''				,'Supplier No'	) , width : 100 , align : 'left'	, hidden	: (_global.options.haccp_item_yorn == 0),
					},{ dataIndex: 'istt_qntt'		, text : Language.get('istt_qntt'		,'수량'			) , width : 60  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum', format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.##':'#,##0.##0',
					},{ dataIndex: 'ordr_wigt'		, text : Language.get('ordr_wigt'		,'중량'			) , width : 80  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum', hidden :  (_global.options.mes_system_type !='Frame'? true:false)
					},{ dataIndex: 'remk_text'		, text : Language.get('remk_text'		,'비고'			) , width : 80  , align : 'left'	, hidden : (_global.options.mes_system_type !='Frame'? false:true)
					}
				]
			}
		;
		return item;
	}
});