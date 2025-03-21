Ext.define('module.custom.sjflv.prod.order.workbook.view.WorkEntryEndPopup', { extend: 'Axt.popup.Upload',
	alias		: 'widget.module-sjflv-workentry-popup-end'			,

	title: '작업종료',

	closable: true,
	autoShow: true,
	width	: 630,
	height	: 530,
	layout: {
		type: 'border'
	},

	waitMsg : Const.INSERT.mask,

	defaultFocus : 'initfocused',

	/**
	* component 초기화
	*/
	initComponent: function(config){
		var me = this;
		me.items = [me.createForm()];
		me.callParent(arguments);

		me.selectAction();
	},
	/**
	 * 화면폼
	 */
	createForm: function(){
		var me = this,
			form = {
				xtype		: 'form-panel' ,
				region		: 'center',
				border		: false,
				dockedItems	: [
					{	xtype : 'toolbar',
						dock  : 'bottom',
						items : [
							'->' ,
//							{	text : '<span class="write-button">생산취소</span>'		, action : 'cancelAction'  , cls: 'button1-style'},'-',
							{	text : '<span class="write-button">생산완료</span>'		, scope: me, handler: me.closeAction , cls: 'button1-style'},'-',
							{ xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close,cls: 'button-style' }
						]
					}
				],
				items		: [ me.searchForm(),me.createGrid() ]
			};
		return form;
	},

	searchForm: function(){
		var me	= this,
		form = {
			xtype	: 'form-panel',
			border	:  false,
			margin	: '0 0 0 0',
			layout	: { type: 'vbox', align: 'stretch' } ,
			items	: [
				{	xtype	: 'panel',
					layout	: 'vbox',
					border	: 0,
					items	: [
						{	xtype	: 'panel',
							layout	: 'hbox',
							margin	: '5 0 5 0',
							border	: 0,
							items	: [
								{	fieldLabel	: '지시번호',
									name		: 'invc_numb',
									xtype		: 'textfield',
									fieldCls	: 'readOnlyfield',
									readOnly	: true,
									width		: 300,
									labelWidth	: 65,
									value		: me.popup.params.invc_numb
								},{	fieldLabel	: '거래처명',
									name		: 'cstm_name',
									xtype		: 'textfield',
									fieldCls	: 'readOnlyfield',
									readOnly	: true,
									width		: 300,
									labelWidth	: 65,
									value		: me.popup.params.cstm_name
								}
							]
						},{	xtype	: 'panel',
							layout	: 'hbox',
							border	: 0,
							margin	: '0 0 5 0',
							items	: [
								{	fieldLabel	: '제품코드',
									name		: 'item_code',
									xtype		: 'textfield',
									fieldCls	: 'readOnlyfield',
									readOnly	: true,
									width		: 300,
									labelWidth	: 65,
									value		: me.popup.params.item_code
								},{	fieldLabel	: '제품명',
									name		: 'item_name',
									xtype		: 'textfield',
									fieldCls	: 'readOnlyfield',
									readOnly	: true,
									width		: 300,
									labelWidth	: 65,
									value		: me.popup.params.item_name
								},
							]
						},{	xtype	: 'panel',
							layout	: 'hbox',
							border	: 0,
							margin	: '0 0 5 0',
							items	: [
								{	fieldLabel	: Language.get('inqy_term','계획일자'),
									xtype		: 'textfield',
									name		: 'plan_strt_dttm',
									width		: 300,
									labelWidth	: 65,
									format		: 'Y-m-d',
									submitFormat: 'Ymd',
									fieldCls	: 'readOnlyfield',
									readOnly	: true,
									value		: me.popup.params.plan_strt_dttm.substring(0, 10),
								},{	text		: '~',
									xtype		: 'label',
									width		: 35,
									style		: 'text-align:center'
								},{	xtype		: 'textfield',
									name		: 'plan_endd_dttm',
									width		: 265,
									format		: 'Y-m-d',
									submitFormat: 'Ymd',
									fieldCls	: 'readOnlyfield',
									readOnly	: true,
									value		: me.popup.params.plan_endd_dttm.substring(0, 10),
								},
							]
						},{	xtype	: 'panel',
							layout	: 'hbox',
							border	: 0,
							margin	: '0 0 5 0',
							items	: [
								{	fieldLabel	: '지시수량',
									name		: 'indn_qntt',
									xtype		: 'numericfield',
									fieldCls	: 'readOnlyfield',
									readOnly	: true,
									width		: 200,
									labelWidth	: 65,
									value		: me.popup.params.indn_qntt
								},{	fieldLabel	: '포장단위',
									name		: 'pckg_unit',
									xtype		: 'textfield',
									fieldCls	: 'readOnlyfield',
									readOnly	: true,
									width		: 200,
									labelWidth	: 65,
									value		: me.popup.params.pckg_unit
								},{	fieldLabel	: '라벨수',
									name		: 'labl_qntt',
									xtype		: 'textfield',
									fieldCls	: 'readOnlyfield',
									readOnly	: true,
									width		: 200,
									labelWidth	: 65,
									value		: me.popup.params.labl_qntt
								},
							]
						},{	xtype	: 'panel',
							layout	: 'hbox',
							border	: 0,
							margin	: '0 0 5 0',
							items	: [
								{	fieldLabel	: Language.get('item','생산설비'),
									xtype		: 'textfield',
									name		: 'cvic_name',
									width		: 300,
									labelWidth	: 65,
									fieldCls	: 'readOnlyfield',
									readOnly	: true,
									value		: me.popup.params.cvic_name
								},{	name : 'cvic_idcd', xtype : 'textfield' , hidden : true
								},{	fieldLabel	: Language.get('wker_name','작업자'),
									xtype		: 'textfield',
									name		: 'wker_name',
									width		: 300,
									labelWidth	: 65,
									fieldCls	: 'readOnlyfield',
									readOnly	: true,
									value		: me.popup.params.wker_name
								},{	name : 'wker_idcd', xtype : 'textfield' , hidden : true
								},
							]
						},{	xtype	: 'panel',
							layout	: 'hbox',
							border	: 0,
							margin	: '0 0 5 0',
							items	: [
								{	fieldLabel	: Language.get('strt_dttm','시작일시'),
									xtype		: 'datefield',
									name		: 'strt_dttm',
									width		: 300,
									labelWidth	: 65,
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD,
									readOnly	: true,
									value		: me.popup.params.strt_dttm
								},
							]
						},{	xtype	: 'panel',
							layout	: 'hbox',
							border	: 0,
							margin	: '0 0 5 0',
							items	: [
								{	fieldLabel	: Language.get('endd_dttm','종료일시'),
									xtype		: 'datetimefield',
									name		: 'endd_dttm',
									width		: 300,
									labelWidth	: 65,
									hourText	: 'H',
									minuteText	: 'M',
									todayText	: '오늘',
									format		: 'Y-m-d H:i',
									submitFormat: 'YmdHi',
									allowBlank	: false,
									fieldCls	: 'requiredindex',
									emptyText	: Const.invalid.emptyValue,
									readOnly	: true,
									value		: new Date(),
								},
							]
						},{	xtype	: 'panel',
							layout	: 'hbox',
							border	: 0,
							margin	: '0 0 5 0',
							items	: [
								{	fieldLabel	: Language.get('work_name','작업자'),
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									clearable	: true,
									name		: 'work_name_1fst',
									width		: 300,
									labelWidth	: 65,
									pair		: 'work_drtr_1fst',
									popup: {
										select : 'SINGLE',
										widget : 'lookup-user-popup',
										params : { stor_grp : _global.stor_grp , line_stat : '0', select : 'MULTI' },
										result : function(records, nameField, pairField) {
											if(records.length == 1 ){
												nameField.setValue(records[0].get('user_name'));
												pairField.setValue(records[0].get('user_idcd'));
												me.down('[name=work_drtr_2snd]').reset(); // 초기화
												me.down('[name=work_drtr_3trd]').reset(); // 초기화
											}else if(records.length == 2){
												nameField.setValue(records[0].get('user_name')+','+records[1].get('user_name'))
												me.down('[name=work_drtr_1fst]').setValue(records[0].get('user_idcd'));
												me.down('[name=work_drtr_2snd]').setValue(records[1].get('user_idcd'));
												me.down('[name=work_drtr_3trd]').reset(); // 초기화
											}else if(records.length == 3){
												nameField.setValue(records[0].get('user_name')+','+records[1].get('user_name')+','+records[2].get('user_name'))
												me.down('[name=work_drtr_1fst]').setValue(records[0].get('user_idcd'));
												me.down('[name=work_drtr_2snd]').setValue(records[1].get('user_idcd'));
												me.down('[name=work_drtr_3trd]').setValue(records[2].get('user_idcd'));
											}else{
												Ext.Msg.alert("알림", "최대 3명까지 선택가능합니다.");
												return;
											}
										}
									},
									listeners	: {
										change	: function() {
											var val = this.getValue();
											if(val=='' || val == null){
												me.down('[name=work_drtr_1fst]').reset();
												me.down('[name=work_drtr_2snd]').reset(); // 초기화
												me.down('[name=work_drtr_3trd]').reset(); // 초기화
											}
										}
									}
								},{	name : 'work_drtr_1fst', xtype : 'textfield' , hidden : true
								},{	name : 'work_drtr_2snd', xtype : 'textfield' , hidden : true
								},{	name : 'work_drtr_3trd', xtype : 'textfield' , hidden : true
								},{	fieldLabel	: Language.get('pckg_name','포장작업자'),
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									clearable	: true,
									name		: 'pckg_name_1fst',
									width		: 300,
									labelWidth	: 65,
									pair		: 'pckg_drtr_1fst',
									popup: {
										select : 'SINGLE',
										widget : 'lookup-user-popup',
										params : { stor_grp : _global.stor_grp , line_stat : '0', select : 'MULTI' },
										result : function(records, nameField, pairField) {
											if(records.length == 1 ){
												nameField.setValue(records[0].get('user_name'));
												pairField.setValue(records[0].get('user_idcd'));
												me.down('[name=pckg_drtr_2snd]').reset(); // 초기화
												me.down('[name=pckg_drtr_3trd]').reset(); // 초기화
											}else if(records.length == 2){
												nameField.setValue(records[0].get('user_name')+','+records[1].get('user_name'))
												me.down('[name=pckg_drtr_1fst]').setValue(records[0].get('user_idcd'));
												me.down('[name=pckg_drtr_2snd]').setValue(records[1].get('user_idcd'));
												me.down('[name=pckg_drtr_3trd]').reset(); // 초기화
											}else if(records.length == 3){
												nameField.setValue(records[0].get('user_name')+','+records[1].get('user_name')+','+records[2].get('user_name'))
												me.down('[name=pckg_drtr_1fst]').setValue(records[0].get('user_idcd'));
												me.down('[name=pckg_drtr_2snd]').setValue(records[1].get('user_idcd'));
												me.down('[name=pckg_drtr_3trd]').setValue(records[2].get('user_idcd'));
											}else{
												Ext.Msg.alert("알림", "최대 3명까지 선택가능합니다.");
												return;
											}
										}
									},
									listeners	: {
										change	: function() {
											var val = this.getValue();
											if(val=='' || val == null){
												me.down('[name=pckg_drtr_1fst]').reset();
												me.down('[name=pckg_drtr_2snd]').reset(); // 초기화
												me.down('[name=pckg_drtr_3trd]').reset(); // 초기화
											}
										}
									}
								},{	name : 'pckg_drtr_1fst', xtype : 'textfield' , hidden : true
								},{	name : 'pckg_drtr_2snd', xtype : 'textfield' , hidden : true
								},{	name : 'pckg_drtr_3trd', xtype : 'textfield' , hidden : true
								},
							]
						},{	xtype	: 'panel',
							layout	: 'hbox',
							border	: 0,
							margin	: '0 0 5 0',
							items	: [
								{	fieldLabel	: '생산수량',
									name		: 'prod_qntt',
									xtype		: 'numericfield',
									width		: 300,
									labelWidth	: 65,
									listeners	: {
										change	: function(field, newValue, oldValue) {
											var val = this.getValue();
											var weight	= me.down('[name=pckg_wght]').getValue();

											if(val > 0){
												var diff = val / weight;
												me.down('[name=pckg_qntt]').setValue(diff);
											}

										}
									}
								},{	fieldLabel	: '불량수량',
									name		: 'poor_qntt',
									xtype		: 'numericfield',
									width		: 300,
									labelWidth	: 65,
									value		: 0,
								}
							]
						},{	xtype	: 'panel',
							layout	: 'hbox',
							border	: 0,
							margin	: '0 0 5 0',
							items	: [
								{	fieldLabel	: '포장단위',
									name		: 'pckg_unit1',
									xtype		: 'textfield',
									fieldCls	: 'readOnlyfield',
									width		: 300,
									labelWidth	: 65,
									fieldCls	: 'readOnlyfield',
									readOnly	: true,
								},{	fieldLabel	: '포장수량',
									name		: 'pckg_qntt',
									xtype		: 'numericfield',
									fieldCls	: 'readOnlyfield',
									width		: 300,
									labelWidth	: 65,
									fieldCls	: 'readOnlyfield',
									readOnly	: true,
								},{	fieldLabel	: '포장무게',
									name		: 'pckg_wght',
									xtype		: 'textfield',
									fieldCls	: 'readOnlyfield',
									width		: 300,
									labelWidth	: 65,
									fieldCls	: 'readOnlyfield',
									hidden		: false,
								},
							]
						},
					]
				},
			]
		};
		return form;
	},

	/**
	 * 리스트
	 * @return {Ext.grid.Panel} 리스트 그리드
	 */
	createGrid: function(){
		var me = this,
//			master = Ext.ComponentQuery.query('module-komec-inspentry3-lister')[0],
//			selectMaster = master.getSelectionModel().getSelection()[0],
			grid = {
				xtype		: 'grid-panel',
				region		: 'center',
				viewConfig	: {
					loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask  } )
				},
				selModel	: { selType: 'cellmodel'},
//				features	: [{ ftype : 'grid-summary' }],
				plugins 	: { ptype  : 'cellediting-directinput', clicksToEdit: 1 },

				store: Ext.create('Ext.data.Store', {
					fields: ['line_seqn','mngt_sbsc_dvsn_name', 'mngt_sbsc_name', 'mngt_sbsc_spec', 'msmt_valu', 'cnfm_yorn'],
					data: [
						{ line_seqn : '1' , mngt_sbsc_dvsn_name: '메쉬망 파손 여부'	, mngt_sbsc_name: '위생상태 및 파손여부'		, mngt_sbsc_spec: '양호'		, msmt_valu: '' , cnfm_yorn:'' },
						{ line_seqn : '2' , mngt_sbsc_dvsn_name: '용해온도'		, mngt_sbsc_name: '온도'				, mngt_sbsc_spec: '60도 이하'	, msmt_valu: '' , cnfm_yorn:'' },
						{ line_seqn : '3' , mngt_sbsc_dvsn_name: '교반확인'		, mngt_sbsc_name: '교반시간'			, mngt_sbsc_spec: '5분이상'	, msmt_valu: '' , cnfm_yorn:'' },
						{ line_seqn : '4' , mngt_sbsc_dvsn_name: '여과여부'		, mngt_sbsc_name: '24mesh'			, mngt_sbsc_spec: 'MESH'	, msmt_valu: '' , cnfm_yorn:'' },
						{ line_seqn : '5' , mngt_sbsc_dvsn_name: '내포장여부'	, mngt_sbsc_name: '용기통상태(파손,이물,오염)', mngt_sbsc_spec: '양호'		, msmt_valu: '' , cnfm_yorn:'' },
						{ line_seqn : '6' , mngt_sbsc_dvsn_name: ''			, mngt_sbsc_name: '포장 Kg'			, mngt_sbsc_spec: ''		, msmt_valu: '' , cnfm_yorn:'' },
						{ line_seqn : '7' , mngt_sbsc_dvsn_name: '라벨 부착 여부'	, mngt_sbsc_name: '인쇄상태'			, mngt_sbsc_spec: '양호'		, msmt_valu: '' , cnfm_yorn:'' }
					]
				}),
				columns: [
					{	text : Language.get('mngt_sbsc_dvsn_name'	, '작업공정'	)	, dataIndex: 'mngt_sbsc_dvsn_name'	,  width : 200, align:'center'
					},{	text : Language.get('mngt_sbsc_name'		, '관리항목'	)	, dataIndex: 'mngt_sbsc_name'		,  width : 200, align:'center'
					},{	text : Language.get('mngt_sbsc_spec'		, '규격'		)	, dataIndex: 'mngt_sbsc_spec'		,  width : 150, align:'center'
					},{	text : Language.get('cnfm_yorn'				, '점검사항'	)	, dataIndex: 'cnfm_yorn'			,  width : 60 , align:'center', xtype: 'checkcolumn'
						, tdCls : 'editingcolumn',
						editor	: {
							xtype		:'checkbox',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{

							}
						}
					},
				]
			}
		;
		return grid;
	},

	selectAction :  function(){
		var me = this,
			grid = me.down('grid-panel'), // 그리드를 참조
			store = grid.getStore(),
			resId = _global.hq_id.toUpperCase()
		;

		Ext.Ajax.request({
			url			: _global.api_host_info + '/' + _global.app_site + '/custom/sjflv/prod/prodplan/get/item1.do',
			method		: "POST",
			params		: {
			 	token	: _global.token_id,
				param	: Ext.encode({
					stor_idc	: resId,
					item_idcd	: me.popup.params.item_idcd
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				if	(!result.success ){
					return;
				} else {
					for(var i = 0 ; i < result.records.length ; i++){
						if(result.records[i].acct_bacd == '1002'){
							me.down('[name=pckg_wght]').setValue(100 / result.records[i].mixx_rate);
							me.down('[name=pckg_unit1]').setValue(result.records[i].unit_idcd);
						}else{
							me.down('[name=pckg_wght]').setValue(1);
						}
					}

					// 포장 무게 설정 후 계산 적용
					var weight = me.down('[name=pckg_wght]').getValue();
					store.each(function(record) {
						if (record.get('mngt_sbsc_name') === '포장 Kg' && weight > 0) {
							var calculatedValue = weight + 'Kg';
							record.set('mngt_sbsc_spec', calculatedValue);  // 소수 둘째 자리까지 표시
						}
					});
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});

	},

	/**
	 * 확인 버튼 이벤트
	 */
	closeAction: function(){
		var me = this,
			baseform= me.down('form'),
			record	= baseform.getRecord(),
			values	= baseform.getValues(),
			grid = me.down('grid-panel'), // 그리드를 참조
			store = grid.getStore(),
			lister1= Ext.ComponentQuery.query('module-sjflv-workbook-lister')[0],
			select = lister1.getSelectionModel().getSelection()
		;
		var records = [];

		var lott_numb;

		//work_book
		Ext.Ajax.request({
			url : _global.location.http() + '/custom/sjflv/prod/workbook/get/lott.do',
			object		: resource.keygen,
			params		: {
				token	: _global.token_id ,
				param	: JSON.stringify({
					stor_id		: _global.stor_id,
					invc_date	: Ext.Date.format(new Date(),'Ymd'),
				})
			},
			async	: false,
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				var max_lott_numb = result.records.seq;

				if (!max_lott_numb || max_lott_numb.trim() === '') {
					lott_numb = Ext.Date.format(new Date(), 'Ymd') + '0001';
				} else {
					var prefix = max_lott_numb.substring(0, 8); // 앞 8자리 추출
					var suffix = parseInt(max_lott_numb.substring(8), 10); // 마지막 3자리 숫자로 변환
					var next_suffix = String(suffix + 1).padStart(3, '0'); // 1 증가 후 3자리로 패딩
					lott_numb = prefix + next_suffix;
				}
			}
		});

		store.each(function(record) {
			var recordData = record.getData(); // 각 record 데이터를 가져옴
			records.push({
				stor_id			: _global.stor_id,
				hqof_idcd		: _global.hqof_idcd,
				_set			: 'end',
				wkod_numb		: values.invc_numb,

				invc_numb			: me.popup.params.work_invc,
				line_seqn			: recordData.line_seqn,
				mngt_sbsc_dvsn_name : recordData.mngt_sbsc_dvsn_name,
				mngt_sbsc_spec		: recordData.mngt_sbsc_spec,
				mngt_sbsc_name		: recordData.mngt_sbsc_name,
				cnfm_yorn			: recordData.cnfm_yorn == true ? '1':'0',
			});
		});

		Ext.Ajax.request({
			url		: _global.location.http() + '/custom/sjflv/prod/workbook/set/setMaster.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					stor_id			: _global.stor_id,
					hqof_idcd		: _global.hqof_idcd,
					_set			: 'end',
					wkod_numb		: values.invc_numb,
					wkod_seqn		: '1',
					lott_numb		: lott_numb,
					usge_attc_yorn	: values.usge_attc_yorn,
					invc_numb		: me.popup.params.work_invc,
					prod_qntt		: values.prod_qntt,
					good_qntt		: values.good_qntt,
					poor_qntt		: values.poor_qntt,
					work_drtr_1fst	: values.work_drtr_1fst,
					work_drtr_2snd	: values.work_drtr_2snd,
					work_drtr_3trd	: values.work_drtr_3trd,
					pckg_drtr_1fst	: values.pckg_drtr_1fst,
					pckg_drtr_2snd	: values.pckg_drtr_2snd,
					pckg_drtr_3trd	: values.pckg_drtr_3trd,
					istt_yorn		: '1',
					istt_wrhs_idcd	: '01',
					istt_numb		: '',
					istt_seqn		: '',

					records			: records
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				Ext.Msg.alert("알림", "생산이 완료되었습니다.");
				lister1.getStore().reload();
				if	(!result.success ){
					Ext.Msg.error(result.message );
					return;
				} else {
					me.setResponse( {success : true , values :  values });
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		})
	},
});