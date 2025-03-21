Ext.define('module.prod.project.prjtotodwork.view.PrjtOtodWorkWorkerLister', { extend: 'Axt.grid.Panel',
	alias: 'widget.module-prjtotodwork-worker-lister',
	split		: true,
	selModel	: { selType: 'cellmodel'},
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
					{	dataIndex:	'new_invc_numb'	, width : 100 , align : 'center', text: Language.get('new_invc_numb', '번호'			), hidden: true
					},{	dataIndex:	'new_line_seqn'	, width : 100 , align : 'center', text: Language.get('new_line_seqn', '번호'			), hidden: true
					},{	dataIndex:	'pjod_idcd'		, width : 160 , align : 'center', text: Language.get('pjod_idcd'	, '프로젝트수주id'	),hidden : true
					},{	dataIndex:	'work_schd_dvcd', width : 160 , align : 'center', text: Language.get('work_schd_dvcd', '작업일정구분코드'	),hidden : true
					},{	dataIndex:	'gant_id'		, width : 160 , align : 'center', text: Language.get('gant_id'		, '간트ID'		),hidden : true
					},{	dataIndex:	'item_name'		, width : 300 , align : 'left'	, text: Language.get('item_name'	, '품명'			)
					},{	dataIndex:	'item_spec'		, width : 120 , align : 'left'	, text: Language.get('item_spec'	, '품목규격'		)
					},{	dataIndex:	'item_mtrl'		, width :  80 , align : 'left'	, text: Language.get('item_mtrl'	, '품목재질'		) , hidden : true
					},{	dataIndex:	'need_qntt'		, width :  80 , align : 'right'	, text: Language.get('need_qntt'	, '소요수량'		)
					},{	dataIndex:	'offr_qntt'		, width :  80 , align : 'right'	, text: Language.get('offr_qntt'	, '발주수량'		), xtype: 'numericcolumn', summaryType: 'sum'
						, tdCls : 'editingcolumn',
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: true
						},
						listeners:{
							change:function(){
								var a = this.view.getSelectionModel().getCurrentPosition();
							}
						}
					},{	dataIndex:	'offr_pric'		, width:  80, align : 'right'	, text: Language.get('offr_pric'	, '발주단가'		), xtype: 'numericcolumn', summaryType: 'sum'
						, tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false
						},
						listeners:{
							change:function(){
								var a = this.view.getSelectionModel().getCurrentPosition();
							}
						}
					},{	dataIndex:	'deli_date'		, width:  95, align : 'center'	, text: Language.get('deli_date'	, '납기일자'	),
						tdCls : 'editingcolumn',
						editor	: {
							xtype		:'datefield',
							selectOnFocus: true,
							allowBlank	: false,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
						},
						renderer : Ext.util.Format.dateRenderer('Y-m-d'),
					},{	dataIndex:	'offr_amnt'		, width:  80, align : 'right'	, text: Language.get('offr_amnt'	,  '발주금액'	), xtype: 'numericcolumn' , summaryType: 'sum' , format: '#,##0'
					},{	dataIndex:	'offr_vatx'		, width:  80, align : 'right'	, text: Language.get('offr_vatx'	,  '부가세'	), xtype: 'numericcolumn' , summaryType: 'sum' , format: '#,##0'
					},{	dataIndex:	'ttsm_amnt'		, width:  80, align : 'right'	, text: Language.get('ttsm_amnt'	,  '합계금액'	), xtype: 'numericcolumn' , summaryType: 'sum' , format: '#,##0'
					},{	dataIndex:	'user_memo'		, flex :  20, align : 'left'	, text: Language.get('user_memo'	,  '메모'		)
						, tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: true
						}
					}
				]
			}
		;
		return item;
	},

	cellEditAfter  : function (lister2, context) {
		var me = this;
		var need_qntt	= this.getSelectionModel().getSelection()[0].data.need_qntt;	//소요수량
		var a			= this.getSelectionModel().getSelection()[0].data.offr_qntt;	//발주수량
		var b			= this.getSelectionModel().getSelection()[0].data.offr_pric;	//발주단가
		var c			= this.getSelectionModel().getSelection()[0].data.offr_amnt;	//발주금액
		var d			= this.getSelectionModel().getSelection()[0].data.ttsm_amnt;	//합계금액
		var i			= this.getSelectionModel().getSelection()[0].data.offr_vatx;	//부가세
		var amnt		= Math.floor(a*b/10)*10;	//금액
		var v			= Math.floor(amnt*Number(_global.tax_rt)/1000)*10;		//부가세
		var grid		= this;
		var pos			= this.view.getSelectionModel().getCurrentPosition().row;
		var models		= grid.getStore().getRange();

		if(need_qntt<a){
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
		}
		lister2.grid.view.getSelectionModel().onKeyDown();
	},

	listeners: {
		validateedit : function (lister, context, eOpts ) {
			var me = this;
			var field = context.field;
			var value = context.value;
			return true;
		},
		edit : function(lister2, context) {
			var me = this;
			me.cellEditAfter(lister2, context);
		}
	}
});
