Ext.define('module.custom.sjflv.mtrl.imp.estimast.view.EstiMastListerMaster', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-estimast-lister-master',
	store		: 'module.custom.sjflv.mtrl.imp.estimast.store.EstiMastMaster',

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
					{	dataIndex: 'line_clos'		, width:  40, align : 'center'	, text: Language.get('line_clos'		, '상태'			) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_clos')
					},{	dataIndex: 'invc_numb'		, width: 120, align : 'center'	, text: Language.get('esti_numb'		, '견적번호'		)
					},{	dataIndex: 'cstm_name'		, width: 200, align : 'left'	, text: Language.get('cstm_name'		, '거래처명'		)
					},{	dataIndex: 'cstm_code'		, width:  80, align : 'center'	, text: Language.get('cstm_code'		, '거래처코드'	)
					},{	dataIndex: 'drtr_name'		, width:  80, align : 'left'	, text: Language.get('sale_drtr'		, '영업담당자'	)
					},{	dataIndex: 'invc_date'		, width:  80, align : 'center'	, text: Language.get('esti_date'		, '견적일자'		)
					},{	dataIndex: 'crny_dvcd'		, width: 60, align : 'center'	, text: Language.get('crny_dvcd'		, '화폐단위'		), xtype : 'lookupcolumn' , lookupValue : resource.lookup('crny_dvcd')
					},{	dataIndex: 'expt_dvcd'		, width: 60, align : 'center'	, text: Language.get('expt_dvcd'		, '단가조건'		), xtype : 'lookupcolumn' , lookupValue : [["0100","CIF"],["0200","CIP"],["0300","FOB"],["0400","EXW"],["0500","SAMPLE"],["0600","FCA"],["0700","DDU"]]
					},{	dataIndex: 'dlvy_cond'		, width: 110, align : 'center'	, text: Language.get('dlvy_cond'		, '결제방법'		), xtype : 'lookupcolumn' , lookupValue : [["10","T/T payment"],["21","D/A"],["22","D/P"],["30","L/C"]]
					},{	dataIndex: 'esti_vald_term'	, width: 110, align : 'left'	, text: Language.get('esti_vald_term'	, '견적유효기간'	), xtype : 'lookupcolumn' , lookupValue : [["10","T/T payment"],["21","D/A"],["22","D/P"],["30","L/C"]]
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
					},{	dataIndex: 'memo'			, flex : 100, align : 'left'	, text: Language.get('memo'				, '비고'		)
					}
				]
			};
		return item;
	},

	exec : function (rec){
		var me		= this,
			lister = Ext.ComponentQuery.query('module-estimast-worker-lister')[0],
			select = Ext.ComponentQuery.query('module-estimast-lister-master')[0].getSelectionModel().getSelection()[0],
			editor = Ext.ComponentQuery.query('module-estimast-worker-editor2')[0],
			master = Ext.ComponentQuery.query('module-estimast-lister-master')[0],
			layout = Ext.ComponentQuery.query('module-estimast-layout')[0]
		;

	var err_msg = "";
		lister.select({
			 callback : function(records, operation, success) {
//				 lister3.getSelectionModel().select(0);
					editor.selectRecord({ lister : master, record : rec }, lister);
					layout.getLayout().setActiveItem(1);
			}, scope : lister
		}, { invc_numb:rec.get("invc_numb")});
	},

	exec2 : function (rec){
		var me		= this,
			lister2 = Ext.ComponentQuery.query('module-estimast-worker-lister2')[0],
			lister3 = Ext.ComponentQuery.query('module-estimast-worker-lister3')[0],
			select = Ext.ComponentQuery.query('module-estimast-lister-master')[0].getSelectionModel().getSelection()[0],
			editor = Ext.ComponentQuery.query('module-estimast-worker-editor3')[0],
			master = Ext.ComponentQuery.query('module-estimast-lister-master')[0],
			layout = Ext.ComponentQuery.query('module-estimast-layout')[0],
			search = Ext.ComponentQuery.query('module-estimast-search')[0]
		;

		lister2.getStore().clearData();
		lister2.getStore().loadData([],false);


	var err_msg = "";
	lister3.select({
			 callback : function(records, operation, success) {
					editor.selectRecord({ lister2 : master, record : rec }, lister3);
					layout.getLayout().setActiveItem(2);
			}, scope : lister3
		}, { invc_numb:rec.get("invc_numb")});
	},

});
