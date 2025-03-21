Ext.define('module.membership.basic.memberentry.view.MemberEntryCrctPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-memberentry-crct-popup',

	title		: '수납등록',
	closable	: true,
	autoShow	: true,
	width		: 520 ,
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
			layout	: { type: 'vbox', align: 'stretch' } ,
			items	: [
				{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '10 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('mmbr_code','회원ID')	,
							xtype		: 'textfield',
							name		: 'mmbr_idcd',
							itemId		: 'mmbr_idcd',
							value		: this.params.mmbr_idcd,
							width		: 160,
							labelWidth	: 60,
							allowBlank	: false,
							margin		: '0 0 5 0',
							readOnly	: true,
							hidden		: true
						},{	fieldLabel	: Language.get('mmbr_code','회원코드')	,
							xtype		: 'textfield',
							name		: 'mmbr_code',
							itemId		: 'mmbr_code',
							value		: this.params.mmbr_code,
							width		: 160,
							labelWidth	: 60,
							allowBlank	: false,
							margin		: '0 0 5 0',
							readOnly	: true
						},{	fieldLabel	: Language.get('mmbr_code','회원명')	,
							xtype		: 'textfield',
							name		: 'mmbr_name',
							itemId		: 'mmbr_name',
							value		: this.params.mmbr_name,
							width		: 160,
							labelWidth	: 60,
							allowBlank	: false,
							margin		: '0 0 5 40',
							readOnly	: true
						},{	xtype		: 'lookupfield',
							name		: 'mmbr_stat_dvcd',
							itemId		: 'mmbr_stat_dvcd',
							width		: 75,
							editable	: false,
							margin		: '0 0 0 5',
							lookupValue	: resource.lookup('mmbr_stat_dvcd'),
							value		: this.params.mmbr_stat_dvcd,
							readOnly	: true
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '6 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('amtm_yorn','오전'),
							xtype		: 'lookupfield',
							name		: 'amtm_yorn',
							itemId		: 'amtm_yorn',
							margin		: '0 0 5 0',
							width		: 130,
							labelWidth	: 60,
							value		: this.params.amtm_yorn,
							lookupValue	: resource.lookup('yorn'),
							readOnly	: true
						},{	name		: 'amtm_sttm',
							itemId		: 'amtm_sttm',
							xtype		: 'timefield',
							format		: 'H:i',
							submitFormat: 'Hi',
							minValue	: '09:00',
							maxValue	: '13:59',
							increment	: 30,
							width		: 60,
							margin		: '1 0 0 0',
							readOnly	: true,
							value		: this.params.amtm_sttm,
						},{	fieldLabel	: Language.get('pmtm_yorn','오후'),
							xtype		: 'lookupfield',
							name		: 'pmtm_yorn',
							itemId		: 'pmtm_yorn',
							margin		: '0 0 0 0',
							width		: 130,
							labelWidth	: 70,
							lookupValue	: resource.lookup('yorn'),
							readOnly	: true,
							value		: this.params.pmtm_yorn,
						},{	name		: 'pmtm_sttm',
							itemId		: 'pmtm_sttm',
							xtype		: 'timefield',
							format		: 'H:i',
							submitFormat: 'Hi',
							minValue	: '09:00',
							maxValue	: '23:59',
							increment	: 30,
							width		: 60,
							margin		: '1 0 0 0',
							readOnly	: true,
							value		: this.params.pmtm_sttm,
						}
					]

				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '2 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('','월'),
							xtype		: 'lookupfield',
							name		: 'mond_time_dvcd',
							itemId		: 'mond_time_dvcd',
							width		: 50,
							labelWidth	: 10,
							margin		: '0 0 1 50',
							editable	: true,
							lookupValue	: resource.lookup('ampm_dvcd'),
							readOnly	: true,
							value		: this.params.mond_time_dvcd,
						},{	fieldLabel	: Language.get('','화'),
							xtype		: 'lookupfield',
							name		: 'tued_time_dvcd',
							itemId		: 'tued_time_dvcd',
							width		: 50,
							labelWidth	: 10,
							margin		: '0 0 0 6',
							editable	: false,
							lookupValue	: resource.lookup('ampm_dvcd'),
							readOnly	: true,
							value		: this.params.tued_time_dvcd,
						},{	fieldLabel	: Language.get('','수'),
							xtype		: 'lookupfield',
							name		: 'wedd_time_dvcd',
							itemId		: 'wedd_time_dvcd',
							width		: 50,
							labelWidth	: 10,
							margin		: '0 0 0 6',
							editable	: false,
							lookupValue	: resource.lookup('ampm_dvcd'),
							readOnly	: true,
							value		: this.params.wedd_time_dvcd,
						},{	fieldLabel	: Language.get('','목'),
							xtype		: 'lookupfield',
							name		: 'thud_time_dvcd',
							itemId		: 'thud_time_dvcd',
							width		: 50,
							labelWidth	: 10,
							margin		: '0 0 0 6',
							editable	: false,
							lookupValue	: resource.lookup('ampm_dvcd'),
							readOnly	: true,
							value		: this.params.thud_time_dvcd,
						},{	fieldLabel	: Language.get('','금'),
							xtype		: 'lookupfield',
							name		: 'frid_time_dvcd',
							itemId		: 'frid_time_dvcd',
							width		: 50,
							labelWidth	: 10,
							margin		: '0 0 0 6',
							editable	: false,
							lookupValue	: resource.lookup('ampm_dvcd'),
							readOnly	: true,
							value		: this.params.frid_time_dvcd,
						},{	fieldLabel	: Language.get('','토'),
							xtype		: 'lookupfield',
							name		: 'satd_time_dvcd',
							itemId		: 'satd_time_dvcd',
							width		: 50,
							labelWidth	: 10,
							margin		: '0 0 0 6',
							editable	: false,
							lookupValue	: resource.lookup('ampm_dvcd'),
							readOnly	: true,
							value		: this.params.satd_time_dvcd,
						},{	fieldLabel	: Language.get('','일'),
							xtype		: 'lookupfield',
							name		: 'sund_time_dvcd',
							itemId		: 'sund_time_dvcd',
							width		: 50,
							labelWidth	: 10,
							margin		: '0 0 0 6',
							editable	: false,
							lookupValue	: resource.lookup('ampm_dvcd'),
							readOnly	: true,
							value		: this.params.sund_time_dvcd,
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '6 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('acce_date', '수납일자' ),
							name		: 'acce_date',
							itemId		: 'acce_date',
							xtype		: 'datefield',
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							value		: this.params.acce_date,
							width		: 160,
							labelWidth	: 60
						},{	fieldLabel	: Language.get('drtr_name','수납사원'),
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							name		: 'drtr_name',
							itemId		: 'drtr_name',
							pair		: 'drtr_idcd',
							value		: this.params.drtr_name,
							allowBlank	: false,
							fieldCls	: 'requiredindex',
							emptyText	: Const.invalid.emptyValue,
							clearable	: false ,
							width		: 160,
							labelWidth	: 60,
							margin		: '0 0 5 0',
							popup		: {
								select	: 'SINGLE',
								widget	: 'lookup-user-popup',
								params	: { stor_grp : _global.stor_grp, line_stat : '0' },
								result	: function(records, nameField, pairField){
									nameField.setValue(records[0].get('user_name'));
									pairField.setValue(records[0].get('user_idcd'));
								}
							}
						},{	name	: 'drtr_idcd', xtype : 'textfield' , hidden : true , value : this.params.drtr_idcd
						},{	fieldLabel	: Language.get('lssn_stdt', '레슨시작일' ),
							name		: 'lssn_stdt',
							itemId		: 'lssn_stdt',
							xtype		: 'datefield',
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							width		: 160,
							labelWidth	: 60
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '2 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('qntt','횟수'),
							xtype		: 'numericfield',
							value		: this.params.qntt,
							name		: 'qntt',
							itemId		: 'qntt',
							width		: 160,
							labelWidth	: 60,
							listeners	: {
								blur: function() {
									var panel	= this.up('form'),
										qntt	= panel.down('[name=pric]').getValue();
										qntt2	= Number(qntt)*Number(this.getValue());
										panel.down('[name=amnt]').setValue(qntt2);
								}
							}
						},{	fieldLabel	: Language.get('amnt','영수금액'),
							xtype		: 'numericfield',
							value		: this.params.amnt,
							name		: 'amnt',
							itemId		: 'amnt',
							width		: 160,
							labelWidth	: 60,
							listeners	: {
								blur: function() {
									var panel	= this.up('form'),
										qntt	= panel.down('[name=qntt]').getValue();
										qntt2	= Number(this.getValue()) / Number(qntt);
										panel.down('[name=pric]').setValue(qntt2);
								}
							}
						},{	fieldLabel	: Language.get('pric','회당레슨비'),
							xtype		: 'numericfield',
							value		: this.params.pric,
							name		: 'pric',
							itemId		: 'pric',
							width		: 160,
							labelWidth	: 60,
							listeners	: {
								blur: function() {
									var panel	= this.up('form'),
										qntt	= panel.down('[name=qntt]').getValue();
										qntt2	= Number(qntt)*Number(this.getValue());
										panel.down('[name=amnt]').setValue(qntt2);
								}
							}
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '2 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('stot_dvcd','결제구분'),
							xtype		: 'lookupfield',
							name		: 'stot_dvcd',
							itemId		: 'stot_dvcd',
							value		: this.params.stot_dvcd,
							lookupValue	: resource.lookup('stot_dvcd'),
							width		: 160,
							labelWidth	: 60
						},{	fieldLabel	: Language.get('cbil_yorn','현금영수증'),
							xtype		: 'lookupfield',
							name		: 'cbil_yorn',
							itemId		: 'cbil_yorn',
							value		: this.params.cbil_yorn,
							lookupValue	: resource.lookup('yorn'),
							width		: 160,
							labelWidth	: 60
						},{	fieldLabel	: Language.get('','일부수금'),
							xtype		: 'lookupfield',
							name		: 'prtl_colt_yorn',
							itemId		: 'prtl_colt_yorn',
							value		: this.params.cbil_yorn,
							lookupValue	: resource.lookup('yorn'),
							width		: 160,
							labelWidth	: 60,
							value		: this.params.prtl_colt_yorn,
//						},{	xtype		: 'checkbox',
//							boxLabel	: '일부수금(레슨과 무관)',
//							name		: 'prtl_colt_yorn',
//							checked		: false,
//							style		: { color : 'blue' },
//							margin		: '0 0 0 30'
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '2 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('acct_nmbr','계좌번호 등')	,
							xtype		: 'textfield',
							name		: 'acct_nmbr',
							itemId		: 'acct_nmbr',
							value		: this.params.acct_nmbr,
							width		: 480,
							labelWidth	: 60,
							margin		: '0 0 5 0',
							readOnly	: false
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '2 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('user_memo','비고'),
							name		: 'user_memo',
							itemId		: 'user_memo',
							xtype		: 'textarea',
							value		: this.params.user_memo,
							emptyText	: '참조할 사항을 입력해 주십시오',
							width		: 480,
							labelWidth	: 60,
						}
					]
