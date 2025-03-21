Ext.define('module.custom.aone.sale.order.sorderplan.view.SorderPlanEstiPopup', { extend: 'Axt.popup.Search',
	alias : 'widget.module-aone-sorderplan-esti-popup',
	store : 'module.custom.aone.sale.order.sorderplan.store.SorderPlanMaster',

	title		: '견적비 산출',
	closable	: true,
	autoShow	: true,
	width		: 360,
	height		: 340,
	layout		: {
		type : 'border'
	},

	defaultFocus : 'initfocused',

	initComponent: function(config){
		var me = this;
		me.items = [ me.createForm()];
		me.callParent(arguments);
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
									width		: 320,
									labelWidth	: 100,
									value		: me.param.invc_numb,
									fieldCls	: 'requiredindex',
									readOnly	: true
								},{	fieldLabel	: Language.get('amnd_degr','견적차수'),
									xtype		: 'textfield',
									name		: 'amnd_degr',
									value		: me.param.amnd_degr,
									hidden		: true,
								},{	fieldLabel	: Language.get('invc_date','견적일자'),
									xtype		: 'datefield',
									name		: 'invc_date',
									width		: 320,
									labelWidth	: 100,
									fieldCls	: 'requiredindex',
									readOnly	: true,
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD,
									value		: new Date(),
									readOnly	: true,
								},{	fieldLabel	: Language.get('cstm_name','거래처명'),
									xtype		: 'textfield',
									name		: 'cstm_name',
									width		: 320,
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
									width		: 320,
									labelWidth	: 100,
									value		: _global.login_nm,
									fieldCls	: 'requiredindex',
									readOnly	: true,
								},{	fieldLabel	: Language.get('user_idcd','작성자ID'),
									xtype		: 'textfield',
									name		: 'user_idcd',
									value		: _global.login_id,
									hidden		: true,
								},{	fieldLabel	: Language.get('deli_date2','납기일자'),
									xtype		: 'datefield',
									name		: 'deli_date2',
									width		: 320,
									labelWidth	: 100,
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD,
									value		: Ext.Date.add( new Date(), Ext.Date.DAY, +7),
								},
								{	layout		: 'vbox',
									border		: 20,
									align		: 'stretch',
									bodyStyle	: { padding: '0', background: 'gray' },
									items	: [
												{	fieldLabel	: Language.get('esti_amnt','원가'),
													xtype		: 'numericfield',
													name		: 'esti_amnt',
													width		: 320,
													labelWidth	: 100,
													value		: me.param.esti_amnt,
													fieldCls	: 'requiredindex',
													format		: '#,##0',
													labelStyle	: 'color:white',
													readOnly	: true,
												},
												{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
													items	: [
														{	fieldLabel	: Language.get('comp_prft','기업이윤(%)'),
															xtype		: 'numericfield',
															name		: 'comp_prft',
															width		: 150,
															labelWidth	: 100,
															value		: 15,
															maxValue	: 100,
															labelStyle	: 'color:white',
															enableKeyEvents : true,
															listeners:{
																change : function(self, value){
																	var panel	= this.up('form');
																	var esti_amnt	= panel.down('[name=esti_amnt]').getValue();
																	var comp_prft	= panel.down('[name=comp_prft]').getValue();
																	var work_time3	= panel.down('[name=work_time3]').getValue();
																	var comp_prft2	= '';
																	var make_cost	= '';

																	comp_prft2 = (Number(esti_amnt) * Number(comp_prft))/100;
																	panel.down('[name=comp_prft2]').setValue(comp_prft2);

																	make_cost = work_time3 + esti_amnt + comp_prft2;
																	panel.down('[name=make_cost]').setValue(make_cost);

																	}
																}
														},{	fieldLabel	: Language.get('comp_prft2','='),
															xtype		: 'numericfield',
															name		: 'comp_prft2',
															width		: 170,
															labelWidth	: 10,
															labelStyle	: 'color:white',
															summaryType : 'sum',
															format		: '#,##0',
															fieldCls	: 'requiredindex',
															enableKeyEvents : true,
															value		: (me.param.esti_amnt * 15) / 100,
															readOnly	: true,
														}
													]
												},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
													items	: [
																{	fieldLabel	: Language.get('work_time','작업시간(H)'),
																	xtype		: 'numericfield',
																	name		: 'work_time',
																	width		: 130,
																	labelWidth	: 100,
																	value		: 1,
																	maxValue	: 20,
																	labelStyle	: 'color:white',
																	enableKeyEvents : true,
																	listeners:{
																		change : function(self, value){
																			var panel = this.up('form');
																			var work_time = panel.down('[name=work_time]').getValue();
																			var work_time2 = panel.down('[name=work_time2]').getValue();
																			var esti_amnt = panel.down('[name=esti_amnt]').getValue();
																			var comp_prft2 = panel.down('[name=comp_prft2]').getValue();
																			var work_time3 = '';
																			var sum_ttsm_amnt = '';
																			var make_cost = '';

																			work_time3 = Number(work_time) * Number(work_time2);
																			panel.down('[name=work_time3]').setValue(work_time3);

																			make_cost = work_time3 + esti_amnt + comp_prft2;
																			panel.down('[name=make_cost]').setValue(make_cost);

																		}
																	}
																},{	fieldLabel	: Language.get('work_time2','X 단가'),
																	xtype		: 'lookupfield',
																	name		: 'work_time2',
																	width		: 110,
																	labelWidth	: 40,
																	lookupValue	: [['10000','10000'],['20000','20000'],['30000','30000'],['40000','40000'],
																	           	   ['50000','50000'],['60000','60000'],['70000','70000'],['80000','80000'],
																	           	   ['90000','90000'],['100000','100000'],['110000','110000'],['120000','120000'],
																	           	   ['130000','130000'],['140000','140000'],['150000','150000'],['160000','160000'],
																	           	   ['170000','170000'],['180000','180000'],['190000','190000'],['200000','200000'],],
																	value		: 50000,
																	format		: '#,##0',
																	labelStyle	: 'color:white',
																	fieldCls	: 'requiredindex, color:white',
																	enableKeyEvents : true,
																	listeners:{
																		change : function(self, value){
																			var panel = this.up('form');
																			var work_time = panel.down('[name=work_time]').getValue();
																			var work_time2 = panel.down('[name=work_time2]').getValue();
																			var esti_amnt = panel.down('[name=esti_amnt]').getValue();
																			var comp_prft2 = panel.down('[name=comp_prft2]').getValue();
																			var work_time3 = '';
																			var sum_ttsm_amnt = '';
																			var make_cost = '';

																			work_time3 = Number(work_time) * Number(work_time2);
																			panel.down('[name=work_time3]').setValue(work_time3);

																			make_cost = work_time3 + esti_amnt + comp_prft2;
																			panel.down('[name=make_cost]').setValue(make_cost);

																		}
																	}
																},{	fieldLabel	: Language.get('work_time3','='),
																	xtype		: 'numericfield',
																	name		: 'work_time3',
																	width		: 80,
																	labelWidth	: 10,
																	value		: 50000,
																	labelStyle	: 'color:white',
																	fieldCls	: 'requiredindex',
																	enableKeyEvents : true,
																	readOnly	: true,
																}
															]
												},{	fieldLabel	: Language.get('make_cost','견적금액'),
													xtype		: 'numericfield',
													name		: 'make_cost',
													width		: 320,
													labelWidth	: 100,
													value		: me.param.esti_amnt + 50000 + ((me.param.esti_amnt * 15)/100 ) ,
													fieldCls	: 'requiredindex',
													summaryType	: 'sum',
													format		: '#,##0',
													labelStyle	: 'color:white',
													readOnly	: true,
												}
											]
										}
									]
								}
							]
						};
		return form;
	},

	// 확인 버튼 이벤트

	finishAction: function(){
		var me = this,
			panel	= me.down('form'),
			values	= panel.getValues(),
			master	= Ext.ComponentQuery.query('module-aone-sorderplan-lister-master')[0],
			store	= master.getStore(),
			pParam	= me.param
		;

		Ext.Ajax.request({
			url		: _global.location.http() + '/custom/aone/sale/order/sorderplan/set/esti.do',
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

//					store.load({
//						params		: {param:JSON.stringify({
//							invc_numb	: values.invc_numb,
//							amnd_degr	: values.amnd_degr,
//							invc_date1	: pParam.invc_date1,
//							invc_date2	: pParam.invc_date2,
//						})},
//						scope		: me,
//						callback	: function(records, operation, success) {
//						}
//					});
					me.setResponse( {success : true , values :  values });
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				Ext.ComponentQuery.query('module-aone-sorderplan-layout')[0].down('#planEdit').hide();
				Ext.Msg.alert("알림", "견적가산출 되었습니다.");
			}
		});
		store.reload();
	}
});
