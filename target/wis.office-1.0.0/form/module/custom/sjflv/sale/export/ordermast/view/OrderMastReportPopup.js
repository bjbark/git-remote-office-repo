Ext.define('module.custom.sjflv.sale.export.ordermast.view.OrderMastReportPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-ordermast-report-popup',

	title		: '수출신고필증 입력',
	closable	: true,
	autoShow	: true,
	width		: 940 ,
	height		: 350,
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
						{ xtype: 'button' , text : Const.UPDATE.text, iconCls: Const.UPDATE.icon , scope: me, handler: me.finishAction,cls: 'button-style'},'-',
						{ xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close,cls: 'button-style' }
					]
				}
			],
			items : [me.editorForm() ]
		};
		return form;
	},

	editorForm : function () {
		var	me	= this,
			form = {
				xtype		: 'form-panel' ,
				bodyStyle	: { padding: '5px' },
				flex		: 1 ,
				height		: 400,
				fieldDefaults	: { width : 200, labelWidth : 80, labelSeparator : '' , },
				items			: [
					{	xtype : 'fieldset', layout: 'vbox', border		: 0,
						items : [
							{	xtype : 'fieldset', layout: 'hbox', border		: 0,margin		: '5 0 0 5',
								items : [
									{	fieldLabel	: Language.get('', '수출통관번호' ),
										xtype		: 'textfield',
										name		: '',
										allowBlank	: false ,
										emptyText	: Const.invalid.emptyValue,
										fieldCls	: 'requiredindex',
									},{ xtype		: 'lookupfield',
										name		: 'line_stat',
										lookupValue	: resource.lookup('line_stat'),
										margin		: '1 0 0 2',
										width		: 60
									},{	fieldLabel	: Language.get('', '관리번호' ),
										xtype		: 'textfield',
										name		: '',
										emptyText	: Const.invalid.emptyValue,
										fieldCls	: 'requiredindex',
									},{	fieldLabel	: Language.get('invc_numb','Invoice No'),
										xtype		: 'popupfield',
										editable	: true,
										enableKeyEvents : true,
										name		: 'invc_numb',
										clearable	: true,
										emptyText	: Const.invalid.emptyValue,
										fieldCls	: 'requiredindex',
										popup: {
											select : 'SINGLE',
											widget : 'lookup-invc-popup',
											params : { stor_grp : _global.stor_grp , line_stat : '0' },
											result : function(records, nameField, pairField) {
												nameField.setValue(records[0].get('bzpl_name'));
											}
										}
									}
								]
							},{	xtype : 'fieldset', layout: 'hbox', border		: 0,margin		: '5 0 0 5',
								items : [
									{	fieldLabel	: Language.get('bzpl_name','사업장'),
										xtype		: 'popupfield',
										editable	: true,
										enableKeyEvents : true,
										name		: 'bzpl_name',
										pair		: 'bzpl_idcd',
										clearable	: true,
										width		: 262,
										popup: {
											select : 'SINGLE',
											widget : 'lookup-bzpl-popup',
											params : { stor_grp : _global.stor_grp , line_stat : '0' },
											result : function(records, nameField, pairField) {
												nameField.setValue(records[0].get('bzpl_name'));
												pairField.setValue(records[0].get('bzpl_idcd'));
											}
										}
									},{	name : 'bzpl_idcd', xtype : 'textfield' , hidden : true
									},{	fieldLabel	: Language.get('expt_dvcd','수출구분'),
										xtype		: 'lookupfield',
										name		: 'expt_dvcd',
										lookupValue	: resource.lookup('expt_dvcd'),
										value		: '일반수출'
									},{	fieldLabel	: Language.get('','통관일자'),
										xtype		: 'datefield',
										name		: '',
										format		: Const.DATE_FORMAT_YMD_BAR,
										submitFormat: Const.DATE_FORMAT_YMD,
									},{	fieldLabel	: Language.get('','수락일자'),
										xtype		: 'datefield',
										name		: '',
										format		: Const.DATE_FORMAT_YMD_BAR,
										submitFormat: Const.DATE_FORMAT_YMD,
									}
								]
							},{	xtype : 'fieldset', layout: 'hbox', border		: 0,margin		: '5 0 0 5',
								items : [
									{	fieldLabel	: Language.get('', '무역업고유부호' ),
										xtype		: 'textfield',
										name		: '',
										width		: 262,
									},{	fieldLabel	: Language.get('', '수출자구분' ),
										xtype		: 'textfield',
										name		: '',
									},{	fieldLabel	: Language.get('', '통관고유번호' ),
										xtype		: 'textfield',
										name		: '',
									}
								]
							},{	xtype : 'fieldset', layout: 'hbox', border		: 0,margin		: '5 0 0 5',
								items : [
									{	fieldLabel	: Language.get('buyr_name', 'Buyer' ),
										xtype		: 'textfield',
										name		: 'buyr_name',
										width		: 262,
									},{	fieldLabel	: Language.get('mdtn_prsn', '중개인' ),
										xtype		: 'textfield',
										name		: 'mdtn_prsn',
									},{	fieldLabel	: Language.get('drtr_name','담당자'),
										xtype		: 'popupfield',
										editable	: true,
										enableKeyEvents : true,
										name		: 'drtr_name',
										pair		: 'drtr_idcd',
										clearable	: true,
										popup: {
											select : 'SINGLE',
											widget : 'lookup-user-popup',
											params : { stor_grp : _global.stor_grp , line_stat : '0' },
											result : function(records, nameField, pairField) {
												nameField.setValue(records[0].get('user_name'));
												pairField.setValue(records[0].get('user_idcd'));
											}
										}
									},{	name : 'drtr_idcd', xtype : 'textfield' , hidden : true
									}
								]
							},{	xtype : 'fieldset', layout: 'hbox', border		: 0,margin		: '5 0 0 5',
								items : [
									{	fieldLabel	: Language.get('', '구매자고유번호' ),
										xtype		: 'textfield',
										name		: '',
										width		: 262,
									},{	fieldLabel	: Language.get('','면장거래구분'),
										xtype		: 'lookupfield',
										name		: '',
										lookupValue	: resource.lookup(''),
									},{	fieldLabel	: Language.get('','수출면장종류'),
										xtype		: 'lookupfield',
										name		: '',
										lookupValue	: resource.lookup(''),
										value		: '일반수출면장',
									},{	fieldLabel	: Language.get('', '위탁자' ),
										xtype		: 'textfield',
										name		: '',
									}
								]
							},{	xtype : 'fieldset', layout: 'hbox', border		: 0,margin		: '5 0 0 5',
								items : [
									{	fieldLabel	: Language.get('','가격조건'),
										xtype		: 'lookupfield',
										name		: '',
										value		: 'FOB',
										lookupValue	: resource.lookup(''),
										width		: 232,
									},{	fieldLabel	: Language.get('','결제방법'),
										xtype		: 'lookupfield',
										name		: '',
										value		: 'L/C',
										margin		: '0 0 0 30',
										lookupValue	: resource.lookup(''),
									},{	fieldLabel	: Language.get('','결제시기'),
										xtype		: 'lookupfield',
										name		: '',
										lookupValue	: resource.lookup(''),
									},{	fieldLabel	: Language.get('','결제기한'),
										xtype		: 'lookupfield',
										name		: '',
										lookupValue	: resource.lookup(''),
									}
								]
							},{	xtype : 'fieldset', layout: 'hbox', border		: 0,margin		: '5 0 0 5',
								items : [
									{	fieldLabel	: Language.get('','Ship Via'),
										xtype		: 'lookupfield',
										name		: '',
										value		: 'At Sight',
										lookupValue	: resource.lookup(''),
										width		: 232,
									},{	fieldLabel	: Language.get('','운송형태'),
										xtype		: 'lookupfield',
										name		: '',
										margin		: '0 0 0 30',
										lookupValue	: resource.lookup(''),
									},
								]
							},{	xtype : 'fieldset', layout: 'hbox', border		: 0,margin		: '5 0 0 5',
								items : [
									{	fieldLabel	: Language.get('unit_name','화폐단위'),
										xtype		: 'numericfield',
										name		: '',
										width		: 232,
									},{	fieldLabel	: Language.get('', '환율' ),
										xtype		: 'numericfield',
										name		: '',
										margin		: '0 0 0 30',
									},{	fieldLabel	: Language.get('', '판매금액' ),
										xtype		: 'numericfield',
										name		: '',
									},{	fieldLabel	: Language.get('', '원화금액' ),
										xtype		: 'numericfield',
										name		: '',
									}
								]
							},{	xtype : 'fieldset', layout: 'hbox', border		: 0,margin		: '5 0 0 5',
								items : [
									{	fieldLabel	: Language.get('', 'Remarks' ),
										xtype		: 'textfield',
										name		: 'user_memo',
										width		: 862,
									}
								]
							}
						]
					}
				]
			};
		return form;
	},

	/**
	 * 확인 버튼 이벤트
	 */
	finishAction: function(){
		var me = this,
			baseform= me.down('form'),
			record	= baseform.getRecord(),
			values	= baseform.getValues(),
			master	= Ext.ComponentQuery.query('module-estimast1-lister-master')[0],
			detail	= Ext.ComponentQuery.query('module-estimast1-lister-detail')[0],
			record
		;

		if(values.deli_date==''){
			Ext.Msg.alert("알림","납기일자를 입력해주십시오.");
		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();

			Ext.Msg.confirm("확인", "주문등록을 하시겠습니까?", function(button) {
				if (button == 'yes') {

					record = String(me.params.param).slice(0,-3)+",\"deli_date\":\""+values.deli_date+"\"}]}";

					Ext.Ajax.request({
						url			: _global.api_host_info + '/' + _global.app_site + '/custom/iypkg/sale/order/estimast1/set/acpt.do',
						method		: "POST",
						params		: {
							token	: _global.token_id,
							param	: Ext.encode({
								records		: record,
							})
						},
						async : false,
						success : function(response, request) {
							var object = response,
								result = Ext.decode(object.responseText),
								invcs  = ''
							;

							invcs += result.records[0].new_invc_numb;

							if(result.records.length > 1){
								for(var i = 1; i < result.records.length; i++){
									invcs += '],<br>['+ result.records[i].new_invc_numb;
								}
							}

							Ext.Msg.alert("알림","주문번호 <br>[<span style='color:blue;'>"+ invcs +"</span>]<br>으로 등록이 완료 되었습니다.");
							me.setResponse( {success : true});
						},
						failure : function(response, request) {
							resource.httpError(response);
						},
						callback : function() {
							master.getStore().reload();
						},
						finished : function(results, record, operation){
						}
					});
				}
			});
			mask.hide();
		}
	}
});
