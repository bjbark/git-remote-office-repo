Ext.define('module.custom.aone.sale.esti.estimast.view.EstiMastCalcPopup', { extend: 'Axt.popup.Search',
	alias : 'widget.module-estimast-calc-popup',
	store : 'module.custom.aone.sale.esti.estimast.store.EstiMastMaster',

	title		: '견적가산출',
	closable	: true,
	autoShow	: true,
	width		: 400,
	height		: 380,
	layout		: {
		type : 'border'
	},

	defaultFocus : 'initfocused',

	initComponent: function(config){
		var me = this;
		me.items = [ me.createForm()];
		me.callParent(arguments);
		me.calcuration();
		me.calcuration2();
		me.calcuration3();
	},

	createForm: function() {
		var me = this,
		form = {
			xtype		: 'form-panel',
			region		: 'center',
			border		: false,
			dockedItems	: [
				{	xtype : 'toolbar',
					dock  : 'bottom',
					items : [
						'->' ,
						{ xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction,cls: 'button-style'},'-',
						{ xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close,cls: 'button-style' }
					]
				}
			],
			items 		: [me.editorForm() ],
		};
		return form;
	},

	editorForm : function () {
		var me	= this,
		form = {
			xtype	: 'form-panel',
			border	:  false,
			layout	: { type: 'vbox', align: 'stretch' } ,
			items	: [
				{	xtype	: 'panel',
					border	: 0,
					margin	: '10 0 0 0',
					items	: [
								{	fieldLabel	: Language.get('invc_numb','견적번호'),
									xtype		: 'textfield',
									name		: 'invc_numb',
									width		: 300,
									labelWidth	: 100,
									value		: me.param.invc_numb,
									fieldCls	: 'requiredindex',
									readOnly	: true
								},{	fieldLabel	: Language.get('amnd_degr','견적차수'),
									xtype		: 'textfield',
									name		: 'amnd_degr',
									value		: me.param.amnd_degr,
									hidden		: true,
								},{	fieldLabel	: Language.get('esti_case_name','견적명'),
									xtype		: 'textfield',
									name		: 'esti_case_name',
									width		: 300,
									labelWidth	: 100,
									value		: me.param.esti_case_name,
									fieldCls	: 'requiredindex',
									readOnly	: true
								},{	fieldLabel	: Language.get('invc_date','견적일자'),
									xtype		: 'textfield',
									name		: 'invc_date',
									width		: 300,
									labelWidth	: 100,
									value		: me.param.invc_date,
									fieldCls	: 'requiredindex',
									readOnly	: true,
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD
								},{	fieldLabel	: Language.get('cstm_name','거래처명'),
									xtype		: 'textfield',
									name		: 'cstm_name',
									width		: 300,
									labelWidth	: 100,
									value		: me.param.cstm_name,
									fieldCls	: 'requiredindex',
									readOnly	: true
								},{	fieldLabel	: Language.get('cstm_idcd','거래처ID'),
									xtype		: 'textfield',
									name		: 'cstm_idcd',
									value		: me.param.cstm_idcd,
									hidden		: true,
								},{	fieldLabel	: Language.get('user_name','작성자'),
									xtype		: 'textfield',
									name		: 'user_name',
									width		: 300,
									labelWidth	: 100,
									value		: me.param.user_name,
									fieldCls	: 'requiredindex',
									readOnly	: true,
								},{	fieldLabel	: Language.get('deli_date','납기일자'),
									xtype		: 'datefield',
									name		: 'deli_date',
									width		: 300,
									labelWidth	: 100,
									value		: new Date(),
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD
								},{	fieldLabel	: Language.get('esti_dvcd','견적구분'),
									xtype 		: 'lookupfield' ,
									lookupValue : resource.lookup('esti_dvcd'),
									name		: 'esti_dvcd',
									width		: 300,
									labelWidth	: 100,
									value		: me.param.esti_dvcd,
									fieldCls	: 'requiredindex',
									readOnly	: true
								},
								{	layout		: 'vbox',
									border		: 20,
									align		: 'stretch',
									bodyStyle	: { padding: '0', background: 'gray' },
									items	: [
												{	fieldLabel	: Language.get('esti_amnt','견적금액'),
													xtype		: 'numericfield',
													name		: 'esti_amnt',
													width		: 340,
													labelWidth	: 100,
													value		: me.param.esti_amnt,
													fieldCls	: 'requiredindex',
													summaryType	: 'sum',
													format		: '#,##0',
													labelStyle	: 'color:white',
												},
												{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
													items	: [
														{	fieldLabel	: Language.get('comp_prft','기업이윤(%)'),
															xtype		: 'numericfield',
															name		: 'comp_prft',
															width		: 150,
															labelWidth	: 100,
															value		: '15',
															maxValue	: '100',
															labelStyle	: 'color:white',
															enableKeyEvents : true,
															listeners:{
																blur : function (self, e ) {
//																	if (this.value > '100') {
//																		Ext.Msg.alert("알림", "기업이윤은 100프로를 초과할 수 없습니다.");
//																		this.setValue('0');
//																		me.down('[name=comp_prft2]').setValue('0');
//																		me.calcuration3();
//																		return false;
//																	}
																	me.calcuration();
																	me.calcuration3();
																},
																keydown : function(self, e) {
																	if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
//																		if (this.value > '100') {
//																			Ext.Msg.alert("알림", "기업이윤은 100프로를 초과할 수 없습니다.");
//																			this.setValue('0');
//																			me.down('[name=comp_prft2]').setValue('0');
//																			me.calcuration3();
//																			return false;
//																		}
																		me.calcuration();
																		me.calcuration3();
																	}
																}
															}
														},{	fieldLabel	: Language.get('comp_prft2','='),
															xtype		: 'numericfield',
															name		: 'comp_prft2',
															width		: 190,
															labelWidth	: 10,
															labelStyle	: 'color:white',
															fieldCls	: 'requiredindex',
															enableKeyEvents : true,
															listeners:{
																blur : function (self, e ) {
																	me.calcuration3();
																},
																keydown : function(self, e) {
																	me.calcuration3();
																}
															}
														}
													]
												},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
													items	: [
																{	fieldLabel	: Language.get('work_time','작업시간(H)'),
																	xtype		: 'numericfield',
																	name		: 'work_time',
																	width		: 130,
																	labelWidth	: 100,
																	value		: '1',
																	maxValue	: '20',
																	labelStyle	: 'color:white',
																	enableKeyEvents : true,
																	listeners:{
																		blur : function (self, e ) {
//																			if (this.value > '20') {
//																				Ext.Msg.alert("알림", "작업시간은 20시간을 초과할 수 없습니다.");
//																				this.setValue('0');
//																				me.down('[name=work_time2]').setValue('0');
//																				me.calcuration3();
//																				return false;
//																			}
																			me.calcuration2();
																			me.calcuration3();
																		},
																		keydown : function(self, e) {
																			if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
//																				if (this.value > '20') {
//																					Ext.Msg.alert("알림", "작업시간은 20시간을 초과할 수 없습니다.");
//																					this.setValue('0');
//																					me.down('[name=work_time3]').setValue('0');
//																					me.calcuration3();
//																					return false;
//																				}
																				me.calcuration2();
																				me.calcuration3();
																			}
																		}
																	}
																},{	fieldLabel	: Language.get('work_time2','X 단가'),
																	xtype		: 'lookupfield',
																	name		: 'work_time2',
																	width		: 120,
																	labelWidth	: 40,
																	lookupValue	: [['10000','10000'],['20000','20000'],['30000','30000'],['40000','40000'],
																	           	   ['50000','50000'],['60000','60000'],['70000','70000'],['80000','80000'],
																	           	   ['90000','90000'],['100000','100000'],['110000','110000'],['120000','120000'],
																	           	   ['130000','130000'],['140000','140000'],['150000','150000'],['160000','160000'],
																	           	   ['170000','170000'],['180000','180000'],['190000','190000'],['200000','200000'],],
																	value		: '50000',
																	format		: '#,##0',
																	labelStyle	: 'color:white',
																	fieldCls	: 'requiredindex, color:white',
																	enableKeyEvents : true,
																	listeners:{
																		blur : function (self, e ) {
																			me.calcuration2();
																			me.calcuration3();
																		},
																		keydown : function(self, e) {
																			me.calcuration2();
																			me.calcuration3();
																		}
																	}
																},{	fieldLabel	: Language.get('work_time3','='),
																	xtype		: 'numericfield',
																	name		: 'work_time3',
																	width		: 90,
																	labelWidth	: 10,
																	value		: '50000',
																	labelStyle	: 'color:white',
																	fieldCls	: 'requiredindex',
																	enableKeyEvents : true,
																	listeners:{
																		blur : function (self, e ) {
																			me.calcuration3();
																		},
																		keydown : function(self, e) {
																			me.calcuration3();
																		}
																	}
																}
															]
												},{	fieldLabel	: Language.get('sum_ttsm_amnt','총액'),
													xtype		: 'numericfield',
													name		: 'sum_ttsm_amnt',
													width		: 340,
													labelWidth	: 100,
													value		: '',
													fieldCls	: 'requiredindex',
													summaryType	: 'sum',
													format		: '#,##0',
													labelStyle	: 'color:white',
												},{	fieldLabel	: Language.get('make_cost','가공비값'),
													xtype		: 'textfield',
													name		: 'make_cost',
													value		: '',
													hidden		: true,
												}
											]
										}
									]
								}
							]
						};
		return form;
	},

	// 기업이윤  계산
	calcuration : function() {
		var me = this,
			panel		= me.down('form'),
			values		= panel.getValues(),
			esti_amnt	= values.esti_amnt,
			comp_prft 	= values.comp_prft,
			comp_prft2 	=( Math.round(esti_amnt * (comp_prft / 100) / 10.0) * 10.0)
			;
			me.down('[name=comp_prft2]').setValue(comp_prft2);
	},
	listeners: {
		edit : function() {
			var me = this;
			me.calcuration();
		}
	},

	// 작업시간 계산
	calcuration2 : function() {
		var me = this,
			panel		= me.down('form'),
			values		= panel.getValues(),
			work_time 	= values.work_time,
			work_time2 	= values.work_time2,
			work_time3 	= work_time * work_time2
			;
			me.down('[name=work_time3]').setValue(work_time3);
	},
	listeners: {
		edit : function() {
			var me = this;
			me.calcuration2();
		}
	},

	// 총액 계산
	calcuration3 : function() {
		var me = this,
			panel		= me.down('form'),
			values		= panel.getValues(),
			esti_amnt	= values.esti_amnt,
			comp_prft2	= values.comp_prft2,
			work_time3	= values.work_time3,
			make_cost	= Number(comp_prft2) + Number(work_time3),
			sum_ttsm_amnt	= Number(esti_amnt) + Number(comp_prft2) + Number(work_time3)
			;
			me.down('[name=make_cost]').setValue(make_cost);
			me.down('[name=sum_ttsm_amnt]').setValue(sum_ttsm_amnt);
	},
	listeners: {
		edit : function() {
			var me = this;
			me.calcuration3();
		}
	},

	// 확인 버튼 이벤트

	finishAction: function(){
		var me = this,
			panel	= me.down('form'),
			values	= panel.getValues(),
			master	= Ext.ComponentQuery.query('module-estimast-lister-master')[0],
			detail4	= Ext.ComponentQuery.query('module-estimast-lister-detail4')[0],
			store	= detail4.getStore()
			;

		Ext.Ajax.request({
			url		: _global.location.http() + '/custom/aone/sale/estimast/set/esti.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify(
					values
				)
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				if	(!result.success ){
					Ext.Msg.error(result.message );
					return;
				} else {

					store.load({
						params		: {param:JSON.stringify({
							invc_numb	: values.invc_numb,
							amnd_degr	: values.amnd_degr
						})},
						scope		: me,
						callback	: function(records, operation, success) {
						}
					});

					me.setResponse( {success : true , values :  values });

				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				Ext.Msg.alert("알림", "견적가산출 되었습니다.");
			}
		});
	}
});
