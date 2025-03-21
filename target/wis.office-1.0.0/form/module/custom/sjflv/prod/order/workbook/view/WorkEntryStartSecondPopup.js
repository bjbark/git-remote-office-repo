Ext.define('module.custom.sjflv.prod.order.workbook.view.WorkEntryStartSecondPopup', { extend: 'Axt.popup.Upload',
	alias		: 'widget.module-sjflv-workentry-popup-start-second'			,

	title: '생산시작',

	closable: true,
	autoShow: true,
	width	: 630,
	height	: 250,
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
//							{ xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close,cls: 'button-style' }
						]
					}
				],
				items : [me.searchForm()]
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
								{	fieldLabel	: Language.get('strt_dttm','시작일시'),
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
						},{	fieldLabel	: Language.get('cvic_name','생산설비'),
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
							popup: {
								select : 'SINGLE',
								widget : 'lookup-cvic-popup',
								params : { stor_grp : _global.stor_grp , line_stat : '0', acct_bacd:'제품' },
								result : function(records, nameField, pairField) {
									nameField.setValue(records[0].get('cvic_name'));
									pairField.setValue(records[0].get('cvic_idcd'));
								}
							}
						},{	name : 'cvic_idcd', xtype : 'textfield' , hidden : true
						},
					]
				},
			]
		};
		return form;
	},

	/**
	 * 확인 버튼 이벤트
	 */
	nextAction: function(){
		var me = this,
			baseform= me.down('form'),
			record	= baseform.getRecord(),
			values	= baseform.getValues(),
			uper_seqn   = 1
		;
		console.log(me.popup.params.item_idcd);
		resource.loadPopup({
			widget: 'module-sjflv-workentry-popup-start-third',
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
			},
		});
		me.close();
	},

});