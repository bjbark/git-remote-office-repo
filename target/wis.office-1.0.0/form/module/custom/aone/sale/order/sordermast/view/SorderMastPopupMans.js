Ext.define('module.custom.aone.sale.order.sordermast.view.SorderMastPopupMans', { extend: 'Axt.grid.Panel',
	alias: 'widget.module-aone-sordermast-popup-mans',
	store: 'module.custom.aone.sale.order.sordermast.store.SorderMastPopupMans',

	selModel 	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' } ],
	plugins 	: {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent : function() {
		var me = this;
		
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},
	pagingItem : function () {
		var  me   = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
					{text : Const.ROWINSERT.text, iconCls: Const.INSERT.icon ,
						listeners: {
	 			 			click:function(self,e){
								me.lineInsert({});
							}
						}
					},
					'-',
					{text : Const.ROWDELETE.text, iconCls: Const.DELETE.icon,
						listeners: {
							click:function(self,e){
								me.lineDelete({});
							}
						}
					}
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				listeners:{
					afterrender : function(){
						me.search();
					},
				},
				items : [
				      {    xtype  : 'rownumberer' 	, width : 40    , align : 'center'	, text : '항번'	, hidden : false,
					},{	dataIndex :	'user_name'		, width : 100	, align	: 'left'	, text : Language.get(''	, '작업자'	 ) ,hidden : true,
					},{	dataIndex :	'drtr_idcd'		, width : 100	, align	: 'left'	, text : Language.get(''	, '유저번호' ) ,hidden : true,
					},{	dataIndex :	'invc_date'		, width : 120	, align	: 'center'	, text : Language.get(''	, '시작일자' ),
						editor	: {
							xtype		: 'datefield',
							selectOnFocus: true,
							allowBlank	: false,
							format		: Const.DATE_FORMAT_YMD_BAR,
						},
						renderer:function(val){
							var a = null;
							if(val){
								if(val.match(/[^0-9]/)){
									var date1 = new Date(val);
									date2 = Ext.Date.format(date1,'Y-m-d'),
									a = date2;
								}else{
									a = val.substr(0,4)+'-'+val.substr(4,2)+'-'+val.substr(6,2);
								}
							}
							return a;
						},
					},{	dataIndex:	'work_sttm', width	: 100, align	: 'center', text	: Language.get(''	, '시작시간'), sortable	: false, tdCls : 'editingcolumn',
						editor	: {
							xtype		: 'timefield',
							format		: 'H:i',
							minValue	: '09:00',
							maxValue	: '18:00',
							increment	: 30,
							anchor		: '100%',
							allowBlank	: false,
						    selectOnFocus: true,
						},
						renderer:function(val,con,record){
							var result = "";
							if(val.length == 4){
								result = val.substr(0,2)+':'+val.substr(2,4);
							}else if(val.length > 4){
								result = Ext.Date.format(new Date(val), "H:i");
							}
							return result;
						}
					},{	dataIndex:	'work_edtm', width	: 100, align	: 'center', text	: Language.get(''	, '종료시간'), sortable	: false, tdCls : 'editingcolumn',
						editor	: {
							xtype		: 'timefield',
							minValue	: '09:00',
							maxValue	: '18:00',
							increment	: 30,
							anchor		: '100%',
							format		: 'H:i',
							allowBlank	: false,
						    selectOnFocus: true,
						},
						renderer:function(val,con,record){
							var result = val;
							if(val.length == 4){
								result = val.substr(0,2)+':'+val.substr(2,4);
							}else if(val.length > 4){
								result = Ext.Date.format(new Date(val), "H:i");
							}
							return result;
						}
					},{	dataIndex:	'need_time'		, width:  80  , align : 'right'	, text: Language.get('need_time'		, '작업시간'		), xtype: 'numericcolumn', summaryType: 'sum' , format: '#.0',
					},{	dataIndex:	'work_strt_dttm', width:  100 , align : 'right'	, text: Language.get('work_strt_dttm'	, '작업 시작 시간'	) ,hidden : true,
					},{	dataIndex:	'work_endd_dttm', width:  100 , align : 'right'	, text: Language.get('work_endd_dttm'	, '작업 종료 시간'	) ,hidden : true,
					},{	dataIndex:	'totl_time'		, width:  100 , align : 'right'	, text: Language.get('totl_time'		, '총 작업시간'		) ,hidden : true,
					}
				]
			}
		return item;
	},

/* 작업시간 계산
	     DB에서 가져온 값의 포맷(HHmm)과
	 에디터에서 선택한 값의 포맷(EEE MMM dd HH:mm)을 계산하기 위해 모든 경우의 수를 계산하고 0이나 음수값이 나온다면 초기화
*/

	cellEditAfter  : function (editor, context) {
		var me = this,
		grid = this,
		rowIndex = context.rowIdx!=undefined?context.rowIdx:rowIndexNum;
		work_sttm		= 	grid.getStore().getAt(rowIndex).get('work_sttm');	//DB		시작시간 HHmm
			hour_sttm 		= 	parseInt(work_sttm.substring(0, 2));
			minu_sttm  		= 	parseInt(work_sttm.substring(2, 4));
		work_sttm_Hi 	= 	Ext.Date.format(new Date(work_sttm), "Hi");			//Editor	시작시간 EEE MMM dd HH:mm
			hour_sttm_Hi 	= 	parseInt(work_sttm_Hi.substring(0, 2));
			minu_sttm_Hi  	= 	parseInt(work_sttm_Hi.substring(2, 4));

		work_edtm		= 	grid.getStore().getAt(rowIndex).get('work_edtm');	//DB 		종료시간 HHmm
			hour_edtm  		= 	parseInt(work_edtm.substring(0, 2));
			minu_edtm  		= 	parseInt(work_edtm.substring(2, 4));
		work_edtm_Hi 	= 	Ext.Date.format(new Date(work_edtm), "Hi");			//Editor	종료시간 EEE MMM dd HH:mm
			hour_edtm_Hi  	= 	parseInt(work_edtm_Hi.substring(0, 2));
			minu_edtm_Hi  	= 	parseInt(work_edtm_Hi.substring(2, 4));

		var models		= grid.getStore().getRange();
			var need_time 	= 0;

		if(parseInt(work_sttm_Hi) == 0827 && (work_edtm_Hi) == 0827){  							//날짜만 수정할때
			var need_time	= ((hour_edtm*60+minu_edtm)-(hour_sttm*60+minu_sttm))/60
			if(need_time < 0){
				Ext.Msg.alert("알람", "시간을 다시 선택해주세요")
				models[rowIndex].set('work_sttm',"");
				models[rowIndex].set('work_edtm',"");
				models[rowIndex].set('need_time',"");
			}else {
				models[rowIndex].set('need_time',need_time);
			}
		}else if(parseInt(work_sttm_Hi) != 0827 && parseInt(work_edtm_Hi) == 0827){ 			//시작 시간만 수정할때
			var need_time	= ((hour_edtm*60+minu_edtm)-(hour_sttm_Hi*60+minu_sttm_Hi))/60
			if(need_time<0){
				Ext.Msg.alert("알람", "시간을 다시 입력해 주세요")
				models[rowIndex].set('work_sttm',"");
				models[rowIndex].set('work_edtm',"");
				models[rowIndex].set('need_time',"");
			}else if(need_time == 0){
				Ext.Msg.alert("알람", "시간을 다시 선택해주세요")
				models[rowIndex].set('work_sttm',"");
				models[rowIndex].set('work_edtm',"");
				models[rowIndex].set('need_time',"");
			}else {
				models[rowIndex].set('need_time',need_time);
			}
		}else if(parseInt(work_sttm_Hi) == 0827 && work_edtm_Hi != 0827){						//종료 시간만 수정할때
			var need_time	= ((hour_edtm_Hi*60+minu_edtm_Hi)-(hour_sttm*60+minu_sttm))/60
			if(need_time<0){
				Ext.Msg.alert("알람", "시간을 다시 입력해 주세요")
				models[rowIndex].set('work_sttm',"");
				models[rowIndex].set('work_edtm',"");
				models[rowIndex].set('need_time',"");
			}else if(need_time == 0){
				Ext.Msg.alert("알람", "시간을 다시 선택해주세요")
				models[rowIndex].set('work_sttm',"");
				models[rowIndex].set('work_edtm',"");
				models[rowIndex].set('need_time',"");
			}else {
				models[rowIndex].set('need_time',need_time);
			}
		}else if(parseInt(work_edtm_Hi) > parseInt(work_sttm_Hi)){
			var need_time	= ((hour_edtm_Hi*60+minu_edtm_Hi)-(hour_sttm_Hi*60+minu_sttm_Hi))/60 //모든 시간을 입력할때
				models[rowIndex].set('need_time',need_time);
		}else{
			if(work_edtm == ""){
				models[rowIndex].set('need_time','');
			}else{
				var need_time	= ((hour_edtm_Hi*60+minu_edtm_Hi)-(hour_sttm_Hi*60+minu_sttm_Hi))/60
				if(need_time <= 0){
					Ext.Msg.alert("알람", "시간을 다시 입력해 주세요")
					models[rowIndex].set('work_sttm',"");
					models[rowIndex].set('work_edtm',"");
					models[rowIndex].set('need_time',"");
				}else{
				models[rowIndex].set('need_time',"");
				}
			}
		}

		//Popup으로 보낼 값
			// 첫날 시작시간 , 마지막날 종료시간 , 모든 작업 시간 합
		let store = grid.getStore();	//최대행수 추출
		let count = store.getCount();
		let i = count - 1;

		let work_strt_dttm =grid.getStore().getAt(0).get('invc_date')+grid.getStore().getAt(0).get('work_sttm');
		let work_endd_dttm =grid.getStore().getAt(i).get('invc_date')+grid.getStore().getAt(i).get('work_edtm');
		let totl_time = grid.getStore().data.items.reduce(function(total, record) {return total + record.get('need_time')}, 0);
			models[0].set('totl_time',totl_time);
			models[0].set('work_strt_dttm',work_strt_dttm);
			models[0].set('work_endd_dttm',work_endd_dttm);
		},
	listeners: {
		edit : function(editor, context) {
			var me = this;
			me.cellEditAfter(editor, context);
		}
	},
	/**
	 * 새로운 Line을 추가한다.(자료 입력은 그리드에서 직접 입력)
	 */
	lineInsert : function (config) {
		var me			= this,
			popup		= me.ownerCt.ownerCt.ownerCt,
			store		= me.getStore(),
			record		= undefined,
			uper_seqn	= 0
		;
		store.each(function(record){
			uper_seqn 	 = record.get('line_seqn');
			invc_numb	 = popup.params.work_invc_numb;
		})

		if (uper_seqn == undefined) {
			uper_seqn = 0;
		}
		var seq = uper_seqn + 1;
		var dsp = uper_seqn + 1;
		record = Ext.create( store.model.modelName , {
			line_seqn			: seq,
			invc_numb			: popup.params.work_invc_numb,
			user_name			:_global.login_nm,
			drtr_idcd			:_global.login_pk
		});
		store.add(record);
	},
	/**
	 * 선택한 라인을 삭제한다.
	 */
	lineDelete : function (config) {
		var me = this;
		var records = me.getSelectionModel().getSelection();
		if(records[0]){
			Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn : function (button) {
					if (button==='yes') {
						me.getStore().remove (records);
					}
				}
			});
		}else{
			Ext.Msg.alert('알림','삭제가능한 내역이 없습니다..');
		}
	},
	search : function(){
		var	me		= this,
			popup	= me.ownerCt.ownerCt.ownerCt
		;
		me.select({
			callback:function(records, operation, success) {
				if (success) {
				} else { }
			}, scope:me
		}, Ext.merge({work_invc_numb : popup.params.work_invc_numb}) );
	}

});