//				},{	name	: 'acce_date',value : this.params.acce_date, xtype : 'textfield' , hidden : true
				},{	name	: '_set',value : this.params._set, xtype : 'textfield' , hidden : true
				},{	name	: 'invc_numb',value : this.params.invc_numb, xtype : 'textfield' , hidden : true
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
			store	= Ext.ComponentQuery.query('module-memberentry-crct-lister')[0].getStore(),
			form= this.params.invc_numb,
			line_seqn	= ''
		;
		var cdt = Ext.Date.format(new Date(),'Ymd'); //오늘일자
		var qntt = Ext.ComponentQuery.query('#qntt')[0].getValue(); //수량
		var pric = Ext.ComponentQuery.query('#pric')[0].getValue(); //단가
		var amnt = Ext.ComponentQuery.query('#amnt')[0].getValue(); //금액
		var b = Ext.ComponentQuery.query('#drtr_name')[0].getValue(); //작성사원
		var stdt = Ext.Date.format(Ext.ComponentQuery.query('#lssn_stdt')[0].getValue(),'Ymd'); //레슨 시작일

		Ext.Ajax.request({
			url		: _global.location.http() + '/membership/memberentry/get/lastSeq.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					stor_id		: _global.stor_id,
					hqof_idcd	: _global.hqof_idcd,
					table_name	: 'crct',
					mmbr_idcd	: values.mmbr_idcd
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
					if(result.records.length>0){
						line_seqn = result.records[0].line_seqn;
					}
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});
		if(qntt== null || qntt==''){
			Ext.Msg.show({ title: '알림', msg: '레슨 횟수는 반드시 입력하여야 합니다.', icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me });
			return;
		};
		if(pric== null || pric==''){
			Ext.Msg.show({ title: '알림', msg: '회당 레슨비는 반드시 입력하여야 합니다.', icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me });
			return;
		};
		if(b== null || b==''){
			Ext.Msg.show({ title: '알림', msg: '작성사원을 반드시 입력하여야 합니다.', icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me });
			return;
		};
		if(stdt== null || stdt==''){
			Ext.Msg.show({ title: '알림', msg: '레슨시작일을 반드시 입력하여야 합니다.', icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me });
			return;
		};
//		if(cdt>stdt){
//			Ext.Msg.show({ title: '알림', msg: '레슨시작일을 확인해 주시기 바랍니다. ', icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me });
//			return;
//		};
		Ext.Ajax.request({
			url		: _global.location.http() + '/membership/memberentry/set/crct.do',
			params	: {
				token	: _global.token_id,
				param	: JSON.stringify({
					invc_numb	: form,
					mmbr_idcd	: values.mmbr_idcd,
					line_seqn	: line_seqn,
					drtr_idcd	: values.drtr_idcd,
					acce_date	: values.acce_date,
					lssn_stdt	: values.lssn_stdt,
					annc_dvcd	: values.annc_dvcd,
					qntt		: values.qntt,
					pric		: values.pric,
					amnt		: values.amnt,
					cbil_yorn	: values.cbil_yorn,
					prtl_colt_yorn	: values.prtl_colt_yorn,
					stot_dvcd	: values.stot_dvcd,
					acct_nmbr	: values.acct_nmbr,
					drtr_idcd	: values.drtr_idcd,
					user_memo	: values.user_memo,
					_set		: values._set,
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
			failure : function(result, request) {},
			callback: function(operation){ } /* 성공 실패 관계 없이 호출된다. */
		});
	}
});