Ext.define('module.custom.kortc.prod.order.porderplan.view.PorderPlanAmendPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-porderplan-pror-popup',

	title		: '생산지시',
	closable	: true,
	autoShow	: true,
	width		: 380 ,
	height		: 520,
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
									width		: 165,
								},{	fieldLabel	: '주문일자',
									xtype		: 'datefield',
									name		: 'invc_date',
									width		: 165,
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD,
									fieldCls	: 'readOnlyfield',
									readOnly	: true,
								}
							]
						},{	fieldLabel	: '거래처명',
							name		: 'cstm_name',
							xtype		: 'textfield',
							fieldCls	: 'readOnlyfield',
							readOnly	: true,
							width		: 330,
						},{	fieldLabel	: '주문명',
							name		: 'acpt_case_name',
							xtype		: 'textfield',
							fieldCls	: 'readOnlyfield',
							readOnly	: true,
							width		: 330,
						},{	xtype	: 'panel',
							layout	: 'hbox',
							border	: 0,
							items	: [
								{	fieldLabel	: '영업담당',
									name		: 'drtr_name',
									xtype		: 'textfield',
									fieldCls	: 'readOnlyfield',
									readOnly	: true,
									width		: 165,
								},{	fieldLabel	: '품목코드',
									name		: 'item_code',
									xtype		: 'textfield',
									fieldCls	: 'readOnlyfield',
									readOnly	: true,
									width		: 165,
								},
							]
						},{	fieldLabel	: '품명',
							margin		: '5 0 5 0',
							name		: 'item_name',
							xtype		: 'textfield',
							fieldCls	: 'readOnlyfield',
							readOnly	: true,
							width		: 330,
						},{	fieldLabel	: '규격',
							name		: 'item_spec',
							xtype		: 'textfield',
							fieldCls	: 'readOnlyfield',
							readOnly	: true,
							width		: 330,
						},{	xtype	: 'panel',
							layout	: 'hbox',
							border	: 0,
							items	: [
								{	fieldLabel	: '주문수량',
									name		: 'invc_qntt',
									xtype		: 'numericfield',
									width		: 165,
									fieldCls	: 'readOnlyfield',
									readOnly	: true,
								},{	fieldLabel	: '납기일자',
									xtype		: 'datefield',
									name		: 'deli_date',
									fieldCls	: 'readOnlyfield',
									readOnly	: true,
									width		: 165,
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD
								}
							]
						},{	xtype	: 'panel',
							layout	: 'hbox',
							border	: 0,
							margin	: '5 0 0 0',
							items	: [
								{	fieldLabel	: '재고사용량',
									name		: 'stok_asgn_qntt',
									xtype		: 'numericfield',
									width		: 165,
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
								{	fieldLabel	: '지시총량',
									name		: 'totl_indn_qntt',
									xtype		: 'numericfield',
									width		: 165,
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
				},{	xtype	: 'panel',
					layout	: 'vbox',
					border	: 0,
					margin	: '10 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('item','생산라인'),
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							name		: 'wkfw_name',
							pair		: 'wkfw_idcd',
							width		: 330,
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
						},{	name : 'wkfw_idcd', xtype : 'textfield' , hidden : true
						},{	xtype	: 'panel',
							layout	: 'hbox',
							border	: 0,
							items	: [
								{	fieldLabel	: Language.get('inqy_term','일정계획'),
									xtype		: 'datetimefield',
									name		: 'strt_dttm',
									width		: 195,
									hourText	: 'H',
									minuteText	: 'M',
									todayText	: '오늘',
									value		: new Date(),
									format		: 'Y-m-d H:i',
									submitFormat: 'YmdHis',
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
									value		: new Date(),
									format		: 'Y-m-d H:i',
									submitFormat: 'YmdHis',
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
								{	fieldLabel	: Language.get('item','담당자'),
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									name		: 'pror_drtr_name',
									width		: 170,
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
								},{	name : 'pror_drtr_idcd', xtype : 'textfield' , hidden : true
								},{	fieldLabel	: '지시수량',
									name		: 'indn_qntt',
									xtype		: 'numericfield',
									labelWidth	: 65,
									width		: 160,
									allowBlank	: false,
									fieldCls	: 'requiredindex',
									emptyText	: Const.invalid.emptyValue,
								}
							]
						},{	fieldLabel	: 'Lot No',
							name		: 'lott_numb',
							xtype		: 'textfield',
							margin		: '5 0 0 0',
							width		: 330,
						},{	fieldLabel	: '전달사항',
							name		: 'remk_text',
							xtype		: 'textarea',
							margin		: '5 0 0 0',
							width		: 330,
						},{	xtype		: 'textfield', name	: 'pror_numb', hidden	: true
						},{	xtype		: 'textfield', name	: 'bzpl_idcd', hidden	: true
						},{	xtype		: 'textfield', name	: 'amnd_degr', hidden	: true
						},{	xtype		: 'textfield', name	: 'line_seqn', hidden	: true
						},{	xtype		: 'textfield', name	: 'cstm_idcd', hidden	: true
						},{	xtype		: 'textfield', name	: 'item_idcd', hidden	: true
						},{	xtype		: 'textfield', name	: 'updt_idcd', hidden	: true , value:_global.login_pk
						},{	xtype		: 'textfield', name	: 'crte_idcd', hidden	: true , value:_global.login_pk
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
			pror	= Ext.ComponentQuery.query('module-porderplan-lister-pror')[0]
			master2	= Ext.ComponentQuery.query('module-porderplan-lister-master2')[0]
		;
		if(baseform.isValid()){
			if((me.params._set =="insert" && values.indn_qntt > values.pror_remn_qntt ) || values.indn_qntt <= 0){
				Ext.Msg.alert('알림','지시수량을 확인해주세요.');
				return;
			}
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();
			Ext.merge(values,{_set : me.params._set});
			Ext.Ajax.request({
				url		: _global.location.http() + '/custom/kortc/prod/order/porderplan/set/pror.do',
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
				}
			});
		}
	}
});
