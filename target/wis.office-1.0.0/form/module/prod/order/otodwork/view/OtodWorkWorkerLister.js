Ext.define('module.prod.order.otodwork.view.OtodWorkWorkerLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-otodwork-worker-lister',
	split		: true,
	selModel: {selType:'cellmodel'},
	features	: [{ ftype : 'grid-summary' }],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem() ;
		me.columns = me.columnItem();
		me.callParent();
	},

	createForm: function(){
		var me = this,
			form = {
				xtype		: 'form-layout',
				region		: 'center',
				border		: false,
				dockedItems : [ me.createLine1() ],
				items		: [ me.createGrid() ]
			}
		;
		return form;
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
					{	text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action ,cls: 'button-style' },
					{	text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action ,cls: 'button-style' }, '-'
				], pagingButton : false
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
					{	dataIndex:	'orig_invc_numb', width : 120 , align : 'center', text: Language.get('invc_numb'	, '지시번호'		), hidden : _global.options.mes_system_type =='Frame'? false :  true
					},{	dataIndex:	'dlvy_cstm_name', width : 120 , align : 'left'	, text: Language.get('dlvy_cstm_name', '수주처'		), hidden : _global.options.mes_system_type =='Frame'? false :  true
					},{	dataIndex:	'orig_item_name', width : 200 , align : 'left'	, text: Language.get('orig_item_name', '모델명'		), hidden : _global.options.mes_system_type =='Frame'? false :  true
					},{	dataIndex:	'work_schd_dvcd', width : 160 , align : 'center', text: Language.get('work_schd_dvcd', '작업일정구분코드'	), hidden : true
					},{	dataIndex:	'gant_id'		, width : 160 , align : 'center', text: Language.get('gant_id'		, '간트ID'		), hidden : true
					},{	dataIndex:	'wkct_name'		, width :  90 , align : 'left'	, text: Language.get('wkct_name'	, '공정명'			), hidden : _global.options.mes_system_type =='Frame'? false :  true
					},{	dataIndex:	'item_code'		, width :  80 , align : 'center', text: Language.get('item_code'	, '품목코드'		), hidden : _global.options.mes_system_type =='Frame'? true:false
					},{	dataIndex:	'item_name'		, width : 200 , align : 'left'	, text: Language.get('item_name'	, '품명'			)
					},{	dataIndex:	'item_mtrl'		, width :  80 , align : 'left'	, text: Language.get('item_mtrl'	, '품목재질'		) , hidden : true
					},{	dataIndex:	'item_spec'		, width : 120 , align : 'left'	, text: Language.get('item_spec'	, '규격'			)
					},{	dataIndex:	'need_qntt'		, width :  80 , align : 'right'	, text: Language.get('indn_qntt'	, '지시수량'		)
					},{	dataIndex:	'offr_baln_qntt', width :  80 , align : 'right'	, text: Language.get(''				, '발주잔량'		), xtype: 'numericcolumn' , summaryType: 'sum' , format: '#,##0'
					},{	dataIndex:	'offr_qntt'		, width :  80 , align : 'right'	, text: Language.get('offr_qntt'	, '발주수량'		), xtype: 'numericcolumn' , summaryType: 'sum' ,
						tdCls : 'editingcolumn',
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										if(_global.options.mes_system_type !='Frame'){
											grid.plugins[0].startEdit(row, grid.columns[11]);
										}else{
											grid.plugins[0].startEdit(row, grid.columns[13]);
										}

									}
								}
							}
						}
					},{	dataIndex:	'offr_pric'		, width:  80, align : 'right'	, text: Language.get('offr_pric'	, '발주단가'		), xtype: 'numericcolumn', summaryType: 'sum'
						, tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										if(_global.options.mes_system_type !='Frame'){
											grid.plugins[0].startEdit(row, grid.columns[12]);
										}else{
											grid.plugins[0].startEdit(row, grid.columns[14]);
										}
									}
								}
							}
						}
					},{	dataIndex:	'deli_date'		, width:  95, align : 'center'	, text: Language.get('deli_date'	, '납기일자'	),
						tdCls : 'editingcolumn',
						editor	: {
							xtype		:'datefield',
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										if(_global.options.mes_system_type !='Frame'){
											grid.plugins[0].startEdit(row, grid.columns[17]);
										}else{
											grid.plugins[0].startEdit(row+1, grid.columns[12]);
										}
									}
								}
							}
						},
						renderer:function(val){
							var a = null;
							if(val){
								if(val.match(/[^0-9]/)){
									var date1 = new Date(val);
										date2 = Ext.Date.format(date1,'Y-m-d'),
										a = date2
									;
								}else{
									a = val.substr(0,4)+'-'+val.substr(4,2)+'-'+val.substr(6,2);
								}
							}
							return a;
						},
					},{	dataIndex:	'work_strt_dttm', width:  80, align : 'left'	, text: Language.get('work_strt_dttm', '작업시작일시')
					},{	dataIndex:	'offr_amnt'		, width:  80, align : 'right'	, text: Language.get('offr_amnt'	,  '발주금액'	), xtype: 'numericcolumn' , summaryType: 'sum' , format: '#,##0'
					},{	dataIndex:	'offr_vatx'		, width:  80, align : 'right'	, text: Language.get('offr_vatx'	,  '부가세'	), xtype: 'numericcolumn' , summaryType: 'sum' , format: '#,##0'
					},{	dataIndex:	'ttsm_amnt'		, width:  80, align : 'right'	, text: Language.get('ttsm_amnt'	,  '합계금액'	), xtype: 'numericcolumn' , summaryType: 'sum' , format: '#,##0'
					},{	dataIndex:	'user_memo'		, flex :  20, align : 'left'	, text: Language.get('user_memo'	,  '메모'		)
						, tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									var grid = self.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection);
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										grid.plugins[0].startEdit(row+1, grid.columns[10]);
									}
								}
							}
						}
					},{	dataIndex:	'wkct_idcd'		, width:  80, align : 'right'	, text: Language.get('wkct_idcd'	,  '공정ID'	), hidden : true
					}
				]
			}
		;
		return item;
	},


	cellEditAfter  : function (editor, context) {

		var me = this;
		var need_qntt	= this.getSelectionModel().getSelection()[0].data.need_qntt;		//소요수량
		var a			= this.getSelectionModel().getSelection()[0].data.offr_qntt;		//발주수량
		var b			= this.getSelectionModel().getSelection()[0].data.offr_pric;		//발주단가
		var c			= this.getSelectionModel().getSelection()[0].data.offr_amnt;		//발주금액
		var d			= this.getSelectionModel().getSelection()[0].data.ttsm_amnt;		//합계금액
		var i			= this.getSelectionModel().getSelection()[0].data.offr_vatx;		//부가세
		var amnt		= Math.floor(a*b/10)*10;	//금액
		var v			= Math.floor(amnt*Number(_global.tax_rt)/1000)*10;		//부가세
		var grid		= this;
		var pos			= this.view.getSelectionModel().getCurrentPosition().row;
		var models		= grid.getStore().getRange();
		if(need_qntt<a || a<0){
			Ext.Msg.alert("알림", "발주수량을 다시 입력해주십시오.");
			models[pos].set('offr_pric',0);
			models[pos].set('offr_qntt',0);
			models[pos].set('offr_amnt',0);
			models[pos].set('offr_vatx',0);
			models[pos].set('ttsm_amnt',0);
		}else if(need_qntt>a){
			models[pos].set('offr_amnt',amnt);
			models[pos].set('offr_vatx',v);
			models[pos].set('ttsm_amnt',amnt+v);
		}else if(need_qntt=a){
			models[pos].set('offr_amnt',amnt);
			models[pos].set('offr_vatx',v);
			models[pos].set('ttsm_amnt',amnt+v);
		}else if(e<a){
			Ext.Msg.alert("알림", "발주수량을 다시 입력해주십시오.");
		}
	},

	listeners: {

		edit : function(editor, context) {
			var me = this;
			me.cellEditAfter(editor, context);
		}
	}
});
