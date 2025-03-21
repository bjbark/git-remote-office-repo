Ext.define('module.prod.order.workentry.view.WorkEntryMtrlPopup', { extend: 'Axt.popup.Upload',
	alias		: 'widget.module-workentry-popup-mtrl'			,

	title: '생산투입',

	closable: true,
	autoShow: true,
	width	: 790,
	height	: 450,
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
							{ text : '<span class="write-button">투입완료 </span>'	, scope: me , handler : me.startAction  , cls: 'button1-style'},,'-',
							{ xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close,cls: 'button-style' }
						]
					}
				],
				items : [me.searchForm(),me.createGrid()  ]
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
									width		: 200,
									labelWidth	: 65,
									value		: me.popup.params.invc_numb
								},{	fieldLabel	: '거래처명',
									name		: 'cstm_name',
									xtype		: 'textfield',
									fieldCls	: 'readOnlyfield',
									readOnly	: true,
									width		: 200,
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
									width		: 200,
									labelWidth	: 65,
									value		: me.popup.params.item_code
								},{	fieldLabel	: '제품명',
									name		: 'item_name',
									xtype		: 'textfield',
									fieldCls	: 'readOnlyfield',
									readOnly	: true,
									width		: 295,
									labelWidth	: 65,
									value		: me.popup.params.item_name
								},{	fieldLabel	: '규격',
									name		: 'item_spec',
									xtype		: 'textfield',
									fieldCls	: 'readOnlyfield',
									readOnly	: true,
									width		: 280,
									labelWidth	: 65,
									value		: me.popup.params.item_spec
								},
							]
						},{	xtype	: 'panel',
							layout	: 'hbox',
							border	: 0,
							margin	: '0 0 5 0',
							items	: [
								{	fieldLabel	: Language.get('inqy_term','일정계획'),
									xtype		: 'textfield',
									name		: 'plan_strt_dttm',
									width		: 195,
									labelWidth	: 65,
									hourText	: 'H',
									minuteText	: 'M',
									todayText	: '오늘',
									format		: 'Y-m-d H:i',
									submitFormat: 'YmdHi',
									allowBlank	: false,
									fieldCls	: 'requiredindex',
									emptyText	: Const.invalid.emptyValue,
									fieldCls	: 'readOnlyfield',
									readOnly	: true,
									value		: me.popup.params.plan_strt_dttm.substring(0, 10),
								},{	text		: '~',
									xtype		: 'label',
									width		: 15,
									style		: 'text-align:center'
								},{	xtype		: 'textfield',
									name		: 'plan_endd_dttm',
									width		: 120,
									hourText	: 'H',
									minuteText	: 'M',
									todayText	: '오늘',
									format		: 'Y-m-d H:i',
									submitFormat: 'YmdHi',
									allowBlank	: false,
									fieldCls	: 'requiredindex',
									emptyText	: Const.invalid.emptyValue,
									fieldCls	: 'readOnlyfield',
									readOnly	: true,
									value		: me.popup.params.plan_endd_dttm.substring(0, 10),
								},{	fieldLabel	: '지시수량',
									name		: 'indn_qntt',
									xtype		: 'textfield',
									fieldCls	: 'readOnlyfield',
									readOnly	: true,
									width		: 165,
									labelWidth	: 65,
									value		: Ext.util.Format.number(me.popup.params.indn_qntt, '#,###.##9'),
									fieldStyle	: 'text-align: right;',
//									listeners: {
//										afterrender: function(field) {
//											// 필요 시 추가 작업 가능
//											var rawValue = field.getValue();
//											field.setValue(Ext.util.Format.number(rawValue, '#,###.##9'));
//										}
//									}
								},{	fieldLabel	: '포장단위',
									name		: 'pckg_unit',
									xtype		: 'textfield',
									fieldCls	: 'readOnlyfield',
									readOnly	: true,
									width		: 140,
									labelWidth	: 65,
									value		: me.popup.params.pckg_unit
								},{	fieldLabel	: '라벨수',
									name		: 'labl_qntt',
									xtype		: 'numericfield',
									fieldCls	: 'readOnlyfield',
									readOnly	: true,
									width		: 140,
									labelWidth	: 65,
									value		: me.popup.params.labl_qntt
								},
							]
						},{	xtype	: 'panel',
							layout	: 'hbox',
							border	: 0,
							margin	: '0 0 5 0',
							items	: [
								{
									xtype		: 'checkboxgroup',
									margin		: '0 0 0 65',
									items: [
											{	boxLabel	: '용도 및 용법 첨부',
												name		: 'usge_attc_yorn',
												value		: me.popup.params.usge_attc_yorn,
												readOnly	: true,
												width 		: 120
											},
									],
									labelWidth	: 1,
								}
							]
						},{	fieldLabel	: '제조방법',
							name		: 'user_memo',
							xtype		: 'textarea',
							width		: 775,
							height		: 60,
							labelWidth	: 65,
							readOnly	: true,
							value		: me.popup.params.user_memo,
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
									width		: 200,
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
								},{	name : 'cvic_idcd', xtype : 'textfield' , hidden : true , value : me.popup.params.cvic_idcd,
								},{	fieldLabel	: Language.get('drtr_name','작업자'),
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									clearable	: true,
									name		: 'drtr_name',
									width		: 207,
									labelWidth	: 65,
									pair		: 'drtr_idcd',
									readOnly	: true,
									value		: me.popup.params.wker_name,
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
								},{	name : 'drtr_idcd', xtype : 'textfield' , hidden : true, value :  me.popup.params.wker_idcd,
								},{	fieldLabel	: Language.get('wigh_wker_name','계량 작업자'),
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									clearable	: true,
									name		: 'wigh_wker_name',
									width		: 227,
									labelWidth	: 85,
									pair		: 'wigh_wker_idcd',
									readOnly	: true,
									value		: me.popup.params.wker_name,
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
												me.down('[name=wigh_wker_idcd]').reset();
											}
										}
									}
								},{	name : 'wigh_wker_idcd', xtype : 'textfield' , hidden : true, value	: me.popup.params.wigh_wker_idcd,
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
									width		: 200,
									labelWidth	: 65,
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD,
									allowBlank	: false,
									fieldCls	: 'requiredindex',
									emptyText	: Const.invalid.emptyValue,
									readOnly	: true,
									value		: new Date(),
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
					fields: ['line_seqn','item_code', 'item_name', 'mixx_rate','ostt_qntt','lott_numb','real_ivst_qntt','used'],
					data: []  // 초기 데이터가 없으므로 빈 배열
				}),
				columns: [
					{	text : Language.get('line_seqn'	, '순번'	)	, dataIndex: 'line_seqn'	,  width : 50 , align : 'center', hidden : true,
					},{	text : Language.get('item_code'	, '원료코드')	, dataIndex: 'item_code'	,  width : 120, align : 'center'
					},{	text : Language.get('item_name'	, '원료명'	)	, dataIndex: 'item_name'	,  width : 150, align : 'center'
					},{ text : Language.get('mixx_rate'	, '배합비'	)	, dataIndex: 'mixx_rate'	,  width : 80 , align : 'center', xtype : 'numericcolumn', summaryType: 'sum' , format	: '#,##0.###',
					},{ text : Language.get('ostt_qntt'	, '투입량'	)	, dataIndex: 'ostt_qntt'	,  width : 80 , align : 'right' , xtype : 'numericcolumn', summaryType: 'sum' , format	: '#,##0.###',
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

	/**
	 * BOM조회
	 */
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
	startAction: function(){
		var me = this,
			baseform= me.down('form'),
			record	= baseform.getRecord(),
			values	= baseform.getValues(),
			grid = me.down('grid-panel'), // 그리드를 참조
			store = me.down('grid-panel').getStore(),
			uper_seqn   = 1,
			lister1= Ext.ComponentQuery.query('module-workentry-lister-sjung')[0],
			select = lister1.getSelectionModel().getSelection()
		;

		var records2 = [];
		var new_invc_numb;

		store.each(function(record) {
			var recordData = record.getData(); // 각 record 데이터를 가져옴

			records2.push({
				invc_numb	: me.popup.params.work_invc,
				line_seqn	: recordData.line_seqn,
				real_ivst_qntt	: recordData.real_ivst_qntt,
			});
		});

		Ext.Msg.confirm("확인", "원료 투입을 완료하시겠습니까?", function(button) {
			if (button == 'yes') {
				Ext.Ajax.request({
					url		: _global.location.http() + '/custom/sjflv/prod/workbook/set/setMaster.do',
					params	: {
						token : _global.token_id,
						param : JSON.stringify({
							stor_id			: _global.stor_id,
							hqof_idcd		: _global.hqof_idcd,
							_set			: 'update',
							//pror_mast 및 pror_item
							wkod_numb		: values.invc_numb,
							wkod_seqn		: '1',
							prog_stat_dvcd	: '1',
							mtrl_ivst_yorn	: '1',

							//work_book
							invc_numb		: me.popup.params.work_invc,
							records			: records2,
						})
					},
					async	: false,
					method	: 'POST',
					success	: function(response, request) {
						var result = Ext.decode(response.responseText);
						Ext.Msg.alert("알림", "생산시작이 되었습니다.");
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
			}else{
				return;
			};
		});
	},
});