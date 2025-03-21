Ext.define('module.notice.dailyreport.view.DailyReportApvlPopup', { extend: 'Axt.popup.Search',

	alias: 'widget.module-dailyreport-apvl-popup',

	title		: '승인',
	closable	: true,
	autoShow	: true,
	width		: 500 ,
	height		: 400,
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
					{	fieldLabel	: Language.get('apvl_date','승인일자'),
						xtype		: 'datefield',
						name		: 'apvl_date',
						itemId		: 'apvl_date',
						width		: 160,
						labelWidth	: 55,
						value		: this.params.apvl_date,
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
					}
				]
			},{	xtype	: 'panel',
				layout	: 'hbox',
				border	: 0,
				margin	: '10 0 0 0',
				items	: [
					{	fieldLabel	: Language.get('admn_opin','관리자의견')	,
						xtype		: 'htmleditor',
						name		: 'admn_opin',
						itemId		: 'admn_opin',
						value		: this.params.admn_opin,
						width		: 450,
						height		: 280,
						labelWidth	: 60,
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
			baseform	= me.down('form'),
			record		= baseform.getRecord(),
			values		= baseform.getValues(),
			store		= Ext.ComponentQuery.query('module-dailyreport-lister')[0].getStore(),
			select		= Ext.ComponentQuery.query('module-dailyreport-lister')[0].getSelectionModel().getSelection(),
			apvlDt		= values.apvl_date
		;
		console.log();
		if(apvlDt == null || apvlDt == ''){
			Ext.Msg.show({ title: '알림', msg: '승인일자가 반드시 있어야합니다.', icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me });
		}else{
			Ext.Msg.show({ title: '확인', msg: '작업일지를 승인하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						Ext.Ajax.request({
							url		: _global.location.http() + '/notice/dailyreport/set/ok.do',
							params	: {
								token : _global.token_id,
								param : JSON.stringify({
									line_seqn		: this.params.line_seqn,
									user_idcd		: this.params.user_idcd,
									dwup_date		: this.params.dwup_date.replace(/\-/g,''),
									plan_rslt_dvcd	: this.params.plan_rslt_dvcd,
									apvl_dvcd		: '0500',
									apvl_date		: apvlDt,
									oprt_smry		: this.params.oprt_smry,
									apvl_drtr_idcd	: _global.login_id,
									admn_opin		: values.admn_opin,
									stor_id			: _global.stor_id,
									hqof_idcd		: _global.hqof_idcd,
									source_dvcd		: '업무일지',
									_set			: 'update'
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
			});
		}
	}
});