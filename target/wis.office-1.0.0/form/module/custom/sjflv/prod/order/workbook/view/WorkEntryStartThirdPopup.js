Ext.define('module.custom.sjflv.prod.order.workbook.view.WorkEntryStartThirdPopup', { extend: 'Axt.popup.Upload',
	alias		: 'widget.module-sjflv-workentry-popup-start-third'			,

	title: '생산시작',

	closable: true,
	autoShow: true,
	width	: 790,
	height	: 350,
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
							{ text : '<span class="write-button">다음 </span>'	, scope: me , handler : me.nextAction  , cls: 'button1-style'},'-',
							{ text : '<span class="write-button">이전 </span>'	, scope: me , handler : me.close       , cls: 'button-style'},'-',
						]
					}
				],
				items : [me.searchForm(),me.createGrid() ]
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
								}
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
								}
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
									value		: Ext.util.Format.number(me.popup.params.indn_qntt, '#,###.##9'),
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
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									name		: 'cvic_name',
									pair		: 'cvic_idcd',
									width		: 300,
									labelWidth	: 65,
									clearable	: true,
									allowBlank	: false,
									fieldCls	: 'requiredindex',
									emptyText	: Const.invalid.emptyValue,
									value		: me.popup.params.cvic_name,
									readOnly	: true,
									popup: {
										select : 'SINGLE',
										widget : 'lookup-cvic-popup',
										params : { stor_grp : _global.stor_grp , line_stat : '0', acct_bacd:'제품' },
										result : function(records, nameField, pairField) {
											nameField.setValue(records[0].get('cvic_name'));
											pairField.setValue(records[0].get('cvic_idcd'));
										}
									}
								},{	name : 'cvic_idcd', xtype : 'textfield' , hidden : true, value		: me.popup.params.cvic_idcd,
								},{	fieldLabel	: Language.get('drtr_name','작업자'),
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									clearable	: true,
									name		: 'drtr_name',
									width		: 300,
									labelWidth	: 65,
									pair		: 'drtr_idcd',
									value		: _global.login_nm,
									readOnly	: true,
									popup: {
										select : 'SINGLE',
										widget : 'lookup-user-popup',
										params : { stor_grp : _global.stor_grp , line_stat : '0' },
										result : function(records, nameField, pairField) {
											nameField.setValue(records[0].get('user_name'));
											pairField.setValue(records[0].get('user_idcd'));
										}
									},
									listeners	: {
										change	: function() {
											var val = this.getValue();
											if(val=='' || val == null){
												me.down('[name=drtr_idcd]').reset();
											}
										}
									}
								},{	name : 'drtr_idcd', xtype : 'textfield' , hidden : true , value : _global.login_pk
								},
							]
						},{	fieldLabel	: Language.get('strt_dttm','시작일시'),
							xtype		: 'datetimefield',
							name		: 'strt_dttm',
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
			grid = {
				xtype		: 'grid-panel',
				region		: 'center',
				scrollable	: true,
				height		: 150,
				viewConfig	: {
					loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask  } ),
					scrollable: true,
				},
				selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
