Ext.define('module.custom.sjflv.prod.prodplan.view.PlanDatePopup', { extend: 'Axt.popup.Upload',
	alias	: 'widget.module-sjflv-plandate-popup',

	title	: '계획일자 등록',
	closable: true,
	autoShow: true,
	width	: 230,
	height	: 110,
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
						{	fieldLabel	: Language.get('invc_date','계획일자'),
							xtype		: 'datefield',
							name		: 'plan_date',
							width		: 150,
							margin		: '3 0 0 15',
							labelWidth	: 45,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							/*maxValue	: me.popup.params.get('deli_date'),
							value		: me.popup.params.get('plan_date'),*/
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
				{ text: Const.UPDATE.text, iconCls: Const.UPDATE.icon, scope: me, handler: me.updateAction, cls: 'button-style' },
				'-',
				{ text: Const.CLOSER.text, iconCls: Const.CLOSER.icon, scope: me, handler: me.close, cls: 'button-style'}
			]
		};
		return toolBar;
	},
	
	updateAction: function() {
		var me = this;
		var owner = me.popup.owner;
		var selection = owner.getSelectionModel().getSelection();
		var formData = me.down('form-panel').getValues();
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.INSERT.mask});
		var data = [];
		
		if (formData.plan_date === '') {
			Ext.Msg.alert('알림', '계획일자를 입력해 주세요.');
			return false;
		}
		
		mask.show();
		
		Ext.Array.each(selection, function(rec) {
			data.push({
				invc_numb: rec.get('invc_numb'),
				line_seqn: rec.get('line_seqn'),
				plan_date: formData.plan_date,
				updt_idcd: _global.login_id,
				_set     : 'update'
			})
		})
		
		Ext.Ajax.request({
			url		: _global. location.http () + '/custom/sjflv/prod/prodplan/set/plandate.do',
			method	: 'POST',
			params	: {
				token : _global. token_id ,
				param : JSON.stringify({
					records: data
				})
			},
			async	: false,
			success : function(response, options) {
				if (response.status === 200) {
					owner.getStore().reload();
					Ext.Msg.alert('알림', '계획일자가 성공적으로 저장되었습니다.');
				}
			},
			failure : function(response, options) {
				resource.httpError(response);
			},
			callback : function(options, success, response) {
				mask.hide();
				me.close();
			}
		});
	},
});
