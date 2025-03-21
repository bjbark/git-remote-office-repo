Ext.define('module.qc.insp.inspentry2.view.InspEntry2Master', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-inspentry2-lister'			,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	store		: 'module.qc.insp.inspentry2.store.InspEntry2Master',
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
					{	dataIndex: 'line_stat'		, text : Language.get('line_stat'		,'상태'		)	, width : 50  , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat')
					},{	dataIndex: 'invc_numb'		, text : Language.get('wkod_numb'		,'지시번호'	)	, width : 150 , align : 'center'
					},{ dataIndex: 'pdod_date'		, text : Language.get('pdod_date'		,'지시일자'	)	, width : 80  , align : 'center'
					},{ dataIndex: 'work_strt_dttm'	, text : Language.get('work_strt_dttm'	,'착수예정'	)	, width : 125 , align : 'center'
					},{ dataIndex: 'work_endd_dttm'	, text : Language.get('work_endd_dttm'	,'종료예정'	)	, width : 125 , align : 'center'
					},{ dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		,'거래처명'	)	, width : 100 , align : 'left'
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명'		)	, width : 200 , align : 'left'
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'규격'		)	, width : 180 , align : 'left'
					},{ dataIndex: 'indn_qntt'		, text : Language.get('indn_qntt'		,'지시수량'	)	, width : 80  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'prod_qntt'		, text : Language.get('prod_qntt'		,'생산수량'	)	, width : 80  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'insp_wkct_yorn'	, text : Language.get('insp_wkct_yorn'	,'검사여부'	)	, width : 70  , xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'), align : 'center'
					},{ dataIndex: 'insp_type_idcd'	, text : Language.get('insp_type_idcd'	,'검사장비'	)	, width : 120 , align : 'center',hidden:true
					}
				]
			}
		;
		return item;
	}
});