//				features	: [{ ftype : 'grid-summary' }],
				plugins 	: { ptype  : 'cellediting-directinput', clicksToEdit: 1 },

				store: Ext.create('Ext.data.Store', {
					fields: ['line_seqn','item_code', 'item_name', 'mixx_rate','ostt_qntt','real_ivst_qntt','lott_numb','used'],
					data: []  // 초기 데이터가 없으므로 빈 배열
				}),
				columns: [
					{	text : Language.get('line_seqn'	, '순번'	)	, dataIndex: 'line_seqn'	,  width : 50 , align : 'center', hidden : true,
					},{	text : Language.get('item_code'	, '원료코드')	, dataIndex: 'item_code'	,  width : 120, align :'center'
					},{	text : Language.get('item_name'	, '원료명'	)	, dataIndex: 'item_name'	,  width : 150, align :'center'
					},{ text : Language.get('mixx_rate'	, '배합비'	)	, dataIndex: 'mixx_rate'	,  width : 80 , align : 'center', xtype : 'numericcolumn', summaryType: 'sum' , format	: '#,##0.###',
					},{ text : Language.get('ostt_qntt'	, '소요량'	)	, dataIndex: 'ostt_qntt'	,  width : 80 , align : 'right' , xtype : 'numericcolumn', summaryType: 'sum' , format	: '#,##0.###',
					},{ text : Language.get('real_ivst_qntt', '실제투입량'	)	, dataIndex: 'real_ivst_qntt'	,  width : 80  , align:'center',
						tdCls : 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									var value = this.getValue();
									var grid = self.up('grid-panel');
									var store = grid.getStore();
									var selection = grid.view.getSelectionModel().getSelection()[0];
									var row = store.indexOf(selection);

									var record = store.getAt(row);

									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										if(value>0){
											Ext.Msg.confirm("확인", "원료를 투입하시겠습니까?", function(button) {
												if (button == 'yes') {
													record.set('used', '1');
												}else{
													record.set('real_ivst_qntt', '0');
													record.set('used', '0');
													return;
												}
											})
										}
									}
								},
								blur: function(self) {
									var value = this.getValue();
									var grid = self.up('grid-panel');
									var store = grid.getStore();
									var selection = grid.view.getSelectionModel().getSelection()[0];
									var row = store.indexOf(selection);

									var record = store.getAt(row);
									if(value>0){
										Ext.Msg.confirm("확인", "원료를 투입하시겠습니까?", function(button) {
											if (button == 'yes') {
												record.set('used', '1');
											}else{
												record.set('real_ivst_qntt', '0');
												record.set('used', '0');
												return;
											}
										})
									}
								}
							}
						}
					},{ text : Language.get('lott_numb'	, 'lot번호'	)	, dataIndex: 'lott_numb'	,  width : 170 , align:'center',
					},{	text : Language.get('used'		, '사용여부'	)	, dataIndex: 'used'	,  width : 70 , align:'center',  xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' ),
						tdCls	: 'editingcolumn',
						editor	: {
							xtype			: 'lookupfield',
							lookupValue		: resource.lookup('yorn'),
							editable		: false,
							selectOnFocus	: true,
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
			url			: _global.api_host_info + '/' + _global.app_site + '/prod/order/workentry/get/ivstMtrl.do',
			method		: "POST",
			params		: {
			 	token	: _global.token_id,
				param	: Ext.encode({
					stor_idc	: resId,
					invc_numb	: me.popup.params.invc_numb,
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
					var indn_qntt = me.popup.params.indn_qntt;
					result.records.forEach(function(record) {
						record.need_qntt = indn_qntt * (record.mixx_rate / 100);
					});
					store.loadData(result.records);
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
	nextAction: function(){
		var me = this,
			baseform= me.down('form'),
			record	= baseform.getRecord(),
			values	= baseform.getValues(),
			grid = me.down('grid-panel'), // 그리드를 참조
			store = grid.getStore(),
			uper_seqn   = 1
		;
		var records = [];

		store.each(function(record) {
			var recordData = record.getData(); // 각 record 데이터를 가져옴
			var stndUnitQntt = record.get('stnd_unit_qntt');

			if(recordData.used == '1'){
				records.push({
					_set			: 'insert',
					invc_numb	: me.popup.params.work_invc,
					line_seqn	: recordData.line_seqn,
					item_code	: recordData.item_code,
					item_name	: recordData.item_name,
					ivst_qntt	: recordData.ostt_qntt,
					lott_numb	: recordData.lott_numb,
					real_ivst_qntt	: recordData.real_ivst_qntt,
				});
			}
		});

		resource.loadPopup({
			widget: 'module-sjflv-workentry-popup-start-first-last',
			params: {
				invc_numb: me.popup.params.invc_numb,
				cstm_idcd: me.popup.params.cstm_idcd,
				cstm_name: me.popup.params.cstm_name,
				item_idcd: me.popup.params.item_idcd,
				item_name: me.popup.params.item_name,
				item_code: me.popup.params.item_code,
				item_spec: me.popup.params.item_spec,
				indn_qntt: me.popup.params.indn_qntt,
				pckg_unit: me.popup.params.pckg_unit,
				labl_qntt: me.popup.params.labl_qntt,
				plan_strt_dttm: me.popup.params.plan_strt_dttm,
				plan_endd_dttm: me.popup.params.plan_endd_dttm,
				usge_attc_yorn: me.popup.params.usge_attc_yorn,
				pdsd_numb: me.popup.params.pdsd_numb,
				drtr_name: values.drtr_name,
				drtr_idcd: values.drtr_idcd,
				strt_dttm: values.strt_dttm,
				cvic_idcd: values.cvic_idcd,
				cvic_name: values.cvic_name,
				work_invc: me.popup.params.work_invc,
				mtrl_records: records,
			},
		});

		me.close();
	},
});