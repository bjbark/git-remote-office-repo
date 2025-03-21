Ext.define('module.custom.hantop.sale.estientry2.view.EstiEntry2WorkerEditor', { extend: 'Axt.form.Editor',

	alias	: 'widget.module-estientry2-worker-editor',
	height	: 235,
	header	: false,
	getStore: function() {
		return Ext.getStore( 'module.custom.hantop.sale.estientry2.store.EstiEntry2Invoice' );
	},
	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createWest()] ;
		me.items = me.createTabs();
		me.callParent(arguments);
	},

	createWest : function () {
		var me	= this,
			item = {
			xtype		: 'form-panel' ,
			dock		: 'left',
			border		: 0,
			bodyStyle	: { padding: '5px' },
			fieldDefaults: { width : 280, labelWidth : 70 , margin : '5 5 0 0'},
			items		: [
				{	xtype : 'fieldset', layout: 'vbox', margin : '0 0 0 0', border : 0,
					items : [
						{	xtype : 'fieldset', layout: 'hbox', border : 0, margin : '0 0 0 0',
							items : [
								{	fieldLabel	: Language.get('invc_numb','창호견적번호'),
									xtype		: 'textfield',
									name		: 'invc_numb',
									fieldCls	: 'requiredindex',
									allowBlank	: false,
									emptyText	: Const.invalid.emptyValue,
									readOnly	: true,
									width		: 200,
								},{	xtype		: 'lookupfield',
									name		: 'esti_dvcd',
									lookupValue	: resource.lookup('esti_dvcd'),
									width		: 90,
									editable	: false,
								},{	fieldLabel	: Language.get('ordr_numb','오더번호'),
									xtype		: 'textfield',
									name		: 'ordr_numb',
									margin		: '5 0 0 10',
									width		: 200,
								},{	fieldLabel	: Language.get('drtr_name', '영업자명' ),
									name		: 'drtr_name',
									pair		: 'drtr_idcd',
									xtype		: 'popupfield',
									labelWidth	: 75,
									margin		: '5 0 0 8',
									width		: 210,
									editable	: true,
									editable	: false,
									enableKeyEvents : true,
									clearable	: true ,
									popup		: {
										widget	: 'lookup-user-popup',
										select	: 'SINGLE',
										params	: { stor_grp : _global.stor_grp, line_stat : '0' },
										result	: function(records, nameField, pairField ) {
												nameField.setValue(records[0].get('user_name'));
												pairField.setValue(records[0].get('user_idcd'));
										}
									}
								},{	fieldLabel	: Language.get('atmr_drtr_name', '실측자' ),
									name		: 'atmr_drtr_name',
									xtype		: 'textfield',
									labelWidth	: 65,
									width		: 200,
								}
							]
						},{	xtype : 'fieldset', layout: 'hbox', border : 0, margin : '0 0 0 0',
							items : [
								{	fieldLabel	: Language.get('copr_stor_name', '제휴점 명' ),
									name		: 'copr_stor_name',
									pair		: 'copr_stor_idcd',
									xtype		: 'popupfield',
									width		: 295,
									editable	: false,
									enableKeyEvents : true,
									clearable	: true,
									popup		: {
										widget	: 'lookup-cstm-popup',
										select	: 'SINGLE',
										params	: { stor_grp : _global.stor_grp, line_stat : '0' },
										result	: function(records, nameField, pairField ) {
												nameField.setValue(records[0].get('cstm_name'));
												pairField.setValue(records[0].get('cstm_idcd'));
										}
									}
								},{	name : 'copr_stor_idcd', xtype	: 'textfield', hidden : true
								},{	fieldLabel	: Language.get('cstm_esti_numb', '고객견적번호' ),
									name		: 'cstm_esti_numb',
									xtype		: 'textfield',
									margin		: '5 0 0 10',
									width		: 200,
								},{	name : 'drtr_idcd', xtype	: 'textfield', hidden : true
								},{	fieldLabel	: Language.get('esti_date', '발주일자' ),
									name		: 'esti_date',
									xtype		: 'datefield',
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD,
									labelWidth	: 75,
									margin		: '5 0 0 8',
									width		: 210,
									listeners : {
										change : function(){
											var panel = this.up('form'),
												date = Ext.Date.add(new Date(),Ext.Date.DAY,+15)
											;
											panel.down('[name=vald_date]').setValue(date);
										}
									}
								},{	fieldLabel	: Language.get('vald_date', '유효일자' ),
									name		: 'vald_date',
									xtype		: 'datefield',
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD,
									labelWidth	: 65,
									width		: 200,
									listeners	: {
										change: function (me, newValue, oldValue) {
//											var endDate = 견적일자 = 발주일자
//											if (newValue < endDate) {
//												Ext.Msg.alert('알림', '견적일자보다 이전일은 선택하실 수 없습니다.');
//												me.setValue();
//												me.focus();
//											}
										}
									}
								}
							]
						},{	xtype : 'fieldset', layout: 'hbox', border : 0, margin : '0 0 0 0',
							items : [
								{	fieldLabel	: Language.get('brnd_bacd', '브랜드' ),
									name		: 'base_name2',
									xtype		: 'popupfield',
									editable	: false,
									enableKeyEvents : true,
									clearable	: true,
									pair		: 'brnd_bacd2',
									width		: 200,
									popup: {
										select : 'SINGLE',
										widget : 'lookup-base-popup',
										params : { stor_grp : _global.stor_grp , line_stat : '0', prnt_idcd : '4000' },
										result : function(records, nameField, pairField) {
											nameField.setValue(records[0].get('base_name'));
											pairField.setValue(records[0].get('base_code'));
										},

									},
								},{ xtype	: 'textfield', name : 'brnd_bacd2', hidden : true,
								},{	xtype	: 'fieldset', layout: 'hbox' , border: 0, margin : '5 0 0 0',
									items	: [
										{	text : '<span class="write-button"">품목적용</span>'  ,
											xtype	: 'button',
											cls		: 'button1-style',
											width	: 80,
											action	: 'changeAction'
										}
									]
								},{	fieldLabel	: Language.get('cont_schd_date', '시공일자' ),
									name		: 'cont_schd_date',
									xtype		: 'datefield',
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD,
									margin		: '5 0 0 5',
									width		: 200,
								},{	fieldLabel	: Language.get('cstm_name', '거래처 명' ),
									name		: 'cstm_name',
									pair		: 'cstm_idcd',
									xtype		: 'popupfield',
									labelWidth	: 75,
									margin		: '5 0 0 8',
									width		: 210,
									editable	: false,
									enableKeyEvents : true,
									clearable	: true,
									popup		: {
										widget	: 'lookup-cstm-popup',
										select	: 'SINGLE',
										params	: { stor_grp : _global.stor_grp, line_stat : '0' },
										result	: function(records, nameField, pairField ) {
												nameField.setValue(records[0].get('cstm_name'));
												pairField.setValue(records[0].get('cstm_idcd'));
										}
									}
								},{	name : 'cstm_idcd', xtype	: 'textfield', hidden : true
								},{	fieldLabel	: Language.get('', '생산처 명' ),
									name		: '',
									pair		: '',
									xtype		: 'popupfield',
									labelWidth	: 65,
									width		: 200,
									margin		: '5 0 0 0',
									editable	: false,
									enableKeyEvents : true,
									clearable	: true,
									popup		: {
										widget	: 'lookup-cstm-popup',
										select	: 'SINGLE',
										params	: { stor_grp : _global.stor_grp, line_stat : '0' },
										result	: function(records, nameField, pairField ) {
												nameField.setValue(records[0].get('cstm_name'));
												pairField.setValue(records[0].get('cstm_idcd'));
										}
									}
								},{	name : '', xtype	: 'textfield', hidden : true
								}
							]
						},{	xtype : 'fieldset', layout: 'hbox', border : 0, margin : '0 0 0 0',
							items : [
								{	fieldLabel	: Language.get('remk_text','비고'),
									xtype		: 'textfield',
									name		: 'remk_text',
									width		: 510,
								},{	fieldLabel	: '시공주소',
									xtype		: 'popupfield',
									editable 	: true,
									enableKeyEvents : true,
									name		: 'post_code',
									pair		: '',
									allowBlank	: true,
									clearable	: false ,
									margin		: '5 0 0 3',
									width		: 150,
									labelWidth	: 75,
									popup		: {
										select	: 'DAUM',
										widget	: 'popup-zipcode-search',
										params	: { },
										result	: function(records, nameField, pairField){
											var panel	= nameField.up('form');
												if( records.length > 0 ){
													var address = records[0];
														nameField.setValue( address.zonecode );
														panel.down('[name=scen_addr_1fst]' ).setValue( address.roadAddress );
														panel.down('[name=scen_addr_2snd]').focus(true , 10);
												}
										}
									}
								},{	name		: 'scen_addr_1fst' ,
									xtype		: 'textfield' ,
									width		: 250,
									margin		: '6 0 0 10'
								}
							]
						},{	xtype : 'fieldset', layout: 'hbox', margin : '7 0 0 0', border : 0 ,
							items : [
								{	xtype		: 'label',
									text		: '견적금액',
									style		: { color : 'Blue' },
									margin		: '3 0 0 28',
									width		: 47,
								},{	xtype		: 'numericfield',
									name		: 'esti_amnt',
									width		: 85,
									margin		: '0 0 0 0',
									readOnly	: true,
									listeners	: {
										change : function(){
											var me = this
												vatx = Math.trunc(this.value / Number(_global.tax_rt)),
												ttsm = this.value + vatx
											;
											me.up().down('[name=vatx_amnt]').setValue(vatx);
											me.up().down('[name=ttsm_amnt]').setValue(ttsm);
										}
									}
								},{	xtype		: 'label',
									text		: '부가세액',
									style		: { color : 'Green' },
									margin		: '3 0 0 35',
									width		: 47,
								},{	xtype		: 'numericfield',
									name		: 'vatx_amnt',
									width		: 85,
									margin		: '0 0 0 0',
									readOnly	: true,
								},{	xtype		: 'label',
									text		: '합계금액',
									style		: { color : 'Red' },
									margin		: '3 0 0 50',
									width		: 47,
								},{	xtype		: 'numericfield',
									name		: 'ttsm_amnt',
									width		: 85,
									margin		: '0 0 0 0',
									readOnly	: true,
								},{	xtype		: 'textfield',
									name		: 'scen_addr_2snd',
									width		: 330,
									margin		: '0 0 0 88',
									maxLength	: 100,
									maxLengthText : '한글 100자 이내로 작성하여 주시기 바랍니다.',
								}
							]
							},{	xtype : 'fieldset', layout: 'vbox', margin : '0 0 0 0', border : 0,
							items : [
								{	xtype : 'fieldset', layout: 'hbox', margin : '0 0 0 0', border : 0 ,
									items : [
										{	fieldLabel	: Language.get('bsmt_loss_rate','원자재LOSS'),
											xtype		: 'numericfield',
											name		: 'bsmt_loss_rate',
											width		: 120,
											labelWidth	: 60
										},{	xtype		: 'label',
											text		: '%',
											margin		: '8 0 0 0',
											style		: 'text-align:left;',
											width		: 20,
										},{	fieldLabel	: Language.get('asmt_loss_rate','부자재LOSS'),
											xtype		: 'numericfield',
											name		: 'asmt_loss_rate',
											width		: 120,
											labelWidth	: 60,
											margin		: '5 0 0 10'
										},{	xtype		: 'label',
											text		: '%',
											margin		: '8 0 0 5',
											style		: 'text-align:left;',
											width		: 20,
										},{	fieldLabel	: Language.get('weld_loss_rate','용접LOSS'),
											xtype		: 'numericfield',
											name		: 'weld_loss_rate',
											width		: 120,
											labelWidth	: 60,
											margin		: '5 0 0 10'
										},{	xtype		: 'label',
											text		: '%',
											margin		: '8 0 0 5',
											style		: 'text-align:left;',
											width		: 20,
										},{	fieldLabel	: Language.get('rein_viss_itvl','보강비스간격'),
											xtype		: 'numericfield',
											name		: 'rein_viss_itvl',
											width		: 140,
											labelWidth	: 70,
											margin		: '5 0 0 15'
										},{	fieldLabel	: Language.get('ancr_atch_itvl','앵커부착간격'),
											xtype		: 'numericfield',
											name		: 'ancr_atch_itvl',
											width		: 140,
											labelWidth	: 70,
											margin		: '5 0 0 20'
										},{	fieldLabel	: Language.get('esti_trff', '견적요율' ),
											name		: 'esti_trff',
											xtype		: 'numericfield',
											margin		: '5 0 0 5',
											width		: 140,
										}
									]
								},{	xtype : 'textfield', name : 'change', hidden : true
								}
							]
						}
					]
				}
			]
		};
		return item;
	},

	createTab1 : function() {
		var me		= this;
		var item	=
			{	title	: '브랜드 견적내용',
				xtype	: 'module-estimast2-worker-editor-lister',
			};
		return item;
	},

	createTabs : function () {
		var me = this,
			tabs = {
				xtype	: 'tabpanel',
				region	: 'center',
				plain	: true,
				margin	: 0 ,
				width	: 500,
				items	: [ me.createTab1() ]
			}
		;
		return tabs;
	},
});
