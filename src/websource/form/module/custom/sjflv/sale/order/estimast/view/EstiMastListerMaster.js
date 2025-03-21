Ext.define('module.custom.sjflv.sale.order.estimast.view.EstiMastListerMaster', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-sjflv-estimast-lister-master',
	store		: 'module.custom.sjflv.sale.order.estimast.store.EstiMastMaster',

	width		: 515,
	minWidth	: 200,
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' , remote : true }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

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
					'-', '->', '-',
					{	text : '<span class="write-button">견적복사</span>'	, action : 'copyAction'		, cls: 'button1-style'	} , '-',
					{	text : '<span class="write-button">수주등록</span>'	, action : 'orderAction'	, cls: 'button1-style'	} , '-',
					{	text : '<span class="write-button">견적서 발행</span>', action : 'printAction'	, cls: 'button1-style'	} , '-',
					{	text : '명세서'			, iconCls: Const.REPORT.icon, action : 'etcPrintAction', hidden : true	} , '-',
					{	text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action ,cls: 'button-style' } ,
					{	text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action ,cls: 'button-style' } ,
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style' } , '-' ,
					{	text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action ,cls: 'button-style' }
				]
			}
		;
		return item ;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex: 'line_clos'		, width:  40, align : 'center'	, text: Language.get('line_clos'		, '상태'		) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_clos')
					},{	dataIndex: 'acpt_cofm_yorn'	, width:  60, align : 'center'	, text: Language.get('acpt_cofm_yorn'	, '수주확정'	) , xtype : 'lookupcolumn' , lookupValue : [["0","미확정"],["1","수주확정"]]
					},{	dataIndex: 'invc_date'		, width:  80, align : 'center'	, text: Language.get('esti_date'		, '견적일자'	)
					},{	dataIndex: 'invc_numb'		, width: 100, align : 'center'	, text: Language.get('esti_numb'		, '견적번호'	)
					},{	dataIndex: 'cstm_name'		, width: 200, align : 'left'	, text: Language.get('cstm_name'		, '거래처명'	)
					},{	dataIndex: 'cstm_code'		, width:  80, align : 'center'	, text: Language.get('cstm_code'		, '거래처코드'	)
					},{	dataIndex: 'boss_name'		, width:  80, align : 'left'	, text: Language.get('boss_name'		, '대표자명'	)
					},{	dataIndex: 'deli_date'		, width:  80, align : 'center'	, text: Language.get('deli_date'		, '납기일자'	)
					},{	dataIndex: 'drtr_name'		, width:  90, align : 'left'	, text: Language.get('sale_drtr'		, '영업담당'	)
					},{ header: '품목등록',
						sortable: false,
						width:75,
						align : 'center',
						renderer: function(val,meta,rec) {
							meta.style = 'width : 70; align : center;';
							var id = Ext.id();
							if(rec.data.item_count > 0){
								Ext.defer(function() {
									Ext.widget('button', {
										renderTo: Ext.query("#"+id)[0],
										text	: '<span style="color : white !important;">등록</span>',
										width	: 63,
										height	: 19,
										style	: 'background : #419641',
										cls		: 'button-style',
										handler: function(){me.exec(rec)}
									});
								}, 50);
							}else{
								Ext.defer(function() {
									Ext.widget('button', {
										renderTo: Ext.query("#"+id)[0],
										text	: '<span style="color : white !important;">등록</span>',
										width	: 63,
										height	: 19,
										cls		: 'button-style',
										handler: function(){me.exec(rec)}
									});
								}, 50);
							}
							return Ext.String.format('<div id="{0}"></div>', id);
						},
						dataIndex: 'somefieldofyourstore'
				},{ header: '품목계산',
					sortable: false,
					width:75,
					align : 'center',
					renderer: function(val,meta,rec) {
						meta.style = 'width : 70; align : center;';
						var id = Ext.id();
						if(rec.data.item_count > 0){
							Ext.defer(function() {
								Ext.widget('button', {
									renderTo: Ext.query("#"+id)[0],
									text	: '<span style="color : white !important;">등록</span>',
									width	: 63,
									height	: 19,
									cls		: 'button-style',
									handler: function(){me.exec2(rec)}
								});
							}, 50);
						}else{
							Ext.defer(function() {
								Ext.widget('button', {
									renderTo: Ext.query("#"+id)[0],
									text	: '<span style="color : white !important;">등록</span>',
									width	: 63,
									height	: 19,
									hidden	: true,
									cls		: 'button-style',
									handler: function(){me.exec2(rec)}
								});
							}, 50);
						}
						return Ext.String.format('<div id="{0}"></div>', id);
					},
					dataIndex: 'somefieldofyourstore'
//					},{	dataIndex: 'item_name'		, width: 120, align : 'left'	, text: Language.get('item_name'		, '품명'		)
//					},{	dataIndex: 'item_spec'		, width: 120, align : 'left'	, text: Language.get('item_spec'		, '규격'		)
//					},{	dataIndex: 'mtrl_yeld'		, width:  60, align : 'right'	, text: Language.get('mtrl_yeld'		, '수율'		),xtype:'numericcolumn'
//					},{	dataIndex: 'make_cost'		, width:  90, align : 'right'	, text: Language.get('make_cost'		, '가공비'	),xtype:'numericcolumn'
//					},{	dataIndex: 'cost_pric'		, width:  90, align : 'right'	, text: Language.get('cost_pric'		, '원가단가'	),xtype:'numericcolumn'
//					},{	dataIndex: 'pfit_rate'		, width:  60, align : 'right'	, text: Language.get('pfit_rate'		, '마진'		),xtype:'numericcolumn'
//					},{	dataIndex: 'esti_pric'		, width:  90, align : 'right'	, text: Language.get('esti_pric'		, '마진단가'	),xtype:'numericcolumn'
//					},{	dataIndex: 'ttsm_amnt'		, width:  90, align : 'right'	, text: Language.get('ttsm_amnt'		, '견적단가'	),xtype:'numericcolumn'
					},{	dataIndex: 'memo'		, flex : 100, align : 'left'	, text: Language.get('remk_text'		, '비고'		)
					}
				]
			}
		;
		return item;
	},

	exec : function (rec){
		var me		= this,
			lister3 = Ext.ComponentQuery.query('module-sjflv-estimast-worker-lister3')[0],
			select = Ext.ComponentQuery.query('module-sjflv-estimast-lister-master')[0].getSelectionModel().getSelection()[0],
			editor = Ext.ComponentQuery.query('module-sjflv-estimast-worker-editor2')[0],
			master = Ext.ComponentQuery.query('module-sjflv-estimast-lister-master')[0],
			layout = Ext.ComponentQuery.query('module-sjflv-estimast-layout')[0]
		;
		
		if ("1" == rec.get("acpt_cofm_yorn")) {
			Ext.Msg.alert("알림", "수주확정된 견적서 입니다.");
			return;
		}
		
		var err_msg = "";
		lister3.select({
			 callback : function(records, operation, success) {
//				 lister3.getSelectionModel().select(0);
				editor.selectRecord({ lister : master, record : rec }, lister3);
				layout.getLayout().setActiveItem(1);
			}, scope : lister3
		}, { invc_numb:rec.get("invc_numb")});
	},

	exec2 : function (rec){
		var me		= this,
			lister = Ext.ComponentQuery.query('module-sjflv-estimast-worker-lister')[0],
			lister2 = Ext.ComponentQuery.query('module-sjflv-estimast-worker-lister2')[0],
			lister4 = Ext.ComponentQuery.query('module-sjflv-estimast-worker-lister4')[0],
			select = Ext.ComponentQuery.query('module-sjflv-estimast-lister-master')[0].getSelectionModel().getSelection()[0],
			editor = Ext.ComponentQuery.query('module-sjflv-estimast-worker-editor')[0],
			master = Ext.ComponentQuery.query('module-sjflv-estimast-lister-master')[0],
			layout = Ext.ComponentQuery.query('module-sjflv-estimast-layout')[0],
			search = Ext.ComponentQuery.query('module-sjflv-estimast-search')[0]
		;
		
		if ("1" == rec.get("acpt_cofm_yorn")) {
			Ext.Msg.alert("알림", "수주확정된 견적서 입니다.");
			return;
		}

		lister.getStore().clearData();
		lister.getStore().loadData([],false);

		lister2.getStore().clearData();
		lister2.getStore().loadData([],false);

	var err_msg = "";
		lister4.select({
			 callback : function(records, operation, success) {
//				 lister4.getSelectionModel().select(0);
					editor.selectRecord({ lister : master, record : rec }, lister4);
					layout.getLayout().setActiveItem(2);
			}, scope : lister4
		}, { invc_numb:rec.get("invc_numb")});
	},
});
