Ext.define('module.custom.komec.prod.prodplan.view.ProdPlanPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-prodplan-popup',

	title		: '생산지시',
	closable	: true,
	autoShow	: true,
	width		: 380 ,
	height		: 580,
	layout		: {
		type : 'border'
	},

	defaultFocus : 'initfocused',

	initComponent: function(config){
		var me = this;
		me.items = [ me.createForm()];
		me.callParent(arguments);
	},

	/**
	 * 화면폼
	 */
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
			items : [me.editorForm() ]
		};
		return form;
	},

	editorForm : function () {
		var me	= this,
		form = {
			xtype	: 'form-panel',
			border	:  false,
			margin	: '15 0 0 0',
			layout	: { type: 'vbox', align: 'stretch' } ,
			items	: [
				{	xtype	: 'panel',
					layout	: 'vbox',
					border	: 0,
					items	: [
						{	xtype	: 'panel',
							layout	: 'hbox',
							margin	: '0 0 5 0',
							border	: 0,
							items	: [
								{	fieldLabel	: '주문번호',
									name		: 'invc_numb',
									xtype		: 'textfield',
									fieldCls	: 'readOnlyfield',
									readOnly	: true,
									width		: 200,
									labelWidth	: 65,
								}
							]
						},{	fieldLabel	: '거래처명',
							name		: 'cstm_name',
							xtype		: 'textfield',
							fieldCls	: 'readOnlyfield',
							readOnly	: true,
							width		: 330,
							labelWidth	: 65,
						},{	fieldLabel	: '주문명',
							name		: 'acpt_case_name',
							xtype		: 'textfield',
							fieldCls	: 'readOnlyfield',
							readOnly	: true,
							width		: 330,
							labelWidth	: 65,
						},{	fieldLabel	: '영업담당',
							name		: 'drtr_name',
							xtype		: 'textfield',
							fieldCls	: 'readOnlyfield',
							readOnly	: true,
							width		: 330,
							labelWidth	: 65,
						},{	fieldLabel	: '주문일자',
							xtype		: 'datefield',
							name		: 'invc_date',
							width		: 165,
							labelWidth	: 65,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							fieldCls	: 'readOnlyfield',
							readOnly	: true,
						},{	xtype	: 'panel',
							layout	: 'hbox',
							border	: 0,
							margin	: '0 0 5 0',
							items	: [
								{	fieldLabel	: '품명',
									name		: 'item_name',
									xtype		: 'textfield',
									fieldCls	: 'readOnlyfield',
									readOnly	: true,
									width		: 165,
									labelWidth	: 65,
								},{	fieldLabel	: Language.get('','리비전'),
									xtype		: 'popupfield',
									editable	: false,
									enableKeyEvents : true,
									name		: 'revs_numb',
									width		: 165,
									labelWidth	: 65,
									clearable	: true,
									allowBlank	: false,
									fieldCls	: 'requiredindex',
									emptyText	: Const.invalid.emptyValue,
									popup: {
										select : 'SINGLE',
										widget : 'lookup-revs-popup',
										params : { stor_grp : _global.stor_grp , line_stat : '0' },
										result : function(records, nameField) {
											nameField.setValue(records[0].get('revs_numb'));
										}
									}
								}
							]
						},{	fieldLabel	: '규격',
							name		: 'item_spec',
							xtype		: 'textfield',
							fieldCls	: 'readOnlyfield',
							readOnly	: true,
							width		: 330,
							labelWidth	: 65,
						},{	fieldLabel	: '납기일자',
							xtype		: 'datefield',
							name		: 'deli_date',
							fieldCls	: 'readOnlyfield',
							readOnly	: true,
							width		: 165,
							labelWidth	: 65,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD
						},{	fieldLabel	: '주문수량',
							name		: 'invc_qntt',
							xtype		: 'numericfield',
							width		: 165,
							labelWidth	: 65,
							fieldCls	: 'readOnlyfield',
							readOnly	: true,
						},{	xtype	: 'panel',
							layout	: 'hbox',
							border	: 0,
							items	: [
								{	fieldLabel	: '재고사용량',
									name		: 'stok_asgn_qntt',
									xtype		: 'numericfield',
									width		: 165,
									labelWidth	: 65,
									fieldCls	: 'readOnlyfield',
									readOnly	: true,
								},{	fieldLabel	: '생산필요량',
									name		: 'need_qntt',
									xtype		: 'numericfield',
									width		: 165,
									fieldCls	: 'readOnlyfield',
									readOnly	: true,
								}
							]
						},{	xtype	: 'panel',
							layout	: 'hbox',
							border	: 0,
							margin	: '5 0 0 0',
							items	: [
								{	fieldLabel	: '지시수량',
									name		: 'totl_indn_qntt',
									xtype		: 'numericfield',
									width		: 165,
									labelWidth	: 65,
									fieldCls	: 'readOnlyfield',
									readOnly	: true,
								},{	fieldLabel	: '지시잔량',
									name		: 'pror_remn_qntt',
									xtype		: 'numericfield',
									width		: 165,
									fieldCls	: 'readOnlyfield',
									readOnly	: true,
								}
							]
						},
					]
				/* -------------------- 필수입력란(이하) --------------------*/
				},{	xtype	: 'panel',
					layout	: 'vbox',
					border	: 0,
					margin	: '13 0 0 0',
					items	: [
						{	xtype	: 'panel',
							layout	: 'hbox',
							border	: 0,
							margin	: '5 0 0 0',
							items	: [
								{	fieldLabel	: Language.get('item','생산라인'),
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									name		: 'wkfw_name',
									pair		: 'wkfw_idcd',
									width		: 165,
									labelWidth	: 65,
									clearable	: true,
									allowBlank	: false,
									fieldCls	: 'requiredindex',
									emptyText	: Const.invalid.emptyValue,
									popup: {
										select : 'SINGLE',
										widget : 'lookup-wkfw-popup',
										params : { stor_grp : _global.stor_grp , line_stat : '0', acct_bacd:'제품' },
										result : function(records, nameField, pairField) {
											nameField.setValue(records[0].get('wkfw_name'));
											pairField.setValue(records[0].get('wkfw_idcd'));
										}
									}
								},{	fieldLabel	: Language.get('item','담당자'),
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									name		: 'pror_drtr_name',
									width		: 165,
									labelWidth	: 65,
									pair		: 'pror_drtr_idcd',
									clearable	: true,
									popup: {
										select : 'SINGLE',
										widget : 'lookup-user-popup',
										params : { stor_grp : _global.stor_grp , line_stat : '0', acct_bacd:'제품' },
										result : function(records, nameField, pairField) {
											nameField.setValue(records[0].get('user_name'));
											pairField.setValue(records[0].get('user_idcd'));
										}
									}
								},{	xtype	: 'textfield',
									name	: 'pror_drtr_idcd',
									hidden	:true
								},{	name : 'wkfw_idcd', xtype : 'textfield' , hidden : true
								}
							]
						},{	xtype	: 'panel',
							layout	: 'hbox',
							border	: 0,
							margin	: '5 0 5 0',
							items	: [
								{	fieldLabel	: Language.get('wrhs','생산창고'),
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									name		: 'wrhs_name',
									pair		: 'wrhs_idcd',
									width		: 165,
									labelWidth	: 65,
									clearable	: true,
									allowBlank	: false,
									fieldCls	: 'requiredindex',
									emptyText	: Const.invalid.emptyValue,
									popup: {
										select : 'SINGLE',
										widget : 'lookup-wrhs-popup',
										params : { stor_grp : _global.stor_grp , line_stat : '0', mngt_wrhs_dvcd : '0002' },
										result : function(records, nameField, pairField) {
											nameField.setValue(records[0].get('wrhs_name'));
											pairField.setValue(records[0].get('wrhs_idcd'));
										}
									}
								},{	fieldLabel	: Language.get('cvic','설비'),
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									name		: 'cvic_name',
									pair		: 'cvic_idcd',
									width		: 165,
									labelWidth	: 65,
									clearable	: true,
									popup: {
										select : 'SINGLE',
										widget : 'lookup-cvic-popup',
										params : { stor_grp : _global.stor_grp , line_stat : '0',cvic_kind_dvcd:'1000' },
										result : function(records, nameField, pairField) {
											nameField.setValue(records[0].get('cvic_name'));
											pairField.setValue(records[0].get('cvic_idcd'));
										}
									}
								},{	xtype	: 'textfield',name	: 'wrhs_idcd', hidden : true
								},{ xtype	: 'textfield',name  : 'cvic_idcd', hidden : true
								}
							]
						},{	xtype	: 'panel',
							layout	: 'hbox',
							border	: 0,
							items	: [
								{	fieldLabel	: Language.get('inqy_term','일정계획'),
									xtype		: 'datetimefield',
									name		: 'strt_dttm',
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
								},{	text		: '~',
									xtype		: 'label',
									width		: 15,
									style		: 'text-align:center'
								},{	xtype		: 'datetimefield',
									name		: 'endd_dttm',
									width		: 120,
									hourText	: 'H',
									minuteText	: 'M',
									todayText	: '오늘',
									format		: 'Y-m-d H:i',
									submitFormat: 'YmdHi',
									allowBlank	: false,
									fieldCls	: 'requiredindex',
									emptyText	: Const.invalid.emptyValue,
								}
							]
						},{	xtype	: 'panel',
							layout	: 'hbox',
							margin	: '5 0 0 0',
							border	: 0,
							items	: [
								{	fieldLabel	: Language.get('pdod_date','지시일자'),
									xtype		: 'datefield',
									name		: 'pdod_date',
									width		: 165,
									labelWidth	: 65,
									format		: 'Y-m-d',
									submitFormat: 'Ymd',
									allowBlank	: false,
									fieldCls	: 'requiredindex',
									value		: new Date(),
									emptyText	: Const.invalid.emptyValue,
								},{	fieldLabel	: '지시수량',
									name		: 'indn_qntt',
									xtype		: 'numericfield',
									width		: 165,
									labelWidth	: 65,
									allowBlank	: false,
									fieldCls	: 'requiredindex',
									emptyText	: Const.invalid.emptyValue,
								},
							]
						},{	fieldLabel	: 'Lot No',
							name		: 'lott_numb',
							xtype		: 'textfield',
							margin		: '5 0 0 0',
							labelWidth	: 65,
							width		: 330,
						},{	xtype		: 'textfield', name	: 'pror_numb'		, hidden	: true
						},{	xtype		: 'textfield', name	: 'bzpl_idcd'		, hidden	: true
						},{	xtype		: 'textfield', name	: 'amnd_degr'		, hidden	: true
						},{	xtype		: 'textfield', name	: 'line_seqn'		, hidden	: true
						},{	xtype		: 'textfield', name	: 'cstm_idcd'		, hidden	: true
						},{	xtype		: 'textfield', name	: 'item_idcd'		, hidden	: true
						},{	xtype		: 'textfield', name	: 'updt_idcd'		, hidden	: true , value:_global.login_pk
						},{	xtype		: 'textfield', name	: 'crte_idcd'		, hidden	: true , value:_global.login_pk
						},{	xtype		: 'textfield', name	: 'prog_stat_dvcd'	, hidden	: true
						}
					]
				},
			]
		};
		return form;
	},

	/**
	 * 확인 버튼 이벤트
	 */

	finishAction: function(){
		var me		= this,
			baseform= me.down('form'),
			record	= baseform.getRecord(),
			values	= baseform.getValues(),
			master2	= Ext.ComponentQuery.query('module-prodplan-lister-master2')[0]
		;
		if(baseform.isValid()){
			if(Number(values.indn_qntt) > Number(values.pror_remn_qntt) || values.indn_qntt <= 0){
				Ext.Msg.alert('알림','지시수량을 확인해주세요.');
				return;
			}

			if(Number(values.indn_qntt) > 6000){
				Ext.Msg.alert('알림','지시 수량  6 ton 이상 불가합니다.');
				return;
			}

			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();
			Ext.merge(values,{_set : me.params._set});

			Ext.Ajax.request({
				url		: _global.location.http() + '/custom/komec/prod/prodplan/get/prorLotCheck.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
							lott_numb : values.lott_numb
					})
				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);

					console.log(result.records[0].cnt);
					if	(!result.success ){
						Ext.Msg.error(result.message );
						return;
					} else {
						if(result.records[0].cnt > 0){
							Ext.Msg.alert('알림','중복된 Lot입니다. 다시 입력해주세요.');
							return;
						}
						Ext.Ajax.request({
							url		: _global.location.http() + '/custom/komec/prod/prodplan/set/pror.do',
							params	: {
								token : _global.token_id,
								param : JSON.stringify({records:[values]})
							},
							async	: false,
							method	: 'POST',
							success	: function(response, request) {
								var result = Ext.decode(response.responseText);
								master2.getStore().reload({
									callback:function(){
										var	frec	= master2.getStore().findRecord('line_seqn',1),
											idx
										;
										if(frec){
											idx = frec.index;
											master2.getSelectionModel().select(idx);
										}
									}
								});
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
								mask.hide();
								master2.getStore().reload();
							}
						});
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
					mask.hide();
					master2.getStore().reload();
				}
			});
		}
	}
});
