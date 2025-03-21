Ext.define('module.custom.sjflv.prod.prodplan.view.StokAsgnPopup', { extend: 'Axt.popup.Upload',
	alias	: 'widget.module-sjflv-stokasgn-popup',
	//store	: '',

	title	: '재고할당 등록',
	closable: true,
	autoShow: true,
	width	: 860,
	height	: 136,
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
							fieldLabel	: '주문번호',
							readOnly	: true,
							fieldCls	: 'readonlyfield',
							labelWidth	: 50,
							value		: me.popup.params.get('invc_numb')
						},{	xtype		: 'textfield',
							name		: 'line_seqn',
							hidden		: true,
							value		: me.popup.params.get('line_seqn')
						},{	xtype		: 'textfield',
							name		: 'item_code',
							fieldLabel	: '제품코드',
							readOnly	: true,
							fieldCls	: 'readonlyfield',
							value		: me.popup.params.get('item_code')
						},{	xtype		: 'textfield',
							name		: 'item_name',
							fieldLabel	: '제품명',
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
							name		: 'invc_qntt',
							fieldLabel	: '주문수량',
							readOnly	: true,
							fieldCls	: 'readonlyfield',
							labelWidth	: 50,
							value		: me.popup.params.get('invc_qntt')
						},{	xtype		: 'numericfield',
							name		: 'stok_qntt',
							fieldLabel	: '재고수량',
							readOnly	: true,
							fieldCls	: 'readonlyfield',
							value		: me.popup.params.get('stok_qntt')
						},{	xtype		: 'numericfield',
							name		: 'stok_asgn_qntt',
							fieldLabel	: '재고할당',
							value		: me.popup.params.get('stok_asgn_qntt'),
							fieldCls	: 'requiredindex',
							emptyText	: '필수입력',
							listeners	: {
								change	: function(field, newVal, oldVal){
									var invcQntt = me.down('numericfield[name=invc_qntt]');
									var stokQntt = me.down('numericfield[name=stok_qntt]');
									var addQntt = me.down('numericfield[name=add_plan_qntt]');
									
									if (newVal > stokQntt.getValue()) {
										Ext.Msg.alert('알림', '할당량이 현재 재고 수량을 초과했습니다. 재고를 초과하지 않도록 할당량을 조정해 주세요.');
										field.setValue(0);
									} else {
										addQntt.setValue(invcQntt.getValue() - field.getValue());
									}
								}
							}
						},{	xtype		: 'numericfield',
							name		: 'add_plan_qntt',
							fieldLabel	: '추가생산',
							readOnly	: true,
							fieldCls	: 'readonlyfield',
							value		: me.popup.params.get('add_plan_qntt')
						}
					]
				}
			]
		};
		return form	
	},
	
	createToolBar: function() {
		var me = this,
		toolBar = {
			xtype	: 'toolbar',
			dock	: 'bottom',
			items	: [
				'->',
				{ text: Const.FINISH.text, iconCls: Const.FINISH.icon, scope: me, handler: me.finishAction, cls: 'button-style' },
				'-',
				{ text: Const.CLOSER.text, iconCls: Const.CLOSER.icon, scope: me, handler: me.close, cls: 'button-style'}
			]
		};
		return toolBar;
	},
	
	finishAction: function() {
		var me = this,
		formData = me.down('form-panel').getValues(),
		data = [{
			invc_numb		: formData.invc_numb,
			line_seqn		: formData.line_seqn,
			stok_asgn_qntt	: formData.stok_asgn_qntt
		}];
		
		if (formData.stok_asgn_qntt < 1) {
			Ext.Msg.alert('알림', '재고 할당 수량은 0 이상의 값을 입력해 주세요.');
			return false;
		}
		
		Ext.Ajax.request({
			url		: _global. location.http () + '/custom/sjflv/prod/prodplan/set/stokasgn.do',
			method	: "POST",
			params	: {
				token : _global. token_id ,
				param : JSON.stringify({
					records: data
				})
			},
			async	: false,
			success : function(response, request) {
				me.popup.caller.selectAction();
				me.close();
				Ext.Msg.alert('알림', '재고 할당 완료.');
			},
			failure : function(response, request) {
				resource.httpError(response);
			},
			callback : function() {
			}
		});
	},
});
