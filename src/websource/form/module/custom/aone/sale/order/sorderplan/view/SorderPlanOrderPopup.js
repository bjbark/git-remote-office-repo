Ext.define('module.custom.aone.sale.order.sorderplan.view.SorderPlanOrderPopup', { extend: 'Axt.popup.Search',
	alias : 'widget.module-aone-sorderplan-order-popup',

	title		: '일괄지시',
	closable	: true,
	autoShow	: true,
	width		: 340,
	height		: 270,
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
						{	fieldLabel	: Language.get('', '엔지니어' ),
							name		: 'prod_drtr_name',
							pair		: 'prod_drtr_idcd',
							xtype		: 'popupfield',
							width		: 175,
							editable	: false,
							enableKeyEvents : true,
							listeners	:{
								change : function(self, value){
									if (value != ''){
										var panel = this.up('form');
										panel.down('[name=acpt_stat_dvcd]').setValue('2000');
									}
								}
							},
							popup		: {
								widget	: 'lookup-user-popup',
								select	: 'SINGLE',
								params	: { stor_grp : _global.stor_grp, line_stat : '0', dept_idcd : '6000' },
								result	: function(records, nameField, pairField ) {
										nameField.setValue(records[0].get('user_name'));
										pairField.setValue(records[0].get('user_idcd'));
								}
							}
						},{name : 'prod_drtr_idcd'	, xtype	: 'textfield', hidden : true
						},{name : 'acpt_stat_dvcd'	, xtype	: 'textfield', hidden : true
						},{	fieldLabel	: Language.get('', '지시일자' ),
							xtype		: 'datefield',
							name		: 'pdod_date',
							width		: 175,
							editable	: false,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							value		: '',
							listeners	: {
								change : function(self, value){
									var panel	  = this.up('form');

									if(value != ''){
										var plan_strt_date = value;
										panel.down('[name=plan_strt_date]').setValue(plan_strt_date);

										var plan_endd_date = Ext.Date.add(new Date(plan_strt_date), Ext.Date.DAY, +7);
										panel.down('[name=plan_endd_date]').setValue(plan_endd_date);
									}
								}
							}
						},{	xtype : 'fieldset', layout: 'hbox', border : 0,
							items	: [
								{	fieldLabel	: Language.get('','작업계획'),
									xtype		: 'betweenfield',
									name		: 'plan_strt_date',
									pair		: 'plan_endd_date',
									labelWidth	: 55,
									width		: 160,
									root		: true,
									margin		: '0 0 0 5',
									editable	: false,
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD,
									value		: '',
								},{	xtype		: 'betweenfield',
									fieldLabel	: '~',
									labelWidth	: 20,
									name		: 'plan_endd_date',
									pair		: 'plan_strt_date',
									width		: 125,
									editable	: false,
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD,
									value		: '',
								}
							]
						},{	fieldLabel	: Language.get('','지시사항'),
							xtype		: 'textarea',
							name		: 'memo',
							width		: 300,
							height		: 80,
						},
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
			param	= me.param
		;
		var merge = Ext.merge(param,values);
		Ext.Ajax.request({
			url		: _global.location.http() + '/custom/aone/sale/order/sorderplan/set/recordsall.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify(
					merge
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

				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				me.close();
			}
		});
	}
});
