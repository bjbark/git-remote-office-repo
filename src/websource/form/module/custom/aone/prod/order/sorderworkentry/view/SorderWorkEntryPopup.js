Ext.define('module.custom.aone.prod.order.sorderworkentry.view.SorderWorkEntryPopup', { extend: 'Axt.popup.Search',

	alias	: 'widget.module-sorderworkentry-popup',

	title	: Language.get('workentry_popup','수리실적보고 등록'),
	closable: true,
	autoShow: true,
	width	: 1000,
	height	: 600,
	layout	: {
		type: 'border'
	},

	initComponent: function(config){
		var me = this;
			me.items = [me.createForm()];
			me.callParent(arguments);
	},
	listeners:{
		afterrender:function(){
			var me  = this;
			me.selectAction();
		}
	},
	/**
	 * 화면폼
	 */
	createForm: function() {
		var me = this,
		form = {
			xtype		: 'form-layout',
			region		: 'center',
			border		: false,
			dockedItems : [ me.searchForm()],
			items		: [ me.workForm(),me.createTabs()]
			};
		return form;
	},

	searchForm : function () {
		var me	= this,
			item = {
			xtype		: 'form-panel' ,
			dock		: 'top',
			border		: 0,
			itemId		: 'plan',
			bodyStyle	: { padding: '5px' },
			items		: [
			{	xtype		: 'form-panel',
				border		: 0,
				items		: [
						{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '5 0 0 5',
							items : [
								{	fieldLabel	: Language.get('', 'AoneCode' ),
									name		: 'invc_numb',
									xtype		: 'textfield',
									width		: 200,
									readOnly	: true,
									fieldCls	: 'requiredindex',
								},{	fieldLabel	: Language.get('', '규격' ),
									name		: 'item_name',
									xtype		: 'textfield',
									width		: 250,
									readOnly	: true,
									fieldCls	: 'requiredindex',
								},{	fieldLabel	: Language.get('', 'Serial No.' ),
									name		: 'sral_numb',
									xtype		: 'textfield',
									width		: 250,
									readOnly	: true,
									fieldCls	: 'requiredindex',
								}

							]
						},{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '5 0 0 5',
							items : [
								{	fieldLabel	: Language.get('', '거래처명' ),
									name		: 'cstm_name',
									xtype		: 'textfield',
									width		: 200,
									readOnly	: true,
									fieldCls	: 'requiredindex',
								},{	fieldLabel	: '작업계획',
									name		: 'plan_date',
									xtype		: 'textfield',
									labelWidth	: 70,
									width		: 250,
									readOnly	: true,
									fieldCls	: 'requiredindex',
								},{	fieldLabel	: Language.get('', '수리지시일자' ),
									name		: 'pdod_date',
									xtype		: 'textfield',
									width		: 250,
									readOnly	: true,
									fieldCls	: 'requiredindex',
								},{	fieldLabel	: Language.get('','차수'),
									name		: 'amnd_degr',
									xtype		: 'textfield',
									hidden		: true
								},{	fieldLabel	: Language.get('acpt_dvcd','입고유형'),
									name		: 'acpt_dvcd',
									xtype		: 'textfield',
									hidden		: true
								},
							]
						}
					]
				}
			]
		};
		return item;
	},

	workForm: function(){
		var me = this,
			form = {
			xtype		: 'form-panel',
			itemId		: 'work',
			region		: 'north',
			bodyStyle	: { padding: '0', background: 'transparent' },
			layout: { type: 'vbox' },
			items :	[
				{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '10 0 0 20',
					items	: [
						{	fieldLabel	: Language.get('', 'work_invc_numb' ),
							name		: 'work_invc_numb',
							xtype		: 'textfield',
							width		: 120,
							value		: me.params.work_invc_numb,
							hidden		: true,
						},{	xtype		: 'textfield',
							name		: 'imge_chek1',
							value		: 'n',
							hidden		: true
						},{	xtype		: 'textfield',
							name		: 'imge_chek2',
							value		: 'n',
							hidden		: true
						},{	xtype		: 'textfield',
							name		: 'modify',
							value		: 'n',
							hidden		: true
						},{	fieldLabel	: Language.get('', '보고일자' ),
							name		: 'invc_date',
							xtype		: 'datefield',
							width		: 200,
							editable	: false,
							value		: new Date(),
							emptyText	: Const.invalid.emptyValue,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
						},{ xtype		: 'textfield',  name : 'wker_idcd', hidden : true
						},{	fieldLabel	: Language.get('repa_stat_dvcd','수리상태'),
							xtype		: 'lookupfield',
							name		: 'repa_stat_dvcd',
							width		: 155,
							editable	: false,
							margin		: '0 0 0 11',
							lookupValue	: resource.lookup('repa_stat_dvcd'),
							listeners	: {
								render: function(){
									var acpt_dvcd = me.params.acpt_dvcd.substring(0,2);
									var arr = [];
									if (acpt_dvcd == 10 || acpt_dvcd == 11 ) {
										Ext.each(resource.lookup('repa_stat_dvcd'),function(record){
											if(record[0]=="2000"||record[0]=="2100"||record[0]=="2200"||record[0]=="2300"){
												arr.push(record);
											}
										})
										this.setLookupValue(arr);
									} else if (acpt_dvcd == 20) {
										Ext.each(resource.lookup('repa_stat_dvcd'),function(record){
											if(record[0]=="1000"||record[0]=="3000"||record[0]=="3100"){
												arr.push(record);
											}
										})
										this.setLookupValue(arr);
									} else {
										this.setLookupValue(resource.lookup('repa_stat_dvcd'));
									}
								},
							}
						},{ fieldLabel	: Language.get('prog_rate','진척율'),
							xtype		: 'numericfield',
							name		: 'prog_rate',
							width		: 120,
							margin		: '0 0 0 15',
							value		: me.params.prog_rate,
							format		: '#,##0',
							readOnly	: true
						}
					]
				},
				{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 10 20',
					items	: [
						{	fieldLabel	: Language.get('user_memo','작업내용'),
							name		: 'user_memo',
							xtype		: 'textarea',
							value		: me.params.user_memo,
							height		: 100,
							labelWidth	: 70,
							width		: 700,
						},{	fieldLabel	: Language.get('', '진행상태' ),
							name		: 'acpt_stat_dvcd',
							xtype		: 'textfield',
							width		: 120,
							readOnly	: true,
							value		: '2000',
							hidden		: true
						},{	fieldLabel	: Language.get('', 'acpt_numb' ),
							name		: 'acpt_numb',
							xtype		: 'textfield',
							width		: 120,
							value		: me.params.acpt_numb,
							hidden		: true,
						},{	fieldLabel	: Language.get('', 'acpt_degr' ),
							name		: 'acpt_degr',
							xtype		: 'textfield',
							width		: 120,
							value		: me.params.acpt_degr,
							hidden		: true,
						},{	fieldLabel	: Language.get('', 'invc_numb' ),
							name		: 'invc_numb',
							xtype		: 'textfield',
							width		: 120,
							value		: me.params.invc_numb,
							hidden		: true,
						},{	fieldLabel	: Language.get('', '보고자' ),
							name		: 'wker_name',
							xtype		: 'textfield',
							editable	: true,
							width		: 200,
							value		: _global.login_nm,
							hidden		: true,
						},{	fieldLabel	: Language.get('', '총 작업시간' ),
							name		: 'need_time',
							xtype		: 'textfield',
							editable	: true,
							width		: 200,
							value		: me.params.need_time,
							hidden		: true,
						},{	fieldLabel	: Language.get('', '작업 시작 시간' ),
							name		: 'work_strt_dttm',
							xtype		: 'textfield',
							editable	: true,
							width		: 200,
							value		: me.params.work_strt_dttm,
							hidden		: true,
						},{	fieldLabel	: Language.get('', '작업 종료시간' ),
							name		: 'work_endd_dttm',
							xtype		: 'textfield',
							editable	: true,
							width		: 200,
							value		: me.params.work_endd_dttm,
							hidden		: true,
						},
					]
				}
			]
		};
		return form;
	},

	createTabs : function () {
		var me = this;
		grid = {
				xtype	: 'tabpanel',
				region	: 'center',
				itemId	: 'popupTab',
				margin	: 0,
				dockedItems : [ me.createTab4()],
				plain	: true,
				flex  	: 1,
				items	: [
					{title 	: '작업내역'	,
					 xtype	: 'module-sorderworkentry-popup-mans' ,
					 itemId		: 'grid',
					 name		: 'grid',
				},me.createTab2(),me.createTab3()
				]
			}
		;
		return grid;
	},

	createTab2 : function() {
		var me = this,
			item = {
				title	: '자재사용내역',
				xtype: 'module-sorderworkentry-popup-mtrl',
				itemId		: 'grid2',
				name		: 'grid2',
				}
			;
		return item;
	},

	createTab3 : function() {
		var me = this,
			item =
			{	xtype	: 'panel',
				layout	: 'border',
				title	: '이미지',
				items	: [
					{	xtype : 'module-sorderworkentry-file',
						flex	: 1,
						region	: 'center',
						itemId		: 'grid3',
						name		: 'grid3',
						spilt	:true,
						style	: Const.borderLine.right,
					},{	xtype : 'module-sorderworkentry-image',
						flex	: 1,
						region	: 'east',
						style	: Const.borderLine.left
					}
				]

			}
		;
		return item;
	},

	createTab4 : function () {
		var me = this,
			item = {
				xtype : 'toolbar',
				dock  : 'bottom' ,
				items : [
				'->', '-',
				{ xtype: 'button' , text : Const.UPDATE.text, iconCls: Const.UPDATE.icon , scope: me, handler: me.updateAction, cls: 'button-style'},
				{ xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , action: 'closeAction', cls: 'button-style' }
				]
			}
		;
		return item;
	},

	/**
	 * 저장 버튼 이벤트
	 */
	updateAction: function( records ){
		var me = this,
			baseform	= me.down('[itemId=work]'),
			baseform1	= Ext.ComponentQuery.query('module-sorderworkentry-popup-mans')[0],
			store		= me.down('#grid').getStore(),
			store2     	= me.down('#grid2').getStore()
		;

		if(baseform1.store.data.length!=0){

			need_time	   	= baseform1.getStore().getAt(0).get('totl_time');
			work_strt_dttm	= baseform1.getStore().getAt(0).get('work_strt_dttm');
			work_endd_dttm	= baseform1.getStore().getAt(0).get('work_endd_dttm');

			//popup-mans에서 값을 가져와 model에 담기
			if(work_strt_dttm == undefined){  // popup-mans에서 cellEditAfter를 거치지 않으면 undefined로 선언되므로 popup-mans의 셀값을 직접 가져와야한다.
				let count = me.down('grid').getStore().getCount();	//최대행수 i 추출
				let i	  = count - 1;

				work_strt_dttm	=baseform1.getStore().getAt(0).get('invc_date')+ baseform1.getStore().getAt(0).get('work_sttm');
				work_endd_dttm	=baseform1.getStore().getAt(i).get('invc_date')+ baseform1.getStore().getAt(0).get('work_edtm');
				let need_time = me.down('grid').getStore().data.items.reduce(function(total, record) {
					return total + record.get('need_time')}, 0);

				me.down('[name=work_strt_dttm]').setValue(work_strt_dttm);
				me.down('[name=work_endd_dttm]').setValue(work_endd_dttm);
				me.down('[name=need_time]').setValue(need_time);
			}else{	//popup-mans에서 cellEditAfter를 거치게되면 값을 바로 불러올수 있다.
				me.down('[name=work_strt_dttm]').setValue(work_strt_dttm);
				me.down('[name=work_endd_dttm]').setValue(work_endd_dttm);
				me.down('[name=need_time]').setValue(need_time);
			}
		}
		err_msg = "";

		// 수리상태 미선택시 실적보고 불가
		if(baseform.getValues().repa_stat_dvcd == '' || baseform.getValues().repa_stat_dvcd == null) {
			Ext.Msg.alert("알림", "수리상태가 선택되지 않았습니다." );
			return;
		};

		// 수리상태가 수리완료 및 제작완료일 때  필수항목 체크 적용
		if(baseform.getValues().repa_stat_dvcd == '2000' || baseform.getValues().repa_stat_dvcd == '2100' ||baseform.getValues().repa_stat_dvcd == '2200' || baseform.getValues().repa_stat_dvcd == '3000' ){

			if(baseform.getValues().repa_stat_dvcd == '2000') {
				if(baseform1.store.data.length == 0) {
					Ext.Msg.alert("알림", "작업시간이 입력되지 않았습니다." );
					return;
				}
			};

			if(baseform.getValues().invc_date == '' || baseform.getValues().wker_name == ''  ){
				Ext.Msg.alert("알림", "실적보고 내용이 작성되지 않은 부분이 있습니다." );
				return;
			}

//			if(item_imge == '' || item_imge2 == '' ){
//				Ext.Msg.alert("알림", "수리 이미지가 입력되지 않았습니다." );
//				return;
//			}

			//워크북 최초에 생성시 수리자재 여부 확인
			if(store2 == ''){
				Ext.Msg.alert("알림", "등록할 수리 자재를 선택해주세요" );
				return;
			}

			//수리자재 정보 확인
			store2.each(function(record){
				if(record.get('item_idcd') == ''){
					err_msg = "자재 품목이 지정되지 않았습니다.";
					return false;
				}

				if(record.get('qntt') == ''){
					err_msg = "자재 소요량이 지정되지 않았습니다.";
					return false;
				}

				if(record.get('pric') == ''){
					err_msg = "자재 단가가 지정되지 않았습니다.";
					return false;
				}

			})

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}

			//수리상태 체크시 진행상태 변경
			if(baseform.getValues().repa_stat_dvcd != ''){
				var acpt_stat_dvcd = "3000";
				baseform.down('[name=acpt_stat_dvcd]').setValue(acpt_stat_dvcd);

			}

		}

		var allFieldsFilled = true;
        var emptyFields = [];

        // 그리드의 각 행을 순회하며 필수 항목 체크
        store.each(function(record) {
            if (!record.get('invc_date') || !record.get('work_sttm') || !record.get('work_edtm')) {
                allFieldsFilled = false;
                emptyFields.push(record.get('line_seqn')); // 비어있는 필드의 행 번호 저장
            }
        });

        // 모든 필드가 입력되지 않은 경우 오류 메시지 표시
        if (!allFieldsFilled) {
            var message = "다음 항목을 모두 입력해야 합니다:\n - 시작일자, 시작시간, 종료시간";
            Ext.Msg.alert("알림", message);
            return;
        }

		store.each(function(record){
			if(record.get('invc_date').length != 8){
				var invc_date = record.get('invc_date');
					invc_date = Ext.Date.format(new Date(invc_date), "Ymd");
				record.set('invc_date', invc_date);
			}

			if(record.get('work_sttm').length != 4){
				var work_sttm = record.get('work_sttm');
					work_sttm = Ext.Date.format(new Date(work_sttm), "Hi");
				record.set('work_sttm', work_sttm);
			}

			if(record.get('work_edtm').length != 4){
				var work_edtm = record.get('work_edtm');
				work_edtm = Ext.Date.format(new Date(work_edtm), "Hi");
			record.set('work_edtm', work_edtm);
			}
		})



		//이미지 여부
//		if(item_imge){
//			if(chek1 == 'n' || chek1 == undefined){
//				chk1 = 3;
//			}
//			else{
//				chk1 = 1;
//			}
//		}
//		if(item_imge2){
//			if(chek2 == 'n' || chek2 == undefined){
//				chk2=3;
//			}else{
//				chk2 = 1;
//			}
//		}

		//에디터 저장
		Ext.Ajax.request({
			url		: _global.location.http() + '/custom/aone/prod/order/sorderworkentry/set/popupreport.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify(
					baseform.getValues()
				)
			},
			async   : false,
			method  : 'POST',
			success : function(response, request) {
				var result = Ext.decode(response.responseText);
				var form   = me.down('[name=imge_info]');

				if	(!result.success ){
					Ext.Msg.error(result.message );
					return;
				} else {
					//작업내용 내역 저장
					me.down('grid').getStore().sync({
						failure : function(operation){ },
						callback: function(operation){
						}
					});
					//자재사용 내역 저장
					store2.sync({
						failure : function(operation){ },
						callback: function(operation){
						}
					});
					// 저장 완료 메세지
					Ext.Msg.alert("알림", "저장이 완료되었습니다.");
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});
	},
	selectAction:function(){
		var me			= this,
			grid		= me.down('#grid'),
			grid2     	= me.down('#grid2'),
			grid3     	= me.down('#grid3'),
			params		= me.popup.params,
			esti_list	= 1
		;
		if(params.work_invc_numb== 0){
			esti_list	= 2;
		}
		grid.select({
			callback:function(records, operation, success) {
				if (success) {
				} else { }
			}, scope:me
		}, Ext.merge({ work_invc_numb : params.work_invc_numb
					 , esti_list : esti_list
					 , invc_numb : params.invc_numb
					 , amnd_degr :params.amnd_degr
			})
		);
		grid2.select({
			callback:function(records, operation, success) {
				if (success) {
				} else { }
			}, scope:me
		}, Ext.merge({ work_invc_numb : params.work_invc_numb
					 , esti_list : esti_list
					 , invc_numb : params.invc_numb
					 , amnd_degr : params.amnd_degr
			})
		);
		grid3.select({
			callback:function(records, operation, success) {
				if (success) {
				} else { }
			}, scope:me
		}, Ext.merge({ invc_numb : params.acpt_numb
					 , file_dvcd_1fst : '3200'
					 , orgn_dvcd : 'acpt_mast'
			})
		);
	},



});
