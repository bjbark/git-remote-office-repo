Ext.define('module.custom.sjflv.prod.prodplanmtrl.view.ProdPlanMtrlPopup', { extend: 'Axt.popup.Search',
	alias	: 'widget.module-sjflv-prodplanmtrl-popup',

	title	: '발주실행',
	closable: true,
	autoShow: true,
	width	: 770,
	height	: 205,
	layout	: {
		type: 'border'
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
	createForm: function(){
		var  me   = this,
			form = {
				xtype		: 'form-layout',
				region		: 'center',
				border		: false,
				dockedItems	: [ me.createToolBar() ],
				items		: [ me.createItem() ]
			}
		;
		return form;
	},
	
	createItem: function(){
		var me = this,
		form = {
			xtype	: 'form-panel',
			region	: 'center',
			layout	: 'vbox',
			defaults: { border: false, margin: 5 },
			items	: [
				{	xtype	: 'fieldset',
					layout	: 'hbox',
					items	: [
						{	xtype		: 'textfield',
							name		: 'invc_numb',
							fieldLabel	: '발주번호',
							readOnly	: true,
							fieldCls	: 'readonlyfield',
							value		: me.popup.params.get('invc_numb')
						},{	xtype		: 'popupfield',
							fieldLabel	: Language.get('cstm_name','거래처'),
							name		: 'cstm_name',
							pair		: 'cstm_idcd',
							width		: 300,
							clearable	: true,
							margin		: '0 0 0 0',
							fieldCls	: 'requiredindex',
							emptyText	: '필수입력',
							popup: {
								select	: 'SINGLE',
								widget	: 'lookup-cstm-popup',
								params	: { stor_grp : _global.stor_grp , line_stat : '0' },
								result	: function(records, nameField, pairField) {
									nameField.setValue(records[0].get('cstm_name'));
									pairField.setValue(records[0].get('cstm_idcd'));
								}
							}
						},{	xtype	: 'textfield' ,
							name	: 'cstm_idcd', 
							hidden	: true
						}
					]
				},{	xtype	: 'fieldset',
					layout	: 'hbox',
					items	: [
						{	xtype		: 'textfield',
							name		: 'item_code',
							fieldLabel	: '자재코드',
							readOnly	: true,
							fieldCls	: 'readonlyfield',
							value		: me.popup.params.get('item_code')
						},{	xtype		: 'textfield',
							name		: 'item_name',
							width		: 300,
							fieldLabel	: '자재품명',
							readOnly	: true,
							fieldCls	: 'readonlyfield',
							value		: me.popup.params.get('item_name')
						},{	xtype		: 'textfield',
							name		: 'item_spec',
							fieldLabel	: '규격',
							readOnly	: true,
							fieldCls	: 'readonlyfield',
							value		: me.popup.params.get('item_spec')
						}
					]
				},{	xtype	: 'fieldset',
					layout	: 'hbox',
					items	: [
						{	xtype		: 'numericfield',
							name		: 'reqt_qntt',
							fieldLabel	: '발주수량',
							value		: me.popup.params.get('purc_qntt'),
							fieldCls	: 'requiredindex',
							emptyText	: '필수입력',
							listeners	: {
								blur	: function(){
									me.calcAmount();
								}
							}
						},{	xtype		: 'numericfield',
							name		: 'reqt_pric',
							width		: 150,
							fieldLabel	: '발주단가',
							fieldCls	: 'requiredindex',
							emptyText	: '필수입력',
							listeners	: {
								blur	: function(){
									me.calcAmount();
								}
							}
						},{	xtype		: 'numericfield',
							name		: 'reqt_amnt',
							width		: 150,
							readOnly	: true,
							fieldCls	: 'readonlyfield',
							fieldLabel	: '발주금액'
						}
					]
				},{	xtype	: 'fieldset',
					layout	: 'hbox',
					items	: [
						{	xtype		: 'datefield',
							name		: 'deli_reqt_date',
							fieldLabel	: '납기일자',
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							fieldCls	: 'requiredindex',
							emptyText	: '필수입력',
						},{	fieldLabel	: Language.get('drtr_name','담당자'),
							xtype		: 'popupfield',
							enableKeyEvents : true,
							name		: 'drtr_name',
							width		: 300,
							pair		: 'drtr_idcd',
							clearable	: true,
							fieldCls	: 'requiredindex',
							emptyText	: '필수입력',
							popup: {
								select : 'SINGLE',
								widget : 'lookup-user-popup',
								params : { stor_grp : _global.stor_grp , line_stat : '0' },
								result : function(records, nameField, pairField) {
									nameField.setValue(records[0].get('user_name'));
									pairField.setValue(records[0].get('user_idcd'));
									me.down('textfield[name="dept_idcd"]').setValue(records[0].get('dept_idcd'));
								}
							}
						},{	xtype : 'textfield',
							name : 'drtr_idcd',
							hidden : true
						}
					]
				},{	xtype	: 'fieldset',
					layout	: 'hbox',
					hidden	: true,
					items	: [
						{	xtype		: 'textfield',
							name		: 'item_idcd',
							value		: me.popup.params.get('item_idcd')
						},{	xtype		: 'datefield',
							name		: 'invc_date',
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							value		: me.popup.params.get('invc_date')
						},{	xtype		: 'numberfield',
							name		: 'plan_invc_numb',
							value		: me.popup.params.get('plan_invc_numb')
						},{	xtype		: 'numberfield',
							name		: 'plan_line_seqn',
							value		: me.popup.params.get('plan_line_seqn')
						},{	xtype		: 'textfield',
							name		: 'dept_idcd'
						},{	xtype		: 'numericfield',
							name		: 'line_seqn',
							value		: 1
						},{	xtype		: 'textfield',
							name		: 'unit_idcd',
							value		: me.popup.params.get('unit_idcd')
						},{	xtype		: 'textfield',
							name		: 'acpt_numb',
							value		: me.popup.params.get('acpt_numb'),
						},{	xtype		: 'textfield',
							name		: 'acpt_amnd_degr',
							value		: me.popup.params.get('acpt_amnd_degr'),
						},{	xtype		: 'textfield',
							name		: 'acpt_seqn',
							value		: me.popup.params.get('acpt_seqn'),
						}
					]
				}
			]
		};
		return form	
	},
	
	createToolBar: function(){
		var me = this,
		toolBar = {
			xtype	: 'toolbar',
			dock	: 'bottom',
			items	: [
				'->',
				{ text: Const.FINISH.text, iconCls: Const.FINISH.icon, scope: me, handler: me.finishAction, cls: 'button-style' },
				'-',
				{ text: Const.CLOSER.text, iconCls: Const.CLOSER.icon, scope: me, handler: me.close , cls: 'button-style'}
			]
		};
		return toolBar;
	},

	finishAction: function(){
		var me = this,
		formData = Ext.merge(me.down('form-panel').getValues(), {_set: 'insert', crt_id: _global.login_id, udt_id: _global.login_id}),
		isRequiredFilled = true;
		
		me.down('form').queryBy(function(comp) {
			if (comp.fieldCls == 'requiredindex') {
				if (comp.value === null || comp.value === undefined || comp.value === "") {
					isRequiredFilled  = false;
				}
			}
		});
		
		if (!isRequiredFilled ) {
			Ext.Msg.alert('알림', '모든 필수 입력값을 입력해주세요.');
			return false;
		}
		
		Ext.Ajax.request({
			url		: _global. location.http () + '/custom/sjflv/prod/prodplanmtrl/set/purctrst.do',
			method	: "POST",
			params	: {
				token : _global. token_id ,
				param : JSON.stringify({
					records: [formData]
				})
			},
			async	: false,
			success : function(response, request) {
				me.close();
				Ext.Msg.alert('알림', '발주요청 완료.');
			},
			failure : function(response, request) {
				resource.httpError(response);
			},
			callback : function() {
			}
		});
	},
	
	calcAmount: function(){
		var me = this,
		qntt = me.down('numericfield[name="reqt_qntt"]').getValue(),
		pric = me.down('numericfield[name="reqt_pric"]').getValue();
		
		me.down('numericfield[name="reqt_amnt"]').setValue(qntt * pric);
	}
});
