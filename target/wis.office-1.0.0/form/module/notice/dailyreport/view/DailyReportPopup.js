Ext.define('module.notice.dailyreport.view.DailyReportPopup', { extend: 'Axt.popup.Search',

	alias: 'widget.module-dailyreport-popup',

	title		: '업무일지',
	closable	: true,
	autoShow	: true,
	width		: 500 ,
	height		: 500,
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
			items : [me.editorForm() ]
		};
		return form;
	},

	editorForm: function() {
		var me	= this,
		form = {
			xtype	: 'form-panel',
			border	:  false,
			layout	: { type: 'vbox', align: 'stretch' } ,
			items	: [
			{	xtype	: 'panel',
				layout	: 'hbox',
				border	: 0,
				margin	: '10 0 0 0',
				items	: [
					{	fieldLabel	: Language.get('dwup_date','근무일자'),
						xtype		: 'datefield',
						name		: 'dwup_date',
						itemId		: 'dwup_date',
						width		: 210,
						labelWidth	: 55,
						value		: this.params.dwup_date,
						allowBlank	: false,
						fieldCls	: 'requiredindex',
						listeners	:{
							change	: function(a){
							}
						},
						emptyText	: Const.invalid.emptyValue,
						format		: Const.DATE_FORMAT_YMD_BAR,
						submitFormat: Const.DATE_FORMAT_YMD,
						margin : '0 0 0 5'
					},{	fieldLabel	: Language.get('plan_rslt_dvcd','계획/실적'),
						xtype		: 'lookupfield',
						name		: 'plan_rslt_dvcd',
						itemId		: 'plan_rslt_dvcd',
						value		: this.params.plan_rslt_dvcd,
						allowBlank	: false,
						fieldCls	: 'requiredindex',
						emptyText	: Const.invalid.emptyValue,
						lookupValue	: resource.lookup('plan_rslt_dvcd'),
						margin		: '0 0 0 20',
						width		: 215,
						labelWidth	: 60
					}
				]
			},{	xtype	: 'panel',
				layout	: 'hbox',
				border	: 0,
				margin	: '10 0 0 0',
				items	: [
					{	fieldLabel	: Language.get('oprt_smry','요약')	,
						xtype		: 'textfield',
						name		: 'oprt_smry',
						itemId		: 'oprt_smry',
						value		: this.params.oprt_smry,
						width		: 450,
						labelWidth	: 60,
					}
				]
			},{	xtype	: 'panel',
				layout	: 'hbox',
				border	: 0,
				margin	: '10 0 0 0',
				items	: [
					{	fieldLabel	: Language.get('prjt_idcd','프로젝트'),
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'prjt_name',
						itemId		: 'prjt_name',
						pair		: 'prjt_idcd',
						value		: this.params.prjt_name,
						clearable	: false ,
						width		: 215,
						labelWidth	: 60,
						margin		: '0 0 5 0',
						popup		: {
							select	: 'SINGLE',
							widget	: 'lookup-prjt-popup',
							params	: { stor_grp : _global.stor_grp, line_stat : '0' },
							result	: function(records, nameField, pairField){
								nameField.setValue(records[0].get('prjt_name'));
								pairField.setValue(records[0].get('prjt_idcd'));
							}
						}
					},{	name	: 'prjt_idcd', value : this.params.prjt_idcd, xtype : 'textfield', hidden : true
					},{	fieldLabel	: Language.get('prog_rate','진척율')	,
						xtype		: 'numberfield',
						name		: 'prog_rate',
						itemId		: 'prog_rate',
						value		: this.params.prog_rate,
						width		: 215,
						labelWidth	: 60,
						margin		: '0 0 5 20',
						step		: 5,
						maxValue	: 100,
						minValue	: 0,
						fieldStyle	: 'text-align:right;',
						listeners	: {
							change	: function(){
								var val = this.getValue();
								if(val > 100 || val < 0){
									this.setValue(0);
								}
							}
						}
					}
				]
			},{	xtype	: 'form-panel',
				margin	: '5 0 0 0',
				region	: 'center',
				title	: '업무내용',
				fieldDefaults	: { width : 450, height :300, labelSeparator : '' },
				items	:[
					{	xtype	: 'htmleditor',
						name	: 'oprt_cont',
						itemId		: 'oprt_cont',
						allowBlank	: false,
						fieldCls	: 'requiredindex',
						emptyText	: Const.invalid.emptyValue,
						value		: this.params.oprt_cont,
					},{	name	: '_set',value : this.params._set, xtype : 'textfield' , hidden : true
					},{	name	: 'invc_numb', xtype : 'textfield' , hidden : true
					}
				]
			}
		]
	}
	;
	return form;
	},

	finishAction: function() {
		var me = this,
			baseform= me.down('form'),
			record	= baseform.getRecord(),
			values	= baseform.getValues(),
			store	= Ext.ComponentQuery.query('module-dailyreport-lister')[0].getStore(),
			plan	= Ext.ComponentQuery.query('#plan_rslt_dvcd')[0].getValue(),
			user	= Ext.ComponentQuery.query('#user_name')[0].getValue(),
			form	= this.params.invc_numb
		;
		if(values.dwup_date == null || values.dwup_date == ''){
			Ext.Msg.show({ title: '알림', msg: '근무일자가 반드시 있어야합니다.', icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me });
		}else{
			if(plan == null || plan == ''){
				Ext.Msg.show({ title: '알림', msg: '계획 또는 실적이 반드시 있어야합니다.', icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me });
			}else{
				Ext.Ajax.request({
					url		: _global.location.http() + '/notice/dailyreport/set/insp.do',
					params	: {
						token : _global.token_id,
						param : JSON.stringify({
							line_seqn		: form,
							user_idcd		: this.params.user_idcd,
							user_name		: this.params.user_name,
							apvl_dvcd		: this.params.apvl_dvcd,
							plan_rslt_dvcd	: values.plan_rslt_dvcd,
							dwup_date		: values.dwup_date,
							oprt_smry		: values.oprt_smry,
							prjt_idcd		: values.prjt_idcd,
							prog_rate		: values.prog_rate,
							oprt_cont		: values.oprt_cont,
							user_memo		: values.user_memo,
							_set			: values._set,
							source_dvcd		: '업무일지'
						})
					},
					async	: false,
					method	: 'POST',
					success	: function(response, request) {
						var result = Ext.decode(response.responseText);
						if	(!result.success ){
							Ext.Msg.error(result.message );
							return;
						} else {
							store.reload();
							me.setResponse( {success : true ,  values : baseform , values :form });
							me.close;
						}
					},
					failure : function(result, request) {
					},
					callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
					}
				});
			}
		}
	}
});