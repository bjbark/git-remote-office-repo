Ext.define('module.custom.iypkg.prod.prodordr2.view.ProdOrdr2Detail2', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-prodordr2-detail2',
	store		: 'module.custom.iypkg.prod.prodordr2.store.ProdOrdr2Detail2',

	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' , remote : false }],
	plugins		: {ptype  :'cellediting-directinput', clicksToEdit: 1 },

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
				]
			}
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'wkct_name'		, width: 100, align: 'center', text: Language.get('wkct_name'		, '공정명'		),
					},{	dataIndex: 'cstm_name'		, width: 150, align: 'left'  , text: Language.get('cstm_name'		, '외주처명'	), hidden : true,
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						hidden : true,
						items	: [
							{	iconCls	: Const.SELECT.icon,
								tooltip	: '거래처명 찾기',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									resource.loadPopup({
										select	: 'SINGLE',
										widget	: 'lookup-cstm-popup',
										params:{ stor_grp : _global.stor_grp , line_stat : '0'}, //, otod_cstm_yorn:'1'
										result	: function(records) {
											var	parent = records[0]
											;
											record.set('cstm_idcd',parent.data.cstm_idcd);
											record.set('cstm_name',parent.data.cstm_name);
										},
									})
								},
								scope : me
							}
						]
					},{	dataIndex: 'cstm_idcd'		, hidden : true
					},{	dataIndex: 'wkun_dvcd'		, width: 100, align: 'left'  , text: Language.get('wkun_dvcd'		, '작업단위'	), xtype : 'lookupcolumn', lookupValue : resource.lookup('wkun_dvcd'),
					},{	dataIndex: 'plan_qntt'		, width:  80, align: 'right' , text: Language.get('plan_qntt'		, '소요량'		), xtype : 'numericcolumn',
					},{	dataIndex: 'unoffr'			, width:  80, align: 'right' , text: Language.get(''				, '미발주'		), xtype : 'numericcolumn',
					},{	dataIndex: 'offr_qntt'		, width:  80, align: 'right' , text: Language.get('offr_qntt'		, '발주수량'	), xtype : 'numericcolumn', hidden : true,
					},{	dataIndex: 'unit_name'		, width:  90, align: 'center', text: Language.get('unit_name'		, '수량단위'	),
					},{	dataIndex: 'stnd_pric'		, width:  90, align: 'right' , text: Language.get('stnd_pric'		, '단가'		), xtype : 'numericcolumn',
					},{	dataIndex: 'offr_amnt'		, width:  80, align: 'right' , text: Language.get('offr_amnt'		, '발주금액'		), xtype : 'numericcolumn', hidden : true,
					},{	dataIndex: 'deli_date'		, width: 100, align: 'center', text: Language.get('deli_date'		, '납기일자'		), xtype : 'datecolumn', hidden : true,
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
					},{	dataIndex: 'offr_vatx'		, width:  80, align: 'right' , text: Language.get('offr_vatx'		, '부가세액'		), xtype : 'numericcolumn', hidden : true
					},{	dataIndex: 'ttsm_amnt'		, width:  80, align: 'right' , text: Language.get('ttsm_amnt'		, '합계금액'		), xtype : 'numericcolumn', hidden : true
					}
				]
			}
		;
		return item;
	},


//	cellEditAfter  : function (editor, context) {
//		var me = this;
//		var me = this;
//		var unoffr		= this.getSelectionModel().getSelection()[0].data.unoffr;		//미발주잔량
//		var qntt		= this.getSelectionModel().getSelection()[0].data.offr_qntt;	//발주할수량
//		var pric		= this.getSelectionModel().getSelection()[0].data.stnd_pric;	//표준단가
//
//		var amnt		= qntt*pric;					//공급가
//		var vatx		= Math.floor((qntt*pric)*0.1);	//부가세
//		var ttsm		= amnt+vatx;					//합계
//
//		var grid		= this;
//		var pos			= this.view.getSelectionModel().getCurrentPosition().row;
//		var models		= grid.getStore().getRange();
//
//		if(qntt > unoffr){
//			Ext.Msg.alert("알림", "발주수량을 다시 입력해주십시오.");
//			models[pos].set('offr_qntt',0);
//			models[pos].set('offr_amnt',0);
//			models[pos].set('offr_vatx',0);
//			models[pos].set('ttsm_amnt',0);
//		}else if(qntt < 0){
//			Ext.Msg.alert("알림", "발주수량을 다시 입력해주십시오.");
//			models[pos].set('offr_qntt',0);
//			models[pos].set('offr_amnt',0);
//			models[pos].set('offr_vatx',0);
//			models[pos].set('ttsm_amnt',0);
//		}else{
//			models[pos].set('offr_amnt',amnt);
//			models[pos].set('offr_vatx',vatx);
//			models[pos].set('ttsm_amnt',ttsm);
//		}
//
//	},
//
//	listeners: {
//		edit : function(editor, context) {
//			var me = this;
//			me.cellEditAfter(editor, context);
//		}
//	}


 });
