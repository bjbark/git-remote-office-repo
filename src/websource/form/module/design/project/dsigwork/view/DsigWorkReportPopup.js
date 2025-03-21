Ext.define('module.design.project.dsigwork.view.DsigWorkReportPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-dsigwork-report-popup',

	title		: '실적보고',
	closable	: true,
	autoShow	: true,
	width		: 442 ,
	height		: 595,
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

	editorForm : function () {
		var me	= this,
		form = {
			xtype	: 'form-panel',
			border	:  false,
			itemId	: 'invc',
			margin	: '15 7 0 -10',
			layout	: { type: 'vbox', align: 'stretch' } ,
			items	: [
				{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					items	: [
						{	xtype		: 'form-panel',
							border		: 0,
							width		: 600,
							fieldDefaults: { width : 300, labelWidth :95, labelSeparator : '' },
							items		: [
								{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
									items	: [
										{	fieldLabel	: Language.get('pjod_idcd', '금형번호'),
											name		: 'pjod_idcd',
											xtype		: 'textfield',
											itemId		: 'pjod_idcd',
											width		: 200,
											readOnly	: true,
											allowBlank	: false,
											fieldCls	: 'requiredindex',
											emptyText	: Const.invalid.emptyValue
										},{ fieldLabel	: '순번',
											xtype		: 'numericfield',
											name		: 'line_seqn',
											itemId		: 'line_seqn',
											width		: 80,
											labelWidth	: 25,
											readOnly	: true,
											hidden		: true
										},{ fieldLabel	: 'id',
											xtype		: 'textfield',
											name		: 'id',
											itemId		: 'id',
											width		: 80,
											labelWidth	: 25,
											readOnly	: true,
											hidden		: true
										},{ fieldLabel	: 'seqn',
											xtype		: 'textfield',
											name		: 'seqn',
											itemId		: 'seqn',
											width		: 80,
											labelWidth	: 25,
											readOnly	: true,
											hidden		: true
										}
									]
								},{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0,margin : '0 0 0 0',
									items	: [
										{	fieldLabel	: '설계요소명',
											xtype		: 'textfield',
											name		: 'name',
											width		: 400,
											readOnly	: true,
											itemId		: 'name',
											fieldCls	: 'requiredindex',
											emptyText	: Const.invalid.emptyValue
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
									items	: [
										{	fieldLabel	: '작업일자',
											xtype		: 'datefield',
											name		: 'invc_date',
											itemId		: 'invc_date',
											width		: 200,
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											allowBlank	: false,
											fieldCls	: 'requiredindex',
											emptyText	: Const.invalid.emptyValue
										},{	fieldLabel	: '작업자',
											xtype		: 'popupfield',
											editable	: true,
											enableKeyEvents : true,
											name		: 'wker_name',
											itemId		: 'wker_name',
											pair		: 'wker_idcd',
											allowBlank	: true,
											clearable	: true ,
											allowBlank	: false,
											fieldCls	: 'requiredindex',
											emptyText	: Const.invalid.emptyValue,
											width		: 200,
//											labelWidth	: 80,
											popup		: {
												select	: 'SINGLE',
												widget	: 'lookup-user-popup',
												params	: { stor_grp : _global.stor_grp, line_stat : '0' },
												result	: function(records, nameField, pairField){
													nameField.setValue(records[0].get('user_name'));
													pairField.setValue(records[0].get('user_idcd'));
												}
											}
										},{	name	: 'wker_idcd', xtype : 'textfield' ,itemId : 'wker_idcd', hidden : true
										}
									]
								},{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0,margin : '0 0 0 0',
									items	: [
										{	fieldLabel	: '작업내용',
											xtype		: 'textarea',
											name		: 'work_cont',
											width		: 400,
											height		: 150
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
									items	: [
										{	fieldLabel	: '작업시작시간',
											xtype		: 'timefield',
											name		: 'work_sttm',
											itemId		: 'work_sttm',
											format		: 'H:i',
											submitFormat: 'Hi',
											minValue	: '9:00 AM',
											increment	: 30,
											width		: 200,
											anchor		: '100%',
											listeners	: {
												blur: function() {
													var panel = this.up('form'),
														work_sttm1 = panel.down('[name=work_sttm]').getValue()
														work_edtm1 = panel.down('[name=work_edtm]').getValue()
														work_sttm = Ext.Date.format(work_sttm1, 'Hi')
														work_edtm = Ext.Date.format(work_edtm1, 'Hi')
														sttm_hour = Ext.Date.format(work_sttm1, 'H')
														edtm_hour = Ext.Date.format(work_edtm1, 'H')
														sttm_min = Ext.Date.format(work_sttm1, 'i')
														edtm_min = Ext.Date.format(work_edtm1, 'i')
													;
													if(work_edtm1 == ''||work_edtm1==null){
													}else{
														if(work_sttm > work_edtm){
															var time  = (24+Number(edtm_hour)) - Number(sttm_hour);
															var min   = sttm_min-edtm_min;
															if(min < 0){
																min  = edtm_min-sttm_min ;
															}
															var total = (time*60)+min;
															panel.down('[name=need_time1]').setValue(time+'시간'+min+'분');
															panel.down('[name=need_time]').setValue(total);
														}else {
															if(work_edtm1 != ''||work_edtm1!=null){
																var time  = edtm_hour-sttm_hour;
																var min   = edtm_min-sttm_min;
//																if(min < 0){
//																	min  = edtm_min-sttm_min + 60;
//																}
																var total = (time*60)+min;
																panel.down('[name=need_time1]').setValue(time+'시간'+min+'분');
																panel.down('[name=need_time]').setValue(total);
															}
														}
													}
												}
											}
										},{	fieldLabel	: '작업종료시간',
											xtype		: 'timefield',
											name		: 'work_edtm',
											itemId		: 'work_edtm',
											readOnly	: false,
											format		: 'H:i',
											submitFormat: 'Hi',
											increment	: 30,
											width		: 200,
											anchor		: '100%',
											listeners	: {
												blur: function() {
													var panel = this.up('form'),
														work_sttm1 = panel.down('[name=work_sttm]').getValue()
														work_edtm1 = panel.down('[name=work_edtm]').getValue()
														work_sttm = Ext.Date.format(work_sttm1, 'Hi')
														work_edtm = Ext.Date.format(work_edtm1, 'Hi')
														sttm_hour = Ext.Date.format(work_sttm1, 'H')
														edtm_hour = Ext.Date.format(work_edtm1, 'H')
														sttm_min = Ext.Date.format(work_sttm1, 'i')
														edtm_min = Ext.Date.format(work_edtm1, 'i')
													;
													if(work_sttm > work_edtm){
														var time  = (24+Number(edtm_hour)) - Number(sttm_hour);
														var min   = sttm_min-edtm_min;
														if(min < 0){
															min  = edtm_min-sttm_min ;
														}
														var total = (time*60)+min;
														panel.down('[name=need_time1]').setValue(time+'시간'+min+'분');
														panel.down('[name=need_time]').setValue(total);
													}
													else {
														if(work_sttm1 != ''||work_sttm1!=null){
															var time  = edtm_hour-sttm_hour;
															var min   = edtm_min-sttm_min;
//															if(min < 0){
//																time = edtm_hour-sttm_hour-1;
//																min  = edtm_min-sttm_min + 60;
//															}
															var total = (time*60)+min;
															panel.down('[name=need_time1]').setValue(time+'시간'+min+'분');
															panel.down('[name=need_time]').setValue(total);
														}
													}
												}
											}
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
									items	: [
										{	fieldLabel	: '소요시간',
											xtype		: 'textfield',
											name		: 'need_time1',
											width		: 200,
											readOnly	: true
										},{	fieldLabel	: '소요시간',
											xtype		: 'numericfield',
											name		: 'need_time',
											width		: 200,
											hidden		: true
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
									items	: [
										{	fieldLabel	: '계획율',
											xtype		: 'numericfield',
											name		: 'plan_rate',
											width		: 200,
											maxValue	: 100,
											maxLength	: 3,
											value		: 0
										},{	fieldLabel	: '달성율',
											xtype		: 'numericfield',
											name		: 'achi_rate',
											width		: 200,
											maxValue	: 100,
											maxLength	: 3,
											value		: 0
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 0',
									items	: [
										{	fieldLabel	: '작업인원',
											xtype		: 'numericfield',
											name		: 'work_pcnt',
											width		: 200,
											value		: 1,
											hidden		: true
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 0',
									items	: [
										{	fieldLabel	: '작업공수',
											xtype		: 'textfield',
											name		: 'work_mnhr',
											width		: 200,
											hidden		: true
										}
									]
								},{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0,margin : '0 0 5 0',
									items	: [
										{	fieldLabel	: '작업메모1',
											xtype		: 'textarea',
											name		: 'work_cond_1fst',
											width		: 400,
											height		: 80
										},{	fieldLabel	: '작업메모2',
											xtype		: 'textarea',
											name		: 'work_cond_2snd',
											width		: 400,
											height		: 80
										},{	fieldLabel	: '작업조건3',
											xtype		: 'textfield',
											name		: 'work_cond_3trd',
											width		: 400,
											hidden		: true
										},{	fieldLabel	: '작업조건4',
											xtype		: 'textfield',
											name		: 'work_cond_5fit',
											width		: 400,
											hidden		: true
										},{	fieldLabel	: '작업조건5',
											xtype		: 'textfield',
											name		: 'work_cond_6six',
											width		: 400,
											hidden		: true
										},{	fieldLabel	: '작업조건6',
											xtype		: 'textfield',
											name		: 'work_cond_7svn',
											width		: 400,
											hidden		: true
										}
									]
								}
							]
						}
					]
				}
			]
		};
		return form;
	},

	//확인버튼
	finishAction: function(){
		var me = this,
			baseform= me.down('form'),
			record	= baseform.getRecord(),
			values	= baseform.getValues(),
			layout	= Ext.ComponentQuery.query('module-dsigwork-layout')[0],
			tpanel = layout.down('#mainpanel'),
			line_seqn = 0
		;

		if(values.invc_date==''){
			Ext.Msg.alert("알림","작업일자를 반드시 입력해주십시오.");
		}else if(values.wker_idcd==''){
			Ext.Msg.alert("알림","작업자를 반드시 입력해주십시오.");
		}else if(values.plan_rate.length>3){
			Ext.Msg.alert("알림","계획율을 다시 입력해주십시오.");
		}else if(values.achi_rate.length>3){
			Ext.Msg.alert("알림","달성율을 다시 입력해주십시오.");
		}else if(values.plan_rate>100){
			Ext.Msg.alert("알림","계획율은 최대 100까지입니다. 다시 입력해주십시오.");
		}else if(values.achi_rate>100){
			Ext.Msg.alert("알림","달성율을 은 최대 100까지입니다. 다시 입력해주십시오.");
		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();

			Ext.Ajax.request({
				url		: _global.location.http() + '/design/project/dsigwork/get/report.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
							pjod_idcd		: values.pjod_idcd,
							line_seqn		: values.line_seqn
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
						line_seqn = result.records[0].line_seqn;
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
					mask.hide();
				}
			});
			line_seqn = line_seqn+1;
			Ext.Ajax.request({
				url		: _global.location.http() + '/design/project/dsigwork/set/report.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						records :[{
							pjod_idcd		: values.pjod_idcd,
							id				: values.id,
							seqn			: values.seqn,
							line_seqn		: line_seqn,
							invc_date		: values.invc_date,
							wker_idcd		: values.wker_idcd,
							work_cont		: values.work_cont,
							work_sttm		: values.work_sttm+'00',
							work_edtm		: values.work_edtm+'00',
							need_time		: values.need_time,
							work_pcnt		: values.work_pcnt,
							work_mnhr		: values.work_mnhr,
							plan_rate		: values.plan_rate,
							achi_rate		: values.achi_rate,
							work_cond_1fst	: values.work_cond_1fst,
							work_cond_2snd	: values.work_cond_2snd,
							crte_idcd		: _global.login_id
						}]
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
						me.setResponse( {success : true , values :  values });
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){
					mask.hide();
				}
			});
		}
	}
});
