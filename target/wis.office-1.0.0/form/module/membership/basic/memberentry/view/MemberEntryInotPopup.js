Ext.define('module.membership.basic.memberentry.view.MemberEntryInotPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-memberentry-inot-popup',

	title		: '예약등록',
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
						{	fieldLabel	: Language.get('drtr_name','예약코치'),
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							name		: 'drtr_name',
							itemId		: 'drtr_name',
							pair		: 'drtr_idcd',
							value		: this.params.drtr_name,
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
						},{	fieldLabel	: Language.get('resv_date', '예약일자' ),
							name		: 'resv_date',
							itemId		: 'resv_date',
							xtype		: 'datefield',
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							width		: 160,
							labelWidth	: 60,
							value		: this.params.resv_date,
						},{	fieldLabel	: Language.get('resv_date', '예약시간' ),
							name		: 'resv_time',
							itemId		: 'resv_time',
							xtype		: 'timefield',
							format		: 'H:i',
							submitFormat: 'Hi',
							minValue	: '06:00',
							maxValue	: '22:30',
							increment	: 30,
							width		: 115,
							labelWidth	: 55,
							value		: this.params.resv_time,
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '2 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('memo','메모사항'),
							name		: 'memo',
							itemId		: 'memo',
							xtype		: 'textarea',
							value		: this.params.memo,
							emptyText	: '참조할 사항을 입력해 주십시오',
							width		: 435,
							labelWidth	: 60,
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '2 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('stot_dvcd','예약상태'),
							xtype		: 'lookupfield',
							name		: 'resv_stat_dvcd',
							itemId		: 'resv_stat_dvcd',
							value		: this.params.resv_stat_dvcd,
							lookupValue	: resource.lookup('resv_stat_dvcd'),
							width		: 160,
							labelWidth	: 60
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '2 0 0 0',
					items	: [
					{	fieldLabel	: Language.get('proc_drtr_name','코치'),
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'proc_drtr_name',
						itemId		: 'proc_drtr_name',
						pair		: 'proc_drtr_idcd',
						value		: this.params.proc_drtr_name,
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
					},{	name	: 'proc_drtr_idcd', xtype : 'textfield' , hidden : true , value : this.params.proc_drtr_idcd
					},{	fieldLabel	: Language.get('proc_date', '처리일자' ),
						name		: 'proc_date',
						itemId		: 'proc_date',
						xtype		: 'datefield',
						format		: Const.DATE_FORMAT_YMD_BAR,
						submitFormat: Const.DATE_FORMAT_YMD,
						width		: 160,
						labelWidth	: 60,
						value		: this.params.proc_date,
					},{	fieldLabel	: Language.get('proc_date', '처리시간' ),
						name		: 'proc_time',
						itemId		: 'proc_time',
						xtype		: 'timefield',
						format		: 'H:i',
						submitFormat: 'Hi',
						minValue	: '06:00',
						maxValue	: '22:30',
						increment	: 30,
						width		: 115,
						labelWidth	: 55,
						value		: this.params.proc_time,
						}
					]
				},{	name	: '_set',value : this.params._set, xtype : 'textfield' , hidden : true
				},{	name	: 'need_time',value : this.params.need_time, xtype : 'numericfield' , hidden : true
				},{	name	: 'invc_numb',value : this.params.invc_numb, xtype : 'textfield' , hidden : true
				},{	name	: 'line_seqn',value : this.params.line_seqn, xtype : 'numericfield' , hidden : true
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
			store	= Ext.ComponentQuery.query('module-memberentry-inot-lister')[0].getStore(),
			form= this.params.invc_numb,
			line_seqn	= ''
		;
		var dt = Ext.ComponentQuery.query('#resv_date')[0].getValue();
		var tm = Ext.ComponentQuery.query('#resv_time')[0].getValue();
		var stat = Ext.ComponentQuery.query('#resv_stat_dvcd')[0].getValue();
		if (values._set=='insert') {
		Ext.Ajax.request({
			url		: _global.location.http() + '/membership/memberentry/get/lastSeq.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					stor_id		: _global.stor_id,
					hqof_idcd	: _global.hqof_idcd,
					table_name	: 'inot',
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
		} else {
			line_seqn = values.line_seqn;
		}

		if(dt == null || dt==''){
			Ext.Msg.show({ title: '알림', msg: '예약일자는 반드시 입력하여야 합니다.', icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me });
			return;
		};
		if(tm == null || tm ==''){
			Ext.Msg.show({ title: '알림', msg: '예약시간은 반드시 입력하여야 합니다.', icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me });
			return;
		};
		if(stat == null || stat ==''){
			Ext.Msg.show({ title: '알림', msg: '예약상태를 확인해 주시기 바랍니다.', icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me });
			return;
		}
		Ext.Ajax.request({
			url		: _global.location.http() + '/membership/memberentry/set/inot.do',
			params	: {
				token	: _global.token_id,
				param	: JSON.stringify({
					invc_numb	: form,
					mmbr_idcd		: values.mmbr_idcd,
					line_seqn		: line_seqn,
					resv_date		: values.resv_date,
					resv_time		: values.resv_time,
					need_time		: values.need_time,
					drtr_idcd		: values.drtr_idcd,
					drtr_name		: values.drtr_name,
					acce_date		: values.acce_date,
					acce_seqn		: values.acce_seqn,
					memo			: values.memo,
					resv_stat_dvcd	: values.resv_stat_dvcd	,
					proc_drtr_idcd	: values.proc_drtr_idcd	,
					proc_drtr_name	: values.proc_drtr_name	,
					proc_date		: values.proc_date,
					proc_time		: values.proc_time,
					user_memo		: values.user_memo,
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